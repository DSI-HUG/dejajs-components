/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { DejaTextMetricsService } from '../../common/core/text-metrics/text-metrics.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-numeric-stepper',
    styleUrls: ['numeric-stepper.component.scss'],
    templateUrl: 'numeric-stepper.component.html'
})
export class DejaNumericStepperComponent implements OnInit, ControlValueAccessor {
    public size = 0;
    private _value: number;

    /** Max value of stepper */
    @Input() public max: number;
    /** Min value of stepper */
    @Input() public min: number;
    /** Step for stepper : default 1 */
    @Input() public step = 1;
    /** Unit of stepper */
    @Input() public unit: string;

    /**
     * Placeholder of the input
     */
    @Input() public placeholder: string;

    /** Template for MatError inside mat-form-field-container */
    @ContentChild('errorTemplate') public matError: any;

    /** Allow to disabled the component */
    @Input()
    public set disabled(value: boolean | string) {
        const disabled = coerceBooleanProperty(value);
        this._disabled = disabled || null;
        this.changeDetectorRef.markForCheck();
    }

    /** Output to get the event when the value is modified (no validation)  */
    @Output()
    public textChange: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Get disable value
     */
    public get disabled() {
        return this._control ? this._control.disabled : this._disabled;
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
        @Self() @Optional() public _control: NgControl,
    ) {
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }

    public ngOnInit() { }

    // ************* ControlValueAccessor Implementation **************
    public get value() {
        return this._value;
    }

    public set value(val: number) {
        if (!this.disabled) {
            this.writeValue(val);
            this.onTouchedCallback();
        }
    }

    public checkLimits(val: number) {
        if (!this.disabled) {
            if (val === undefined || val === null) {
                val = null;
            } else if (val > this.max) {
                val = this.max;
            } else if (val < this.min) {
                val = this.min;
            } else {
                val = +val;
            }
            this.writeValue(val);
            this.onChangeCallback(val);
            this.onTouchedCallback();
        }
    }

    public writeValue(value: number) {
        this._value = value;
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
