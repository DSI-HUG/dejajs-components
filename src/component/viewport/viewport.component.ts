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
    private _items: DejaViewPortItem[];
    private element: HTMLElement;
    private subscriptions: Subscription[] = [];
    private lastScrollPos: -1;
    private isHorizontal = false;
    @HostBinding('attr.direction') private _direction = 'vertical' as 'vertical' | 'horizontal';

    /** Permet de définir un template d'élément par binding */
    @Input() public itemTemplateExternal;

    @ContentChild('itemTemplate') private itemTemplateInternal;
    @ViewChildren('elitem') private itemElements: QueryList<ElementRef>;
    @ViewChild('wrapper') private wrapperElement: ElementRef;

    /** Set the list of items to render inside the viewport control */
    @Input()
    public set items(items: any[]) {
        this._items = items ? items.map((item) => new DejaViewPortItem(item)) : [];
        this.calcViewPort();
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
                this.calcViewPort();
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
        if (this.isHorizontal) {
            this.element.scrollLeft = value;
        } else {
            this.element.scrollTop = value;
        }
    }

    private get scrollPos() {
        return this.isHorizontal ? this.element.scrollLeft : this.element.scrollTop;
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
    }

    private calcViewPort(maxSize?: number) {
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
            Observable.timer(1)
                .first()
                .subscribe(() => {
                    this.calcViewPort(this.clientSize || 500);
                });
            return;
        }

        const scrollPos = this.scrollPos;
        let beforeSize = 0;
        let afterSize = 0;
        if (this.itemSizeMode === 'fixed') {
            const listSize = itemDefaultSize * this._items.length;
            this.vpStartIndex = Math.floor(scrollPos / itemDefaultSize);
            const vpEndIndex = Math.ceil((scrollPos + containerSize) / itemDefaultSize);
            beforeSize = itemDefaultSize * this.vpStartIndex;
            const vpSize = itemDefaultSize * (vpEndIndex - this.vpStartIndex);
            afterSize = listSize - beforeSize - vpSize;
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

            this.beforeSize = `${beforeSize}px`;
            this.afterSize = `${afterSize}px`;

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
                        this.calcViewPort(maxSize);
                    }
                });
        } else {
            throw new Error('DejaViewPortComponent itemSizeMode, bad parameter');
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
