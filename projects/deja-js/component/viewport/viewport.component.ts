/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { ContentChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HostBinding } from '@angular/core';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Destroy } from '@deja-js/core';
import { IViewPort } from '@deja-js/core';
import { IViewPortItem } from '@deja-js/core';
import { IViewPortRefreshParams } from '@deja-js/core';
import { ViewportDirection } from '@deja-js/core';
import { ViewportMode } from '@deja-js/core';
import { ViewPortService } from '@deja-js/core';
import { BehaviorSubject, from, fromEvent, interval, merge, Observable, of, Subject, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

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
    @Input() public itemTemplateExternal: unknown;

    @ContentChild('itemTemplate') private itemTemplateInternal: unknown;

    public beforeSize: number;
    public afterSize: number;
    public vpItems: IDejaViewPortItem[];
    public vpStartIndex: number;
    public vpEndIndex: number;
    public startOffset: number; // Buttons mode only

    public get hasButtons() {
        return this._hasButtons;
    }

    public get isHorizontal() {
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

    public get buttonsStep() {
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
    public set direction(value: ViewportDirection) {
        this.viewPort.direction$.next(value);
        this._isHorizontal = value === 'horizontal';
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
        fromEvent(this.element, 'scroll').pipe(
            map(event => event.target as HTMLElement),
            map(target => Math.round(this._isHorizontal ? target.scrollLeft : target.scrollTop)),
            takeUntil(this.destroyed$)
        ).subscribe(scrollPos => this.viewPort.scrollPosition$.next(scrollPos));
    }

    public get itemTemplate() {
        return this.itemTemplateExternal || this.itemTemplateInternal;
    }

    public get clientSize() {
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

    public get scrollPos() {
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
    public set viewportMode(mode: ViewportMode) {
        this.viewPort.mode$.next(mode);
    }

    public get viewportMode() {
        return this.viewPort.mode;
    }

    public constructor(private changeDetectorRef: ChangeDetectorRef, private viewPort: ViewPortService) {
        super();

        fromEvent(window, 'resize').pipe(
            debounceTime(5),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.viewPort.deleteSizeCache();
            this.viewPort.refresh();
            this.changeDetectorRef.markForCheck();
        });

        const scroll = (vp: IViewPort) => {
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

        const mouseWheel$ = () => {
            const mouseWheelEvent$ = fromEvent(this.element, 'mousewheel') as Observable<MouseWheelEvent>;
            return mouseWheelEvent$.pipe(
                map(event => {
                    event.stopPropagation();
                    event.preventDefault();
                    return this.scrollPos + event.deltaY;
                })
            );
        };

        const downButton$ = from(this.downButton$).pipe(
            distinctUntilChanged()
        );

        const upButton$ = from(this.upButton$).pipe(
            distinctUntilChanged()
        );

        downButton$.pipe(
            switchMap(downButton => downButton ? mouseWheel$() : of(0)),
            takeUntil(this.destroyed$)
        ).subscribe(scrollPos => this.scrollPos = scrollPos);

        const autoScroll$ = (event: MouseEvent, sign: number) => timer(750).pipe(
            switchMap(() => interval(50)),
            tap(() => this.scrollPos += sign * (event.ctrlKey ? this.clientSize : this.buttonsStep * 2))
        );

        const initButton$ = (button: HTMLElement) => {
            const sign = button.id === 'down' ? 1 : -1;
            const mouseUpEvent$ = fromEvent(button, 'mouseup') as Observable<MouseEvent>;
            const mouseLeaveEvent$ = fromEvent(button, 'mouseleave') as Observable<MouseEvent>;
            const mouseup$ = merge(mouseUpEvent$, mouseLeaveEvent$).pipe(
                tap(upEvent => this.scrollPos += sign * (upEvent.ctrlKey ? this.clientSize : this.buttonsStep))
            );

            const mouseDownEvent$ = fromEvent(button, 'mousedown') as Observable<MouseEvent>;
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

        merge(downButton$, upButton$).pipe(
            debounceTime(10),
            filter(needToRefresh => !!needToRefresh),
            takeUntil(this.destroyed$)
        ).subscribe(() => this.viewPort.refresh());
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

    public ensureVisible(item: unknown) {
        this.viewPort.ensureItem$.next(item);
    }

    public getCssSize(item: IViewPortItem) {
        const itemSize = this.getItemSize(item);
        return itemSize ? `${itemSize}px` : 'auto';
    }

    public getItemSize(item: IViewPortItem) {
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
