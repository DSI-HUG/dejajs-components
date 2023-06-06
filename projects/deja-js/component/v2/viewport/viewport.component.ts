/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { BehaviorSubject, combineLatestWith, debounceTime, distinctUntilChanged, filter, from, fromEvent, interval, map, mergeMap, mergeWith, Observable, Subject, switchMap, takeUntil, tap, timer, withLatestFrom } from 'rxjs';

import { ViewPort, ViewPortDirection, ViewPortItem, ViewPortMode, ViewPortService } from './viewport.service';

export type ViewPortScrollStyleType = 'scrollbar' | 'buttons';

export class ViewPortItemClassEvent<T> {
    public item: ViewPortItem<T>;
    public classes: Array<string>;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ViewPortService],
    selector: 'viewport',
    styleUrls: ['./viewport.component.scss'],
    templateUrl: './viewport.component.html'
})
export class ViewPortComponent<T> extends Destroy {
    @HostBinding('attr.buttons') public hasButtons: boolean = null;
    @HostBinding('attr.horizontal') public isHorizontal: boolean = null;

    /** Permet de définir un template d'élément par binding */
    @Input() public viewPortItemTemplateExternal: TemplateRef<unknown>;

    @Output() public readonly itemClass = new EventEmitter<ViewPortItemClassEvent<T>>();

    @ContentChild('viewPortItemTemplate') private viewPortItemTemplateInternal: TemplateRef<unknown>;

    public hasUpButton: boolean = null;
    public hasDownButton: boolean = null;
    public buttons$ = new Subject<QueryList<ElementRef<HTMLElement>>>();
    public viewPort$: Observable<ViewPort<T>>;
    public viewPortElementSize$ = new Subject<{ size: number }>();

    private _buttonsStep: NumberInput;
    private reloadViewPort$ = new BehaviorSubject<void>(null);

    @Input()
    public set buttonsStep(value: NumberInput) {
        this._buttonsStep = coerceNumberProperty(value);
    }

    public get buttonsStep(): NumberInput {
        return this._buttonsStep || 20;
    }

    /** Set the list of models to render inside the viewport control */
    @Input()
    public set models(models: ReadonlyArray<T>) {
        this.items = models ? models.map(model => ({
            model: model
        } as ViewPortItem<T>)) : [];
    }

    /** Set the list of items to render inside the viewport control */
    @Input()
    public set items(items: ReadonlyArray<ViewPortItem<T>>) {
        this.viewPortService.items$.next(items);
    }

    /** Set the scrolling style
      * scrollbar: Classic scrollbars
      * buttons: A button before is placed at the top or at the left of the list, and a button after is placed at the right or the bottom of the list.
      */
    @Input()
    public set scrollingStyle(value: ViewPortScrollStyleType) {
        this.hasButtons = value === 'buttons';
        this.viewPortService.refresh();
    }

    /** Set the direction of the items rendering
     * vertical: The item are displayed vertically
     * horizontal: The item are displayed horizontally
     */
    @Input()
    public set direction(value: ViewPortDirection) {
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
        this.viewPortService.element$.next(element.nativeElement);
    }

    @ViewChildren('button')
    protected set buttons(buttons: QueryList<ElementRef<HTMLElement>>) {
        this.buttons$.next(buttons);
    }

    public get viewPortItemTemplate(): TemplateRef<unknown> {
        return this.viewPortItemTemplateExternal || this.viewPortItemTemplateInternal;
    }

    public set scrollPos(value: number) {
        const scrollPosition = Math.max(coerceNumberProperty(value), 0);
        this.viewPortService.scrollPosition$.next(scrollPosition);
    }

    /**
     * Définit la méthode de calcul de la taille des éléments. Les valuers acceptées sont
     * disabled: Tous les éléments sont rendus. (< 100 éléments)
     * fixed: Seul les éléments visibles sont rendus. La taille des éléments est constante et définie par itemsSize. (performances ++)
     * variable: Seul les éléments visibles sont rendus. La taille des éléments est variable et définie par item.size. (performances +-)
     * auto: Seul les éléments visibles sont rendus. La taille des éléments est calculée automatiquement (performances --)
    */
    @Input()
    public set viewPortMode(mode: ViewPortMode) {
        this.viewPortService.mode$.next(mode);
    }

    @Input()
    public set debugMode(value: BooleanInput) {
        this.viewPortService.debug = coerceBooleanProperty(value);
    }

    public constructor(
        public viewPortService: ViewPortService<T>
    ) {
        super();

        this.viewPort$ = viewPortService.viewPort$.pipe(
            combineLatestWith(this.reloadViewPort$),
            map(([viewPort]) => ({ ...viewPort }))
        );

        viewPortService.element$.pipe(
            distinctUntilChanged(),
            switchMap(element => fromEvent<Event>(element, 'scroll').pipe(
                distinctUntilChanged(),
                withLatestFrom(viewPortService.direction$),
                map(([_, direction]) => Math.round(direction === 'horizontal' ? element.scrollLeft : element.scrollTop))
            )),
            takeUntil(this.destroyed$)
        ).subscribe(scrollPosition => {
            this.viewPortService.scrollPosition$.next(scrollPosition);
        });

        viewPortService.element$.pipe(
            distinctUntilChanged(),
            switchMap(element => fromEvent<WheelEvent>(element, 'mousewheel').pipe(
                withLatestFrom(viewPortService.direction$),
                filter(([_, direction]) => direction === 'horizontal' || this.hasButtons),
                tap(([event, direction]) => {
                    event.stopPropagation();
                    event.preventDefault();
                    if (direction === 'horizontal') {
                        element.scroll({ left: element.scrollLeft + event.deltaY, top: 0 });
                    } else {
                        element.scroll({ left: 0, top: element.scrollTop + event.deltaY });
                    }
                })
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
                    viewPort.element.scrollLeft = viewPort.targetScrollPos ?? viewPort.scrollPosition;
                } else {
                    viewPort.element.scrollTop = viewPort.targetScrollPos ?? viewPort.scrollPosition;
                }

                this.viewPortElementSize$.next({ size: viewPort.direction === 'horizontal' ? viewPort.element.clientWidth : viewPort.element.clientHeight });
            }
        });

        this.viewPortElementSize$.pipe(
            debounceTime(1),
            distinctUntilChanged(),
            withLatestFrom(viewPortService.direction$, viewPortService.element$),
            takeUntil(this.destroyed$)
        ).subscribe(([viewPortElementSize, direction, element]) => {
            const newElementSize = direction === 'horizontal' ? element.clientWidth : element.clientHeight;
            if (viewPortElementSize.size > 0 && newElementSize > viewPortElementSize.size) {
                console.log('ViewPort element size to small, refresh view port');
                this.viewPortService.refresh();
            }
            viewPortElementSize.size = newElementSize;
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

                const scroll = (event: MouseEvent, sign: number): void => {
                    const delta = sign * (event.ctrlKey ? clientSize : +this.buttonsStep * 2);
                    if (this.isHorizontal) {
                        viewPortElement.scroll({ left: viewPortElement.scrollLeft + delta, top: 0 });
                    } else {
                        viewPortElement.scroll({ left: 0, top: viewPortElement.scrollTop + delta });
                    }
                };

                return from(buttons).pipe(
                    mergeMap(button => {
                        const sign = button.id === 'down' ? 1 : -1;

                        const autoScroll$ = (event: MouseEvent): Observable<number> => {
                            const mouseup$ = fromEvent<MouseEvent>(buttons[0], 'mouseup').pipe(
                                mergeWith(fromEvent<MouseEvent>(buttons[0], 'mouseleave'), fromEvent<MouseEvent>(buttons[1], 'mouseup'), fromEvent<MouseEvent>(buttons[1], 'mouseleave'))
                            );
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
    public refreshViewPort(clearMeasuredSize?: boolean): void {
        this.viewPortService.refresh(clearMeasuredSize);
    }

    /** Rebind le viewport */
    public reloadViewPort(): void {
        this.reloadViewPort$.next();
    }

    /** Efface le viewport */
    public clearViewPort(): void {
        this.viewPortService.clear();
    }

    public ensureVisible(item: number | ViewPortItem<T>): void {
        this.viewPortService.ensureItem$.next(item);
    }

    public getCssSize(item: ViewPortItem<T>, defaultItemSize: number, mode: ViewPortMode): string {
        const itemSize = this.getItemSize(item, defaultItemSize, mode);
        return itemSize ? `${itemSize}px` : 'auto';
    }

    public getItemSize(item: ViewPortItem<T>, defaultItemSize: number, mode: ViewPortMode): NumberInput {
        if (mode === 'disabled') {
            return null;
        } else if (mode === 'fixed') {
            return defaultItemSize;
        } else if (mode === 'auto') {
            return item.size || null;
        } else {
            return (item.size && item.size > 40) ? item.size : defaultItemSize;
        }
    }

    public getItemClassName(item: ViewPortItem<T>): string {
        const classes = ['listitem'];
        if (this.itemClass.observed) {
            this.itemClass.next({
                item,
                classes
            } as ViewPortItemClassEvent<T>);
        }
        return classes.join(' ');
    }
}
