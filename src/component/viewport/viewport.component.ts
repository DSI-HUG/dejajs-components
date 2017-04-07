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
import { BehaviorSubject, Observable, Subscription } from 'rxjs/Rx';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-viewport',
    styleUrls: ['./viewport.component.scss'],
    templateUrl: './viewport.component.html',
})
export class DejaViewPortComponent implements OnDestroy,
    AfterViewInit {
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
    protected vpEndIndex: number;
    protected startOffset: number;  // Buttons mode only
    private _items: DejaViewPortItem[];
    private element: HTMLElement;
    private subscriptions: Subscription[] = [];
    private lastScrollPos = -1;
    private isHorizontal = false;
    private hasButtons = false;
    private hasButtons$ = new BehaviorSubject<boolean>(false);
    private _scrollPos = 0;  // Buttons mode only
    private buttonsStep = 20;
    private mouseDown$Sub: Subscription;
    private mouseWheel$Sub: Subscription;
    @HostBinding('attr.hasUpBtn') private hasUpButton = false;
    @HostBinding('attr.hasDownBtn') private hasDownButton = false;
    @HostBinding('attr.direction') private _direction = 'vertical' as 'vertical' | 'horizontal';
    @HostBinding('attr.scollStyle') private _scrollingStyle = 'scrollbar' as 'scrollbar' | 'buttons';

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
        this.hasButtons$.next(this._scrollingStyle === 'buttons');
    }

    public get scrollingStyle() { return this._scrollingStyle; }

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
                this.changeDetectorRef.markForCheck();
                Observable.timer(1)
                    .first()
                    .subscribe(() => this.scrollPos = 0);
            }
        }
    }

    /** Get the direction of the items rendering */
    public get direction() { return this._direction; }

    private get itemTemplate() { return this.itemTemplateExternal || this.itemTemplateInternal; }

    private get clientSize() {
        if (!this.element) {
            return 0;
        }
        return this.isHorizontal ? this.element.clientWidth : this.element.clientHeight;
    }

    private set scrollPos(value: number) {
        if (this.hasButtons) {
            this._scrollPos = value;
            this.calcViewPort();
        } else if (this.isHorizontal) {
            this.element.scrollLeft = value;
        } else {
            this.element.scrollTop = value;
        }
    }

    private get scrollPos() {
        return this.hasButtons ? this._scrollPos : Math.round(this.isHorizontal ? this.element.scrollLeft : this.element.scrollTop);
    }

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        this.subscriptions.push(Observable.fromEvent(window, 'resize')
            .debounceTime(10).subscribe(() => { this.calcViewPort(); }));

        this.clearViewPort();
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
        if (this.mouseDown$Sub) {
            this.mouseDown$Sub.unsubscribe();
        }
        if (this.mouseWheel$Sub) {
            this.mouseWheel$Sub.unsubscribe();
        }
    }

    public ngAfterViewInit() {
        this.element = this.wrapperElement.nativeElement as HTMLElement;

        this.subscriptions.push(Observable.fromEvent(this.element, 'scroll')
            .map((event: Event) => event.target as HTMLElement)
            .map((target) => Math.round(this.isHorizontal ? target.scrollLeft : target.scrollTop))
            .filter((scrollPos) => scrollPos !== this.lastScrollPos)
            .subscribe((scrollPos) => {
                this.lastScrollPos = scrollPos;
                this.calcViewPort();
            }));

        Observable.timer(1)
            .first()
            .filter(() => !!this._items)
            .subscribe(() => this.calcViewPort());

        this.subscriptions.push(Observable.from(this.hasButtons$)
            .distinctUntilChanged()
            .do((value) => this.hasButtons = value)
            .delay(1)
            .subscribe((value) => {
                if (value) {
                    const mousedown$ = Observable.merge(
                        Observable.fromEvent(this.downButton.nativeElement, 'mousedown'),
                        Observable.fromEvent(this.upButton.nativeElement, 'mousedown'));

                    const mouseup$ = Observable.merge(
                        Observable.fromEvent(this.downButton.nativeElement, 'mouseup'),
                        Observable.fromEvent(this.upButton.nativeElement, 'mouseup'),
                        Observable.fromEvent(this.downButton.nativeElement, 'mouseleave'),
                        Observable.fromEvent(this.upButton.nativeElement, 'mouseleave'));

                    this.mouseDown$Sub = mousedown$.subscribe((event: MouseEvent) => {
                        const target = event.currentTarget as HTMLElement;
                        const direction = target.id === 'up' ? -1 : +1;

                        mouseup$.first()
                            .subscribe((upEvent: MouseEvent) => {
                                this.scrollPos += direction * (upEvent.ctrlKey ? this.clientSize : this.buttonsStep);
                            });

                        Observable.timer(750)
                            .takeUntil(mouseup$)
                            .subscribe(() => {
                                Observable.interval(50)
                                    .takeUntil(mouseup$)
                                    .subscribe(() => {
                                        this.scrollPos += direction * (event.ctrlKey ? this.clientSize : this.buttonsStep * 2);
                                    });
                            });
                    });

                    this.mouseWheel$Sub = Observable
                        .fromEvent(this.element, 'mousewheel')
                        .subscribe((event: MouseWheelEvent) => { this.scrollPos = this.scrollPos + event.deltaY; });

                } else {
                    if (this.mouseDown$Sub) {
                        this.mouseDown$Sub.unsubscribe();
                        delete this.mouseDown$Sub;
                    }
                    if (this.mouseWheel$Sub) {
                        this.mouseWheel$Sub.unsubscribe();
                        delete this.mouseWheel$Sub;
                    }
                }

                this.calcViewPort();
            }));
    }

    public refresh() {
        this.changeDetectorRef.markForCheck();
    }

    public ensureVisible(item: any) {
        this.calcViewPort(null, item);
    }

    private calcViewPort(maxSize?: number, ensureItem?: any, forceEnd?: boolean) {
        if (!this._items || this._items.length === 0) {
            this.clearViewPort();
            return;
        }

        const itemDefaultSize = this.itemSize ? +this.itemSize : 33;
        const containerSize = maxSize || this.clientSize;

        if (containerSize < 50 && !maxSize) {
            // Set the viewlist to the maximum size to measure the real max-size defined in the css
            maxSize = 200000;
            // Use a blank div to do that
            this.afterSize = `${maxSize}px`;
            // Wait next life cycle for the result
            Observable.timer(1).first().subscribe(() => { this.calcViewPort(this.clientSize || 500); });
            return;
        }

        let beforeSize = 0;
        let afterSize = 0;
        let outOfViewPort = false;
        let startOffset: number;
        let scrollOffset: number;
        this.hasDownButton = this.hasButtons;
        if (ensureItem !== undefined) {
            // Ensure item visible
            let ensureIndex = ensureItem as number;
            if (isNaN(ensureIndex)) {
                ensureIndex = this._items.findIndex((itm) => ensureItem === itm);
            }

            if (ensureIndex === -1 || (ensureIndex > this.vpStartIndex && ensureIndex < this.vpEndIndex && forceEnd === undefined)) {
                // Already visible
                return;
            }

            if (this.itemSizeMode === 'fixed') {
                // Ensure item fixed size
                const listSize = itemDefaultSize * this._items.length;

                if (ensureIndex <= this.vpStartIndex) {
                    this.vpStartIndex = ensureIndex;
                    this.vpEndIndex = ensureIndex + Math.ceil(containerSize / itemDefaultSize);
                    const vpSize = itemDefaultSize * (this.vpEndIndex - this.vpStartIndex);
                    beforeSize = itemDefaultSize * this.vpStartIndex;
                    afterSize = listSize - beforeSize - vpSize;
                    startOffset = -1;
                    scrollOffset = this.vpStartIndex * itemDefaultSize;

                } else {
                    // index >= this.vpEndIndex
                    this.vpEndIndex = ++ensureIndex;
                    this.vpStartIndex = ensureIndex - Math.ceil(containerSize / itemDefaultSize);
                    const vpSize = itemDefaultSize * (this.vpEndIndex - this.vpStartIndex);
                    beforeSize = itemDefaultSize * this.vpStartIndex;
                    afterSize = listSize - beforeSize - vpSize;
                    startOffset = vpSize - containerSize + 1;
                    scrollOffset = startOffset + beforeSize;
                }

                this.vpItems = this._items.slice(this.vpStartIndex, this.vpEndIndex);
                this.vpItems.forEach((item) => item.size = itemDefaultSize);

            } else {
                // Ensure items auto-size
                let averageSize = 0;
                let averageCount = 0;
                this.vpItems = [];
                let vpSize = 0;
                let needItemMeasurement = false;
                if (forceEnd === false || ensureIndex <= this.vpStartIndex) {
                    this.vpStartIndex = ensureIndex;
                    this._items.forEach((itm, index) => {
                        let itemSize = itm.size;
                        if (itemSize) {
                            averageSize += itm.size;
                            ++averageCount;
                        } else if (averageCount > 0) {
                            itemSize = Math.round(averageSize / averageCount);
                        } else {
                            itemSize = itemDefaultSize;
                        }

                        if (index < ensureIndex) {
                            beforeSize += itemSize;
                        } else if (!outOfViewPort) {
                            if (!itm.size) {
                                needItemMeasurement = true;
                            }
                            vpSize += itemSize;
                            this.vpItems.push(itm);
                            this.vpEndIndex = index;
                            if (vpSize > containerSize) {
                                outOfViewPort = true;
                            }
                        } else {
                            afterSize += itemSize;
                        }
                    });

                    // Measure items height
                    if (needItemMeasurement) {
                        Observable.timer(1).first().subscribe(() => {
                            let calculatedSize = 0;
                            this.itemElements.forEach((itemElement, index) => {
                                const element = itemElement.nativeElement as HTMLElement;
                                const size = this.isHorizontal ? element.clientWidth : element.clientHeight;
                                this.vpItems[index].size = size;
                                calculatedSize += size;
                            });

                            this.calcViewPort(maxSize, ensureIndex, false);
                        });
                    }

                    if (afterSize === 0) {
                        this.hasDownButton = false;
                    }

                    startOffset = 0;
                    scrollOffset = beforeSize;

                } else if (forceEnd === true || ensureIndex >= this.vpEndIndex) {
                    this.vpEndIndex = ensureIndex;
                    let currentIndex = this._items.length;
                    while (--currentIndex >= 0) {
                        const itm = this._items[currentIndex];
                        let itemSize = itm.size;
                        if (itemSize) {
                            averageSize += itm.size;
                            ++averageCount;
                        } else if (averageCount > 0) {
                            itemSize = Math.round(averageSize / averageCount);
                        } else {
                            itemSize = itemDefaultSize;
                        }

                        if (currentIndex > ensureIndex) {
                            afterSize += itemSize;
                        } else if (!outOfViewPort) {
                            if (!itm.size) {
                                needItemMeasurement = true;
                            }
                            vpSize += itemSize;
                            this.vpItems.unshift(itm);
                            this.vpStartIndex = currentIndex;
                            if (vpSize > containerSize) {
                                outOfViewPort = true;
                            }
                        } else {
                            beforeSize += itemSize;
                        }
                    }

                    // Measure items height
                    if (needItemMeasurement) {
                        Observable.timer(1).first().subscribe(() => {
                            let calculatedSize = 0;
                            this.itemElements.forEach((itemElement, index) => {
                                const element = itemElement.nativeElement as HTMLElement;
                                const size = this.isHorizontal ? element.clientWidth : element.clientHeight;
                                this.vpItems[index].size = size;
                                calculatedSize += size;
                            });

                            this.calcViewPort(maxSize, ensureIndex, true);
                        });
                    }

                    if (afterSize === 0) {
                        this.hasDownButton = false;
                    }

                    startOffset = vpSize - containerSize + 1;
                    scrollOffset = beforeSize;
                }
            }

            // console.log(`vpBeforeSize: ${this.vpBeforeSize} vpSize: ${vpSize} vpAfterSize: ${afterSize}`);

        } else {
            const listSize = itemDefaultSize * this._items.length;

            scrollOffset = this.scrollPos;
            if (scrollOffset < 0) {
                scrollOffset = 0;
            }

            if (scrollOffset > listSize - containerSize) {
                scrollOffset = listSize - containerSize;
            }

            if (this.itemSizeMode === 'fixed') {
                // Ensure scroll pos fixed size
                this.vpStartIndex = Math.floor(scrollOffset / itemDefaultSize);
                this.vpEndIndex = Math.ceil((scrollOffset + containerSize) / itemDefaultSize);
                const vpSize = itemDefaultSize * (this.vpEndIndex - this.vpStartIndex);
                beforeSize = itemDefaultSize * this.vpStartIndex;
                afterSize = listSize - beforeSize - vpSize;
                startOffset = this.hasButtons ? scrollOffset - beforeSize : 0;
                this.vpItems = this._items.slice(this.vpStartIndex, this.vpEndIndex);
                this.vpItems.forEach((item) => item.size = itemDefaultSize);

            } else if (this.itemSizeMode === 'auto') {
                // Ensure scroll pos auto size
                this.vpItems = [];
                let vpSize = 0;
                let averageSize = 0;
                let averageCount = 0;
                let needItemMeasurement = false;
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
                    if (vpSize === 0 && beforeSize + itemSize < scrollOffset) {
                        beforeSize += itemSize;
                    } else if (!outOfViewPort) {
                        if (this.vpItems.length === 0) {
                            this.vpStartIndex = index;
                        }
                        if (!item.size) {
                            needItemMeasurement = true;
                        }
                        vpSize += itemSize;
                        this.vpItems.push(item);
                        this.vpEndIndex = index;
                        if (beforeSize + vpSize > scrollOffset + containerSize) {
                            outOfViewPort = true;
                        }
                    } else {
                        afterSize += itemSize;
                    }
                });

                startOffset = this.hasButtons ? scrollOffset - beforeSize : 0;

                if (needItemMeasurement) {
                    // Measure items height
                    Observable.timer(1).first().subscribe(() => {
                        let calculatedSize = beforeSize;
                        this.itemElements.forEach((itemElement, index) => {
                            const element = itemElement.nativeElement as HTMLElement;
                            const size = this.isHorizontal ? element.clientWidth : element.clientHeight;
                            this.vpItems[index].size = size;
                            calculatedSize += size;
                        });

                        // If height of the displayed items is not enough, calc viewport again
                        if (calculatedSize < scrollOffset + containerSize) {
                            if (afterSize === 0) {
                                // Maximum of scroll reached, can be happens if we scroll with the buttons
                                this._scrollPos = calculatedSize - containerSize;
                                this.hasDownButton = false;
                            }
                            this.calcViewPort(maxSize);
                        }
                    });
                }
            } else {
                throw new Error('DejaViewPortComponent itemSizeMode, bad parameter');
            }
        }

        if (this.hasButtons) {
            this.startOffset = startOffset;
            this._scrollPos = scrollOffset;
            this.beforeSize = null;
            this.afterSize = null;
            this.hasUpButton = this.scrollPos > 0;
        } else {
            this.startOffset = 0;
            if (this.isHorizontal) {
                this.element.scrollLeft = +(scrollOffset + startOffset);
            } else {
                this.element.scrollTop = +(scrollOffset + startOffset);
            }
            this.beforeSize = beforeSize ? `${beforeSize}px` : null;
            this.afterSize = afterSize ? `${afterSize}px` : null;
            this.hasUpButton = false;
            this.hasDownButton = false;
        }

        this.changeDetectorRef.markForCheck();
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
