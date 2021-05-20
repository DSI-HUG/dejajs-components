/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, HostBinding, Input, OnChanges, OnDestroy, Optional, Self, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { CanUpdateErrorState, ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { DejaChildValidatorDirective, KeyCodes } from '@deja-js/component/core';
import { _MatInputMixinBase } from '@deja-js/component/core/util';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

export interface RangeError {
    rangeError: {
        given: unknown;
        max: NumberInput;
        min: NumberInput;
    };
}

export const createCounterRangeValidator = (comp: DejaNumericStepperComponent) => (c: FormControl): RangeError => {
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

/**
 * Numeric-stepper component for Angular
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: MatFormFieldControl, useExisting: DejaNumericStepperComponent }],
    selector: 'deja-numeric-stepper',
    styleUrls: ['./numeric-stepper.component.scss'],
    templateUrl: './numeric-stepper.component.html',
    encapsulation: ViewEncapsulation.None
})
// eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
export class DejaNumericStepperComponent extends _MatInputMixinBase implements CanUpdateErrorState, ControlValueAccessor, DoCheck, MatFormFieldControl<number>, OnChanges, OnDestroy, Validator {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static nextId = 0;

    @HostBinding('attr.aria-describedby') public describedBy = '';
    @HostBinding() public id = `deja-numeric-stepper-${DejaNumericStepperComponent.nextId++}`;

    /** The number format to apply to the displayed input value. For more info see https://angular.io/api/common/DecimalPipe */
    @Input() public numberFormat: string;

    @HostBinding('attr.disabled') private _disabled = false;

    @HostBinding('class.floating')
    public get shouldLabelFloat(): boolean {
        return this.focused || !this.empty;
    }

    /** Max value of stepper */
    public get max(): NumberInput {
        return this._max;
    }

    @Input()
    public set max(value: NumberInput) {
        this._max = coerceNumberProperty(value, null);
        this.changeDetectorRef.markForCheck();
    }

    /** Min value of stepper */
    public get min(): NumberInput {
        return this._min;
    }

    @Input()
    public set min(value: NumberInput) {
        this._min = coerceNumberProperty(value, null);
        this.changeDetectorRef.markForCheck();
    }

    /** Max length of the number input */
    @Input()
    public get maxLength(): NumberInput {
        return this._maxLength;
    }

    public set maxLength(value: NumberInput) {
        this._maxLength = coerceNumberProperty(value);
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

    /** Step of the arrows */
    @Input()
    public get step(): NumberInput {
        return this._step;
    }

    public set step(value: NumberInput) {
        this._step = coerceNumberProperty(value);
        this.changeDetectorRef.markForCheck();
    }

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

    public get empty(): boolean {
        return !this._value;
    }

    /** Placeholder of the input */
    @Input() public get placeholder(): string {
        return this._placeholder;
    }

    public set placeholder(plh: string) {
        this._placeholder = plh;
        this.stateChanges.next();
    }

    public get isOffLimits(): boolean {
        return (this.min !== null && this.value < this.min) || (this.max !== null && this.value > this.max);
    }

    public errorState = false;
    public focused = false;
    public _max: number = null;
    public _min: number = null;
    public onInputChange$ = new Subject<Event>();
    public onInputKeydown$ = new Subject<KeyboardEvent>();
    // eslint-disable-next-line rxjs/finnish
    public stateChanges = new Subject<void>();
    /** Function for min / max validation */
    public validateFn: ValidatorFn;
    protected destroyed$ = new Subject();
    private _maxLength: number;
    private _placeholder: string;
    private _required = false;
    private _step = 1;
    private _value: number;

    /**
     * Constructor.
     * Create onchange and onkeydown Observable needed inside this control.
     */
    public constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private elementRef: ElementRef,
        @Self() @Optional() public ngControl: NgControl,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        _defaultErrorStateMatcher: ErrorStateMatcher
    ) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);

        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
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
        this.value = this.value - this._step;
        this.stateChanges.next();
    }

    /** Increment the value by the step */
    public increment(): void {
        this.value = this.value + this._step;
        this.stateChanges.next();
    }

    @ViewChild(DejaChildValidatorDirective)
    protected set inputValidatorDirective(value: DejaChildValidatorDirective) {
        if (value) {
            value.parentControl = this.ngControl;
        }
    }

    // ************* ControlValueAccessor Implementation **************
    /** set accessor including call the onchange callback */
    public set value(v: number) {
        if (v !== this._value && !isNaN(v)) {
            this.writeValue(v);
            this.onChangeCallback(v);
            this.stateChanges.next();
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

    // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
    public ngDoCheck(): void {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle, @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    public ngOnChanges(changes: any): void {
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
    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
        this.stateChanges.complete();
    }

    public onContainerClick(event: MouseEvent): void {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.elementRef.nativeElement.querySelector('input').focus();
        }
    }

    public setDescribedByIds(ids: string[]): void {
        this.describedBy = ids.join(' ');
    }

    public validate(c: FormControl): ValidationErrors {
        return this.validateFn(c) || c.validator?.(c);
    }

    // NgModel implementation
    protected onChangeCallback = (_a: unknown): void => undefined;
    protected onTouchedCallback = (): void => undefined;
    protected onValidatorChangeCallback = (): void => undefined;

}
