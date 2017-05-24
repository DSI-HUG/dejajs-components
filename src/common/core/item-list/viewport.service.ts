/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
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
    public items$ = new BehaviorSubject<IViewPortItem[]>([]);
    public maxSize$ = new BehaviorSubject<number | string>(0);
    public ensureItem$ = new BehaviorSubject<IViewPortItem | number>(null);
    public scrollPosition$ = new BehaviorSubject<number>(0);
    public element$ = new BehaviorSubject<HTMLElement>(null);
    public itemsSize$ = new BehaviorSubject<number>(0);
    public direction$ = new BehaviorSubject<ViewportDirection | string>(ViewportDirection.vertical);

    private refresh$ = new BehaviorSubject<IViewPortItem>(null);
    private deleteSizeCache$ = new BehaviorSubject<boolean>(true);
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

        const consoleLog = (_message: string) => {
            // console.log(_message);
        };

        const innerSize = () => {
            return this._direction === ViewportDirection.horizontal ? window.innerWidth : window.innerHeight;
        };

        const clientSize = (element: HTMLElement) => {
            const clientRect = element.getBoundingClientRect();
            return Math.ceil(this._direction === ViewportDirection.horizontal ? clientRect.width : clientRect.height);
        };

        const calcFixedSizeViewPort$ = (items: IViewPortItem[], containerSize: number, scrollPos: number, itemDefaultSize: number, ensureParams: IEnsureParams): Observable<IViewPort> => {
            if (!itemDefaultSize) {
                itemDefaultSize = ViewPortService.itemDefaultSize;
            }

            const maxCount = Math.ceil(containerSize / itemDefaultSize);
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
                endIndex = Math.max(ensureParams.index, maxCount - 1);
                newScrollPos = (endIndex + 1) * itemDefaultSize - containerSize;
            }

            const visibleItems = items.slice(startIndex, endIndex + 1);

            return Observable.of({
                beforeSize: startIndex * itemDefaultSize,
                afterSize: (items.length - endIndex - 1) * itemDefaultSize,
                listSize: containerSize,
                viewPortSize: visibleItems.length * itemDefaultSize,
                visibleItems: visibleItems,
                startIndex: startIndex,
                endIndex: endIndex,
                scrollPos: newScrollPos,
                items: items,
            } as IViewPort);
        };

        const calcVariableSizeViewPort$ = (items: IViewPortItem[], containerSize: number, scrollPos: number, itemDefaultSize: number, ensureParams: IEnsureParams): Observable<IViewPort> => {
            if (!itemDefaultSize) {
                itemDefaultSize = ViewPortService.itemDefaultSize;
            }

            const visibleList = [] as IViewPortItem[];
            let startIndex: number;
            let endIndex;
            let beforeSize = 0;
            let viewPortSize = 0;
            let afterSize = 0;
            let newScrollPos: number;

            if (!ensureParams || ensureParams.index === undefined || !ensureParams.atEnd) {
                items.forEach((item: IViewPortItem, index: number) => {
                    const itemSize = (item.size && item.size > ViewPortService.itemDefaultSize) ? item.size : itemDefaultSize;

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
                    const itemSize = (item.size && item.size > ViewPortService.itemDefaultSize) ? item.size : itemDefaultSize;

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

            return Observable.of({
                beforeSize: beforeSize,
                afterSize: afterSize,
                listSize: containerSize,
                viewPortSize: viewPortSize,
                visibleItems: visibleList,
                startIndex: startIndex || 0,
                endIndex: endIndex,
                scrollPos: newScrollPos,
                items: items,
            } as IViewPort);
        };

        const calcAutoSizeViewPort$ = (items: IViewPortItem[], containerSize: number, scrollPos: number, element: HTMLElement, itemDefaultSize: number, ensureParams: IEnsureParams, isCalculation?: boolean): Observable<IViewPort> => {
            return calcVariableSizeViewPort$(items, containerSize, scrollPos, itemDefaultSize || ViewPortService.itemDefaultSize, ensureParams)
                .switchMap((viewPort) => {
                    const calculationRequired = !isCalculation && viewPort.visibleItems.find((item) => !item.size);

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
                            .switchMap(() => calcVariableSizeViewPort$(items, containerSize, viewPort.scrollPos || scrollPos, itemDefaultSize || ViewPortService.itemDefaultSize, ensureParams));
                    }
                });
        };

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
                items: items,
            } as IViewPort;

            if (elements.length === 0 && bindIfAny !== false) {
                this.viewPortResult$.next(viewPort);
                return Observable.timer(1).switchMap(() => calcDisabledViewPort$(items, containerSize, scrollPos, element, ensureParams, false));
            }

            if (!ensureParams || ensureParams.index === undefined || !ensureParams.atEnd) {
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

            viewPort = {
                beforeSize: 0,
                afterSize: 0,
                listSize: containerSize,
                viewPortSize: viewPortSize,
                visibleItems: items.slice(startIndex, 1 + endIndex),
                startIndex: startIndex,
                endIndex: endIndex,
                scrollPos: newScrollPos,
                items: items,
            } as IViewPort;

            return Observable.of(viewPort);
        };

        const calcViewPort$ = (items: IViewPortItem[], maxSize: number, scrollPos: number, element: HTMLElement, itemDefaultSize: number, ensureParams: IEnsureParams) => {
            consoleLog(`calcViewPort`);
            if (!items || !items.length) {
                return Observable.of(this.emptyViewPort);
            }

            let listSize = maxSize || clientSize(element);
            if (listSize <= ViewPortService.itemDefaultSize) {
                listSize = innerSize();
            }

            return Observable.of(this.mode)
                .switchMap((mode) => {
                    if (ensureParams.index !== undefined) {
                        this.ignoreScrollCount++;
                    } else {
                        this.ignoreScrollCount = 0;
                    }

                    switch (mode) {
                        case ViewportMode.disabled:
                            return calcDisabledViewPort$(items, listSize, scrollPos, element, ensureParams, true);
                        case ViewportMode.variable:
                            return calcVariableSizeViewPort$(items, listSize, scrollPos, itemDefaultSize, ensureParams);
                        case ViewportMode.auto:
                            return calcAutoSizeViewPort$(items, listSize, scrollPos, element, itemDefaultSize, ensureParams);
                        case ViewportMode.fixed:
                            return calcFixedSizeViewPort$(items, listSize, scrollPos, itemDefaultSize, ensureParams);
                        default:
                            throw new Error('ViewPortService, invalide mode. The value can be disabled, variable, auto and fixed.');
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
                    } else if (this.mode === ViewportMode.auto && viewPort.listSize < listSize) {
                        // Rendered viewport is to small, render again to complete
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

        const items$ = Observable.from(this.items$)
            .do(() => consoleLog('items'));

        // Ensure item visible by index or instance
        const ensureParams$ = Observable.combineLatest(this.ensureItem$, items$)
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
            .do(() => consoleLog('ensureParams'));

        const maxSize$ = Observable.from(this.maxSize$)
            .distinctUntilChanged()
            .do((value) => consoleLog(`maxSize ${value}`));

        const refresh$ = Observable.from(this.refresh$)
            .do((item: IViewPortItem) => {
                this.ignoreScrollCount = 0;
                this.lastCalculatedSize = undefined;
                if (item) {
                    item.size = undefined;
                }
            })
            .do(() => consoleLog('refresh'));

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
            .do((value) => consoleLog(`scrollPos ${value}`));

        const mode$ = Observable.from(this.mode$)
            .map((mode) => {
                this._mode = typeof mode === 'string' ? ViewportMode[mode] : mode;
                return this._mode;
            })
            .distinctUntilChanged()
            .do((value) => consoleLog(`mode ${value}`));

        const direction$ = Observable.from(this.direction$)
            .map((direction) => {
                this._direction = typeof direction === 'string' ? ViewportDirection[direction] : direction;
                return this._direction;
            })
            .distinctUntilChanged()
            .do((value) => consoleLog(`direction ${value}`));

        const itemsSize$ = Observable.from(this.itemsSize$)
            .distinctUntilChanged()
            .do((value) => this._itemsSize = value)
            .do((value) => consoleLog(`itemsSize ${value}`));

        const element$ = Observable.from(this.element$)
            .do((element) => {
                if (!element) {
                    this.viewPort = undefined;
                    this.ignoreScrollCount = 0;
                    this.lastCalculatedSize = undefined;
                }
            })
            .do(() => consoleLog(`element`));

        // Reset items size when direction change in auto mode
        Observable.combineLatest(direction$, items$, mode$, this.deleteSizeCache$)
            .filter(([_direction, items, mode]) => items && items.length && mode === ViewportMode.auto)
            .switchMap(([_direction, items]) => items)
            .subscribe((item) => {
                item.size = undefined;
            });

        // Calc view port observable
        Observable.combineLatest(items$, maxSize$, itemsSize$, ensureParams$, direction$, mode$, refresh$, element$)
            .debounceTime(1)
            .combineLatest(scrollPos$)
            .filter(([[_items, _maxSize, _itemDefaultSize, _ensureParams, _direction, _mode, _refresh, element], _scrollPos]: [[IViewPortItem[], number|string, number, IEnsureParams, ViewportDirection, ViewportMode, IViewPortItem, HTMLElement], number]) => !!element)
            .do(() => consoleLog(`combineLatest`))
            .switchMap(([[items, maxSize, itemDefaultSize, ensureParams, _direction, _mode, _refresh, element], _scrollPos]: [[IViewPortItem[], number|string, number, IEnsureParams, ViewportDirection, ViewportMode, IViewPortItem, HTMLElement], number]) => {
                const listSize = this.lastCalculatedSize || maxSize || clientSize(element);
                const scrollPos = this._scrollPosition;
                const maxSizeValue = maxSize === 'auto' ? 0 : +maxSize;
                if (items && items.length && (maxSize === 'auto' || listSize < 2 * ViewPortService.itemDefaultSize)) {
                    // Set the viewlist to the maximum height to measure the real max-height defined in the css
                    // Use a blank div to do that
                    this.viewPortResult$.next(this.measureViewPort);
                    // Wait next life cycle for the result
                    return Observable.timer(1)
                        .do(() => this.lastCalculatedSize = clientSize(element))
                        .map(() => ({ element, scrollPos, items, maxSizeValue, itemDefaultSize, ensureParams }));
                } else {
                    return Observable.of({ element, scrollPos, items, maxSizeValue, itemDefaultSize, ensureParams });
                }
            })
            .switchMap(({ element, scrollPos, items, maxSizeValue, itemDefaultSize, ensureParams }) => calcViewPort$(items, maxSizeValue, scrollPos, element, itemDefaultSize, ensureParams))
            .subscribe((viewPort: IViewPort) => {
                this.viewPortResult$.next(viewPort);
            }, ((error) => {
                console.log(error);
            }));

        // Cache last calculated viewport
        Observable.from(this.viewPortResult$).subscribe((viewPort: IViewPort) => this.viewPort = viewPort);
    }

    public deleteSizeCache() {
        this.deleteSizeCache$.next(true);
    }

    public clear() {
        this.viewPortResult$.next(this.emptyViewPort);
    }

    public refresh(item?: IViewPortItem) {
        this.refresh$.next(item || null);
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
