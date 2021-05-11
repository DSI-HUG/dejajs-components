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
import { Destroy, KeyCodes } from '@deja-js/component/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

/**
 * Numeric-stepper component for Angular
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-numeric-stepper',
    styleUrls: ['./numeric-stepper.component.scss'],
    templateUrl: './numeric-stepper.component.html'
})
export class DejaNumericStepperComponent extends Destroy implements ControlValueAccessor {

    /** Max length of the number input */
    @Input() public maxlength: number;

    /** The number format to apply to the displayed input value. For more info see https://angular.io/api/common/DecimalPipe */
    @Input() public numberFormat: string;

    /** Step of the arrows */
    @Input() public step = 1;

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
    public onInputKeydown$ = new Subject<KeyboardEvent>();
    private _disabled = false;
    private _value: number;

    /**
     * Constructor.
     * Create onchange and onkeydown Observable needed inside this control.
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

        this.onInputKeydown$.pipe(
            filter(event => (event.code === KeyCodes.UpArrow || event.code === KeyCodes.DownArrow)),
            takeUntil(this.destroyed$)
        ).subscribe(event => {
            switch (event.code) {
                case (KeyCodes.DownArrow):
                    this.decrement();
                    break;

                case (KeyCodes.UpArrow):
                    this.increment();
                    break;

                default:
                    break;
            }
        });
    }

    /** Decrement the value by the step */
    public decrement(): void {
        this.value = this.value - this.step;
    }

    /** Increment the value by the step */
    public increment(): void {
        this.value = this.value + this.step;
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
