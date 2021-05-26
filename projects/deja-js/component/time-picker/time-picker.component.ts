/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Destroy } from '@deja-js/component/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

export enum TimePickerDisplayModeEnum {
    FULL_TIME,
    FULL_TIME_WITH_HOURS_DISABLED,
    FULL_TIME_WITH_MINUTES_DISABLED,
    HOURS_ONLY,
    MINUTES_ONLY,
}

/**
 * Time-picker component for Angular
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-time-picker',
    styleUrls: ['./time-picker.component.scss'],
    templateUrl: './time-picker.component.html'
})
export class DejaTimePickerComponent extends Destroy implements ControlValueAccessor, OnInit {

    /** Display mode for the time-picker */
    @Input() public mode = TimePickerDisplayModeEnum.FULL_TIME;

    /** Step of the arrows */
    @Input() public step = 1;

    /** Disabled property setter. Can be string or empty so you can use it like : <time-picker disabled></time-picker> */
    @Input()
    public set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this.changeDetectorRef.markForCheck();
    }

    /** To get disabled attribute. */
    public get disabled(): boolean {
        return this._disabled;
    }

    public hoursDisabled = false;
    public minutesDisabled = false;
    public modeMinutesOnly = TimePickerDisplayModeEnum.MINUTES_ONLY;
    public modeHoursOnly = TimePickerDisplayModeEnum.HOURS_ONLY;
    public onHoursChange$ = new Subject<Event | number>();
    public onMinutesChange$ = new Subject<Event | number>();
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
            debounceTime(1),
            distinctUntilChanged(),
            map(hours => {
                if (hours instanceof Event) {
                    hours = parseInt((hours.target as HTMLInputElement).value, 10);
                }
                return hours;
            }),
            takeUntil(this.destroyed$)
        ).subscribe(hours => {
            const clone = new Date(this.value.getTime());
            clone.setHours(hours);

            this.value = clone;
            this.changeDetectorRef.markForCheck();
        });

        this.onMinutesChange$.pipe(
            debounceTime(1),
            distinctUntilChanged(),
            map(minutes => {
                if (minutes instanceof Event) {
                    minutes = parseInt((minutes.target as HTMLInputElement).value, 10);
                }
                return minutes;
            }),
            takeUntil(this.destroyed$)
        ).subscribe(minutes => {
            const clone = new Date(this.value.getTime());
            clone.setMinutes(minutes);

            this.value = clone;
            this.changeDetectorRef.markForCheck();
        });
    }

    public ngOnInit(): void {
        this.hoursDisabled = this.mode === TimePickerDisplayModeEnum.FULL_TIME_WITH_HOURS_DISABLED;
        this.minutesDisabled = this.mode === TimePickerDisplayModeEnum.FULL_TIME_WITH_MINUTES_DISABLED;
    }

    // ************* ControlValueAccessor Implementation **************
    /** set accessor including call the onchange callback */
    public set value(v: Date) {
        if (v !== this._value) {
            this.writeValue(v);
            this.onChangeCallback(v);
        }
    }

    /** get accessor */
    public get value(): Date {
        return this._value;
    }

    /** From ControlValueAccessor interface */
    public writeValue(value: Date): void {
        if (value && value !== this._value) {
            const clone = new Date(value.getTime());
            this._value = clone;
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
