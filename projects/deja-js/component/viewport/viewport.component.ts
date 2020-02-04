/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, HostBinding, Input, OnDestroy, ViewChild } from '@angular/core';
import { IViewPort, IViewPortItem, IViewPortRefreshParams, ViewportDirection, ViewportMode, ViewPortService } from '@deja-js/core';
import { from as observableFrom, fromEvent as observableFromEvent, interval as observableInterval, merge as observableMerge, Subject, Subscription, timer as observableTimer } from 'rxjs';
import { debounceTime, delay, first, map, takeUntil, takeWhile } from 'rxjs/operators';

export enum DejaViewPortScrollStyle {
    scrollbar,
    buttons,
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ViewPortService],
    selector: 'deja-viewport',
    styleUrls: ['./viewport.component.scss'],
    templateUrl: './viewport.component.html',
})
export class DejaViewPortComponent implements OnDestroy {
    public beforeSize: number;
    public afterSize: number;
    public vpItems: IDejaViewPortItem[];
    public vpStartIndex: number;
    public vpEndIndex: number;
    public startOffset: number;  // Buttons mode only
    @HostBinding('attr.hasUpBtn') public hasUpButton = false;
    @HostBinding('attr.hasDownBtn') public hasDownButton = false;
    @HostBinding('attr.horizontal') public _isHorizontal = false;
    @HostBinding('attr.buttons') public _hasButtons = false;

    public get hasButtons() {
        return this._hasButtons;
    }

    public get isHorizontal() {
        return this._isHorizontal;
    }

    private _items: IDejaViewPortItem[];
    private element: HTMLElement;
    private isAlive = true;
    private downButton$ = new Subject<HTMLElement>();
    private upButton$ = new Subject<HTMLElement>();
    private downButton$Sub: Subscription;
    private upButton$Sub: Subscription;
    private mouseWheel$Sub: Subscription;
    private scrollPosition = 0;
    private _buttonsStep: number;

    @Input()
    public set buttonsStep(value: number) {
        this._buttonsStep = value;
    }

    public get buttonsStep() {
        return this._buttonsStep || 20;
    }

    /** Permet de définir un template d'élément par binding */
    @Input() public itemTemplateExternal: any;

    @ContentChild('itemTemplate') private itemTemplateInternal: any;

    @ViewChild('down')
    public set downButton(element: ElementRef) {
        this.downButton$.next((element && element.nativeElement) || null);
    }

    @ViewChild('up')
    public set upButton(element: ElementRef) {
        this.upButton$.next((element && element.nativeElement) || null);
    }

    /** Set the list of models to render inside the viewport control */
    @Input()
    public set models(models: any[]) {
        this.items = models ? models.map((model) => ({
            model: model,
        } as IDejaViewPortItem)) : [];
    }

    /** Set the list of items to render inside the viewport control */
    @Input()
    public set items(items: any[]) {
        this._items = items || [];
        if (this.viewPort.mode === ViewportMode.disabled) {
            this.vpItems = this._items;
        }
        this.viewPort.items$.next(this._items);
    }

    /** Set the scrolling style
      * scrollbar: Classic scrollbars
      * buttons: A button before is placed at the top or at the left of the list, and a button after is placed at the right or the bottom of the list.
      */
    @Input()
    public set scrollingStyle(value: DejaViewPortScrollStyle | string) {
        const scrollingStyle = typeof value === 'string' ? DejaViewPortScrollStyle[value as any] : value;
        this._hasButtons = scrollingStyle === DejaViewPortScrollStyle.buttons;
    }

    /** Set the direction of the items rendering
     * vertical: The item are displayed vertically
     * horizontal: The item are displayed horizontally
     */
    @Input()
    public set direction(value: ViewportDirection | string) {
        const direction = typeof value === 'string' ? ViewportDirection[value as any] : value;
        this.viewPort.direction$.next(direction);
        this._isHorizontal = direction === ViewportDirection.horizontal;
        this.changeDetectorRef.markForCheck();
    }

    /** Set the item size in fixed mode or the default item size before rendering in auto mode */
    @Input()
    public set itemSize(value: number | string) {
        if (value) {
            const size = coerceNumberProperty(value);
            this.viewPort.itemsSize$.next(+value);
            if (!this._buttonsStep) {
                this._buttonsStep = size;
            }
        }
    }

    public get itemSize() {
        return this.viewPort.itemsSize;
    }

    @ViewChild('wrapper', { static: true })
    public set wrapperElement(element: ElementRef) {
        this.element = element.nativeElement as HTMLElement;
        this.viewPort.element$.next(this.element);
        observableFromEvent(this.element, 'scroll').pipe(
            takeWhile(() => this.isAlive),
            map((event: Event) => event.target as HTMLElement),
            map((target) => Math.round(this._isHorizontal ? target.scrollLeft : target.scrollTop)))
            .subscribe((scrollPos) => {
                this.viewPort.scrollPosition$.next(scrollPos);
            });
    }

    public get itemTemplate() { return this.itemTemplateExternal || this.itemTemplateInternal; }

    private get clientSize() {
        if (!this.element) {
            return 0;
        }
        return this._isHorizontal ? this.element.clientWidth : this.element.clientHeight;
    }

    private set scrollPos(value: number) {
        const scrollPos = Math.max(coerceNumberProperty(value), 0);
        this.scrollPosition = scrollPos;
        this.viewPort.scrollPosition$.next(scrollPos);
    }

    private get scrollPos() {
        return this.scrollPosition;
    }

    /**
     * Définit la méthode de calcul de la taille des éléments. Les valuers acceptées sont
     * disabled: Tous les éléments sont rendus. (< 100 éléments)
     * fixed: Seul les éléments visibles sont rendus. La taille des éléments est constante et définie par itemsSize. (performances ++)
     * variable: Seul les éléments visibles sont rendus. La taille des éléments est variable et définie par item.size. (performances +-)
     * auto: Seul les éléments visibles sont rendus. La taille des éléments est calculée automatiquement (performances --)
     */
    @Input()
    public set viewportMode(mode: ViewportMode | string) {
        this.viewPort.mode$.next(mode);
    }

    public get viewportMode() {
        return this.viewPort.mode;
    }

    constructor(private changeDetectorRef: ChangeDetectorRef, private viewPort: ViewPortService) {
        observableFromEvent(window, 'resize').pipe(
            takeWhile(() => this.isAlive),
            debounceTime(5))
            .subscribe(() => {
                this.viewPort.deleteSizeCache();
                this.viewPort.refresh();
                this.changeDetectorRef.markForCheck();
            });

        viewPort.viewPort$.pipe(
            takeWhile(() => this.isAlive))
            .subscribe((viewPortResult: IViewPort) => {
                if (viewPort.mode !== ViewportMode.disabled) {
                    this.vpItems = viewPortResult.visibleItems as IDejaViewPortItem[];
                    this.vpStartIndex = viewPortResult.startIndex;
                    this.vpEndIndex = viewPortResult.endIndex;
                } else {
                    this.vpStartIndex = 0;
                    this.vpEndIndex = 0;
                }

                if (this.hasButtons) {
                    this.startOffset = this.scrollPos - viewPortResult.beforeSize;
                    this.beforeSize = null;
                    this.afterSize = null;
                    this.hasUpButton = this.scrollPos > 0;
                    this.hasDownButton = this.scrollPos + viewPortResult.listSize < viewPortResult.beforeSize + viewPortResult.viewPortSize + viewPortResult.afterSize;

                } else {
                    this.startOffset = 0;
                    this.beforeSize = viewPortResult.beforeSize || null;
                    this.afterSize = viewPortResult.afterSize || null;
                    this.hasUpButton = false;
                    this.hasDownButton = false;
                }

                const scroll = (vp: IViewPort) => {
                    if (!this.hasButtons) {
                        if (this.element) {
                            if (this._isHorizontal) {
                                this.element.scrollLeft = vp.scrollPos;
                            } else {
                                this.element.scrollTop = vp.scrollPos;
                            }
                            this.scrollPosition = vp.scrollPos;
                        }
                    } else {
                        this.scrollPos = vp.scrollPos;
                        this.startOffset = this.scrollPos - vp.beforeSize;
                    }
                    this.changeDetectorRef.markForCheck();
                };

                if (viewPortResult.scrollPos !== undefined) {
                    let length = 0;
                    if (this.element) {
                        const listItems = this.element.getElementsByClassName('listitem');
                        length = listItems.length;
                    }
                    const rebind = length !== viewPortResult.visibleItems.length;
                    if (!rebind) {
                        scroll(viewPortResult);
                    } else {
                        this.changeDetectorRef.markForCheck();
                        observableTimer(1).pipe(
                            first())
                            .subscribe(() => scroll(viewPortResult));
                    }
                } else {
                    this.changeDetectorRef.markForCheck();
                }
            });

        observableFrom(this.downButton$).pipe(
            takeWhile(() => this.isAlive))
            .subscribe((downButton) => {
                if (downButton) {
                    if (!this.mouseWheel$Sub) {
                        this.mouseWheel$Sub = observableFromEvent(this.element, 'mousewheel')
                            .subscribe((event: MouseWheelEvent) => {
                                this.scrollPos = this.scrollPos + event.deltaY;
                                event.stopPropagation();
                                event.preventDefault();
                                return false;
                            });
                    }
                } else if (this.mouseWheel$Sub) {
                    this.mouseWheel$Sub.unsubscribe();
                    delete this.mouseWheel$Sub;
                    this.scrollPos = 0;
                }
            });

        const downButton$ = observableFrom(this.downButton$).pipe(
            takeWhile(() => this.isAlive),
            map((downButton) => {
                if (downButton) {
                    if (!this.downButton$Sub) {
                        const mousedown$ = observableFromEvent(downButton, 'mousedown');

                        const mouseup$ = observableMerge(
                            observableFromEvent(downButton, 'mouseup'),
                            observableFromEvent(downButton, 'mouseleave'));

                        this.downButton$Sub = mousedown$.subscribe((event: MouseEvent) => {
                            mouseup$.pipe(first())
                                .subscribe((upEvent: MouseEvent) => {
                                    this.scrollPos += upEvent.ctrlKey ? this.clientSize : this.buttonsStep;
                                });

                            observableTimer(750).pipe(
                                takeUntil(mouseup$))
                                .subscribe(() => {
                                    observableInterval(50).pipe(
                                        takeUntil(mouseup$))
                                        .subscribe(() => {
                                            this.scrollPos += event.ctrlKey ? this.clientSize : this.buttonsStep * 2;
                                        });
                                });
                        });

                        return true;
                    }
                } else if (this.downButton$Sub) {
                    this.downButton$Sub.unsubscribe();
                    delete this.downButton$Sub;
                    return true;
                }

                return false;
            }));

        const upButton$ = observableFrom(this.upButton$).pipe(
            takeWhile(() => this.isAlive),
            map((upButton) => {
                if (upButton) {
                    if (!this.upButton$Sub) {
                        const mousedown$ = observableFromEvent(upButton, 'mousedown');

                        const mouseup$ = observableMerge(
                            observableFromEvent(upButton, 'mouseup'),
                            observableFromEvent(upButton, 'mouseleave'));

                        this.upButton$Sub = mousedown$.subscribe((event: MouseEvent) => {
                            mouseup$.pipe(
                                first())
                                .subscribe((upEvent: MouseEvent) => {
                                    this.scrollPos -= upEvent.ctrlKey ? this.clientSize : this.buttonsStep;
                                });

                            observableTimer(750).pipe(
                                takeUntil(mouseup$))
                                .subscribe(() => {
                                    observableInterval(50).pipe(
                                        takeUntil(mouseup$))
                                        .subscribe(() => {
                                            this.scrollPos -= event.ctrlKey ? this.clientSize : this.buttonsStep * 2;
                                        });
                                });
                        });

                        return true;
                    }
                } else if (this.upButton$Sub) {
                    this.upButton$Sub.unsubscribe();
                    delete this.upButton$Sub;
                    return true;
                }

                return false;
            }));

        observableMerge(downButton$, upButton$).pipe(
            delay(10))
            .subscribe((needToRefresh) => {
                if (needToRefresh) {
                    this.viewPort.refresh();
                }
            });
    }

    public ngOnDestroy() {
        this.isAlive = false;
        if (this.downButton$Sub) {
            this.downButton$Sub.unsubscribe();
        }
        if (this.upButton$Sub) {
            this.upButton$Sub.unsubscribe();
        }
        if (this.mouseWheel$Sub) {
            this.mouseWheel$Sub.unsubscribe();
        }
    }

    public refresh() {
        this.changeDetectorRef.markForCheck();
    }

    /** Recalcule le viewport. */
    public refreshViewPort(item?: IViewPortItem, clearMeasuredHeight?: boolean) {
        const refreshParams = {} as IViewPortRefreshParams;
        if (item) {
            refreshParams.items = [item];
        }
        if (clearMeasuredHeight) {
            refreshParams.clearMeasuredSize = clearMeasuredHeight;
        }
        this.viewPort.refresh(refreshParams);
        this.changeDetectorRef.markForCheck();
    }

    public ensureVisible(item: any) {
        this.viewPort.ensureItem$.next(item);
    }

    public getCssSize(item: IViewPortItem) {
        const itemSize = this.getItemSize(item);
        return itemSize ? `${itemSize}px` : 'auto';
    }

    public getItemSize(item: IViewPortItem) {
        if (this.viewPort.mode === ViewportMode.disabled) {
            return null;
        } else if (this.viewPort.mode === ViewportMode.fixed) {
            return this.itemSize;
        } else if (this.viewPort.mode === ViewportMode.auto) {
            return item.size || null;
        } else {
            return (item.size && item.size > ViewPortService.itemDefaultSize) ? item.size : this.itemSize;
        }
    }
}

export interface IDejaViewPortItem extends IViewPortItem {
    model: any;
}
