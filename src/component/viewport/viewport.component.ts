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

import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, HostBinding, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
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
    protected vpBeforeSize: number;
    protected vpAfterSize: number;
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

    constructor(private changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef) {
        this.element = elementRef.nativeElement as HTMLElement;

        this.subscriptions.push(Observable
            .fromEvent(window, 'resize')
            .debounceTime(10)
            .subscribe(() => {
                this.calcViewPort();
            }));

        this.subscriptions.push(Observable
            .fromEvent(this.element, 'scroll')
            .map((event: any) => this.isHorizontal ? event.target.scrollLeft : event.target.scrollTop)
            // .do((scrollPos: number) => console.log(scrollPos))
            // .debounce((scrollPos) => Observable.timer(Math.abs(this.lastScrollPos - scrollPos) > 2000 ? 1000 : 0))
            .subscribe((scrollPos) => {
                this.lastScrollPos = scrollPos;
                this.calcViewPort();
            }));

        this.clearViewPort();
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    public ngAfterViewInit() {
        if (this._items) {
            this.calcViewPort();
        }
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
            this.vpAfterSize = maxSize;
            // Wait next life cycle for the result
            Observable.timer(1)
                .first()
                .subscribe(() => {
                    this.calcViewPort(this.clientSize || 500);
                });
            return;
        }

        const scrollPos = this.scrollPos;
        this.vpBeforeSize = 0;
        this.vpAfterSize = 0;
        if (this.itemSizeMode === 'fixed') {
            const listSize = itemDefaultSize * this._items.length;
            this.vpStartIndex = Math.floor(scrollPos / itemDefaultSize);
            const vpEndIndex = Math.ceil((scrollPos + containerSize) / itemDefaultSize);
            this.vpBeforeSize = itemDefaultSize * this.vpStartIndex;
            const vpSize = itemDefaultSize * (vpEndIndex - this.vpStartIndex);
            this.vpAfterSize = listSize - this.vpBeforeSize - vpSize;
            this.vpItems = this._items.slice(this.vpStartIndex, vpEndIndex);
            this.vpItems.forEach((item) => item.size = itemDefaultSize);
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
                if (vpSize === 0 && this.vpBeforeSize + itemSize < scrollPos) {
                    this.vpBeforeSize += itemSize;
                } else if (!overflow) {
                    if (this.vpItems.length === 0) {
                        this.vpStartIndex = index;
                    }
                    vpSize += itemSize;
                    this.vpItems.push(item);
                    if (this.vpBeforeSize + vpSize > scrollPos + containerSize) {
                        overflow = true;
                    }
                } else {
                    this.vpAfterSize += itemSize;
                }
            });

            // Measure items height
            Observable.timer(1)
                .first()
                .subscribe(() => {
                    let calculatedSize = this.vpBeforeSize;
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
        this.vpBeforeSize = 0;
        this.vpAfterSize = 0;
        this.vpItems = [];
        this.changeDetectorRef.markForCheck();
    };
}

export class DejaViewPortItem {
    constructor(public model: any, public size?: number) { }
}
