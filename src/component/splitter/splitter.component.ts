/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/**
 * Created by rtr on 22.12.2016.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, Output, Renderer, SimpleChanges, ViewEncapsulation } from '@angular/core';
import {IAreaData} from './area-data.model';
import {Point} from './point.model';
import {SplitAreaDirective} from './split-area.directive';

const gutterSize = 'gutterSize';
const disabled = 'disabled';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-splitter',
    styleUrls: ['./splitter.scss'],
    templateUrl: './splitter.html',
})
export class DejaSplitterComponent implements OnChanges, OnDestroy {
    @Input() public direction = 'horizontal';
    @Input() public width: number;
    @Input() public height: number;
    @Input() public gutterSize = 10;
    @Input() public disabled = false;

    @Output() public dragStart = new EventEmitter<number[]>(false);
    @Output() public dragProgress = new EventEmitter<number[]>(false);
    @Output() public dragEnd = new EventEmitter<number[]>(false);

    @HostBinding('style.flex-direction') get styleFlexDirection() {
        return this.direction === 'horizontal' ? 'row' : 'column';
    }

    @HostBinding('style.width') get styleWidth() {
        return (this.width && !isNaN(this.width) && this.width > 0) ? this.width + 'px' : '100%';
    }

    @HostBinding('style.height') get styleHeight() {
        return (this.height && !isNaN(this.height) && this.height > 0) ? this.height + 'px' : '100%';
    }

    private get nbGutters(): number {
        return this.areas.length - 1;
    }

    private minPercent = 0.3;
    private areas: IAreaData[] = [];
    private isDragging = false;
    private containerSize = 0;
    private areaASize = 0;
    private areaBSize = 0;
    private eventsDragFct: Function[] = [];

    constructor(private cdRef: ChangeDetectorRef,
                private elementRef: ElementRef,
                private renderer: Renderer) {
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes[gutterSize] || changes[disabled]) {
            this.refresh();
        }
    }

    public ngOnDestroy() {
        this.stopDragging();
    }

    public addArea(component: SplitAreaDirective, orderUser: number | null, sizeUser: number | null, minPixel: number) {
        this.areas.push({
            component,
            orderUser,
            order: -1,
            sizeUser,
            size: -1,
            minPixel,
        });

        this.refresh();
    }

    public updateArea(component: SplitAreaDirective, orderUser: number | null, sizeUser: number | null, minPixel: number) {
        const item = this.areas.find((a) => a.component === component);

        if (item) {
            item.orderUser = orderUser;
            item.sizeUser = sizeUser;
            item.minPixel = minPixel;

            this.refresh();
        }
    }

    public removeArea(area: SplitAreaDirective) {
        const item = this.areas.find((a) => a.component === area);

        if (item) {
            const index = this.areas.indexOf(item);
            this.areas.splice(index, 1);
            this.areas.forEach((a, i) => a.order = i * 2);

            this.refresh();
        }
    }

    public startDragging(startEvent: MouseEvent, gutterOrder: number) {
        startEvent.preventDefault();

        if (this.disabled) {
            return;
        }

        const areaA = this.areas.find((a) => a.order === gutterOrder - 1);
        const areaB = this.areas.find((a) => a.order === gutterOrder + 1);
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

        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'mousemove', (e) => this.dragEvent(e, start, areaA, areaB)));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'touchmove', (e) => this.dragEvent(e, start, areaA, areaB)));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'mouseup', () => this.stopDragging()));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'touchend', () => this.stopDragging()));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'touchcancel', () => this.stopDragging()));

        areaA.component.lockEvents();
        areaB.component.lockEvents();

        this.isDragging = true;
        this.notify('start');
    }

    private refresh() {
        this.stopDragging();

        // ORDERS: Set css 'order' property depending on user input or added order
        const nbCorrectOrder = this.areas.filter((a) => a.orderUser && !isNaN(a.orderUser)).length;
        if (nbCorrectOrder === this.areas.length) {
            this.areas.sort((a, b) => +a.orderUser - +b.orderUser);
        }

        this.areas.forEach((a, i) => {
            a.order = i * 2;
            a.component.setStyle('order', a.order);
        });

        // SIZES: Set css 'flex-basis' property depending on user input or equal sizes
        const totalSize = this.areas.map((a) => a.sizeUser).reduce((acc, s) => acc + s, 0);
        const nbCorrectSize = this.areas.filter((a) => a.sizeUser && !isNaN(a.sizeUser) && a.sizeUser >= this.minPercent).length;

        if (totalSize < 99.99 || totalSize > 100.01 || nbCorrectSize !== this.areas.length) {
            const size = Number((100 / this.areas.length).toFixed(3));
            this.areas.forEach((a) => a.size = size);
        } else {
            this.areas.forEach((a) => a.size = Number(a.sizeUser));
        }

        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    }

    private refreshStyleSizes() {
        const f = this.gutterSize * this.nbGutters / this.areas.length;
        this.areas.forEach((a) => a.component.setStyle('flex-basis', `calc( ${ a.size }% - ${ f }px )`));
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

        if (newSizePixelA <= areaA.minPixel && newSizePixelB < areaB.minPixel) {
            return;
        }

        let newSizePercentA = newSizePixelA / this.containerSize * 100;
        let newSizePercentB = newSizePixelB / this.containerSize * 100;

        if (newSizePercentA <= this.minPercent) {
            newSizePercentA = this.minPercent;
            newSizePercentB = areaA.size + areaB.size - this.minPercent;
        } else if (newSizePercentB <= this.minPercent) {
            newSizePercentB = this.minPercent;
            newSizePercentA = areaA.size + areaB.size - this.minPercent;
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

        this.areas.forEach((a) => a.component.unlockEvents());

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
        const data: number[] = this.areas.map((a) => a.size);

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
