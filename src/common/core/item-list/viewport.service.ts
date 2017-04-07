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

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs/Rx';
import { IViewPort, IViewPortItem } from './viewport.service';

export enum ViewportMode {
    NoViewport,
    ConstantRowHeight,
    VariableRowHeight,
    AutoRowHeight,
}

/** Service de gestion du viewport d'une liste.
 * Ce service permet la gestion du viewport verticalement ou horizontalement.
 */
@Injectable()
export class ViewPortService {
    public static itemDefaultSize = 33;

    public viewPort$: Observable<IViewPort>;

    public mode$ = new ReplaySubject<ViewportMode | string>();
    public items$ = new ReplaySubject<IViewPortItem[]>();
    public maxSize$ = new BehaviorSubject<number>(0);
    public element$ = new ReplaySubject<HTMLElement>();
    public itemsSize$ = new BehaviorSubject<number>(ViewPortService.itemDefaultSize);

    private refresh$ = new BehaviorSubject<boolean>(true);

    private emptyViewPort = {
        beforeSize: 0,
        afterSize: 0,
        items: [],
        startIndex: 0,
        endIndex: 0,
        startOffset: 0,
    } as IViewPort;

    private measureViewPort = {
        beforeSize: 0,
        afterSize: 200000,
        items: [],
        startIndex: 0,
        endIndex: 0,
        startOffset: 0,
    } as IViewPort;

    public viewPortResult$ = new BehaviorSubject<IViewPort>(this.emptyViewPort);

    private _mode: ViewportMode = ViewportMode.ConstantRowHeight;

    public get mode() {
        return this._mode;
    }

    constructor() {
        const calcConstantHeightViewPort$ = (items: IViewPortItem[], containerSize: number, element: HTMLElement, itemDefaultSize: number): Observable<IViewPort> => {
            const scrollPos = (containerSize && element.scrollTop) || 0;
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
                items: items.slice(startIndex, 1 + endIndex),
                startIndex: startIndex,
                endIndex: endIndex,
                startOffset: 0,
            } as IViewPort);
        };

        const calcVariableHeightViewPort$ = (items: IViewPortItem[], containerSize: number, element: HTMLElement, itemDefaultSize: number): Observable<IViewPort> => {
            const visibleList = [] as IViewPortItem[];
            const scrollPos = containerSize ? element.scrollTop : 0;
            let startIndex: number;
            let endIndex = 0;
            let beforeSize = 0;
            let visibleListHeight = 0;
            let afterSize = 0;

            items.forEach((item: IViewPortItem, index: number) => {
                const itemHeight = (item.size && item.size > ViewPortService.itemDefaultSize) ? item.size : itemDefaultSize;
                if (beforeSize + itemHeight < scrollPos && startIndex === undefined) {
                    beforeSize += itemHeight;
                } else if (visibleListHeight + beforeSize < containerSize + scrollPos) {
                    if (startIndex === undefined) {
                        startIndex = index;
                    }
                    endIndex = index;
                    visibleListHeight += itemHeight;
                    visibleList.push(item);
                } else {
                    afterSize += itemHeight;
                }
            });

            return Observable.of({
                beforeSize: beforeSize,
                afterSize: afterSize,
                items: visibleList,
                startIndex: startIndex || 0,
                endIndex: endIndex,
                startOffset: 0,
            } as IViewPort);
        };

        const calcAutoHeightViewPort$ = (items: IViewPortItem[], containerSize: number, element: HTMLElement, itemDefaultSize: number): Observable<IViewPort> => {
            const visibleList = [] as IViewPortItem[];
            let vpHeight = 0;
            let startIndex = 0;
            let endIndex = 0;
            let overflow = false;
            let averageHeight = 0;
            let averageCount = 0;
            let beforeSize = 0;
            let afterSize = 0;
            let calculationRequired = false;
            const scrollPos = containerSize ? element.scrollTop : 0;
            items.forEach((item, index) => {
                let itemHeight = item.size || 0;
                if (itemHeight > ViewPortService.itemDefaultSize) {
                    averageHeight += itemHeight;
                    ++averageCount;
                } else if (averageCount > 0) {
                    itemHeight = Math.round(averageHeight / averageCount);
                } else {
                    itemHeight = itemDefaultSize;
                }

                if (vpHeight === 0 && beforeSize + itemHeight < scrollPos) {
                    beforeSize += itemHeight;
                } else if (!overflow) {
                    if (visibleList.length === 0) {
                        startIndex = index;
                    }
                    if (!item.size) {
                        calculationRequired = true;
                    }
                    endIndex = index;
                    vpHeight += itemHeight;
                    visibleList.push(item);
                    if (beforeSize + vpHeight > scrollPos + containerSize) {
                        overflow = true;
                    }
                } else {
                    afterSize += itemHeight;
                }
            });

            const viewPort = {
                beforeSize: beforeSize,
                afterSize: afterSize,
                items: visibleList,
                startIndex: startIndex,
                endIndex: endIndex,
                startOffset: 0,
            } as IViewPort;


            if (!calculationRequired) {
                return Observable.of(viewPort);
            } else {
                // Measure items height
                this.viewPortResult$.next(viewPort);
                return Observable.timer(1)
                    .switchMap(() => {
                        const elements = element.getElementsByClassName('listitem');
                        for (let i = 0; i < elements.length; i++) {
                            const itemElement = elements[i];
                            const index = +itemElement.getAttribute('flat');
                            const item = visibleList[index - startIndex];
                            if (item) {
                                item.size = itemElement.clientHeight;
                            }
                        };
                        return calcAutoHeightViewPort$(items, containerSize, element, itemDefaultSize);
                    });
            }
        };

        const calcViewPort$ = (items: IViewPortItem[], maxSize: number, element: HTMLElement, itemDefaultSize: number) => {
            let listSize = maxSize || element.clientHeight;
            if (listSize <= ViewPortService.itemDefaultSize) {
                listSize = window.innerHeight;
            }

            if (this.mode === ViewportMode.NoViewport) {
                return Observable.of({
                    beforeSize: 0,
                    afterSize: 0,
                    items: items,
                    startIndex: 0,
                    endIndex: items.length,
                    startOffset: 0,
                } as IViewPort);

            } else {
                let viewPort$: Observable<IViewPort>;

                if (this.mode === ViewportMode.VariableRowHeight) {
                    viewPort$ = calcVariableHeightViewPort$(items, listSize, element, itemDefaultSize);

                } else if (this.mode === ViewportMode.AutoRowHeight) {
                    viewPort$ = calcAutoHeightViewPort$(items, listSize, element, itemDefaultSize);

                } else {
                    viewPort$ = calcConstantHeightViewPort$(items, listSize, element, itemDefaultSize);
                }

                return viewPort$.switchMap((viewPort: IViewPort) => {
                    if (listSize < 2 * ViewPortService.itemDefaultSize) {
                        this.viewPortResult$.next(this.measureViewPort);
                        return Observable.timer(1)
                            .switchMap(() => calcViewPort$(items, maxSize, element, itemDefaultSize));
                    } else {
                        return Observable.of(viewPort);
                    }
                });
            }
        };

        Observable.combineLatest(this.items$, this.mode$, this.maxSize$, this.element$, this.itemsSize$, this.refresh$)
            .switchMap(([items, mode, maxSize, element, itemDefaultSize, _refresh]) => {
                this._mode = typeof mode === 'string' ? ViewportMode[mode] : mode;
                const listSize = maxSize || element.clientHeight;
                if (listSize < 2 * ViewPortService.itemDefaultSize) {
                    // Set the viewlist to the maximum height to measure the real max-height defined in the css
                    // Use a blank div to do that
                    this.viewPortResult$.next(this.measureViewPort);
                    // Wait next life cycle for the result
                    return Observable.timer(1).map(() => ({ items, maxSize, element, itemDefaultSize }));
                } else {
                    return Observable.of({ items, maxSize, element, itemDefaultSize });
                }
            })
            .switchMap(({ items, maxSize, element, itemDefaultSize }) => calcViewPort$(items, maxSize, element, itemDefaultSize))
            .subscribe((viewPort: IViewPort) => this.viewPortResult$.next(viewPort));

        this.viewPort$ = Observable.from(this.viewPortResult$);
    }

    public clear() {
        this.viewPortResult$.next(this.emptyViewPort);
    }

    public refresh() {
        this.refresh$.next(true);
    }
}

export interface IViewPort {
    beforeSize: number;
    afterSize: number;
    items: IViewPortItem[];
    startIndex: number;
    endIndex: number;
    startOffset: number;
}

export interface IViewPortItem {
    size?: number;
}
