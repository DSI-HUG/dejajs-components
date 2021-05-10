/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Destroy } from '@deja-js/component/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

/**
 * Time-picker component for Angular
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-time-picker',
    styleUrls: ['./time-picker.component.scss'],
    templateUrl: './time-picker.component.html'
})
export class DejaTimePickerComponent extends Destroy implements ControlValueAccessor {

    /** Step of the arrows */
    @Input() public step = 1;

    /** Is hours */
    @Input()
    public set hours(value: BooleanInput) {
        this._hours = coerceBooleanProperty(value);
        this.changeDetectorRef.markForCheck();
    }

    /** To get hours attribute. */
    public get hours(): BooleanInput {
        return this._hours;
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

    public onInputChange$ = new Subject<Event>();
    private _hours = false;
    private _disabled = false;
    private _value: number;

    /**
     * Constructor.
     * Create onkeydown Observable needed inside this control.
     */
    public constructor(private changeDetectorRef: ChangeDetectorRef, @Self() @Optional() public control: NgControl) {
        super();

        if (this.control) {
            this.control.valueAccessor = this;
        }

        this.onInputChange$.pipe(
            debounceTime(1),
            distinctUntilChanged(),
            map(event => parseInt((event.target as HTMLInputElement).value, 10)),
            takeUntil(this.destroyed$)
        ).subscribe(v => this.value = v);
    }

    // ************* ControlValueAccessor Implementation **************
    /** set accessor including call the onchange callback */
    public set value(v: number) {
        if (v !== this._value && !isNaN(v)) {
            this.writeValue(v);
            this.onChangeCallback(v);
        }
    }

    /** get accessor */
    public get value(): number {
        return this._value;
    }

    /** From ControlValueAccessor interface */
    public writeValue(value: number): void {
        if (value !== this._value) {
            this._value = value;
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
