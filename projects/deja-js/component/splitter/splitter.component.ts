/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewEncapsulation, Renderer2 } from '@angular/core';
import { IAreaData } from './area-data.model';
import { Point } from './point.model';
import { SplitAreaDirective } from './split-area.directive';

const gutterSize = 'gutterSize';
const disabled = 'disabled';

/**
 * Splitter Component for Angular
 *
 * The splitter component allows to split horizontally or vertically, a container in N resizable part.
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-splitter',
    styleUrls: ['./splitter.component.scss'],
    templateUrl: './splitter.component.html',
})
export class DejaSplitterComponent implements OnChanges, OnDestroy {
    /**
     * Direction of the split
     * Can be `horizontal` or `vertical`
     */
    @Input() public direction = 'horizontal';
    /**
     * Width in percent of the component
     * By default `100%`
     */
    @Input() public width: number;
    /**
     * Height in percent of the component
     * By default `100%`
     */
    @Input() public height: number;
    /**
     * Separator width
     */
    @Input() public gutterSize = 10;
    /**
     * Event triggered when the user start to drag the cursor
     */
    @Output() public dragStart = new EventEmitter<number[]>(false);
    /**
     * Event triggered during the cursor's drag
     */
    @Output() public dragProgress = new EventEmitter<number[]>(false);
    /**
     * Event triggered when the user stop to drag the cursor
     */
    @Output() public dragEnd = new EventEmitter<number[]>(false);

    /**
     * Host Binding
     */
    @HostBinding('style.flex-direction') public get styleFlexDirection() {
        return this.direction === 'horizontal' ? 'row' : 'column';
    }

    /**
     * Host Binding
     */
    @HostBinding('style.width') public get styleWidth() {
        return (this.width && !isNaN(this.width) && this.width > 0) ? `${this.width}px` : '100%';
    }

    /**
     * Host Binding
     */
    @HostBinding('style.height') public get styleHeight() {
        return (this.height && !isNaN(this.height) && this.height > 0) ? `${this.height}px` : '100%';
    }

    private get nbGutters(): number {
        return this._areas.length - 1;
    }

    private _areas: IAreaData[] = [];
    private isDragging = false;
    private containerSize = 0;
    private areaASize = 0;
    private areaBSize = 0;
    private eventsDragFct: Function[] = [];
    private _disabled = false;

    /** Retourne ou definit si le selecteur est desactivé. */
    @Input()
    public set disabled(value: boolean | string) {
        this._disabled = coerceBooleanProperty(value) || null;
    }

    public get disabled() {
        return this._disabled;
    }

    public get areas() {
        return this._areas;
    }

    /**
     * Constructor
     */
    constructor(private cdRef: ChangeDetectorRef,
        private elementRef: ElementRef,
        private renderer: Renderer2) {
    }

    /**
     * Lifecycle hook that is called when any data-bound property of a directive changes.
     */
    public ngOnChanges(changes: SimpleChanges) {
        if (changes[gutterSize] || changes[disabled]) {
            this.refresh();
        }
    }

    /**
     * Lifecycle hook that is called when a directive, pipe or service is destroyed.
     */
    public ngOnDestroy() {
        this.stopDragging();
    }

    /**
     * Add a new area into the component
     * @param component Area to add
     * @param orderUser Position of the new area into the component
     * @param sizeUser Size of the new area
     * @param minPixel Min size of the new area
     */
    public addArea(component: SplitAreaDirective, orderUser: number | null, sizeUser: number | null, minPixel: number) {
        this._areas.push({
            component,
            orderUser,
            order: -1,
            sizeUser,
            size: -1,
            minPixel,
        });

        this.refresh();
    }

    /**
     * Update an existing area into the component
     * @param component Area to update
     * @param orderUser Position of the area into the component
     * @param sizeUser Size of the area
     * @param minPixel  Min size of the area
     */
    public updateArea(component: SplitAreaDirective, orderUser: number | null, sizeUser: number | null, minPixel: number) {
        const item = this._areas.find((a) => a.component === component);

        if (item) {
            item.orderUser = orderUser;
            item.sizeUser = sizeUser;
            item.minPixel = minPixel;

            this.refresh();
        }
    }

    /**
     * Delete an existing area into the component
     * @param area Area to delete
     */
    public removeArea(area: SplitAreaDirective) {
        const item = this._areas.find((a) => a.component === area);

        if (item) {
            const index = this._areas.indexOf(item);
            this._areas.splice(index, 1);
            this._areas.forEach((a, i) => a.order = i * 2);

            this.refresh();
        }
    }

    /**
     * Function called when the user start to drag the cursor
     * @param startEvent drag event
     * @param gutterOrder separator number
     */
    public startDragging(startEvent: MouseEvent, gutterOrder: number) {
        startEvent.preventDefault();

        if (this.disabled) {
            return;
        }

        const areaA = this._areas.find((a) => a.order === gutterOrder - 1);
        const areaB = this._areas.find((a) => a.order === gutterOrder + 1);
        if (!areaA || !areaB) {
            return;
        }

        const prop = (this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight';
        this.containerSize = this.elementRef.nativeElement[prop];
        this.areaASize = this.containerSize * areaA.size / 100;
        this.areaBSize = this.containerSize * areaB.size / 100;

        const start: Point = {
            x: startEvent.screenX,
            y: startEvent.screenY,
        };

        this.eventsDragFct.push(this.renderer.listen('document', 'mousemove', (e: MouseEvent) => this.dragEvent(e, start, areaA, areaB)));
        this.eventsDragFct.push(this.renderer.listen('document', 'touchmove', (e: MouseEvent) => this.dragEvent(e, start, areaA, areaB)));
        this.eventsDragFct.push(this.renderer.listen('document', 'mouseup', () => this.stopDragging()));
        this.eventsDragFct.push(this.renderer.listen('document', 'touchend', () => this.stopDragging()));
        this.eventsDragFct.push(this.renderer.listen('document', 'touchcancel', () => this.stopDragging()));

        areaA.component.lockEvents();
        areaB.component.lockEvents();

        this.isDragging = true;
        this.notify('start');
    }

    public refresh() {
        this.stopDragging();

        // ORDERS: Set css 'order' property depending on user input or added order
        const nbCorrectOrder = this._areas.filter((a) => a.orderUser !== null && !isNaN(a.orderUser)).length;
        if (nbCorrectOrder === this._areas.length) {
            this._areas.sort((a, b) => +a.orderUser - +b.orderUser);
        }

        this._areas.forEach((a, i) => {
            a.order = i * 2;
            a.component.setStyle('order', a.order);
        });

        // SIZES: Set css 'flex-basis' property depending on user input or equal sizes
        const totalSize = this._areas.map((a) => a.sizeUser).reduce((acc, s) => acc + s, 0);
        const toBeDefined = this._areas.filter((a) => !a.sizeUser || isNaN(a.sizeUser));

        if ((totalSize < 99.99 || totalSize > 100.01) && this._areas.length > 1) {
            if (toBeDefined.length === 0) {
                // Map to 100%
                this._areas.forEach((a) => {
                    const adjustedSize = Number(a.sizeUser) * 100 / totalSize;
                    a.size = adjustedSize;
                });
            } else if (totalSize < 99.99) {
                // Share the remaining size to the undefined areas
                let remain = (100 - totalSize);
                let toBeDefinedLength = toBeDefined.length;
                toBeDefined.forEach((a) => {
                    const size = remain / toBeDefinedLength--;
                    a.size = size;
                    remain -= size;
                });
                this._areas
                    .filter((a) => a.sizeUser && !isNaN(a.sizeUser))
                    .forEach((a) => a.size = Number(a.sizeUser));
            } else {
                const size = Number((100 / this._areas.length).toFixed(3));
                this._areas.forEach((a) => a.size = size);
            }
        } else if (totalSize === 0 && this._areas.length === 1) {
            this._areas[0].size = 100;
        } else {
            this._areas.forEach((a) => a.size = Number(a.sizeUser));
        }

        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    }

    private refreshStyleSizes() {
        const f = this.gutterSize * this.nbGutters / this._areas.length;
        this._areas.forEach((a) => a.component.setStyle('flex-basis', `calc( ${a.size}% - ${f}px )`));
    }

    private dragEvent(event: MouseEvent, start: Point, areaA: IAreaData, areaB: IAreaData) {
        if (!this.isDragging) {
            return;
        }

        const end: Point = {
            x: event.screenX,
            y: event.screenY,
        };

        this.drag(start, end, areaA, areaB);
    }

    private drag(start: Point, end: Point, areaA: IAreaData, areaB: IAreaData) {
        const offsetPixel = (this.direction === 'horizontal') ? (start.x - end.x) : (start.y - end.y);

        const newSizePixelA = this.areaASize - offsetPixel;
        const newSizePixelB = this.areaBSize + offsetPixel;

        const minPercentA = areaA.minPixel ? (areaA.minPixel + 5) / this.containerSize * 100 : 0;
        const minPercentB = areaB.minPixel ? (areaB.minPixel + 5) / this.containerSize * 100 : 0;

        let newSizePercentA = newSizePixelA / this.containerSize * 100;
        let newSizePercentB = newSizePixelB / this.containerSize * 100;

        if (newSizePercentA <= minPercentA) {
            newSizePercentA = minPercentA;
            newSizePercentB = areaA.size + areaB.size - minPercentA;
        } else if (newSizePercentB <= minPercentB) {
            newSizePercentB = minPercentB;
            newSizePercentA = areaA.size + areaB.size - minPercentB;
        } else {
            newSizePercentA = Number(newSizePercentA.toFixed(3));
            newSizePercentB = Number((areaA.size + areaB.size - newSizePercentA).toFixed(3));
        }

        areaA.size = newSizePercentA;
        areaB.size = newSizePercentB;

        this.refreshStyleSizes();
        this.notify('progress');
    }

    private stopDragging() {
        if (!this.isDragging) {
            return;
        }

        this._areas.forEach((a) => a.component.unlockEvents());

        while (this.eventsDragFct.length > 0) {
            const fct = this.eventsDragFct.pop();
            if (fct) {
                fct();
            }
        }

        this.containerSize = 0;
        this.areaASize = 0;
        this.areaBSize = 0;

        this.isDragging = false;
        this.notify('end');
    }

    private notify(type: string) {
        const data: number[] = this._areas.map((a) => a.size);

        switch (type) {
            case 'start':
                return this.dragStart.emit(data);
            case 'progress':
                return this.dragProgress.emit(data);
            case 'end':
                return this.dragEnd.emit(data);
            default:
                return null;
        }
    }
}
