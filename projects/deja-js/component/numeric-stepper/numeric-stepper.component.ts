/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { DoCheck } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HostBinding } from '@angular/core';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Optional } from '@angular/core';
import { Output } from '@angular/core';
import { Self } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';
import { NgControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { Validator } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { CanUpdateErrorState } from '@angular/material/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { DejaChildValidatorDirective, DejaTextMetricsService } from '@deja-js/core';
import { _MatInputMixinBase } from '@deja-js/core/util';
import { Subject } from 'rxjs';

export const createCounterRangeValidator = (comp: DejaNumericStepperComponent) => (c: FormControl) => {
    const err = {
        rangeError: {
            given: c.value,
            max: comp.max,
            min: comp.min
        }
    };

    if (c.value === null || c.value === undefined) {
        return null;
    }
    return comp.isOffLimits ? err : null;
};

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: MatFormFieldControl, useExisting: DejaNumericStepperComponent }],
    selector: 'deja-numeric-stepper',
    styleUrls: ['numeric-stepper.component.scss'],
    templateUrl: 'numeric-stepper.component.html'
})
// eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
export class DejaNumericStepperComponent extends _MatInputMixinBase implements CanUpdateErrorState, DoCheck, OnChanges, OnDestroy, ControlValueAccessor, MatFormFieldControl<number>, Validator {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static nextId = 0;

    /** Output to get the event when the value is modified (no validation)  */
    @Output() public readonly textChange = new EventEmitter<number>();

    @HostBinding() public id = `deja-numeric-stepper-${DejaNumericStepperComponent.nextId++}`;
    @HostBinding('class.floating') public get shouldLabelFloat() {
        return this.focused || !this.empty || this._alwaysDisplayUnit;
    }

    @HostBinding('attr.aria-describedby') public describedBy = '';
    @HostBinding('attr.disabled') public _disabled: boolean = null;

    /** Unit of stepper */
    @Input() public unit: string;

    public controlType = 'deja-numeric-stepper';
    public errorState = false;
    public size = 0;
    // eslint-disable-next-line rxjs/finnish
    public stateChanges = new Subject<void>();
    public focused = false;

    /** Function for min / max validation */
    public validateFn: ValidatorFn;

    public _max: number = null;
    public _min: number = null;
    public _step = 1;

    private _hideSteppers = false;
    private inputElement: HTMLInputElement;

    /** InputElement of stepper */
    @ViewChild('inputStepper')
    public set inputElementRef(element: ElementRef) {
        if (element) {
            this.inputElement = element.nativeElement;
        }
    }

    /** Max value of stepper */
    public get max() {
        return this._max;
    }

    @Input()
    public set max(value: NumberInput) {
        this._max = coerceNumberProperty(value, null);
        this.changeDetectorRef.markForCheck();
    }

    /** Min value of stepper */
    public get min() {
        return this._min;
    }

    @Input()
    public set min(value: NumberInput) {
        this._min = coerceNumberProperty(value, null);
        this.changeDetectorRef.markForCheck();
    }

    public get isOffLimits() {
        return (this.min !== null && this.value < this.min) || (this.max !== null && this.value > this.max);
    }

    /** Step for stepper : default 1 */
    public get step() {
        return this._step;
    }

    @Input()
    public set step(value: NumberInput) {
        this._step = coerceNumberProperty(value, 1);
        this.changeDetectorRef.markForCheck();
    }

    /** hide the steppers */
    public get hideSteppers() {
        return this._hideSteppers;
    }

    @Input()
    public set hideSteppers(value: BooleanInput) {
        this._hideSteppers = coerceBooleanProperty(value);
        this.changeDetectorRef.markForCheck();
    }

    @ViewChild(DejaChildValidatorDirective, { static: true })
    public set inputValidatorDirective(value: DejaChildValidatorDirective) {
        if (value) {
            value.parentControl = this.ngControl;
        }
    }

    /**
     * Placeholder of the input
     */
    @Input() public get placeholder() {
        return this._placeholder;
    }

    public set placeholder(plh) {
        this._placeholder = plh;
        this.stateChanges.next();
    }

    private _placeholder: string;

    /** unit always visible */
    @Input() public get alwaysDisplayUnit() {
        return this._alwaysDisplayUnit;
    }

    public set alwaysDisplayUnit(value: BooleanInput) {
        this._alwaysDisplayUnit = coerceBooleanProperty(value);
    }

    private _alwaysDisplayUnit: boolean;

    public get empty() {
        return !this._value && this._value !== 0;
    }

    private _value: number;

    /**
 * Get disable value
 */
    public get disabled() {
        return this.ngControl ? this.ngControl.disabled : this._disabled;
    }

    /** Allow to disabled the component */
    @Input()
    public set disabled(value) {
        const disabled = coerceBooleanProperty(value);
        this._disabled = disabled || null;
        this.changeDetectorRef.markForCheck();
    }

    @Input() public get required() {
        return this._required;
    }

    public set required(req) {
        this._required = coerceBooleanProperty(req);
        this.stateChanges.next();
    }

    private _required = false;

    public constructor(
        public dejaTextMetricsService: DejaTextMetricsService,
        private elementRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef,
        @Self() @Optional() public ngControl: NgControl,
        private fm: FocusMonitor,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        _defaultErrorStateMatcher: ErrorStateMatcher
    ) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }

        // eslint-disable-next-line rxjs-angular/prefer-takeuntil
        this.fm.monitor(elementRef.nativeElement, true).subscribe(origin => {
            this.focused = !!origin;
            if (!this.focused) {
                this.onTouchedCallback();
            }
            this.stateChanges.next();
        });
    }

    // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle, @typescript-eslint/no-explicit-any
    public ngOnChanges(changes: any) {
        if (changes.min || changes.max) {
            this.validateFn = createCounterRangeValidator(this);
            if (this.ngControl?.control) {
                const validators: ValidatorFn[] = [this.validateFn];
                if (this.ngControl.control.validator) {
                    validators.push(this.ngControl.control.validator);
                }
                this.ngControl.control.setValidators(validators);
            }
        }
    }

    // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
    public ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
    public ngOnDestroy() {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elementRef.nativeElement);
    }

    public validate(c: FormControl): ValidationErrors {
        return this.validateFn(c) || c.validator?.(c);
    }

    public setDescribedByIds(ids: string[]) {
        this.describedBy = ids.join(' ');
    }

    public onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.elementRef.nativeElement.querySelector('input').focus();
        }
    }

    /** Give focus to this component */
    public setFocus() {
        if (this.inputElement) {
            this.inputElement.focus();
        }
    }

    // ************* ControlValueAccessor Implementation **************
    public get value() {
        return this._value;
    }

    public set value(val: number) {
        this.writeValue(val);
        this.onChangeCallback(val);
        this.onTouchedCallback();
        this.stateChanges.next();
    }

    public writeValue(value: number) {
        if (value === null || value === undefined) {
            this._value = value;
        } else {
            this._value = isNaN(value) ? null : +value;
        }
        this.checkSize(value);
        this.changeDetectorRef.markForCheck();
        this.textChange.emit(value);
    }

    public registerOnChange(fn: (_a: unknown) => void) {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: () => void) {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
    // ************* End of ControlValueAccessor Implementation **************

    public checkSize(value?: number) {
        this.size = this.dejaTextMetricsService.getTextWidth((value || this.value || 0).toString(), this.elementRef.nativeElement);
    }

    // NgModel implementation
    protected onTouchedCallback = () => undefined as void;
    protected onChangeCallback = (_?: unknown) => undefined as void;
    protected onValidatorChangeCallback = () => undefined as void;
}
