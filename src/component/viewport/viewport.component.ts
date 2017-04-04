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

import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, HostBinding, Input, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-viewport',
    styleUrls: ['./viewport.component.scss'],
    templateUrl: './viewport.component.html',
})
export class DejaViewPortComponent implements OnDestroy, AfterViewInit {
    /** Define the item size startegy
     * fixed: the item size is fixed and defined by the input itemSize
     * auto: The item size is defined by the input itemSize, but recalculated to the real size after rendering the viewport.
     */
    @Input() public itemSizeMode: 'fixed' | 'auto' = 'fixed';

    /** Get or set the item size in fixed mode or the default item size before rendering in auto mode */
    @Input() public itemSize = '33';

    protected beforeSize: string;
    protected afterSize: string;
    protected vpItems: DejaViewPortItem[];
    protected vpStartIndex: number;
    protected startOffset: number; // Buttons mode only
    private _items: DejaViewPortItem[];
    private element: HTMLElement;
    private subscriptions: Subscription[] = [];
    private lastScrollPos: -1;
    private isHorizontal = false;
    private hasButtons = false;
    private _scrollPos = 0; // Buttons mode only
    private buttonsStep = 20;
    @HostBinding('attr.direction') private _direction = 'vertical' as 'vertical' | 'horizontal';
    @HostBinding('attr.scollStyle') private _scrollingStyle: 'scrollbar' | 'buttons' = 'scrollbar';
    @HostBinding('attr.scrolling') private scrolling = null;

    /** Permet de définir un template d'élément par binding */
    @Input() public itemTemplateExternal;

    @ContentChild('itemTemplate') private itemTemplateInternal;
    @ViewChildren('elitem') private itemElements: QueryList<ElementRef>;
    @ViewChild('wrapper') private wrapperElement: ElementRef;
    @ViewChild('down') private downButton: ElementRef;
    @ViewChild('up') private upButton: ElementRef;

    /** Set the list of items to render inside the viewport control */
    @Input()
    public set items(items: any[]) {
        this._items = items ? items.map((item) => new DejaViewPortItem(item)) : [];
        this.calcViewPort();
    }

    /** Set the scrolling style
      * scrollbar: Classic scrollbars
      * buttons: A button before is placed at the top or at the left of the list, and a button after is placed at the right or the bottom of the list. 
      */
    @Input()
    public set scrollingStyle(value: 'scrollbar' | 'buttons') {
        this._scrollingStyle = value;
        this.hasButtons = this._scrollingStyle === 'buttons';
    }

    public get scrollingStyle() {
        return this._scrollingStyle;
    }

    /** Set the direction of the items rendering
     * vertical: The item are displayed vertically
     * horizontal: The item are displayed horizontally
     */
    @Input()
    public set direction(value: 'vertical' | 'horizontal') {
        if (this._direction !== value) {
            this._direction = value;
            this.isHorizontal = value === 'horizontal';
            if (this._items) {
                this._items.forEach((item) => item.size = undefined);
                Observable.timer(1).first().subscribe(() => this.scrollPos = 0);
            }
        }
    }

    /** Get the direction of the items rendering */
    public get direction() {
        return this._direction;
    }

    private get itemTemplate() {
        return this.itemTemplateExternal || this.itemTemplateInternal;
    }

    private get clientSize() {
        if (!this.element) {
            return 0;
        }
        return this.isHorizontal ? this.element.clientWidth : this.element.clientHeight;
    }

    private set scrollPos(value: number) {
        if (this.hasButtons) {
            this._scrollPos = value;
        } else if (this.isHorizontal) {
            this.element.scrollLeft = value;
        } else {
            this.element.scrollTop = value;
        }
        this.calcViewPort();
    }

    private get scrollPos() {
        return this.hasButtons ? this._scrollPos : (this.isHorizontal ? this.element.scrollLeft : this.element.scrollTop);
    }

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        this.subscriptions.push(Observable
            .fromEvent(window, 'resize')
            .debounceTime(10)
            .subscribe(() => {
                this.calcViewPort();
            }));

        this.clearViewPort();
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    public ngAfterViewInit() {
        this.element = this.wrapperElement.nativeElement as HTMLElement;

        this.subscriptions.push(Observable
            .fromEvent(this.element, 'scroll')
            .map((event: any) => this.isHorizontal ? event.target.scrollLeft : event.target.scrollTop)
            .subscribe((scrollPos) => {
                this.lastScrollPos = scrollPos;
                this.calcViewPort();
            }));

        Observable.timer(1)
            .first()
            .filter(() => !!this._items)
            .subscribe(() => this.calcViewPort());

        if (this.downButton && this.upButton) {
            const mousedown$ = Observable.merge(Observable.fromEvent(this.downButton.nativeElement, 'mousedown'), Observable.fromEvent(this.upButton.nativeElement, 'mousedown'));

            const mouseup$ = Observable.merge(Observable.fromEvent(this.downButton.nativeElement, 'mouseup'),
                Observable.fromEvent(this.upButton.nativeElement, 'mouseup'),
                Observable.fromEvent(this.downButton.nativeElement, 'mouseleave'),
                Observable.fromEvent(this.upButton.nativeElement, 'mouseleave'));

            this.subscriptions.push(mousedown$
                .subscribe((event: MouseEvent) => {
                    const target = event.currentTarget as HTMLElement;
                    const direction = target.id === 'up' ? -1 : +1;

                    mouseup$
                        .first()
                        .subscribe((upEvent: MouseEvent) => {
                            this.scrollPos += upEvent.ctrlKey ? this.clientSize : direction * this.buttonsStep;
                        });

                    Observable.timer(1000)
                        .takeUntil(mouseup$)
                        .subscribe(() => {
                            Observable.interval(50)
                                .takeUntil(mouseup$)
                                .subscribe(() => {
                                    this.scrollPos += event.ctrlKey ? this.clientSize : direction * this.buttonsStep * 2;
                                });
                        });
                }));

            this.subscriptions.push(Observable.fromEvent(this.wrapperElement.nativeElement, 'mousewheel')
                .subscribe((event: MouseWheelEvent) => {
                    this.scrollPos = this.scrollPos + event.deltaY;
                }));
        }
    }

    public ensureVisible(item: any) {
        if (item === undefined) {
            return;
        }

        const scrollPos = this.scrollPos;
        const itemDefaultSize = this.itemSize ? +this.itemSize : 33;
        const containerSize = this.clientSize;
        let index = item as number;
        if (isNaN(index)) {
            index = this._items.findIndex((itm) => item === itm);
        } else {
            item = this._items[index];
        }

        if (this.itemSizeMode === 'fixed') {
            // View port constant row height
            if (index >= 0) {
                const scrollMax = index * itemDefaultSize;
                if (scrollPos > scrollMax) {
                    this.scrollPos = scrollMax;
                } else {
                    const scrollMin = scrollMax + containerSize - itemDefaultSize;
                    if (scrollPos < scrollMin) {
                        this.scrollPos = scrollMin;
                    }
                }
            }
        } else {
            let averageSize = 0;
            let averageCount = 0;
            let scrollMin = 0;
            let scrollMax = 0;
            this._items.find((itm) => {
                let itemSize = itm.size;
                if (itemSize) {
                    averageSize += itm.size;
                    ++averageCount;
                } else if (averageCount > 0) {
                    itemSize = Math.round(averageSize / averageCount);
                } else {
                    itemSize = itemDefaultSize;
                }
                if (itm === item) {
                    return true;
                }
                scrollMax += itemSize;
                scrollMin = scrollMax - containerSize + itemSize;
            });

            if (scrollPos < scrollMin) {
                this.scrollPos = scrollMin;
            } else if (scrollPos > scrollMax) {
                this.scrollPos = scrollMax;
            }
        }
    }

    private calcViewPort(maxSize?: number) {
        if (!this._items || this._items.length === 0) {
            this.clearViewPort();
            return;
        }

        this.scrolling = true;
        const itemDefaultSize = this.itemSize ? +this.itemSize : 33;
        const containerSize = maxSize || this.clientSize;

        if (containerSize < 50 && !maxSize) {
            // Set the viewlist to the maximum size to measure the real max-size defined in the css
            maxSize = 200000;
            // Use a blank div to do that
            this.afterSize = `${maxSize}px`;
            // Wait next life cycle for the result
            Observable.timer(1)
                .first()
                .subscribe(() => {
                    this.calcViewPort(this.clientSize || 500);
                });
            return;
        }

        let scrollPos = this.scrollPos;
        if (scrollPos < 0) {
            this._scrollPos = 0;
            scrollPos = 0;
        }

        let beforeSize = 0;
        let afterSize = 0;
        this.startOffset = null;
        if (this.itemSizeMode === 'fixed') {
            const listSize = itemDefaultSize * this._items.length;
            if (scrollPos > listSize - containerSize) {
                this._scrollPos = listSize - containerSize;
                scrollPos = this._scrollPos;
            }

            this.vpStartIndex = Math.floor(scrollPos / itemDefaultSize);
            const vpEndIndex = Math.ceil((scrollPos + containerSize) / itemDefaultSize);
            const vpSize = itemDefaultSize * (vpEndIndex - this.vpStartIndex);
            beforeSize = itemDefaultSize * this.vpStartIndex;
            afterSize = listSize - beforeSize - vpSize;
            if (this.hasButtons) {
                this.startOffset = scrollPos - beforeSize;
            }
            this.vpItems = this._items.slice(this.vpStartIndex, vpEndIndex);
            this.vpItems.forEach((item) => item.size = itemDefaultSize);

            // console.log(`vpBeforeSize: ${this.vpBeforeSize} vpSize: ${vpSize} vpAfterSize: ${afterSize}`);
        } else if (this.itemSizeMode === 'auto') {
            this.vpItems = [];
            let vpSize = 0;
            let overflow = false;
            let averageSize = 0;
            let averageCount = 0;
            this._items.forEach((item, index) => {
                let itemSize = item.size;
                if (itemSize) {
                    averageSize += item.size;
                    ++averageCount;
                } else if (averageCount > 0) {
                    itemSize = Math.round(averageSize / averageCount);
                } else {
                    itemSize = itemDefaultSize;
                }
                if (vpSize === 0 && beforeSize + itemSize < scrollPos) {
                    beforeSize += itemSize;
                } else if (!overflow) {
                    if (this.vpItems.length === 0) {
                        this.vpStartIndex = index;
                        if (this.hasButtons) {
                            this.startOffset = scrollPos - beforeSize;
                        }
                    }
                    vpSize += itemSize;
                    this.vpItems.push(item);
                    if (beforeSize + vpSize > scrollPos + containerSize) {
                        overflow = true;
                    }
                } else {
                    afterSize += itemSize;
                }
            });

            if (afterSize === 0 && scrollPos > beforeSize + vpSize - containerSize) {
                // Maximum of scroll reached, can be happens if we scroll with the buttons
                this._scrollPos = beforeSize + vpSize - containerSize;
                this.calcViewPort(maxSize);
                return;
            } else {
                // Measure items height
                Observable.timer(1)
                    .first()
                    .subscribe(() => {
                        let calculatedSize = beforeSize;
                        this.itemElements.forEach((itemElement, index) => {
                            const element = itemElement.nativeElement as HTMLElement;
                            const size = this.isHorizontal ? element.clientWidth : element.clientHeight;
                            this.vpItems[index].size = size;
                            calculatedSize += size;
                        });

                        // If height of the displayed items is not enough, calc viewport again
                        if (calculatedSize < scrollPos + containerSize) {
                            if (afterSize === 0) {
                                // Maximum of scroll reached, can be happens if we scroll with the buttons
                                this._scrollPos = calculatedSize - containerSize;
                            }
                            this.calcViewPort(maxSize);
                        }
                    });
            }
        } else {
            throw new Error('DejaViewPortComponent itemSizeMode, bad parameter');
        }

        if (this.hasButtons) {
            this.beforeSize = null;
            this.afterSize = null;
        } else {
            this.beforeSize = beforeSize ? `${beforeSize}px` : null;
            this.afterSize = afterSize ? `${afterSize}px` : null;
        }

        this.changeDetectorRef.markForCheck();
        Observable.timer(10).first().subscribe(() => this.scrolling = false);
    }

    private clearViewPort() {
        this.beforeSize = null;
        this.afterSize = null;
        this.vpItems = [];
        this.changeDetectorRef.markForCheck();
    };
}

export class DejaViewPortItem {
    constructor(public model: any, public size?: number) { }
}
