/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnDestroy, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { DejaChildValidatorDirective, Destroy, KeyCodes } from '@deja-js/component/core';
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
export class DejaNumericStepperComponent extends Destroy implements ControlValueAccessor, MatFormFieldControl<number>, OnDestroy {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static nextId = 0;

    @HostBinding('attr.aria-describedby') public describedBy = '';
    @HostBinding() public id = `deja-numeric-stepper-${DejaNumericStepperComponent.nextId++}`;
    @HostBinding('class.floating')
    public get shouldLabelFloat(): boolean {
        return this.focused || !this.empty;
    }

    /** Max length of the number input */
    @Input()
    public get maxLength(): number {
        return this._maxLength;
    }

    public set maxLength(value: number) {
        this._maxLength = coerceNumberProperty(value);
        this.changeDetectorRef.markForCheck();
    }

    /** The number format to apply to the displayed input value. For more info see https://angular.io/api/common/DecimalPipe */
    @Input() public numberFormat: string;

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
    public get step(): number {
        return this._step;
    }

    public set step(value: number) {
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

    public errorState = false;
    public focused = false;
    public onInputChange$ = new Subject<Event>();
    public onInputKeydown$ = new Subject<KeyboardEvent>();
    // eslint-disable-next-line rxjs/finnish
    public stateChanges = new Subject<void>();
    private _disabled = false;
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
        @Self() @Optional() public ngControl: NgControl
    ) {
        super();

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
        this.value = this.value - this.step;
    }

    /** Increment the value by the step */
    public increment(): void {
        this.value = this.value + this.step;
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
    public ngOnDestroy(): void {
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

    protected onChangeCallback = (_a: unknown): void => undefined;
    protected onTouchedCallback = (): void => undefined;

}
