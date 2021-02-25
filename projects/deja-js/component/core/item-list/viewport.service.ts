/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, fromEvent, merge, Observable, of, ReplaySubject, Subject, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, shareReplay, startWith, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';

export type ViewportMode = 'disabled' | 'fixed' | 'variable' | 'auto';

export type ViewportDirection = 'vertical' | 'horizontal';

export type ViewPortMaxSize = number | 'auto';

/** Service de gestion du viewport d'une liste.
 * Ce service permet la gestion du viewport verticalement ou horizontalement.
 */
@Injectable()
export class ViewPortService<T> {
    public viewPort$: Observable<IViewPort<T>>;

    public emptyViewPort = {
        beforeSize: 0,
        afterSize: 0,
        viewPortSize: 0,
        listSize: 0,
        visibleItems: [],
        startIndex: 0,
        endIndex: 0,
        targetScrollPos: 0,
        items: []
    } as IViewPort<T>;

    public mode$ = new BehaviorSubject<ViewportMode>('fixed');
    public items$ = new BehaviorSubject<IViewPortItem<T>[]>([]);
    public maxSize$ = new BehaviorSubject<ViewPortMaxSize>(0);
    public ensureItem$ = new Subject<IViewPortItem<T> | number>();
    public scrollPosition$ = new BehaviorSubject<number>(0);
    public element$ = new ReplaySubject<HTMLElement>(1);
    public itemsSize$ = new BehaviorSubject<number>(40);
    public direction$ = new BehaviorSubject<ViewportDirection>('vertical');

    private refresh$ = new BehaviorSubject<IViewPortRefreshParams<T>>(null);
    private deleteSizeCache$ = new BehaviorSubject<void>(undefined);
    private clear$ = new Subject<IViewPort<T>>();
    private lastCalculatedSize: number;

    private measureViewPort = {
        beforeSize: 0,
        afterSize: 200000,
        viewPortSize: 0,
        listSize: 0,
        visibleItems: [],
        startIndex: 0,
        endIndex: 0,
        targetScrollPos: undefined, // Do not change the scroll pos in case of refresh is called when the list is scrolling (I.E. dynamic content loading)
        items: []
    } as IViewPort<T>;

    public constructor() {

        console.log('ViewPortService constructor');

        const element$ = this.element$.pipe(
            distinctUntilChanged()
        );

        const maxSize$ = this.maxSize$.pipe(
            distinctUntilChanged()
        );

        const dir$ = this.direction$.pipe(
            distinctUntilChanged()
        );

        const mode$ = this.mode$.pipe(
            distinctUntilChanged()
        );

        const deleteSizeCache$ = () => combineLatest([this.items$, mode$]).pipe(
            take(1),
            tap(([items, mode]) => {
                if (items?.length && mode === 'auto') {
                    items.forEach(item => item.size = undefined);
                }
            })
        );

        const direction$ = combineLatest([dir$, this.deleteSizeCache$]).pipe(
            switchMap(([direction]) =>
                // Reset items size when direction change in auto mode
                deleteSizeCache$().pipe(
                    map(() => direction)
                )
            )
        );

        const itemsSize$ = this.itemsSize$.pipe(
            distinctUntilChanged()
        );

        const innerSize = (direction: ViewportDirection) => direction === 'horizontal' ? window.innerWidth : window.innerHeight;

        const clientSize = (element: HTMLElement, direction: ViewportDirection) => Math.ceil(direction === 'horizontal' ? element.clientWidth : element.clientHeight);

        const calcFixedSizeViewPort$ = (params: IViewPortParams, items: IViewPortItem<T>[], scrollPosition: number, containerSize: ViewPortMaxSize): Observable<IViewPort<T>> => {
            // consoleLog(`calcFixedSizeViewPort`);
            const maxCount = Math.ceil(+containerSize / params.itemsSize) + 1;
            const startRow = Math.floor(scrollPosition / params.itemsSize);

            const rowsCount = Math.min(items.length - startRow, maxCount);
            let startIndex: number;
            let endIndex: number;
            let newScrollPos: number;
            if (!params.ensureParams || params.ensureParams.index === undefined || !params.ensureParams.atEnd) {
                if (rowsCount < 0) {
                    endIndex = items.length - 1;
                    startIndex = endIndex + 1 - Math.min(items.length, maxCount);
                } else if (params.ensureParams?.index !== undefined) {
                    startIndex = params.ensureParams.index;
                    endIndex = startIndex + rowsCount - 1;
                    newScrollPos = startIndex * params.itemsSize;
                } else {
                    startIndex = startRow;
                    endIndex = startIndex + rowsCount - 1;
                }
            } else {
                // Ensure visible from the end
                startIndex = Math.max(0, params.ensureParams.index + 1 - Math.min(items.length, maxCount));
                endIndex = Math.max(params.ensureParams.index, rowsCount - 1);
                newScrollPos = (endIndex + 1) * params.itemsSize - +containerSize;
            }

            const visibleItems = items.slice(startIndex, endIndex + 1);

            return of({
                beforeSize: startIndex * params.itemsSize,
                afterSize: (items.length - endIndex - 1) * params.itemsSize,
                listSize: containerSize,
                viewPortSize: visibleItems.length * params.itemsSize,
                visibleItems: visibleItems,
                startIndex: startIndex,
                endIndex: endIndex,
                targetScrollPos: newScrollPos,
                items
            } as IViewPort<T>);
        };

        const calcVariableSizeViewPort$ = (params: IViewPortParams, items: IViewPortItem<T>[], scrollPosition: number, containerSize: ViewPortMaxSize): Observable<IViewPort<T>> => {
            // consoleLog(`calcVariableSizeViewPort`);
            const visibleList = [] as IViewPortItem<T>[];
            let startIndex: number;
            let endIndex: number;
            let beforeSize = 0;
            let viewPortSize = 0;
            let afterSize = 0;
            let newScrollPos: number;

            if (!params.ensureParams || params.ensureParams.index === undefined || !params.ensureParams.atEnd) {
                items.forEach((item: IViewPortItem<T>, index: number) => {
                    const itemSize = item.size || params.itemsSize;

                    if (params.ensureParams && params.ensureParams.index === index) {
                        startIndex = index;
                        newScrollPos = beforeSize;
                    }

                    if (startIndex === undefined) {
                        if (beforeSize + itemSize >= scrollPosition) {
                            startIndex = index;
                        } else {
                            beforeSize += itemSize;
                        }
                    }

                    if (startIndex !== undefined && endIndex === undefined) {
                        viewPortSize += itemSize;
                        visibleList.push(item);
                    }

                    if (endIndex === undefined) {
                        if ((beforeSize + viewPortSize > (newScrollPos || scrollPosition) + +containerSize) || index === items.length - 1) {
                            endIndex = index;
                        }
                    } else {
                        afterSize += itemSize;
                    }
                });
            } else {
                // Ensure visible from the end
                let index = items.length;
                // eslint-disable-next-line no-loops/no-loops
                while (--index >= 0) {
                    const item = items[index];
                    const itemSize = item.size || params.itemsSize;

                    if (params.ensureParams.index === index) {
                        endIndex = index;
                    }

                    if (endIndex !== undefined) {
                        if (startIndex === undefined) {
                            viewPortSize += itemSize;
                            visibleList.unshift(item);

                            if (viewPortSize > +containerSize || index === 0) {
                                startIndex = index;
                                newScrollPos = viewPortSize - +containerSize;
                            }
                        } else {
                            newScrollPos += itemSize;
                            beforeSize += itemSize;
                        }
                    } else {
                        afterSize += itemSize;
                    }
                }
            }

            if (params.ensureParams?.index !== undefined && viewPortSize < containerSize && visibleList.length < items.length) {
                params.ensureParams = {
                    index: params.ensureParams.atEnd ? 0 : items.length - 1,
                    atEnd: !params.ensureParams.atEnd
                } as IEnsureParams;
                return calcVariableSizeViewPort$(params, items, scrollPosition, containerSize);
            }

            return of({
                beforeSize: beforeSize,
                afterSize: afterSize,
                listSize: containerSize,
                viewPortSize: viewPortSize,
                visibleItems: visibleList,
                startIndex: startIndex || 0,
                endIndex: endIndex || items.length,
                targetScrollPos: newScrollPos,
                items
            } as IViewPort<T>);
        };

        const calcAutoSizeViewPort$ = (params: IViewPortParams, items: IViewPortItem<T>[], scrollPosition: number, containerSize: ViewPortMaxSize, isCalculation?: boolean): Observable<IViewPort<T>> =>
            // consoleLog(`calcAutoSizeViewPort`);
            calcVariableSizeViewPort$(params, items, scrollPosition, containerSize).pipe(
                switchMap(viewPort => {
                    const calculationRequired = !isCalculation && viewPort.visibleItems.find(item => !item.size);

                    if (!calculationRequired) {
                        return of(viewPort);
                    } else {
                        // Measure items size
                        return merge(of(viewPort), timer(1).pipe(
                            tap(() => {
                                const elements = params.element.getElementsByClassName('listitem');
                                // eslint-disable-next-line @typescript-eslint/prefer-for-of, no-loops/no-loops
                                for (let i = 0; i < elements.length; i++) {
                                    const itemElement = elements[i] as HTMLElement;
                                    const index = +itemElement.getAttribute('flat');
                                    const item = viewPort.visibleItems[index - viewPort.startIndex];
                                    if (item) {
                                        item.size = clientSize(itemElement, params.direction);
                                    }
                                }
                                // Recalc Viewport size
                                viewPort.viewPortSize = viewPort.visibleItems.reduce((size, item) => size += item.size || params.itemsSize, 0);
                            }),
                            switchMap(() => calcVariableSizeViewPort$(params, items, viewPort.targetScrollPos || scrollPosition, containerSize))
                        ));
                    }
                })
            );

        const calcDisabledViewPort$ = (params: IViewPortParams, items: IViewPortItem<T>[], scrollPosition: number, containerSize: ViewPortMaxSize, bindIfAny: boolean): Observable<IViewPort<T>> => {
            let viewPortSize = 0;
            let startIndex: number;
            let endIndex: number;
            let newScrollPos: number;
            const elements = params.element.getElementsByClassName('listitem');

            const viewPort = {
                beforeSize: 0,
                afterSize: 0,
                listSize: containerSize,
                viewPortSize: 0,
                visibleItems: [],
                startIndex: 0,
                endIndex: 0,
                targetScrollPos: 0,
                items: items
            } as IViewPort<T>;

            if (elements.length !== items.length && bindIfAny !== false) {
                return merge(of(viewPort), timer(1).pipe(
                    switchMap(() => calcDisabledViewPort$(params, items, scrollPosition, containerSize, false))
                ));
            }

            if (!params.ensureParams || params.ensureParams.index === undefined || !params.ensureParams.atEnd) {
                // eslint-disable-next-line no-loops/no-loops
                for (let i = 0; i < elements.length; i++) {
                    const itemElement = elements[i] as HTMLElement;
                    const itemSize = items[i].size = clientSize(itemElement, params.direction);

                    if (params.ensureParams && params.ensureParams.index === i) {
                        startIndex = i;
                        newScrollPos = viewPortSize;
                    }

                    viewPortSize += itemSize;

                    if (startIndex === undefined && viewPortSize > scrollPosition) {
                        startIndex = i;
                    }

                    if (endIndex === undefined && viewPortSize > (newScrollPos || scrollPosition) + +containerSize) {
                        endIndex = i;
                    }
                }
            } else {
                // Ensure visible from the end
                newScrollPos = 0;
                let listSize = 0;
                let i = elements.length;
                // eslint-disable-next-line no-loops/no-loops
                while (--i >= 0) {
                    const itemElement = elements[i] as HTMLElement;
                    const itemSize = items[i].size = clientSize(itemElement, params.direction);

                    if (params.ensureParams.index === i) {
                        endIndex = i;
                    }

                    if (endIndex !== undefined) {
                        if (startIndex === undefined) {
                            listSize += itemSize;
                            if (listSize > +containerSize) {
                                startIndex = i;
                                newScrollPos = listSize - +containerSize;
                            }
                        } else {
                            newScrollPos += itemSize;
                        }
                    }

                    viewPortSize += itemSize;
                }
            }

            startIndex = startIndex || 0;
            endIndex = endIndex || items.length - 1;
            // consoleLog(`viewPortSize ${viewPortSize}`);
            return of({
                beforeSize: 0,
                afterSize: 0,
                listSize: containerSize,
                viewPortSize: viewPortSize,
                visibleItems: items.slice(startIndex, 1 + endIndex),
                startIndex: startIndex,
                endIndex: endIndex,
                targetScrollPos: newScrollPos,
                items
            } as IViewPort<T>);
        };

        const calcViewPort$ = (params: IViewPortParams, items: IViewPortItem<T>[], scrollPosition: number, fromMeasure?: boolean): Observable<IViewPort<T>> => {
            // consoleLog(`calcViewPort`);
            if (!items?.length) {
                return of(this.emptyViewPort);
            }

            let listSize = params.maxSize || clientSize(params.element, params.direction);
            if (listSize <= 40) {
                listSize = innerSize(params.direction);
            }

            let viewPort$: Observable<IViewPort<T>>;
            switch (params.mode) {
                case 'disabled':
                    viewPort$ = calcDisabledViewPort$(params, items, scrollPosition, listSize, true);
                    break;
                case 'variable':
                    viewPort$ = calcVariableSizeViewPort$(params, items, scrollPosition, listSize);
                    break;
                case 'auto':
                    viewPort$ = calcAutoSizeViewPort$(params, items, scrollPosition, listSize);
                    break;
                case 'fixed':
                    viewPort$ = calcFixedSizeViewPort$(params, items, scrollPosition, listSize);
                    break;
                default:
                    throw new Error('ViewPortService, invalide mode. The value can be disabled, variable, auto and fixed.');
            }

            return viewPort$.pipe(
                switchMap(viewPort => {
                    if (!fromMeasure && viewPort.viewPortSize > 0) {
                        const endScrollPos = viewPort.beforeSize + viewPort.viewPortSize + viewPort.afterSize - viewPort.listSize;
                        if (params.mode !== 'disabled' && listSize < 80) {
                            // Measure again container and recalc viewport
                            return merge(of(this.measureViewPort), timer(1).pipe(
                                switchMap(() => calcViewPort$(params, items, scrollPosition, true))
                            ));
                        } else if (endScrollPos < 0 || (items.length && endScrollPos > 0 && (viewPort.targetScrollPos || scrollPosition) > endScrollPos)) {
                            // Scroll position is over the last item
                            // Ensure last item visible and recalc viewport
                            params.ensureParams = {
                                index: items.length - 1,
                                atEnd: true
                            };
                            return calcViewPort$(params, items, 0, true);
                        } else if (params.mode === 'auto' && viewPort.viewPortSize < listSize) {
                            // Rendered viewport is to small, render again to complete
                            params.ensureParams = {
                                index: items.length - 1,
                                atEnd: true
                            } as IEnsureParams;
                            return calcViewPort$(params, items, 0, true);
                        }
                    }

                    // Return calculated viewport
                    return of(viewPort);
                }),
                tap(() => {
                    if (params.ensureParams) {
                        params.ensureParams.index = undefined;
                    }
                })
            );
        };

        // Ensure item visible by index or instance
        const ensureParams$ = this.ensureItem$.pipe(
            withLatestFrom(this.items$),
            switchMap(([ensureItem, items]) => this.viewPort$.pipe(
                take(1),
                map(viewPort => {
                    const ensureParams = {} as IEnsureParams;
                    if (ensureItem ?? items?.length) {
                        let ensureIndex = ensureItem as number;
                        if (isNaN(ensureIndex)) {
                            ensureIndex = items.findIndex(itm => ensureItem === itm);
                        }

                        if (ensureIndex >= 0) {
                            if (viewPort && ensureIndex <= viewPort.startIndex) {
                                ensureParams.index = ensureIndex;
                                ensureParams.atEnd = false;
                            } else if (!viewPort || ensureIndex >= viewPort.endIndex) {
                                ensureParams.index = ensureIndex;
                                ensureParams.atEnd = true;
                            }
                        }
                    }

                    return ensureParams;
                })
            )),
            startWith(null as IEnsureParams),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        const resize$ = fromEvent(window, 'resize').pipe(
            debounceTime(5),
            switchMap(() => deleteSizeCache$().pipe(
                map(() => undefined as IViewPortRefreshParams<T>)
            ))
        );

        const refresh$ = merge(this.refresh$, resize$).pipe(
            withLatestFrom(this.items$),
            tap(([params, items]) => {
                if (params?.clearMeasuredSize && items?.length) {
                    this.lastCalculatedSize = undefined;
                    items.forEach(item => item.size = undefined);
                }

                if (params?.items) {
                    params.items.forEach(item => item.size = undefined);
                }
            })
        );

        const scrollPosition$ = this.scrollPosition$.pipe(
            distinctUntilChanged()
        );

        // Calc view port observable
        const viewPortParams$ = combineLatest([element$, maxSize$, mode$, direction$, itemsSize$, ensureParams$]).pipe(
            map(([element, maxSize, mode, direction, itemsSize, ensureParams]) => ({ element, maxSize, mode, direction, itemsSize, ensureParams } as IViewPortParams)),
            debounceTime(1)
        );

        // .pipe(tap(_x => {debugger}))
        const viewPort$ = combineLatest([viewPortParams$, this.items$, scrollPosition$, refresh$]).pipe(
            filter(([params]) => !!params.element),
            switchMap(([params, items, scrollPosition]) => {
                // console.log('scrollPosition', scrollPosition);
                const listSize = this.lastCalculatedSize || params.maxSize || clientSize(params.element, params.direction);
                let maxSizeValue = params.maxSize === 'auto' ? 0 : +params.maxSize;
                let vp$: Observable<IViewPort<T>>;
                if (items?.length && (listSize === 'auto' || listSize < 80)) {
                    // Set the viewlist to the maximum height to measure the real max-height defined in the css
                    // Use a blank div to do that
                    vp$ = merge(of(this.measureViewPort), timer(1).pipe(
                        // Wait next life cycle for the result
                        switchMap(() => {
                            // Get max size from container
                            maxSizeValue = this.lastCalculatedSize = clientSize(params.element, params.direction);
                            // Ensure that max size is not more than the items size
                            if (params.mode === 'fixed') {
                                if (items.length * params.itemsSize < maxSizeValue) {
                                    maxSizeValue = items.length * params.itemsSize;
                                }
                            } else if (params.mode === 'variable') {
                                let maxItemsSize = 0;
                                items.find(item => {
                                    maxItemsSize += item.size || params.itemsSize;
                                    return maxItemsSize > maxSizeValue;
                                });
                                if (maxItemsSize < maxSizeValue) {
                                    maxSizeValue = maxItemsSize;
                                }
                            }
                            return calcViewPort$(params, items, scrollPosition);
                        })
                    ));
                } else {
                    vp$ = calcViewPort$(params, items, scrollPosition);
                }

                return vp$.pipe(
                    map(vp => ({ ...vp, ...params, ...{ scrollPosition } }))
                );
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.viewPort$ = merge(viewPort$, this.clear$);
    }

    public deleteSizeCache(): void {
        this.deleteSizeCache$.next();
    }

    public clear(): void {
        this.clear$.next(this.emptyViewPort);
    }

    public refresh(params?: IViewPortRefreshParams<T>): void {
        this.refresh$.next(params || null);
    }
}

interface IViewPortParams {
    element: HTMLElement;
    maxSize: ViewPortMaxSize;
    mode: ViewportMode;
    direction: ViewportDirection;
    itemsSize: number;
    ensureParams: IEnsureParams;
}

export interface IEnsureParams {
    index: number;
    atEnd: boolean;
}

export interface IViewPort<T> extends IViewPortParams {
    beforeSize: number;
    afterSize: number;
    visibleItems: IViewPortItem<T>[];
    startIndex: number;
    endIndex: number;
    viewPortSize: number;
    listSize: number;
    targetScrollPos: number;
    scrollPosition: number;
    items: IViewPortItem<T>[];
}

export interface IViewPortItem<T> {
    size?: number;
    model?: T;
}

export interface IViewPortRefreshParams<T> {
    items: IViewPortItem<T>[];
    clearMeasuredSize: boolean;
}
