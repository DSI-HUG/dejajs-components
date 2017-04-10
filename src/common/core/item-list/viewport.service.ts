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

// TODO Ensure visible
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
    private items: IViewPortItem[];
    private viewPort: IViewPort;

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

        const calcFixedSizeViewPort$ = (items: IViewPortItem[], containerSize: number, scrollPos: number, itemDefaultSize: number): Observable<IViewPort> => {
            let maxCount = Math.ceil(containerSize / itemDefaultSize);
            const startRow = Math.floor(scrollPos / itemDefaultSize);

            if (maxCount) {
                maxCount++;
            }

            const rowsCount = Math.min(items.length - startRow, maxCount);
            let startIndex: number;
            let endIndex: number;

            if (rowsCount < 0) {
                endIndex = items.length - 1;
                startIndex = endIndex - Math.min(items.length, maxCount) + 1;
            } else {
                startIndex = startRow;
                endIndex = startIndex + rowsCount - 1;
            }

            return Observable.of({
                beforeSize: startIndex * itemDefaultSize,
                afterSize: (items.length - 1 - endIndex) * itemDefaultSize,
                listSize: containerSize,
                viewPortSize: items.length * itemDefaultSize,
                visibleItems: items.slice(startIndex, 1 + endIndex),
                startIndex: startIndex, endIndex: endIndex,
                scrollPos: scrollPos,
                items: items,
            } as IViewPort);
        };

        const calcVariableSizeViewPort$ = (items: IViewPortItem[], containerSize: number, scrollPos: number, itemDefaultSize: number): Observable<IViewPort> => {
            const visibleList = [] as IViewPortItem[];
            let startIndex: number;
            let endIndex = 0;
            let beforeSize = 0;
            let visibleListSize = 0;
            let afterSize = 0;

            items.forEach((item: IViewPortItem, index: number) => {
                const itemSize = (item.size && item.size > ViewPortService.itemDefaultSize) ? item.size : itemDefaultSize;
                if (beforeSize + itemSize < scrollPos && startIndex === undefined) {
                    beforeSize += itemSize;
                } else if (visibleListSize + beforeSize < containerSize + scrollPos) {
                    if (startIndex === undefined) {
                        startIndex = index;
                    }
                    endIndex = index;
                    visibleListSize += itemSize;
                    visibleList.push(item);
                } else {
                    afterSize += itemSize;
                }
            });

            return Observable.of({
                beforeSize: beforeSize,
                afterSize: afterSize,
                listSize: containerSize,
                viewPortSize: visibleListSize,
                visibleItems: visibleList,
                startIndex: startIndex || 0,
                endIndex: endIndex,
                scrollPos: scrollPos,
                items: items,
            } as IViewPort);
        };

        const calcAutoSizeViewPort$ = (items: IViewPortItem[], containerSize: number, scrollPos: number, element: HTMLElement, itemDefaultSize: number): Observable<IViewPort> => {
            const visibleList = [] as IViewPortItem[];
            let vpSize = 0;
            let startIndex = 0;
            let endIndex = 0;
            let overflow = false;
            let averageSize = 0;
            let averageCount = 0;
            let beforeSize = 0;
            let afterSize = 0;
            let calculationRequired = false;
            items.forEach((item, index) => {
                let itemSize = item.size || 0;
                if (itemSize > ViewPortService.itemDefaultSize) {
                    averageSize += itemSize;
                    ++averageCount;
                } else if (averageCount > 0) {
                    itemSize = Math.round(averageSize / averageCount);
                } else {
                    itemSize = itemDefaultSize;
                }

                if (vpSize === 0 && beforeSize + itemSize < scrollPos) {
                    beforeSize += itemSize;
                } else if (!overflow) {
                    if (visibleList.length === 0) {
                        startIndex = index;
                    }
                    if (!item.size) {
                        calculationRequired = true;
                    }
                    endIndex = index;
                    vpSize += itemSize;
                    visibleList.push(item);
                    if (beforeSize + vpSize > scrollPos + containerSize) {
                        overflow = true;
                    }
                } else {
                    afterSize += itemSize;
                }
            });

            const viewPort = {
                beforeSize: beforeSize,
                afterSize: afterSize,
                listSize: containerSize,
                viewPortSize: vpSize,
                visibleItems: visibleList,
                startIndex: startIndex,
                endIndex: endIndex,
                scrollPos: scrollPos,
                items: items,
            } as IViewPort;


            if (!calculationRequired) {
                return Observable.of(viewPort);
            } else {
                // Measure items size
                this.viewPortResult$.next(viewPort);
                return Observable.timer(1).switchMap(() => {
                    const elements = element.getElementsByClassName('listitem');
                    for (let i = 0; i < elements.length; i++) {
                        const itemElement = elements[i] as HTMLElement;
                        const index = +itemElement.getAttribute('flat');
                        const item = visibleList[index - startIndex];
                        if (item) {
                            item.size = clientSize(itemElement);
                        }
                    };
                    return calcAutoSizeViewPort$(items, containerSize, scrollPos, element, itemDefaultSize);
                });
            }
        };

        const calcDisabledViewPort$ = (items: IViewPortItem[], containerSize: number, scrollPos: number, element: HTMLElement, ensureParams: IEnsureParams): Observable<IViewPort> => {
            let viewPortSize = 0;
            let startIndex: number;
            let endIndex: number;
            let newScrollPos: number;
            const elements = element.getElementsByClassName('listitem');
            if (!ensureParams || !ensureParams.item || !ensureParams.atEnd) {
                for (let i = 0; i < elements.length; i++) {
                    const itemElement = elements[i] as HTMLElement;
                    const itemSize = clientSize(itemElement);
                    const item = items[i];

                    if (ensureParams && ensureParams.item === item) {
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
                newScrollPos = 0;
                let listSize = 0;
                let i = elements.length;
                while (--i >= 0) {
                    const itemElement = elements[i] as HTMLElement;
                    const itemSize = clientSize(itemElement);
                    const item = items[i];

                    if (ensureParams.item === item) {
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
                            return calcVariableSizeViewPort$(items, listSize, scrollPos, itemDefaultSize);
                        case ViewportMode.auto:
                            return calcAutoSizeViewPort$(items, listSize, scrollPos, element, itemDefaultSize);
                        case ViewportMode.fixed:
                            return calcFixedSizeViewPort$(items, listSize, scrollPos, itemDefaultSize);
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
                            item: items[items.length - 1],
                            atEnd: true,
                        } as IEnsureParams);
                    } else {
                        // Return calculated viewport
                        return Observable.of(viewPort);
                    }
                })
                .do(() => ensureParams.item = undefined);
        };

        // Ensure item visible by index or instance
        const ensureParams$ = Observable.from(this.ensureItem$)
            .map((ensureItem) => {
                if (ensureItem === undefined || ensureItem === null || !this.items || !this.items.length || !this.viewPort) {
                    return {};
                }

                let ensureIndex = ensureItem as number;
                let item: IViewPortItem;
                if (isNaN(ensureIndex)) {
                    item = ensureItem;
                    ensureIndex = this.items.findIndex((itm) => item === itm);
                } else {
                    item = this.items[ensureIndex];
                }

                if (ensureIndex >= 0) {
                    if (ensureIndex <= this.viewPort.startIndex) {
                        return {
                            item: item,
                            atEnd: false,
                        } as IEnsureParams;
                    } else if (ensureIndex >= this.viewPort.endIndex) {
                        return {
                            item: item,
                            atEnd: true,
                        } as IEnsureParams;
                    }
                }

                return {};
            });

        const maxSize$ = Observable.from(this.maxSize$).distinctUntilChanged();
        const refresh$ = Observable.from(this.refresh$)
            .do(() => this.lastCalculatedSize = undefined);

        const scrollPos$ = Observable.from(this.scrollPosition$)
            .map((scrollPos) => this._scrollPosition = scrollPos || 0)
            .map((scrollPos) => Math.max(scrollPos, 0))
            .distinctUntilChanged();

        const mode$ = Observable.from(this.mode$)
            .map((mode) => {
                this._mode = typeof mode === 'string' ? ViewportMode[mode] : mode;
                return this._mode;
            })
            .distinctUntilChanged();

        const direction$ = Observable.from(this.direction$)
            .map((direction) => {
                this._direction = typeof direction === 'string' ? ViewportDirection[direction] : direction;
                return this._direction;
            })
            .distinctUntilChanged();

        const itemsSize$ = Observable.from(this.itemsSize$)
            .distinctUntilChanged()
            .do((value) => this._itemsSize = value);

        // Reset items size when direction change in auto mode
        Observable.zip(direction$, Observable.combineLatest(this.items$, mode$))
            .filter(([_direction, [items, mode]]) => items && items.length && mode === ViewportMode.auto)
            .switchMap(([_direction, [items]]) => items)
            .subscribe((item) => {
                item.size = undefined;
            });

        // Calc view port observable
        Observable.combineLatest(this.items$, maxSize$, scrollPos$, this.element$, itemsSize$, ensureParams$, direction$.delay(1), mode$, refresh$)
            .switchMap(([items, maxSize, scrollPos, element, itemDefaultSize, ensureParams]: [IViewPortItem[], number, number, HTMLElement, number, IEnsureParams]) => {
                this.items = items;
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
                this.viewPort = viewPort;
                this.viewPortResult$.next(viewPort);
            }, ((error) => {
                console.log(error);
                debugger;
            }));
    }

    public clear() {
        this.viewPortResult$.next(this.emptyViewPort);
    }

    public refresh() {
        this.refresh$.next(true);
    }
}

interface IEnsureParams {
    item: IViewPortItem;
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
