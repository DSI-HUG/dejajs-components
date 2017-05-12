/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, HostListener } from '@angular/core';
import { AsyncValidatorFn, NgControl, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[validate-onblur]',
})
export class ValidationOnBlurDirective {
    private validators: ValidatorFn;
    private asyncValidators: AsyncValidatorFn;
    private wasChanged = false;

    constructor(public formControl: NgControl) {
    }

    @HostListener('focus')
    protected onFocus() {
        this.wasChanged = false;
        this.validators = this.formControl.control.validator;
        this.asyncValidators = this.formControl.control.asyncValidator;
        this.formControl.control.clearAsyncValidators();
        this.formControl.control.clearValidators();
    }

    @HostListener('keyup')
    protected onKeyup() {
        this.wasChanged = true; // keyboard change
    }

    @HostListener('change')
    protected onChange() {
        this.wasChanged = true; // copypaste change
    }

    @HostListener('ngModelChange')
    protected onNgModelChange() {
        this.wasChanged = true; // ng-value change
    }

    @HostListener('blur')
    protected onBlur() {
        this.formControl.control.setAsyncValidators(this.asyncValidators);
        this.formControl.control.setValidators(this.validators);
        if (this.wasChanged) {
            this.formControl.control.updateValueAndValidity();
        }
    }
}
