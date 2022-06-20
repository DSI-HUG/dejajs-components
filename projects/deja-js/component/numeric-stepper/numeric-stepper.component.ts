/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm, UntypedFormControl, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { CanUpdateErrorState, ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { _MatInputMixinBase, DejaChildValidatorDirective, DejaTextMetricsService } from '@deja-js/component/core';
import { Subject } from 'rxjs';

export interface RangeError {
    rangeError: {
        given: unknown;
        max: NumberInput;
        min: NumberInput;
    };
}

export const createCounterRangeValidator = (comp: DejaNumericStepperComponent) => (c: UntypedFormControl): RangeError => {
    const err = {
        rangeError: {
            given: c.value,
            max: comp.max,
            min: comp.min
        }
    } as RangeError;

    if (c.value === null || c.value === undefined) {
        return null;
    }
    return comp.isOffLimits ? err : null;
};

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: MatFormFieldControl, useExisting: DejaNumericStepperComponent }],
    selector: 'deja-numeric-stepper',
    styleUrls: ['./numeric-stepper.component.scss'],
    templateUrl: './numeric-stepper.component.html'
})
// eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
export class DejaNumericStepperComponent extends _MatInputMixinBase implements CanUpdateErrorState, DoCheck, OnChanges, OnDestroy, ControlValueAccessor, MatFormFieldControl<number>, Validator {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static nextId = 0;

    /** Output to get the event when the value is modified (no validation)  */
    @Output() public readonly textChange = new EventEmitter<number>();

    @HostBinding() public id = `deja-numeric-stepper-${DejaNumericStepperComponent.nextId++}`;
    @HostBinding('class.floating')
    public get shouldLabelFloat(): boolean {
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
    public set inputElementRef(element: ElementRef<HTMLInputElement>) {
        if (element) {
            this.inputElement = element.nativeElement;
        }
    }

    /** Max value of stepper */
    public get max(): NumberInput {
        return this._max;
    }

    @Input()
    public set max(value: NumberInput) {
        this._max = coerceNumberProperty<number>(value, null);
        this.changeDetectorRef.markForCheck();
    }

    /** Min value of stepper */
    public get min(): NumberInput {
        return this._min;
    }

    @Input()
    public set min(value: NumberInput) {
        this._min = coerceNumberProperty<number>(value, null);
        this.changeDetectorRef.markForCheck();
    }

    public get isOffLimits(): boolean {
        return (this.min !== null && this.value < this.min) || (this.max !== null && this.value > this.max);
    }

    /** Step for stepper : default 1 */
    public get step(): NumberInput {
        return this._step;
    }

    @Input()
    public set step(value: NumberInput) {
        this._step = coerceNumberProperty(value, 1);
        this.changeDetectorRef.markForCheck();
    }

    /** hide the steppers */
    public get hideSteppers(): BooleanInput {
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
    @Input() public get placeholder(): string {
        return this._placeholder;
    }

    public set placeholder(plh: string) {
        this._placeholder = plh;
        this.stateChanges.next();
    }

    private _placeholder: string;

    /** unit always visible */
    @Input() public get alwaysDisplayUnit(): BooleanInput {
        return this._alwaysDisplayUnit;
    }

    public set alwaysDisplayUnit(value: BooleanInput) {
        this._alwaysDisplayUnit = coerceBooleanProperty(value);
    }

    private _alwaysDisplayUnit: boolean;

    public get empty(): boolean {
        return !this._value && this._value !== 0;
    }

    private _value: number;

    /**
 * Get disable value
 */
    public get disabled(): boolean {
        return this.ngControl ? this.ngControl.disabled : this._disabled;
    }

    /** Allow to disabled the component */
    @Input()
    public set disabled(value: boolean) {
        const disabled = coerceBooleanProperty(value);
        this._disabled = disabled || null;
        this.changeDetectorRef.markForCheck();
    }

    @Input()
    public get required(): boolean {
        return this._required;
    }

    public set required(req: boolean) {
        this._required = coerceBooleanProperty(req);
        this.stateChanges.next();
    }

    private _required = false;

    public constructor(
        public dejaTextMetricsService: DejaTextMetricsService,
        private elementRef: ElementRef<HTMLElement>,
        private changeDetectorRef: ChangeDetectorRef,
        @Self() @Optional() public ngControl: NgControl,
        private fm: FocusMonitor,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        _defaultErrorStateMatcher: ErrorStateMatcher
    ) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);

        console.warn('@deja-js/component/numeric-stepper is deprecated, and will be removed in a further version. Please use @deja-js/component/v2/numeric-stepper instead.');

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

    // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle, @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    public ngOnChanges(changes: any): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
    public ngDoCheck(): void {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
    public ngOnDestroy(): void {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elementRef.nativeElement);
    }

    public validate(c: UntypedFormControl): ValidationErrors {
        return this.validateFn(c) || c.validator?.(c);
    }

    public setDescribedByIds(ids: string[]): void {
        this.describedBy = ids.join(' ');
    }

    public onContainerClick(event: MouseEvent): void {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.elementRef.nativeElement.querySelector('input').focus();
        }
    }

    /** Give focus to this component */
    public setFocus(): void {
        if (this.inputElement) {
            this.inputElement.focus();
        }
    }

    // ************* ControlValueAccessor Implementation **************
    public get value(): number {
        return this._value;
    }

    public set value(val: number) {
        this.writeValue(val);
        this.onChangeCallback(val);
        this.onTouchedCallback();
        this.stateChanges.next();
    }

    public writeValue(value: number): void {
        if (value === null || value === undefined) {
            this._value = value;
        } else {
            this._value = isNaN(value) ? null : +value;
        }
        this.checkSize(value);
        this.changeDetectorRef.markForCheck();
        this.textChange.emit(value);
    }

    public registerOnChange(fn: (_a: unknown) => void): void {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    // ************* End of ControlValueAccessor Implementation **************

    public checkSize(value?: number): void {
        this.size = this.dejaTextMetricsService.getTextWidth((value || this.value || 0).toString(), this.elementRef.nativeElement);
    }

    // NgModel implementation
    protected onTouchedCallback = (): void => undefined;
    protected onChangeCallback = (_?: unknown): void => undefined;
    protected onValidatorChangeCallback = (): void => undefined;
}
