/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { fromEvent as observableFromEvent, merge as observableMerge } from 'rxjs';
import { first, takeUntil, tap } from 'rxjs/operators';
import { IRange, IRangeEvent, IStepRangeEvent, Range } from './range.interface';

const noop = () => { };

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-range',
    styleUrls: ['./range.component.scss'],
    templateUrl: './range.component.html',
})
export class DejaRangeComponent implements ControlValueAccessor {
    // step can be either a numeric value, an array of accepted intervals or a function returning the next accepted interval
    @Input() public step: number | number[] | ((event: IStepRangeEvent) => number) = 1;
    // index of the selected range
    @Input() public selected = 0;
    // emit the selected range
    @Output() public select: EventEmitter<any> = new EventEmitter();
    // error emitter, used to notify the outside when forbidden actions are performed
    @Output() public errorFeedback: EventEmitter<any> = new EventEmitter();
    // custom templates
    @ContentChild('rangeTemplate') public rangeTemplate: any;
    @ContentChild('separatorTemplate') public separatorTemplate: any;
    // minimum range percentage, used to avoid 2 separator being on the same visual space
    private minimumRangePercentage = 0.01;

    private _readOnly = true;
    private _disabled = false;
    private _ranges: IRange[];

    public _onChangeCallback: (_: any) => void = noop;
    public _onTouchCallback: () => void = noop;
    public registerOnChange(fn: any): void { this._onChangeCallback = fn; }
    public registerOnTouched(fn: any): void { this._onTouchCallback = fn; }

    // inner model
    public get ranges(): IRange[] {
        return this._ranges || [];
    }

    public set ranges(ranges: IRange[]) {
        if (!!ranges) {
            this.writeValue(ranges);
            this._onChangeCallback(ranges);
        }
    }

    // read / write mode
    @Input()
    public set disabled(value: boolean | string) {
        this._disabled = coerceBooleanProperty(value);
        this.changeDetectorRef.markForCheck();
    }

    public get disabled() {
        return this._disabled;
    }

    // read / write mode
    @Input()
    public set readOnly(value: boolean | string) {
        this._readOnly = coerceBooleanProperty(value);
    }

    public get readOnly() {
        return this._readOnly || this.disabled;
    }

    constructor(private changeDetectorRef: ChangeDetectorRef, private elementRef: ElementRef, @Self() @Optional() public _control: NgControl) {
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }

    // ControlValueAccessor implementation
    public writeValue(ranges: IRange[]): void {
        if (!!ranges && !!ranges.length) {
            const host = this.elementRef.nativeElement.firstElementChild as HTMLElement;
            const hostWidth = host.getBoundingClientRect().width;
            const totalDifference = ranges[ranges.length - 1].max - ranges[0].min;

            this._ranges = ranges.map((range, index) => {
                // calculate new width
                const difference = ranges[index].max - ranges[index].min;
                const modelPercent = totalDifference / 100;
                const percent = difference / modelPercent;
                const viewValue = hostWidth * percent / 100;
                range.$width = +viewValue.toFixed(2);
                return range;
            });

            this.changeDetectorRef.markForCheck();
        }
    }

    public setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
    // End of ControlValueAccessor implementation

    @HostListener('window:resize', [])
    public onResize() {
        this.ranges = this.ranges.concat();
    }

    // add a new range, by splitting the selected one into 2 new ranges
    public add(): void {
        if (!this.readOnly) {
            if (typeof this.step === 'number') {
                const ranges = this.ranges;
                const index = this.selected;
                const selected = ranges[index];

                const difference = selected.max - selected.min;
                const totalDifference = ranges[ranges.length - 1].max - ranges[0].min;

                const minimumViewDifference = this.minimumRangePercentage * 2;
                const modelDifferencePercentage = difference / totalDifference;
                const isViewDifferenceEnough = modelDifferencePercentage > minimumViewDifference;

                let newMax;
                let newRange;

                const isModelDifferenceEnough = difference >= this.step * 2;

                if (isViewDifferenceEnough && isModelDifferenceEnough) {
                    newMax = selected.min + difference / 2;
                    newRange = new Range(selected.min, newMax);
                    selected.min = newMax;

                    // split array in half excluding the selected range
                    const leftSide = ranges.slice(0, index);
                    const rightSide = ranges.length - 1 > index ? ranges.slice(index + 1) : [];

                    // build new array with new range
                    let newRanges = [...leftSide, newRange, selected, ...rightSide];

                    // step
                    const newRangeIndex = newRanges.indexOf(newRange);
                    newRanges[newRangeIndex].max = this.toStep(newRanges, newRangeIndex, newRanges[newRangeIndex].max);

                    newRanges = newRanges
                        .map((range: IRange, _index: number) => {
                            if (_index !== 0) {
                                range.min = newRanges[_index - 1].max;
                            }
                            return range;
                        });

                    this.ranges = newRanges;

                } else {
                    this.errorFeedback.emit(new Error('Range is too small to be splitted'));
                }
            } else {
                throw new Error('Invalid step type, you have to implement the add function yourself for the fn & array.');
            }
        }
    }

    // remove the select range
    public remove(): void {
        if (!this.readOnly && this.ranges.length > 2) {
            const ranges = this.ranges
                .filter((_range: IRange, index: number) => this.selected !== index);
            this.ranges = ranges
                .map((range: IRange, index: number) => {
                    if (index !== ranges.length - 1) {
                        range.max = ranges[index + 1].min;
                    }
                    return range;
                });
        }
    }

    /** Force control to rebind */
    public refresh() {
        this.changeDetectorRef.markForCheck();
    }

    // set the new selected index and emit a IRangeEvent
    public onSelect(e: Event, index: number): void {
        if (this.disabled) {
            return;
        }

        if (this.selected !== index) {
            const event = e as IRangeEvent;
            event.range = this.ranges[index];
            event.index = index;
            event.ranges = this.ranges;
            this.select.emit(event);
            this.selected = index;
        }
    }

    public onMouseDown($event: MouseEvent, index: number): void {
        if (!this.readOnly) {
            const xStart = $event.pageX;
            const target = $event.target as HTMLElement;
            const ranges = this.ranges;
            const range = this.ranges[index];
            const rangeStart = range.max;

            // get the block HTMLElement (contains range HTMLElement & separator HTMLElement)
            let parentElement = target.parentElement;
            while (!parentElement.classList.contains('block')) {
                parentElement = parentElement.parentElement;
            }

            const up$ = observableFromEvent(document, 'mouseup');

            const leave$ = observableFromEvent(document.body, 'mouseleave');

            const kill$ = observableMerge(up$, leave$).pipe(
                first(),
                tap(() => {
                    const host = this.elementRef.nativeElement.firstElementChild as HTMLElement;
                    host.ownerDocument.body.classList.remove('noselect');

                    this._onChangeCallback(this._ranges);
                }));

            observableFromEvent(document, 'mousemove').pipe(
                takeUntil(kill$))
                .subscribe((event: MouseEvent) => {
                    const x = event.pageX;
                    const xDifference = -(xStart - x);

                    const nextRange = this.ranges[index + 1];

                    // compute total difference
                    const totalDifference = ranges[ranges.length - 1].max - ranges[0].min;

                    // calculate new width of the range, get host width
                    const host = this.elementRef.nativeElement.firstElementChild as HTMLElement;
                    const hostWidth = host.getBoundingClientRect().width;

                    // avoid drag
                    host.ownerDocument.body.classList.add('noselect');

                    // compute new model value
                    const modelDifference = xDifference * totalDifference / hostWidth;
                    let newMax = rangeStart + modelDifference;

                    const minDifference = this.minimumRangePercentage * totalDifference;
                    const min = range.min + minDifference;
                    const max = nextRange.max - minDifference;

                    newMax = Math.min(newMax, max);
                    newMax = Math.max(newMax, min);
                    const newStepped = this.toStep(ranges, index, newMax);

                    nextRange.min = range.max = newStepped;

                    ranges[index] = range;
                    ranges[index + 1] = nextRange;
                    this.writeValue(ranges);
                });
        }
    }

    private toStep(ranges: IRange[], index: number, newMax: number): number {

        const range = ranges[index];
        const maybeNextIndex = ranges.length - 1 > index ? index + 1 : index;
        const nextMax = ranges[maybeNextIndex].max;
        const previousMax = index !== 0 ? ranges[index - 1].max : 0;

        const totalDifference = ranges[ranges.length - 1].max - ranges[0].min;
        const minimumViewDifference = this.minimumRangePercentage * totalDifference;

        const viewMin = range.min + minimumViewDifference;
        const viewMax = nextMax - minimumViewDifference;

        if (typeof this.step === 'number') {

            const numericStep = this.step as number;
            const precision = 100 / (numericStep * 100);
            const steppedValue = (Math.round(newMax * precision) / precision);

            const mantisseLength = numericStep
                .toString()
                .replace(/[0-9]+\./, '')
                .length;

            const fixedValue = +steppedValue.toFixed(mantisseLength);

            const modelMax = Math.min(fixedValue, nextMax - numericStep);
            const modelMin = Math.max(fixedValue, previousMax + numericStep);

            const min = viewMin < modelMin ? modelMin : viewMin;
            const max = viewMax > modelMax ? modelMax : viewMax;

            const bestValue = newMax > range.max ? max : min;

            return bestValue;

        } else if (typeof this.step === 'function') {
            const event = {} as IStepRangeEvent;

            event.range = this.ranges[index];
            event.index = index;
            event.ranges = this.ranges;
            event.newMax = newMax;

            return this.step(event);

        } else if (this.step instanceof Array) {
            let idealValue = newMax;
            let bestDiff: number;
            this.step
                .filter((value) => value <= viewMax && value >= viewMin)
                .forEach((value) => {
                    const diff = Math.abs(value - newMax);
                    if (bestDiff === undefined || bestDiff > diff) {
                        idealValue = value;
                        bestDiff = diff;
                    }
                });

            return idealValue;

        } else { throw new Error('Invalid step type.'); }
    }
}
