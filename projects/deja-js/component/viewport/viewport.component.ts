/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, HostBinding, Input, TemplateRef, ViewChild } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { IViewPort, IViewPortItem, IViewPortRefreshParams, ViewPortService } from '@deja-js/component/core/item-list';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, fromEvent, interval, map, mergeWith, Observable, of, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';

export type DejaViewPortScrollStyleType = 'scrollbar' | 'buttons';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ViewPortService],
    selector: 'deja-viewport',
    styleUrls: ['./viewport.component.scss'],
    templateUrl: './viewport.component.html'
})
export class DejaViewPortComponent extends Destroy {
    @HostBinding('attr.hasUpBtn') public hasUpButton = false;
    @HostBinding('attr.hasDownBtn') public hasDownButton = false;
    @HostBinding('attr.horizontal') public _isHorizontal = false;
    @HostBinding('attr.buttons') public _hasButtons = false;

    /** Permet de définir un template d'élément par binding */
    @Input() public itemTemplateExternal: TemplateRef<unknown>;

    @ContentChild('itemTemplate') private itemTemplateInternal: TemplateRef<unknown>;

    public beforeSize: number;
    public afterSize: number;
    public vpItems: IDejaViewPortItem[];
    public vpStartIndex: number;
    public vpEndIndex: number;
    public startOffset: number; // Buttons mode only

    public get hasButtons(): boolean {
        return this._hasButtons;
    }

    public get isHorizontal(): boolean {
        return this._isHorizontal;
    }

    private _items: IDejaViewPortItem[];
    private element: HTMLElement;
    private downButton$ = new BehaviorSubject<HTMLElement>(null);
    private upButton$ = new Subject<HTMLElement>();
    private scrollPosition = 0;
    private _buttonsStep: number;

    @Input()
    public set buttonsStep(value: number) {
        this._buttonsStep = value;
    }

    public get buttonsStep(): number {
        return this._buttonsStep || 20;
    }

    @ViewChild('down')
    public set downButton(element: ElementRef) {
        this.downButton$.next(element?.nativeElement || null);
    }

    @ViewChild('up')
    public set upButton(element: ElementRef) {
        this.upButton$.next(element?.nativeElement || null);
    }

    /** Set the list of models to render inside the viewport control */
    @Input()
    public set models(models: unknown[]) {
        this.items = models ? models.map(model => ({
            model: model
        } as IDejaViewPortItem)) : [];
    }

    /** Set the list of items to render inside the viewport control */
    @Input()
    public set items(items: IDejaViewPortItem[]) {
        this._items = items || [] as IDejaViewPortItem[];
        if (this.viewPort.mode === 'disabled') {
            this.vpItems = this._items;
        }
        this.viewPort.items$.next(this._items);
    }

    /** Set the scrolling style
      * scrollbar: Classic scrollbars
      * buttons: A button before is placed at the top or at the left of the list, and a button after is placed at the right or the bottom of the list.
      */
    @Input()
    public set scrollingStyle(value: DejaViewPortScrollStyleType) {
        this._hasButtons = value === 'buttons';
    }

    /** Set the direction of the items rendering
     * vertical: The item are displayed vertically
     * horizontal: The item are displayed horizontally
     */
    @Input()
    public set direction(value: string) {
        this.viewPort.direction$.next(value);
        this._isHorizontal = value === 'horizontal';
        this.changeDetectorRef.markForCheck();
    }

    /** Set the item size in fixed mode or the default item size before rendering in auto mode */
    @Input()
    public set itemSize(value: NumberInput) {
        if (value) {
            const size = coerceNumberProperty(value);
            this.viewPort.itemsSize$.next(+value);
            if (!this._buttonsStep) {
                this._buttonsStep = size;
            }
        }
    }

    public get itemSize(): NumberInput {
        return this.viewPort.itemsSize;
    }

    @ViewChild('wrapper', { static: true })
    public set wrapperElement(element: ElementRef) {
        this.element = element.nativeElement as HTMLElement;
        this.viewPort.element$.next(this.element);
        fromEvent<Event>(this.element, 'scroll').pipe(
            map(event => event.target as HTMLElement),
            map(target => Math.round(this._isHorizontal ? target.scrollLeft : target.scrollTop)),
            takeUntil(this.destroyed$)
        ).subscribe(scrollPos => this.viewPort.scrollPosition$.next(scrollPos));
    }

    public get itemTemplate(): TemplateRef<unknown> {
        return this.itemTemplateExternal || this.itemTemplateInternal;
    }

    public get clientSize(): number {
        if (!this.element) {
            return 0;
        }
        return this._isHorizontal ? this.element.clientWidth : this.element.clientHeight;
    }

    public set scrollPos(value: number) {
        const scrollPos = Math.max(coerceNumberProperty(value), 0);
        this.scrollPosition = scrollPos;
        this.viewPort.scrollPosition$.next(scrollPos);
    }

    public get scrollPos(): number {
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
    public set viewportMode(mode: string) {
        this.viewPort.mode$.next(mode);
    }

    public get viewportMode(): string {
        return this.viewPort.mode;
    }

    public constructor(private changeDetectorRef: ChangeDetectorRef, private viewPort: ViewPortService) {
        super();

        console.warn('@deja-js/component/viewport is deprecated, and will be removed in a further version. Please use @deja-js/component/v2/viewport instead.');

        fromEvent<Event>(window, 'resize').pipe(
            debounceTime(5),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.viewPort.deleteSizeCache();
            this.viewPort.refresh();
            this.changeDetectorRef.markForCheck();
        });

        const scroll = (vp: IViewPort): void => {
            if (vp) {
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
            }
            this.changeDetectorRef.markForCheck();
        };

        viewPort.viewPort$.pipe(
            switchMap(viewPortResult => {
                if (viewPort.mode !== 'disabled') {
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

                if (viewPortResult.scrollPos !== undefined) {
                    let length = 0;
                    if (this.element) {
                        const listItems = this.element.getElementsByClassName('listitem');
                        length = listItems.length;
                    }
                    const rebind = length !== viewPortResult.visibleItems.length;
                    if (!rebind) {
                        return of(viewPortResult);
                    } else {
                        this.changeDetectorRef.markForCheck();
                        return timer(1).pipe(
                            map(() => viewPortResult)
                        );
                    }
                } else {
                    return of(null);
                }
            }),
            takeUntil(this.destroyed$)
        ).subscribe(scroll);

        const mouseWheel$ = (): Observable<number> => {
            const mouseWheelEvent$ = fromEvent<WheelEvent>(this.element, 'mousewheel');
            return mouseWheelEvent$.pipe(
                map(event => {
                    event.stopPropagation();
                    event.preventDefault();
                    return this.scrollPos + event.deltaY;
                })
            );
        };

        const downButton$ = this.downButton$.pipe(
            distinctUntilChanged()
        );

        const upButton$ = this.upButton$.pipe(
            distinctUntilChanged()
        );

        downButton$.pipe(
            switchMap(downButton => downButton ? mouseWheel$() : of(0)),
            takeUntil(this.destroyed$)
        ).subscribe(scrollPos => this.scrollPos = scrollPos);

        const autoScroll$ = (event: MouseEvent, sign: number): Observable<number> => timer(750).pipe(
            switchMap(() => interval(50)),
            tap(() => this.scrollPos += sign * (event.ctrlKey ? this.clientSize : this.buttonsStep * 2))
        );

        const initButton$ = (button: HTMLElement): Observable<number> => {
            const sign = button.id === 'down' ? 1 : -1;
            const mouseUpEvent$ = fromEvent<MouseEvent>(button, 'mouseup');
            const mouseLeaveEvent$ = fromEvent<MouseEvent>(button, 'mouseleave');
            const mouseup$ = mouseUpEvent$.pipe(
                mergeWith(mouseLeaveEvent$),
                tap(upEvent => this.scrollPos += sign * (upEvent.ctrlKey ? this.clientSize : this.buttonsStep))
            );

            const mouseDownEvent$ = fromEvent<MouseEvent>(button, 'mousedown');
            return mouseDownEvent$.pipe(
                tap(event => this.scrollPos += sign * (event.ctrlKey ? this.clientSize : this.buttonsStep * 2)),
                switchMap(event => autoScroll$(event, sign).pipe(
                    takeUntil(mouseup$)
                ))
            );
        };

        downButton$.pipe(
            filter(downButton => !!downButton),
            switchMap(initButton$),
            takeUntil(this.destroyed$)
        ).subscribe();

        upButton$.pipe(
            filter(upButton => !!upButton),
            switchMap(initButton$),
            takeUntil(this.destroyed$)
        ).subscribe();

        downButton$.pipe(
            mergeWith(upButton$),
            debounceTime(10),
            filter(needToRefresh => !!needToRefresh),
            takeUntil(this.destroyed$)
        ).subscribe(() => this.viewPort.refresh());
    }

    public refresh(): void {
        this.changeDetectorRef.markForCheck();
    }

    /** Recalcule le viewport. */
    public refreshViewPort(item?: IViewPortItem, clearMeasuredHeight?: boolean): void {
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

    public ensureVisible(item: unknown): void {
        this.viewPort.ensureItem$.next(item);
    }

    public getCssSize(item: IViewPortItem): string {
        const itemSize = this.getItemSize(item);
        return itemSize ? `${itemSize}px` : 'auto';
    }

    public getItemSize(item: IViewPortItem): NumberInput {
        if (this.viewPort.mode === 'disabled') {
            return null;
        } else if (this.viewPort.mode === 'fixed') {
            return this.itemSize;
        } else if (this.viewPort.mode === 'auto') {
            return item.size || null;
        } else {
            return (item.size && item.size > ViewPortService.itemDefaultSize) ? item.size : this.itemSize;
        }
    }
}

export interface IDejaViewPortItem extends IViewPortItem {
    model?: unknown;
}
