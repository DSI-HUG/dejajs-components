/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

// TODO Key events

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, HostBinding, Input, OnDestroy, ViewChild } from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/takeUntil';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { IViewPort, IViewPortItem, IViewPortRefreshParams, ViewportDirection, ViewportMode, ViewPortService } from '../../common/core/item-list/viewport.service';

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
    protected beforeSize: number;
    protected afterSize: number;
    protected vpItems: IDejaViewPortItem[];
    protected vpStartIndex: number;
    protected vpEndIndex: number;
    protected startOffset: number;  // Buttons mode only
    @HostBinding('attr.hasUpBtn') protected hasUpButton = false;
    @HostBinding('attr.hasDownBtn') protected hasDownButton = false;
    @HostBinding('attr.horizontal') protected _isHorizontal = false;
    @HostBinding('attr.buttons') protected _hasButtons = false;

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
    private buttonsStep = 20;
    private downButton$Sub: Subscription;
    private upButton$Sub: Subscription;
    private mouseWheel$Sub: Subscription;
    private scrollPosition = 0;
    private scroll$Sub: Subscription;

    /** Permet de définir un template d'élément par binding */
    @Input() public itemTemplateExternal;

    @ContentChild('itemTemplate') private itemTemplateInternal;

    @ViewChild('down')
    private set downButton(element: ElementRef) {
        this.downButton$.next((element && element.nativeElement) || null);
    }

    @ViewChild('up')
    private set upButton(element: ElementRef) {
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
        const scrollingStyle = typeof value === 'string' ? DejaViewPortScrollStyle[value] : value;
        this._hasButtons = scrollingStyle === DejaViewPortScrollStyle.buttons;
    }

    /** Set the direction of the items rendering
     * vertical: The item are displayed vertically
     * horizontal: The item are displayed horizontally
     */
    @Input()
    public set direction(value: ViewportDirection | string) {
        const direction = typeof value === 'string' ? ViewportDirection[value] : value;
        this.viewPort.direction$.next(direction);
        this._isHorizontal = direction === ViewportDirection.horizontal;
        this.changeDetectorRef.markForCheck();
    }

    /** Set the item size in fixed mode or the default item size before rendering in auto mode */
    @Input()
    public set itemSize(value: number | string) {
        if (value) {
            this.viewPort.itemsSize$.next(+value);
        }
    }

    public get itemSize() {
        return this.viewPort.itemsSize;
    }

    @ViewChild('wrapper')
    private set wrapperElement(element: ElementRef) {
        this.element = element.nativeElement as HTMLElement;
        this.viewPort.element$.next(this.element);
        this.scroll$Sub = Observable.fromEvent(this.element, 'scroll')
            .takeWhile(() => this.isAlive)
            .map((event: Event) => event.target as HTMLElement)
            .map((target) => Math.round(this._isHorizontal ? target.scrollLeft : target.scrollTop))
            .subscribe((scrollPos) => {
                this.viewPort.scrollPosition$.next(scrollPos);
            });
    }

    private get itemTemplate() { return this.itemTemplateExternal || this.itemTemplateInternal; }

    private get clientSize() {
        if (!this.element) {
            return 0;
        }
        return this._isHorizontal ? this.element.clientWidth : this.element.clientHeight;
    }

    private set scrollPos(value: number) {
        const scrollPos = Math.max(value, 0);
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
        Observable.fromEvent(window, 'resize')
            .takeWhile(() => this.isAlive)
            .debounceTime(5)
            .subscribe(() => {
                this.viewPort.deleteSizeCache();
                this.viewPort.refresh();
                this.changeDetectorRef.markForCheck();
            });

        viewPort.viewPort$
            .takeWhile(() => this.isAlive)
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
                    const listItems = this.element ? this.element.getElementsByClassName('listitem') : [];
                    const rebind = listItems.length !== viewPortResult.visibleItems.length;
                    if (!rebind) {
                        scroll(viewPortResult);
                    } else {
                        this.changeDetectorRef.markForCheck();
                        Observable.timer(1)
                            .first()
                            .subscribe(() => scroll(viewPortResult));
                    }
                } else {
                    this.changeDetectorRef.markForCheck();
                }
            });

        Observable.from(this.downButton$)
            .takeWhile(() => this.isAlive)
            .subscribe((downButton) => {
                if (downButton) {
                    if (!this.mouseWheel$Sub) {
                        this.mouseWheel$Sub = Observable
                            .fromEvent(this.element, 'mousewheel')
                            .subscribe((event: MouseWheelEvent) => {
                                this.scrollPos = this.scrollPos + event.deltaY;
                            });
                    }
                } else if (this.mouseWheel$Sub) {
                    this.mouseWheel$Sub.unsubscribe();
                    delete this.mouseWheel$Sub;
                    this.scrollPos = 0;
                }
            });

        const downButton$ = Observable.from(this.downButton$)
            .takeWhile(() => this.isAlive)
            .map((downButton) => {
                if (downButton) {
                    if (!this.downButton$Sub) {
                        const mousedown$ = Observable.fromEvent(downButton, 'mousedown');

                        const mouseup$ = Observable.merge(
                            Observable.fromEvent(downButton, 'mouseup'),
                            Observable.fromEvent(downButton, 'mouseleave'));

                        this.downButton$Sub = mousedown$.subscribe((event: MouseEvent) => {
                            mouseup$.first()
                                .subscribe((upEvent: MouseEvent) => {
                                    this.scrollPos += upEvent.ctrlKey ? this.clientSize : this.buttonsStep;
                                });

                            Observable.timer(750)
                                .takeUntil(mouseup$)
                                .subscribe(() => {
                                    Observable.interval(50)
                                        .takeUntil(mouseup$)
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
            });

        const upButton$ = Observable.from(this.upButton$)
            .takeWhile(() => this.isAlive)
            .map((upButton) => {
                if (upButton) {
                    if (!this.upButton$Sub) {
                        const mousedown$ = Observable.fromEvent(upButton, 'mousedown');

                        const mouseup$ = Observable.merge(
                            Observable.fromEvent(upButton, 'mouseup'),
                            Observable.fromEvent(upButton, 'mouseleave'));

                        this.upButton$Sub = mousedown$.subscribe((event: MouseEvent) => {
                            mouseup$
                                .first()
                                .subscribe((upEvent: MouseEvent) => {
                                    this.scrollPos -= upEvent.ctrlKey ? this.clientSize : this.buttonsStep;
                                });

                            Observable.timer(750)
                                .takeUntil(mouseup$)
                                .subscribe(() => {
                                    Observable.interval(50)
                                        .takeUntil(mouseup$)
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
            });

        Observable.merge(downButton$, upButton$)
            .delay(10)
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

    protected getCssSize(item: IViewPortItem) {
        const itemSize = this.getItemSize(item);
        return itemSize ? `${itemSize}px` : 'auto';
    }

    protected getItemSize(item: IViewPortItem) {
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
