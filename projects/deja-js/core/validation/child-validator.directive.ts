/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, forwardRef, } from '@angular/core';
import { NG_VALIDATORS, NgControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DejaChildValidatorDirective),
            multi: true,
        },
    ],
    selector: '[deja-child-validator]',
})
export class DejaChildValidatorDirective implements Validator {
    public parentControl: NgControl;

    public validate(): ValidationErrors {
        return this.parentControl && this.parentControl.errors;
    }
}
