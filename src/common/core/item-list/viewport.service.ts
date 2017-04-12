/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

// TODO Key events for ViewportComponent

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs/Rx';
import { IViewPort, IViewPortItem } from './viewport.service';

export enum ViewportMode {
    disabled,
    fixed,
    variable,
    auto,
}

export enum ViewportDirection {
    vertical,
    horizontal,
}

/** Service de gestion du viewport d'une liste.
 * Ce service permet la gestion du viewport verticalement ou horizontalement.
 */
@Injectable()
export class ViewPortService {
    public static itemDefaultSize = 33;

    public viewPort$: Observable<IViewPort>;

    public mode$ = new BehaviorSubject<ViewportMode | string>(ViewportMode.fixed);
    public items$ = new ReplaySubject<IViewPortItem[]>();
    public maxSize$ = new BehaviorSubject<number>(0);
    public ensureItem$ = new BehaviorSubject<IViewPortItem | number>(null);
    public scrollPosition$ = new BehaviorSubject<number>(0);
    public element$ = new ReplaySubject<HTMLElement>();
    public itemsSize$ = new BehaviorSubject<number>(ViewPortService.itemDefaultSize);
    public direction$ = new BehaviorSubject<ViewportDirection | string>(ViewportDirection.vertical);

    private refresh$ = new BehaviorSubject<boolean>(true);
    private lastCalculatedSize: number;

    private emptyViewPort = {
        beforeSize: 0,
        afterSize: 0,
        viewPortSize: 0,
        listSize: 0,
        visibleItems: [],
        startIndex: 0,
        endIndex: 0,
        scrollPos: 0,
        items: [],
    } as IViewPort;

    private measureViewPort = {
        beforeSize: 0,
        afterSize: 200000,
        viewPortSize: 0,
        listSize: 0,
        visibleItems: [],
        startIndex: 0,
        endIndex: 0,
        scrollPos: 0,
        items: [],
    } as IViewPort;

    public viewPortResult$ = new BehaviorSubject<IViewPort>(this.emptyViewPort);

    private _mode: ViewportMode = ViewportMode.fixed;
    private _itemsSize = ViewPortService.itemDefaultSize;
    private _direction = ViewportDirection.vertical;
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

    constructor() {
        this.viewPort$ = Observable.from(this.viewPortResult$);

        const innerSize = () => {
            return this._direction === ViewportDirection.horizontal ? window.innerWidth : window.innerHeight;
        };

        const clientSize = (element: HTMLElement) => {
            return this._direction === ViewportDirection.horizontal ? element.clientWidth : element.clientHeight;
        };

        const calcFixedSizeViewPort$ = (items: IViewPortItem[], containerSize: number, scrollPos: number, itemDefaultSize: number, ensureParams: IEnsureParams): Observable<IViewPort> => {
            const maxCount = Math.ceil(containerSize / itemDefaultSize);
            const startRow = Math.floor(scrollPos / itemDefaultSize);

            const rowsCount = Math.min(items.length - startRow, maxCount);
            let startIndex: number;
            let endIndex: number;
            let newScrollPos: number;
            if (!ensureParams || ensureParams.index === undefined || !ensureParams.atEnd) {
                if (rowsCount < 0) {
                    endIndex = items.length - 1;
                    startIndex = endIndex - Math.min(items.length, maxCount) + 1;
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
                startIndex = Math.max(0, ensureParams.index - Math.min(items.length, maxCount) + 1);
                endIndex = Math.max(ensureParams.index, maxCount);
                newScrollPos = (endIndex + 1) * itemDefaultSize - containerSize;
            }

            const visibleItems = items.slice(startIndex, 1 + endIndex);

            return Observable.of({
                beforeSize: startIndex * itemDefaultSize,
                afterSize: (items.length - 1 - endIndex) * itemDefaultSize,
                listSize: containerSize,
                viewPortSize: visibleItems.length * itemDefaultSize,
                visibleItems: visibleItems,
                startIndex: startIndex,
                endIndex: endIndex,
                scrollPos: newScrollPos,
                items: items,
            } as IViewPort);
        };

        const getVariableAndAutoSizeViewPort = (items: IViewPortItem[], containerSize: number, scrollPos: number, ensureParams: IEnsureParams, getItemSize: (item: IViewPortItem) => number): IViewPort => {
            const visibleList = [] as IViewPortItem[];
            let startIndex: number;
            let endIndex;
            let beforeSize = 0;
            let viewPortSize = 0;
            let afterSize = 0;
            let newScrollPos: number;

            if (!ensureParams || ensureParams.index === undefined || !ensureParams.atEnd) {
                items.forEach((item: IViewPortItem, index: number) => {
                    const itemSize = getItemSize(item);

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
                        if (beforeSize + viewPortSize > (newScrollPos || scrollPos) + containerSize) {
                            endIndex = index;
                        }
                    } else {
                        afterSize += itemSize;
                    }
                });
            } else {
                // Ensure visible from the end
                let index = items.length;
                while (--index >= 0) {
                    const item = items[index];
                    const itemSize = getItemSize(item);

                    if (ensureParams.index === index) {
                        endIndex = index;
                    }

                    if (endIndex !== undefined) {
                        if (startIndex === undefined) {
                            viewPortSize += itemSize;
                            visibleList.unshift(item);

                            if (viewPortSize > containerSize) {
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

            return {
                beforeSize: beforeSize,
                afterSize: afterSize,
                listSize: containerSize,
                viewPortSize: viewPortSize,
                visibleItems: visibleList,
                startIndex: startIndex || 0,
                endIndex: endIndex,
                scrollPos: newScrollPos,
                items: items,
            } as IViewPort;
        };

        const calcVariableSizeViewPort$ = (items: IViewPortItem[], containerSize: number, scrollPos: number, itemDefaultSize: number, ensureParams: IEnsureParams): Observable<IViewPort> => {
            const getItemSize = (item: IViewPortItem) => {
                return (item.size && item.size > ViewPortService.itemDefaultSize) ? item.size : itemDefaultSize;
            };

            const viewPort = getVariableAndAutoSizeViewPort(items, containerSize, scrollPos, ensureParams, getItemSize);
            return Observable.of(viewPort);
        };

        const calcAutoSizeViewPort$ = (items: IViewPortItem[], containerSize: number, scrollPos: number, element: HTMLElement, itemDefaultSize: number, ensureParams: IEnsureParams, isCalculation?: boolean): Observable<IViewPort> => {
            let averageSize = 0;
            let averageCount = 0;

            const getItemSize = (item: IViewPortItem) => {
                let itemSize = item.size || 0;
                if (itemSize > ViewPortService.itemDefaultSize) {
                    averageSize += itemSize;
                    ++averageCount;
                } else if (averageCount > 0) {
                    itemSize = Math.round(averageSize / averageCount);
                } else {
                    itemSize = itemDefaultSize;
                }

                return itemSize;
            };

            const viewPort = getVariableAndAutoSizeViewPort(items, containerSize, scrollPos, ensureParams, getItemSize);

            const calculationRequired = !isCalculation && viewPort.visibleItems.find((item) => !item.size);

            if (ensureParams.index !== undefined) {
                this.ignoreScrollCount++;
            }

            if (!calculationRequired) {
                return Observable.of(viewPort);
            } else {
                // Measure items size
                this.viewPortResult$.next(viewPort);
                return Observable.timer(1)
                    .do(() => {
                        const elements = element.getElementsByClassName('listitem');
                        for (let i = 0; i < elements.length; i++) {
                            const itemElement = elements[i] as HTMLElement;
                            const index = +itemElement.getAttribute('flat');
                            const item = viewPort.visibleItems[index - viewPort.startIndex];
                            if (item) {
                                item.size = clientSize(itemElement);
                            }
                        };
                    })
                    .switchMap(() => calcAutoSizeViewPort$(items, containerSize, viewPort.scrollPos || scrollPos, element, itemDefaultSize, ensureParams, true));
            }
        };

        const calcDisabledViewPort$ = (items: IViewPortItem[], containerSize: number, scrollPos: number, element: HTMLElement, ensureParams: IEnsureParams): Observable<IViewPort> => {
            let viewPortSize = 0;
            let startIndex: number;
            let endIndex: number;
            let newScrollPos: number;
            const elements = element.getElementsByClassName('listitem');
            if (!ensureParams || ensureParams.index === undefined || !ensureParams.atEnd) {
                for (let i = 0; i < elements.length; i++) {
                    const itemElement = elements[i] as HTMLElement;
                    const itemSize = clientSize(itemElement);

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
                while (--i >= 0) {
                    const itemElement = elements[i] as HTMLElement;
                    const itemSize = clientSize(itemElement);

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

            return Observable.of({
                beforeSize: 0,
                afterSize: 0,
                listSize: containerSize,
                viewPortSize: viewPortSize,
                visibleItems: items.slice(startIndex, 1 + endIndex),
                startIndex: startIndex,
                endIndex: endIndex,
                scrollPos: newScrollPos,
                items: items,
            } as IViewPort);
        };

        const calcViewPort$ = (items: IViewPortItem[], maxSize: number, scrollPos, element: HTMLElement, itemDefaultSize: number, ensureParams: IEnsureParams) => {
            let listSize = maxSize || clientSize(element);
            if (listSize <= ViewPortService.itemDefaultSize) {
                listSize = innerSize();
            }

            return Observable.of(this.mode)
                .switchMap((mode) => {
                    switch (mode) {
                        case ViewportMode.disabled:
                            return calcDisabledViewPort$(items, listSize, scrollPos, element, ensureParams);
                        case ViewportMode.variable:
                            return calcVariableSizeViewPort$(items, listSize, scrollPos, itemDefaultSize, ensureParams);
                        case ViewportMode.auto:
                            return calcAutoSizeViewPort$(items, listSize, scrollPos, element, itemDefaultSize, ensureParams);
                        case ViewportMode.fixed:
                            return calcFixedSizeViewPort$(items, listSize, scrollPos, itemDefaultSize, ensureParams);
                        default:
                            throw new Error('ViewPortService, invalide mode.');
                    }
                })
                .switchMap((viewPort: IViewPort) => {
                    const endScrollPos = viewPort.beforeSize + viewPort.viewPortSize + viewPort.afterSize - viewPort.listSize;
                    if (this.mode !== ViewportMode.disabled && listSize < 2 * ViewPortService.itemDefaultSize) {
                        // Measure again container and recalc viewport
                        this.viewPortResult$.next(this.measureViewPort);
                        return Observable.timer(1).switchMap(() => calcViewPort$(items, maxSize, scrollPos, element, itemDefaultSize, ensureParams));
                    } else if (items.length && endScrollPos > 0 && (viewPort.scrollPos || scrollPos) > endScrollPos) {
                        // Scroll position is over the last item
                        // Ensure last item visible and recalc viewport
                        return calcViewPort$(items, maxSize, 0, element, itemDefaultSize, {
                            index: items.length - 1,
                            atEnd: true,
                        } as IEnsureParams);
                    } else {
                        // Return calculated viewport
                        return Observable.of(viewPort);
                    }
                })
                .do(() => ensureParams.index = undefined);
        };

        // Ensure item visible by index or instance
        const ensureParams$ = Observable.combineLatest(this.ensureItem$, this.items$)
            .map(([ensureItem, items]) => {
                const ensureParams = {} as IEnsureParams;
                if (ensureItem !== undefined && ensureItem !== null && items && items.length) {
                    let ensureIndex = ensureItem as number;
                    if (isNaN(ensureIndex)) {
                        ensureIndex = items.findIndex((itm) => ensureItem === itm);
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
            })
            .do(() => console.log('ensureParams'));

        const maxSize$ = Observable.from(this.maxSize$)
            .distinctUntilChanged()
            .do((value) => console.log(`maxSize ${value}`));

        const refresh$ = Observable.from(this.refresh$)
            .do(() => {
                this.ignoreScrollCount = 0;
                this.lastCalculatedSize = undefined;
            })
            .do(() => console.log('refresh'));

        const scrollPos$ = Observable.from(this.scrollPosition$)
            .map((scrollPos) => this._scrollPosition = scrollPos || 0)
            .map((scrollPos) => Math.max(scrollPos, 0))
            .filter(() => {
                if (this.ignoreScrollCount > 0) {
                    this.ignoreScrollCount--;
                    return false;
                } else {
                    return true;
                }
            })
            .distinctUntilChanged()
            .do((value) => console.log(`scrollPos ${value}`));

        const mode$ = Observable.from(this.mode$)
            .map((mode) => {
                this._mode = typeof mode === 'string' ? ViewportMode[mode] : mode;
                return this._mode;
            })
            .distinctUntilChanged()
            .do((value) => console.log(`mode ${value}`));

        const direction$ = Observable.from(this.direction$)
            .map((direction) => {
                this._direction = typeof direction === 'string' ? ViewportDirection[direction] : direction;
                return this._direction;
            })
            .distinctUntilChanged()
            .do((value) => console.log(`direction ${value}`));


        const itemsSize$ = Observable.from(this.itemsSize$)
            .distinctUntilChanged()
            .do((value) => this._itemsSize = value)
            .do((value) => console.log(`itemsSize ${value}`));

        // Reset items size when direction change in auto mode
        Observable.combineLatest(direction$, this.items$, mode$)
            .filter(([_direction, items, mode]) => items && items.length && mode === ViewportMode.auto)
            .switchMap(([_direction, items]) => items)
            .subscribe((item) => {
                item.size = undefined;
            });

        // Calc view port observable
        Observable.combineLatest(this.items$, maxSize$, scrollPos$, this.element$, itemsSize$, ensureParams$, direction$.delay(1), mode$, refresh$)
            .switchMap(([items, maxSize, scrollPos, element, itemDefaultSize, ensureParams]: [IViewPortItem[], number, number, HTMLElement, number, IEnsureParams]) => {
                const listSize = this.lastCalculatedSize || maxSize || clientSize(element);
                if (listSize < 2 * ViewPortService.itemDefaultSize) {
                    // Set the viewlist to the maximum height to measure the real max-height defined in the css
                    // Use a blank div to do that
                    this.viewPortResult$.next(this.measureViewPort);
                    // Wait next life cycle for the result
                    return Observable.timer(1)
                        .do(() => this.lastCalculatedSize = clientSize(element))
                        .map(() => ({ items, maxSize, scrollPos, element, itemDefaultSize, ensureParams }));
                } else {
                    return Observable.of({ items, maxSize, scrollPos, element, itemDefaultSize, ensureParams });
                }
            })
            .switchMap(({ items, maxSize, scrollPos, element, itemDefaultSize, ensureParams }) => calcViewPort$(items, maxSize, scrollPos, element, itemDefaultSize, ensureParams))
            .subscribe((viewPort: IViewPort) => {
                this.viewPortResult$.next(viewPort);
            }, ((error) => {
                console.log(error);
            }));

        // Cache last calculated viewport
        Observable.from(this.viewPortResult$).subscribe((viewPort: IViewPort) => this.viewPort = viewPort);
    }

    public clear() {
        this.viewPortResult$.next(this.emptyViewPort);
    }

    public refresh() {
        this.refresh$.next(true);
    }
}

interface IEnsureParams {
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

export interface IViewPortItem { size?: number; }
