/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { filter, fromEvent, map, mergeWith, of, shareReplay, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { SplitAreaDirective } from './split-area.directive';
import { SplitterDirection } from './splitter-direction-type';

interface DraggingEvent {
    event: MouseEvent | TouchEvent;
    index: number;
}

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
    templateUrl: './splitter.component.html'
})
export class DejaSplitterComponent extends Destroy {
    /**
     * Size of the gutter in pixels
     * By default `10px`
     */
    @Input() public gutterSize = 10;
    /**
     * Event triggered when the user start to drag the cursor
     */
    @Output() public readonly dragStart = new EventEmitter(false);
    /**
     * Event triggered during the cursor's drag
     */
    @Output() public readonly dragProgress = new EventEmitter(false);
    /**
     * Event triggered when the user stop to drag the cursor
     */
    @Output() public readonly dragEnd = new EventEmitter(false);

    /**
     * Direction of the split
     * Can be `horizontal` or `vertical`
     */
    @Input()
    public set direction(direction: SplitterDirection) {
        this._direction = direction;
        this.ensureDirections();
    }

    public get direction(): SplitterDirection {
        return this._direction;
    }

    @HostBinding('style.flex-direction')
    protected get styleFlexDirection(): string {
        return this.direction === 'horizontal' ? 'row' : 'column';
    }

    @ContentChildren(SplitAreaDirective)
    protected set spliterAreas(spliterAreas: QueryList<SplitAreaDirective>) {
        this.areas = spliterAreas.toArray();
        this.areas.forEach((area, index) => area.order = 2 * index);
        this.ensureDirections();
    }

    @HostBinding('attr.direction')
    private _direction = 'horizontal' as SplitterDirection;

    @HostBinding('attr.disabled')
    private _disabled = null as boolean;

    protected startDragging$ = new Subject<DraggingEvent>();

    protected areas = new Array<SplitAreaDirective>() as ReadonlyArray<SplitAreaDirective>;

    /** Retourne ou definit si le selecteur est desactivé. */
    @Input()
    public set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value) || null;
    }

    public get disabled(): BooleanInput {
        return this._disabled;
    }

    /**
     * Constructor
     */
    public constructor(
        changeDetectorRef: ChangeDetectorRef,
        elementRef: ElementRef<HTMLElement>
    ) {
        super();

        this.startDragging$.pipe(
            filter(() => !this.disabled),
            switchMap(draggingEvent => {
                const areaA = this.areas.find(a => a.order === draggingEvent.index - 1);
                const areaB = this.areas.find(a => a.order === draggingEvent.index + 1);
                if (!areaA || !areaB) {
                    return of(draggingEvent);
                }

                const mouseEvent = draggingEvent.event as MouseEvent;
                const startPos = this.direction === 'horizontal' ? mouseEvent.pageX || mouseEvent.screenX : mouseEvent.pageY || mouseEvent.screenY;
                const containerSizeInPixels = this.direction === 'horizontal' ? elementRef.nativeElement.offsetWidth : elementRef.nativeElement.offsetHeight;
                const startSizeInPixelsA = areaA.sizeinPixels;
                const startSizeInPixelsB = areaB.sizeinPixels;

                this.dragStart.emit();

                const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
                    shareReplay({ bufferSize: 1, refCount: true })
                );

                const stopDragging$ = mouseMove$.pipe(
                    filter(event => event.buttons !== 1),
                    mergeWith(fromEvent(document, 'mouseup'), fromEvent(document, 'touchend'), fromEvent(document, 'touchcancel')),
                    tap(() => {
                        this.dragEnd.emit();
                    })
                );

                return mouseMove$.pipe(
                    filter(event => event.buttons === 1),
                    mergeWith(fromEvent<MouseEvent>(document, 'touchmove')),
                    map(event => {
                        const pos = this.direction === 'horizontal' ? event.pageX || event.screenX : event.pageY || event.screenY;
                        const diffInPixels = startPos - pos;
                        areaA.size = Math.min(100, Math.max(0, 100 * (startSizeInPixelsA - diffInPixels) / containerSizeInPixels));
                        areaB.size = Math.min(100, Math.max(0, 100 * (startSizeInPixelsB + diffInPixels) / containerSizeInPixels));
                        changeDetectorRef.markForCheck();
                        this.dragProgress.emit();
                        return draggingEvent;
                    }),
                    takeUntil(stopDragging$)
                );
            }),
            takeUntil(this.destroyed$)
        ).subscribe(draggingEvent => {
            draggingEvent.event.preventDefault();
            return false;
        });
    }

    private ensureDirections(): void {
        this.areas.forEach(area => area.direction = this.direction);
    }
}
