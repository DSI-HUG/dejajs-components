/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Optional, Output, Self, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Destroy } from '@deja-js/component/core';
import { set } from 'date-fns';
import { debounce, distinctUntilChanged, map, Subject, takeUntil, timer } from 'rxjs';

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
    @ViewChild('hours') public hours: ElementRef<HTMLInputElement>;
    @ViewChild('minutes') public minutes: ElementRef<HTMLInputElement>;

    @Output() public readonly timeChange = new EventEmitter<Date>();

    /** Display mode for the time-picker */
    @Input() public mode: TimePickerDisplayMode = 'fullTime';

    @Input() public appearance: MatFormFieldAppearance = 'outline';

    @Input()
    public set autoFocus(value: BooleanInput) {
        this._autoFocus = coerceBooleanProperty(value);
    }

    @Input() public defaultPlaceholderHours = '_ _';
    @Input() public defaultPlaceholderMinutes = '_ _';

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
    private _autoFocus = true;

    public constructor(
        private changeDetectorRef: ChangeDetectorRef,
        @Self() @Optional() public control: NgControl
    ) {
        super();

        if (this.control) {
            this.control.valueAccessor = this;
        }

        this.onHoursChange$.pipe(
            debounce(hours => timer(typeof hours === 'object' ? 0 : 10)),
            distinctUntilChanged(),
            map(hours => {
                let isEvent = false;
                if (typeof hours === 'object') {
                    const value = (hours.target as HTMLInputElement).value;
                    hours = value !== undefined ? parseInt(value, 10) : undefined as number;
                    isEvent = true;
                }
                return {
                    hours: !isNaN(hours) ? hours : 0,
                    isEvent
                };
            }),
            takeUntil(this.destroyed$)
        ).subscribe(({ hours, isEvent }) => {
            const value = this.value?.getTime();
            const clone = value ? new Date(value) : set(new Date(), { hours: 0, minutes: 0, seconds: 0 });
            clone.setHours(hours);
            this.value = clone;
            this.changeDetectorRef.markForCheck();

            if (isEvent && this._autoFocus) {
                this.minutes.nativeElement.focus({
                    preventScroll: true
                });
                this.minutes.nativeElement.select();
            }
        });

        this.onMinutesChange$.pipe(
            debounce(minutes => timer(typeof minutes === 'object' ? 0 : 10)),
            distinctUntilChanged(),
            map(minutes => {
                if (typeof minutes === 'object') {
                    const value = (minutes.target as HTMLInputElement).value;
                    minutes = value !== undefined ? parseInt(value, 10) : undefined as number;
                }
                return !isNaN(minutes) ? minutes : 0;
            }),
            takeUntil(this.destroyed$)
        ).subscribe(minutes => {
            const value = this.value?.getTime();
            const clone = value ? new Date(value) : set(new Date(), { hours: 0, minutes: 0, seconds: 0 });
            if (minutes < 0) {
                minutes += 60;
            } else if (minutes >= 60) {
                minutes -= 60;
            }
            clone.setMinutes(minutes);
            this.value = clone;
            this.changeDetectorRef.markForCheck();
        });
    }

    public onKeyDown($event: KeyboardEvent, mode: 'hours' | 'minutes'): void {
        // Get input element
        const inputElement = mode === 'hours' ? this.hours.nativeElement : this.minutes.nativeElement;
        if ($event.key?.toLowerCase() === 'd') {
            $event.stopPropagation();
            $event.preventDefault();
            this.value = new Date();
        } else if ($event.key?.toLowerCase() === 'a' && $event.ctrlKey) {
            inputElement.select();
        } else if ($event.key && !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab', 'Enter', 'Control', 'Shift'].includes($event.key)) {
            // Set regex
            const regex = mode === 'hours' ? /^(\d|[01]\d|2[0123])$/ : /^(\d|[012345]\d)$/;

            // Get the selection in input element
            const [selectionStart, selectionEnd] = [inputElement.selectionStart, inputElement.selectionEnd].sort((a, b) => a - b);
            const selectionDiff = selectionEnd - selectionStart;

            // Get the current value in input element and update it with the new touched key
            const inputValue = inputElement.value || '';
            const inputValueArr = Array.from(inputValue);
            inputValueArr.splice(selectionStart, selectionDiff, $event.key);
            const newInputValue = inputValueArr.join('');

            // Prevent event if the time is not valid
            if (!regex.test(newInputValue)) {
                $event.stopPropagation();
                $event.preventDefault();
            } else if (this._autoFocus && mode === 'hours' && (parseFloat(newInputValue) >= 3 || newInputValue.length === 2)) {
                this.onHoursChange$.next($event);
            }
        }
    }

    public onClick(mode: 'hours' | 'minutes'): void {
        if (this._autoFocus) {
            if (mode === 'hours') {
                this.hours.nativeElement.select();
            } else {
                this.minutes.nativeElement.select();
            }
        }
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
            this._value = value && value instanceof Date ? new Date(value.getTime()) : null;
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
