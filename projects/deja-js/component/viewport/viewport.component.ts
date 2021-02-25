/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, HostBinding, Input, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Destroy, IViewPortItem, IViewPortRefreshParams, ViewportDirection, ViewportMode, ViewPortService } from '@deja-js/component/core';
import { from, fromEvent, interval, merge, Subject, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mergeMap, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

export type DejaViewPortScrollStyleType = 'scrollbar' | 'buttons';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ViewPortService],
    selector: 'deja-viewport',
    styleUrls: ['./viewport.component.scss'],
    templateUrl: './viewport.component.html'
})
export class DejaViewPortComponent<T> extends Destroy {
    @HostBinding('attr.buttons') public hasButtons: boolean = null;
    @HostBinding('attr.horizontal') public isHorizontal: boolean = null;

    /** Permet de définir un template d'élément par binding */
    @Input() public itemTemplateExternal: TemplateRef<T>;

    @ContentChild('itemTemplate') private itemTemplateInternal: TemplateRef<T>;

    public vpItems: IViewPortItem<T>[];
    public hasUpButton: boolean = null;
    public hasDownButton: boolean = null;
    public destroyElement$ = new Subject<void>();
    public buttons$ = new Subject<QueryList<ElementRef<HTMLElement>>>();

    private _buttonsStep: NumberInput;

    @Input()
    public set buttonsStep(value: NumberInput) {
        this._buttonsStep = coerceNumberProperty(value);
    }

    public get buttonsStep(): NumberInput {
        return this._buttonsStep || 20;
    }

    /** Set the list of models to render inside the viewport control */
    @Input()
    public set models(models: T[]) {
        this.items = models ? models.map(model => ({
            model: model
        } as IViewPortItem<T>)) : [];
    }

    /** Set the list of items to render inside the viewport control */
    @Input()
    public set items(items: IViewPortItem<T>[]) {
        this.viewPortService.items$.next(items);
    }

    /** Set the scrolling style
      * scrollbar: Classic scrollbars
      * buttons: A button before is placed at the top or at the left of the list, and a button after is placed at the right or the bottom of the list.
      */
    @Input()
    public set scrollingStyle(value: DejaViewPortScrollStyleType) {
        this.hasButtons = value === 'buttons';
        this.viewPortService.refresh();
    }

    /** Set the direction of the items rendering
     * vertical: The item are displayed vertically
     * horizontal: The item are displayed horizontally
     */
    @Input()
    public set direction(value: ViewportDirection) {
        this.isHorizontal = value === 'horizontal';
        this.viewPortService.direction$.next(value);
    }

    /** Set the item size in fixed mode or the default item size before rendering in auto mode */
    @Input()
    public set itemSize(value: NumberInput) {
        if (value) {
            const itemSize = coerceNumberProperty(value);
            this.viewPortService.itemsSize$.next(itemSize);
        }
    }

    @ViewChild('wrapper')
    protected set wrapperElement(element: ElementRef<HTMLElement>) {
        this.destroyElement$.next();
        this.viewPortService.element$.next(element.nativeElement);
    }

    @ViewChildren('button')
    protected set buttons(buttons: QueryList<ElementRef<HTMLElement>>) {
        this.buttons$.next(buttons);
    }

    public get itemTemplate(): TemplateRef<T> {
        return this.itemTemplateExternal || this.itemTemplateInternal;
    }

    public set scrollPos(value: number) {
        const scrollPos = Math.max(coerceNumberProperty(value), 0);
        this.viewPortService.scrollPosition$.next(scrollPos);
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
        this.viewPortService.mode$.next(mode);
    }

    public constructor(
        public viewPortService: ViewPortService<T>
    ) {
        super();

        viewPortService.element$.pipe(
            switchMap(element => fromEvent(element, 'scroll').pipe(
                withLatestFrom(viewPortService.direction$),
                map(([_, direction]) => Math.round(direction === 'horizontal' ? element.scrollLeft : element.scrollTop)),
                takeUntil(this.destroyElement$)
            )),
            takeUntil(this.destroyed$)
        ).subscribe(scrollPosition => {
            this.viewPortService.scrollPosition$.next(scrollPosition);
        });

        viewPortService.element$.pipe(
            switchMap(element => fromEvent<WheelEvent>(element, 'mousewheel').pipe(
                withLatestFrom(viewPortService.direction$),
                filter(([_, direction]) => this.hasButtons || direction === 'horizontal'),
                tap(([event, direction]) => {
                    event.stopPropagation();
                    event.preventDefault();
                    if (direction === 'horizontal') {
                        element.scroll({ top: 0, left: element.scrollLeft + event.deltaY });
                    } else {
                        element.scroll({ top: element.scrollTop + event.deltaY, left: 0 });
                    }
                }),
                takeUntil(this.destroyElement$)
            )),
            takeUntil(this.destroyed$)
        ).subscribe();

        viewPortService.viewPort$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe(viewPort => {
            this.hasUpButton = this.hasButtons && viewPort.mode === 'disabled' ? viewPort.scrollPosition > 0 : viewPort.beforeSize > 0;
            this.hasDownButton = this.hasButtons && viewPort.mode === 'disabled' ? viewPort.scrollPosition < viewPort.viewPortSize - viewPort.listSize : viewPort.afterSize > 0;

            if (viewPort?.element) {
                if (viewPort.direction === 'horizontal') {
                    viewPort.element.scrollLeft = viewPort.targetScrollPos || viewPort.scrollPosition;
                } else {
                    viewPort.element.scrollTop = viewPort.targetScrollPos || viewPort.scrollPosition;
                }
            }
        });

        const buttons$ = this.buttons$.pipe(
            debounceTime(100),
            map(buttons => buttons.map(button => button.nativeElement)),
            distinctUntilChanged((b1, b2) => b1?.length === b2?.length)
        );

        const destroyButtons$ = buttons$.pipe(
            filter(buttons => buttons.length === 0)
        );

        buttons$.pipe(
            filter(buttons => buttons.length === 2),
            withLatestFrom(viewPortService.element$),
            switchMap(([buttons, viewPortElement]) => {
                const clientSize = this.isHorizontal ? viewPortElement.clientWidth : viewPortElement.clientHeight;

                const scroll = (event: MouseEvent, sign: number) => {
                    const delta = sign * (event.ctrlKey ? clientSize : +this.buttonsStep * 2);
                    if (this.isHorizontal) {
                        viewPortElement.scroll({ top: 0, left: viewPortElement.scrollLeft + delta });
                    } else {
                        viewPortElement.scroll({ top: viewPortElement.scrollTop + delta, left: 0 });
                    }
                };

                return from(buttons).pipe(
                    mergeMap(button => {
                        const sign = button.id === 'down' ? 1 : -1;

                        const autoScroll$ = (event: MouseEvent) => {
                            const mouseup$ = merge(fromEvent<MouseEvent>(buttons[0], 'mouseup'), fromEvent<MouseEvent>(buttons[0], 'mouseleave'), fromEvent<MouseEvent>(buttons[1], 'mouseup'), fromEvent<MouseEvent>(buttons[1], 'mouseleave'));
                            return timer(750).pipe(
                                mergeMap(() => interval(50)),
                                tap(() => scroll(event, sign)),
                                takeUntil(mouseup$)
                            );
                        };

                        return fromEvent<MouseEvent>(button, 'mousedown').pipe(
                            switchMap(event => {
                                scroll(event, sign);
                                return autoScroll$(event);
                            }),
                            takeUntil(destroyButtons$)
                        );
                    })
                );
            }),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    /** Recalcule le viewport. */
    public refreshViewPort(item?: IViewPortItem<T>, clearMeasuredSize?: boolean): void {
        const refreshParams = {
            items: item ? [item] : undefined,
            clearMeasuredSize
        } as IViewPortRefreshParams<T>;
        this.viewPortService.refresh(refreshParams);
    }

    public ensureVisible(item: number | IViewPortItem<T>): void {
        this.viewPortService.ensureItem$.next(item);
    }

    public getCssSize(item: IViewPortItem<T>): string {
        const itemSize = this.getItemSize(item);
        return itemSize ? `${itemSize}px` : 'auto';
    }

    public getItemSize(item: IViewPortItem<T>): NumberInput {
        if (this.viewportMode === 'disabled') {
            return null;
        } else if (this.viewportMode === 'fixed') {
            return this.itemSize;
        } else if (this.viewportMode === 'auto') {
            return item.size || null;
        } else {
            return (item.size && item.size > 40) ? item.size : this.itemSize;
        }
    }
}
