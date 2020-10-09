/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, from, Observable, of, ReplaySubject, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Destroy } from '../destroy/destroy';

export type ViewportMode = 'disabled' | 'fixed' | 'variable' | 'auto';

export type ViewportDirection = 'vertical' | 'horizontal';

/** Service de gestion du viewport d'une liste.
 * Ce service permet la gestion du viewport verticalement ou horizontalement.
 */
@Injectable()
export class ViewPortService extends Destroy {
    public static itemDefaultSize = 40;

    public viewPort$: Observable<IViewPort>;

    public emptyViewPort = {
        beforeSize: 0,
        afterSize: 0,
        viewPortSize: 0,
        listSize: 0,
        visibleItems: [],
        startIndex: 0,
        endIndex: 0,
        scrollPos: 0,
        items: []
    } as IViewPort;

    public mode$ = new BehaviorSubject<ViewportMode>('fixed');
    public items$ = new BehaviorSubject<IViewPortItem[]>([]);
    public maxSize$ = new BehaviorSubject<number | string>(0);
    public ensureItem$ = new BehaviorSubject<IViewPortItem | number>(null);
    public scrollPosition$ = new BehaviorSubject<number>(0);
    public element$ = new ReplaySubject<HTMLElement>(1);
    public itemsSize$ = new BehaviorSubject<number>(0);
    public direction$ = new BehaviorSubject<ViewportDirection>('vertical');
    public ensureParams$: Observable<IEnsureParams>;
    public viewPortResult$ = new BehaviorSubject<IViewPort>(this.emptyViewPort);

    private refresh$ = new BehaviorSubject<IViewPortRefreshParams>(null);
    private deleteSizeCache$ = new BehaviorSubject<boolean>(true);
    private lastCalculatedSize: number;

    private measureViewPort = {
        beforeSize: 0,
        afterSize: 200000,
        viewPortSize: 0,
        listSize: 0,
        visibleItems: [],
        startIndex: 0,
        endIndex: 0,
        scrollPos: undefined, // Do not change the scroll pos in case of refresh is called when the list is scrolling (I.E. dynamic content loading)
        items: []
    } as IViewPort;

    private _mode: ViewportMode = 'fixed';
    private _itemsSize = ViewPortService.itemDefaultSize;
    private _direction: ViewportDirection = 'vertical';
    private _scrollPosition = 0;
    private viewPort: IViewPort;
    private ignoreScrollCount = 0;

    public get mode() {
        return this._mode;
    }

    public get itemsSize() {
        return this._itemsSize;
    }

    public get direction() {
        return this._direction;
    }

    public constructor() {
        super();

        this.viewPort$ = from(this.viewPortResult$);

        // const consoleLog = (_message: string) => {
        //     // console.log(_message);
        // };

        const innerSize = () => this._direction === 'horizontal' ? window.innerWidth : window.innerHeight;

        const clientSize = (element: HTMLElement) => Math.ceil(this._direction === 'horizontal' ? element.clientWidth : element.clientHeight);

        const calcFixedSizeViewPort$ = (items: IViewPortItem[], containerSize: number, scrollPos: number, itemDefaultSize: number, ensureParams: IEnsureParams): Observable<IViewPort> => {
            // consoleLog(`calcFixedSizeViewPort`);
            const maxCount = Math.ceil(containerSize / itemDefaultSize) + 1;
            const startRow = Math.floor(scrollPos / itemDefaultSize);

            const rowsCount = Math.min(items.length - startRow, maxCount);
            let startIndex: number;
            let endIndex: number;
            let newScrollPos: number;
            if (!ensureParams || ensureParams.index === undefined || !ensureParams.atEnd) {
                if (rowsCount < 0) {
                    endIndex = items.length - 1;
                    startIndex = endIndex + 1 - Math.min(items.length, maxCount);
                } else if (ensureParams.index !== undefined) {
                    startIndex = ensureParams.index;
                    endIndex = startIndex + rowsCount - 1;
                    newScrollPos = startIndex * itemDefaultSize;
                } else {
                    startIndex = startRow;
                    endIndex = startIndex + rowsCount - 1;
                }
            } else {
                // Ensure visible from the end
                startIndex = Math.max(0, ensureParams.index + 1 - Math.min(items.length, maxCount));
                endIndex = Math.max(ensureParams.index, rowsCount - 1);
                newScrollPos = (endIndex + 1) * itemDefaultSize - containerSize;
            }

            const visibleItems = items.slice(startIndex, endIndex + 1);

            return of({
                beforeSize: startIndex * itemDefaultSize,
                afterSize: (items.length - endIndex - 1) * itemDefaultSize,
                listSize: containerSize,
                viewPortSize: visibleItems.length * itemDefaultSize,
                visibleItems: visibleItems,
                startIndex: startIndex,
                endIndex: endIndex,
                scrollPos: newScrollPos,
                items: items
            } as IViewPort);
        };

        const calcVariableSizeViewPort$ = (items: IViewPortItem[], containerSize: number, scrollPos: number, itemDefaultSize: number, ensureParams: IEnsureParams): Observable<IViewPort> => {
            // consoleLog(`calcVariableSizeViewPort`);
            const visibleList = [] as IViewPortItem[];
            let startIndex: number;
            let endIndex: number;
            let beforeSize = 0;
            let viewPortSize = 0;
            let afterSize = 0;
            let newScrollPos: number;

            if (!ensureParams || ensureParams.index === undefined || !ensureParams.atEnd) {
                items.forEach((item: IViewPortItem, index: number) => {
                    const itemSize = item.size || itemDefaultSize;

                    if (ensureParams && ensureParams.index === index) {
                        startIndex = index;
                        newScrollPos = beforeSize;
                    }

                    if (startIndex === undefined) {
                        if (beforeSize + itemSize >= scrollPos) {
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
                        if ((beforeSize + viewPortSize > (newScrollPos || scrollPos) + containerSize) || index === items.length - 1) {
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
                    const itemSize = item.size || itemDefaultSize;

                    if (ensureParams.index === index) {
                        endIndex = index;
                    }

                    if (endIndex !== undefined) {
                        if (startIndex === undefined) {
                            viewPortSize += itemSize;
                            visibleList.unshift(item);

                            if (viewPortSize > containerSize || index === 0) {
                                startIndex = index;
                                newScrollPos = viewPortSize - containerSize;
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

            if (ensureParams?.index !== undefined && viewPortSize < containerSize && visibleList.length < items.length) {
                if (ensureParams.atEnd) {
                    return calcVariableSizeViewPort$(items, containerSize, scrollPos, itemDefaultSize, {
                        index: 0,
                        atEnd: false
                    } as IEnsureParams);
                } else {
                    return calcVariableSizeViewPort$(items, containerSize, scrollPos, itemDefaultSize, {
                        index: items.length - 1,
                        atEnd: true
                    } as IEnsureParams);
                }
            }

            return of({
                beforeSize: beforeSize,
                afterSize: afterSize,
                listSize: containerSize,
                viewPortSize: viewPortSize,
                visibleItems: visibleList,
                startIndex: startIndex || 0,
                endIndex: endIndex,
                scrollPos: newScrollPos,
                items: items
            } as IViewPort);
        };

        const calcAutoSizeViewPort$ = (items: IViewPortItem[], containerSize: number, scrollPos: number, element: HTMLElement, itemDefaultSize: number, ensureParams: IEnsureParams, isCalculation?: boolean): Observable<IViewPort> =>
            // consoleLog(`calcAutoSizeViewPort`);
            calcVariableSizeViewPort$(items, containerSize, scrollPos, itemDefaultSize, ensureParams).pipe(
                switchMap((viewPort: IViewPort) => {
                    const calculationRequired = !isCalculation && viewPort.visibleItems.find(item => !item.size);

                    if (!calculationRequired) {
                        return of(viewPort);
                    } else {
                        // Measure items size
                        this.viewPortResult$.next(viewPort);
                        return timer(1).pipe(
                            tap(() => {
                                const elements = element.getElementsByClassName('listitem');
                                // eslint-disable-next-line @typescript-eslint/prefer-for-of, no-loops/no-loops
                                for (let i = 0; i < elements.length; i++) {
                                    const itemElement = elements[i] as HTMLElement;
                                    const index = +itemElement.getAttribute('flat');
                                    const item = viewPort.visibleItems[index - viewPort.startIndex];
                                    if (item) {
                                        item.size = clientSize(itemElement);
                                    }
                                }
                                // Recalc Viewport size
                                viewPort.viewPortSize = viewPort.visibleItems.reduce((size, item) => size += item.size || itemDefaultSize, 0);
                            }),
                            switchMap(() => calcVariableSizeViewPort$(items, containerSize, viewPort.scrollPos || scrollPos, itemDefaultSize, ensureParams)));
                    }
                }));
        const calcDisabledViewPort$ = (items: IViewPortItem[], containerSize: number, scrollPos: number, element: HTMLElement, ensureParams: IEnsureParams, bindIfAny: boolean): Observable<IViewPort> => {
            let viewPortSize = 0;
            let startIndex: number;
            let endIndex: number;
            let newScrollPos: number;
            const elements = element.getElementsByClassName('listitem');

            let viewPort = {
                beforeSize: 0,
                afterSize: 0,
                listSize: containerSize,
                viewPortSize: 0,
                visibleItems: [],
                startIndex: 0,
                endIndex: 0,
                scrollPos: 0,
                items: items
            } as IViewPort;

            if (elements.length !== items.length && bindIfAny !== false) {
                this.viewPortResult$.next(viewPort);
                return timer(1).pipe(
                    switchMap(() => calcDisabledViewPort$(items, containerSize, scrollPos, element, ensureParams, false)));
            }

            if (!ensureParams || ensureParams.index === undefined || !ensureParams.atEnd) {
                // eslint-disable-next-line no-loops/no-loops
                for (let i = 0; i < elements.length; i++) {
                    const itemElement = elements[i] as HTMLElement;
                    const itemSize = items[i].size = clientSize(itemElement);

                    if (ensureParams && ensureParams.index === i) {
                        startIndex = i;
                        newScrollPos = viewPortSize;
                    }

                    viewPortSize += itemSize;

                    if (startIndex === undefined && viewPortSize > scrollPos) {
                        startIndex = i;
                    }

                    if (endIndex === undefined && viewPortSize > (newScrollPos || scrollPos) + containerSize) {
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
                    const itemSize = items[i].size = clientSize(itemElement);

                    if (ensureParams.index === i) {
                        endIndex = i;
                    }

                    if (endIndex !== undefined) {
                        if (startIndex === undefined) {
                            listSize += itemSize;
                            if (listSize > containerSize) {
                                startIndex = i;
                                newScrollPos = listSize - containerSize;
                            }
                        } else {
                            newScrollPos += itemSize;
                        }
                    }

                    viewPortSize += itemSize;
                }
            }

            startIndex = startIndex || 0;
            endIndex = endIndex || 0;
            // consoleLog(`viewPortSize ${viewPortSize}`);
            viewPort = {
                beforeSize: 0,
                afterSize: 0,
                listSize: containerSize,
                viewPortSize: viewPortSize,
                visibleItems: items.slice(startIndex, 1 + endIndex),
                startIndex: startIndex,
                endIndex: endIndex,
                scrollPos: newScrollPos,
                items: items
            } as IViewPort;

            return of(viewPort);
        };

        const calcViewPort$ = (items: IViewPortItem[], maxSize: number, scrollPos: number, element: HTMLElement, itemDefaultSize: number, ensureParams: IEnsureParams, fromMeasure?: boolean): Observable<IViewPort> => {
            // consoleLog(`calcViewPort`);
            if (!items?.length) {
                return of(this.emptyViewPort);
            }

            let listSize = maxSize || clientSize(element);
            if (listSize <= ViewPortService.itemDefaultSize) {
                listSize = innerSize();
            }

            if (ensureParams.index !== undefined) {
                this.ignoreScrollCount++;
            } else {
                this.ignoreScrollCount = 0;
            }

            let viewPort$: Observable<IViewPort>;
            switch (this.mode) {
                case 'disabled':
                    viewPort$ = calcDisabledViewPort$(items, listSize, scrollPos, element, ensureParams, true);
                    break;
                case 'variable':
                    viewPort$ = calcVariableSizeViewPort$(items, listSize, scrollPos, itemDefaultSize, ensureParams);
                    break;
                case 'auto':
                    viewPort$ = calcAutoSizeViewPort$(items, listSize, scrollPos, element, itemDefaultSize, ensureParams);
                    break;
                case 'fixed':
                    viewPort$ = calcFixedSizeViewPort$(items, listSize, scrollPos, itemDefaultSize, ensureParams);
                    break;
                default:
                    throw new Error('ViewPortService, invalide mode. The value can be disabled, variable, auto and fixed.');
            }

            return viewPort$.pipe(
                switchMap(viewPort => {
                    if (!fromMeasure) {
                        const endScrollPos = viewPort.beforeSize + viewPort.viewPortSize + viewPort.afterSize - viewPort.listSize;
                        if (this.mode !== 'disabled' && listSize < 2 * ViewPortService.itemDefaultSize) {
                            // Measure again container and recalc viewport
                            this.viewPortResult$.next(this.measureViewPort);
                            return timer(1).pipe(switchMap(() => calcViewPort$(items, maxSize, scrollPos, element, itemDefaultSize, ensureParams, true)));
                        } else if (endScrollPos < 0 || (items.length && endScrollPos > 0 && (viewPort.scrollPos || scrollPos) > endScrollPos)) {
                            // Scroll position is over the last item
                            // Ensure last item visible and recalc viewport
                            return calcViewPort$(items, maxSize, 0, element, itemDefaultSize, {
                                index: items.length - 1,
                                atEnd: true
                            } as IEnsureParams, true);
                        } else if (this.mode === 'auto' && viewPort.viewPortSize < listSize) {
                            // Rendered viewport is to small, render again to complete
                            return calcViewPort$(items, maxSize, 0, element, itemDefaultSize, {
                                index: items.length - 1,
                                atEnd: true
                            } as IEnsureParams, true);
                        }
                    }

                    // Return calculated viewport
                    return of(viewPort);
                }),
                tap(() => {
                    // consoleLog(`clear ensureParams ${ensureParams?.index}`);
                    ensureParams.index = undefined;
                })
            );
        };

        const items$ = from(this.items$);
        // .do(() => consoleLog('items'));

        // Ensure item visible by index or instance
        this.ensureParams$ = combineLatest([this.ensureItem$, items$]).pipe(
            map(([ensureItem, items]) => {
                this.ignoreScrollCount = 0;
                const ensureParams = {} as IEnsureParams;
                if (ensureItem !== undefined && ensureItem !== null && items?.length) {
                    let ensureIndex = ensureItem as number;
                    if (isNaN(ensureIndex)) {
                        ensureIndex = items.findIndex(itm => ensureItem === itm);
                    }

                    if (ensureIndex >= 0) {
                        if (this.viewPort && ensureIndex <= this.viewPort.startIndex) {
                            ensureParams.index = ensureIndex;
                            ensureParams.atEnd = false;
                        } else if (!this.viewPort || ensureIndex >= this.viewPort.endIndex) {
                            ensureParams.index = ensureIndex;
                            ensureParams.atEnd = true;
                        }
                    }
                }

                return ensureParams;
            }));
        // .do((ensureParams) => consoleLog(`ensureParams index:${ensureParams && ensureParams.index} atEnd:${ensureParams && ensureParams.atEnd}`));

        const maxSize$ = from(this.maxSize$).pipe(
            distinctUntilChanged()
        );
        // .do((value) => consoleLog(`maxSize ${value}`));

        const refresh$ = from(this.refresh$).pipe(
            switchMap((params: IViewPortRefreshParams) => {
                this.ignoreScrollCount = 0;
                if (params) {
                    if (params.clearMeasuredSize) {
                        return from(this.items$).pipe(
                            tap(items => {
                                this.lastCalculatedSize = undefined;
                                items.forEach(item => item.size = undefined);
                            }),
                            map(() => params));
                    }

                    if (params.items) {
                        params.items.forEach(item => item.size = undefined);
                    }
                }
                return of(params);
            }));
        // .do(() => consoleLog('refresh'));

        const scrollPos$ = from(this.scrollPosition$).pipe(
            map(scrollPos => this._scrollPosition = scrollPos || 0),
            map(scrollPos => Math.max(scrollPos, 0)),
            filter(() => {
                if (this.ignoreScrollCount > 0) {
                    this.ignoreScrollCount--;
                    // consoleLog(`ignoreScrollCount ${this.ignoreScrollCount}`);
                    return false;
                } else {
                    return true;
                }
            }),
            distinctUntilChanged());
        // .do((value) => consoleLog(`scrollPos ${value}`));

        const mode$ = from(this.mode$).pipe(
            map(mode => this._mode = mode),
            distinctUntilChanged());
        // .do((value) => consoleLog(`mode ${value}`));

        const direction$ = from(this.direction$).pipe(
            map(direction => this._direction = direction),
            distinctUntilChanged());
        // .do((value) => consoleLog(`direction ${value}`));

        const itemsSize$ = from(this.itemsSize$).pipe(
            distinctUntilChanged(),
            tap(value => this._itemsSize = value));
        // .do((value) => consoleLog(`itemsSize ${value}`));

        const element$ = from(this.element$).pipe(
            tap(element => {
                if (!element) {
                    this.viewPort = undefined;
                    this.ignoreScrollCount = 0;
                    this.lastCalculatedSize = undefined;
                }
            }));
        // .do(() => consoleLog(`element`));

        // Reset items size when direction change in auto mode
        combineLatest([direction$, items$, mode$, this.deleteSizeCache$]).pipe(
            filter(([_direction, items, mode]) => items?.length && mode === 'auto'),
            switchMap(([_direction, items]) => items),
            takeUntil(this.destroyed$)
        ).subscribe(item => item.size = undefined);

        // Calc view port observable
        const cl1$ = combineLatest([element$, items$, refresh$, this.ensureParams$]);
        const cl2$ = combineLatest([direction$, mode$, itemsSize$, maxSize$]);
        const cl3$ = combineLatest([cl1$, cl2$]).pipe(
            debounceTime(1)
        );

        combineLatest([cl3$, scrollPos$]).pipe(
            filter(([[[element]]]) => !!element),
            switchMap(([[[element, items, _refresh, ensureParams], [_direction, _mode, itemDefaultSize, maxSize]], _scrollPos]) => {
                // consoleLog(`combineLatest ${ensureParams && ensureParams.index}`);
                if (!itemDefaultSize) {
                    itemDefaultSize = ViewPortService.itemDefaultSize;
                }
                const listSize = this.lastCalculatedSize || maxSize || clientSize(element);
                const scrollPos = this._scrollPosition;
                let maxSizeValue = maxSize === 'auto' ? 0 : +maxSize;
                if (items?.length && (listSize === 'auto' || listSize < 2 * ViewPortService.itemDefaultSize)) {
                    // Set the viewlist to the maximum height to measure the real max-height defined in the css
                    // Use a blank div to do that
                    // consoleLog(`viewPortResult for measure ${JSON.stringify(this.measureViewPort)}`);
                    this.viewPortResult$.next(this.measureViewPort);
                    // Wait next life cycle for the result
                    return timer(1).pipe(
                        map(() => {
                            // Get mx size from container
                            maxSizeValue = this.lastCalculatedSize = clientSize(element);
                            // Ensure that max size is not more than the items size
                            if (this.mode === 'fixed') {
                                if (items.length * itemDefaultSize < maxSizeValue) {
                                    maxSizeValue = items.length * itemDefaultSize;
                                }
                            } else if (this.mode === 'variable') {
                                let maxItemsSize = 0;
                                items.find(item => {
                                    maxItemsSize += item.size || itemDefaultSize;
                                    return maxItemsSize > maxSizeValue;
                                });
                                if (maxItemsSize < maxSizeValue) {
                                    maxSizeValue = maxItemsSize;
                                }
                            }

                            return { element, scrollPos, items, maxSizeValue, itemDefaultSize, ensureParams };
                        }));
                } else {
                    maxSizeValue = maxSizeValue || this.lastCalculatedSize;
                    return of({ element, scrollPos, items, maxSizeValue, itemDefaultSize, ensureParams });
                }
            }),
            switchMap(({ element, scrollPos, items, maxSizeValue, itemDefaultSize, ensureParams }) =>
                // consoleLog(`calcViewPort ${ensureParams && ensureParams.index}`);
                calcViewPort$(items, maxSizeValue, scrollPos, element, itemDefaultSize, ensureParams)
            ),
            takeUntil(this.destroyed$)
        ).subscribe(viewPort => {
            // consoleLog(`viewPortResult final ${JSON.stringify(viewPort)}`);
            this.viewPortResult$.next(viewPort);
        }, (error => console.error(error)));

        // Cache last calculated viewport
        from(this.viewPortResult$).pipe(
            takeUntil(this.destroyed$)
        ).subscribe(viewPort => this.viewPort = viewPort);
    }

    public deleteSizeCache() {
        this.deleteSizeCache$.next(true);
    }

    public clear() {
        this.viewPortResult$.next(this.emptyViewPort);
    }

    public refresh(params?: IViewPortRefreshParams) {
        this.refresh$.next(params || null);
    }
}

export interface IEnsureParams {
    index: number;
    atEnd: boolean;
}

export interface IViewPort {
    beforeSize: number;
    afterSize: number;
    visibleItems: IViewPortItem[];
    startIndex: number;
    endIndex: number;
    viewPortSize: number;
    listSize: number;
    scrollPos: number;
    items: IViewPortItem[];
}

export interface IViewPortItem {
    size?: number;
}

export interface IViewPortRefreshParams {
    items: IViewPortItem[];
    clearMeasuredSize: boolean;
}
