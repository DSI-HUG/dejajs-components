/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { _MatInputMixinBase, CanUpdateErrorState, ErrorStateMatcher, MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';

import { DejaTextMetricsService } from '../../common/core/text-metrics/text-metrics.service';
import { DejaChildValidatorDirective } from '../../common/core/validation/child-validator.directive';

export const createCounterRangeValidator = (maxValue: number, minValue: number) => {
    return (c: FormControl) => {
        const err = {
            rangeError: {
                given: c.value,
                max: maxValue,
                min: minValue
            }
        };

        return ((maxValue && c.value > maxValue) || (minValue && c.value < minValue)) ? err : null;
    };
};

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: MatFormFieldControl, useExisting: DejaNumericStepperComponent }],
    selector: 'deja-numeric-stepper',
    styleUrls: ['numeric-stepper.component.scss'],
    templateUrl: 'numeric-stepper.component.html'
})
export class DejaNumericStepperComponent extends _MatInputMixinBase implements CanUpdateErrorState, DoCheck, OnChanges, OnDestroy, ControlValueAccessor, MatFormFieldControl<number>, Validator {
    public static nextId = 0;
    @HostBinding() public id = `deja-numeric-stepper-${DejaNumericStepperComponent.nextId++}`;
    @HostBinding('class.floating') public get shouldLabelFloat() {
        return this.focused || !this.empty || this.alwaysDisplayUnit;
    }

    @HostBinding('attr.aria-describedby') public describedBy = '';

    public controlType = 'deja-numeric-stepper';
    public errorState = false;
    public size = 0;
    public stateChanges = new Subject<void>();
    public focused = false;
    /** Max value of stepper */
    @Input() public max: number;
    /** Min value of stepper */
    @Input() public min: number;
    /** Step for stepper : default 1 */
    @Input() public step = 1;
    /** Unit of stepper */
    @Input() public unit: string;

    @ViewChild(DejaChildValidatorDirective)
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
    public set alwaysDisplayUnit(value) {
        this._alwaysDisplayUnit = coerceBooleanProperty(value);
    }
    private _alwaysDisplayUnit: boolean;

    public get empty(): boolean {
        return !this._value && this._value !== 0;
    }

    private _value: number;

    /** Function for min / max validation */
    public validateFn: ValidatorFn;

    /** Output to get the event when the value is modified (no validation)  */
    @Output()
    public textChange: EventEmitter<number> = new EventEmitter<number>();

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

    /**
     * Get disable value
     */
    public get disabled() {
        return this.ngControl ? this.ngControl.disabled : this._disabled;
    }
    @HostBinding('attr.disabled') private _disabled: boolean = null;

    // NgModel implementation
    protected onTouchedCallback: () => void = () => { };
    protected onChangeCallback: (_: any) => void = () => { };
    protected onValidatorChangeCallback: () => void = () => { };

    constructor(
        public dejaTextMetricsService: DejaTextMetricsService,
        private elementRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef,
        @Self() @Optional() public ngControl: NgControl,
        private fm: FocusMonitor,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        _defaultErrorStateMatcher: ErrorStateMatcher,
    ) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }

        this.fm.monitor(elementRef.nativeElement, true).subscribe((origin) => {
            this.focused = !!origin;
            if (!this.focused) {
                this.onTouchedCallback();
            }
            this.stateChanges.next();
        });
    }

    public ngOnChanges(changes: any) {
        if (changes.min || changes.max) {
            this.validateFn = createCounterRangeValidator(this.max, this.min);
            if (this.ngControl && this.ngControl.control) {
                this.ngControl.control.setValidators(this.validateFn);
            }
        }
    }

    public ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    public validate(c: FormControl): ValidationErrors {
        return this.validateFn(c);
    }

    public ngOnDestroy() {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elementRef.nativeElement);
    }

    public setDescribedByIds(ids: string[]) {
        this.describedBy = ids.join(' ');
    }

    public onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.elementRef.nativeElement.querySelector('input').focus();
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
        this._value = isNaN(value) ? null : +value;
        this.checkSize(value);
        this.changeDetectorRef.markForCheck();
        this.textChange.emit(value);
    }

    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
    // ************* End of ControlValueAccessor Implementation **************

    public checkSize(value?: number) {
        this.size = this.dejaTextMetricsService.getTextWidth((value || this.value || 0).toString(), this.elementRef.nativeElement);
    }
}
