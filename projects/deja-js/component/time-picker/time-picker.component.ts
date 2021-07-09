/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Optional, Output, Self, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Destroy } from '@deja-js/component/core';
import { set } from 'date-fns';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

export type TimePickerDisplayMode = 'fullTime' | 'fullTimeWithHoursDisabled' | 'fullTimeWithMinutesDisabled' | 'hoursOnly' | 'minutesOnly';

/**
 * Time-picker component for Angular
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-time-picker',
    styleUrls: ['./time-picker.component.scss'],
    templateUrl: './time-picker.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DejaTimePickerComponent extends Destroy implements ControlValueAccessor {
    @Output() public readonly timeChange = new EventEmitter<Date>();

    /** Display mode for the time-picker */
    @Input() public mode: TimePickerDisplayMode = 'fullTime';

    @Input()
    public set time(value: Date) {
        this.writeValue(value);
    }

    public get time(): Date {
        return this.value;
    }

    /** Step of the arrows */
    @Input()
    public set step(value: NumberInput) {
        this._step = coerceNumberProperty(value);
        this.changeDetectorRef.markForCheck();
    }

    /** To get the step of the minutes arrows */
    public get step(): NumberInput {
        return this._step;
    }

    /** Disabled property setter. Can be string or empty so you can use it like : <time-picker disabled></time-picker> */
    @Input()
    public set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this.changeDetectorRef.markForCheck();
    }

    /** To get disabled attribute. */
    public get disabled(): BooleanInput {
        return this._disabled;
    }

    public onHoursChange$ = new Subject<Event | number>();
    public onMinutesChange$ = new Subject<Event | number>();
    public _step = 1;
    private _disabled = false;
    private _value: Date;

    public constructor(
        private changeDetectorRef: ChangeDetectorRef,
        @Self() @Optional() public control: NgControl
    ) {
        super();

        if (this.control) {
            this.control.valueAccessor = this;
        }

        this.onHoursChange$.pipe(
            debounceTime(10),
            distinctUntilChanged(),
            map(hours => {
                if (hours instanceof Event) {
                    hours = parseInt((hours.target as HTMLInputElement).value, 10);
                }
                return hours;
            }),
            takeUntil(this.destroyed$)
        ).subscribe(hours => {
            const value = this.value?.getTime();
            const clone = value ? new Date(value) : set(new Date(), { hours: 0, minutes: 0, seconds: 0 });
            clone.setHours(hours);

            this.value = clone;
            this.changeDetectorRef.markForCheck();
        });

        this.onMinutesChange$.pipe(
            debounceTime(10),
            distinctUntilChanged(),
            map(minutes => {
                if (minutes instanceof Event) {
                    minutes = parseInt((minutes.target as HTMLInputElement).value, 10);
                }
                return minutes;
            }),
            takeUntil(this.destroyed$)
        ).subscribe(minutes => {
            const value = this.value?.getTime();
            const clone = value ? new Date(value) : set(new Date(), { hours: 0, minutes: 0, seconds: 0 });
            clone.setMinutes(minutes);

            this.value = clone;
            this.changeDetectorRef.markForCheck();
        });
    }

    // ************* ControlValueAccessor Implementation **************
    /** set accessor including call the onchange callback */
    public set value(v: Date) {
        if (v !== this._value) {
            this.writeValue(v);
            this.onChangeCallback(v);
            this.timeChange.emit(v);
        }
    }

    /** get accessor */
    public get value(): Date {
        return this._value;
    }

    /** From ControlValueAccessor interface */
    public writeValue(value: Date): void {
        if ((value || null) !== (this._value || null)) {
            this._value = value ? new Date(value.getTime()) : set(new Date(), { hours: 0, minutes: 0, seconds: 0 });
            this.changeDetectorRef.markForCheck();
        }
    }

    /** From ControlValueAccessor interface */
    public registerOnChange(fn: (_a: unknown) => void): void {
        this.onChangeCallback = fn;
    }

    /** From ControlValueAccessor interface */
    public registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    // ************* End of ControlValueAccessor Implementation **************

    protected onChangeCallback = (_a: unknown): void => undefined;
    protected onTouchedCallback = (): void => undefined;
}
