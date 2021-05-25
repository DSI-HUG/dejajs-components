/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { numberValidator } from './validators';

@Component({
    selector: 'deja-numeric-stepper-demo',
    styleUrls: ['./numeric-stepper-demo.component.scss'],
    templateUrl: './numeric-stepper-demo.component.html'
})
export class DejaNumericStepperDemoComponent {
    public tabIndex = 1;

    public value1 = 100;
    public value2 = 9.5;
    public value3 = 5;
    public value4 = 1;
    public value5 = 1;
    public value6 = 1;

    public numberForm: FormGroup;

    public constructor(private fb: FormBuilder) {
        this.numberForm = this.fb.group({
            numberValue3: [this.value3, numberValidator],
            numberValue4: [this.value4, numberValidator],
            numberValue5: [this.value5, numberValidator],
            numberValue6: [this.value6, numberValidator]
        });
    }

    public changeValue3(step: number): void {
        this.numberForm.controls.numberValue3.setValue(+this.numberForm.controls.numberValue3.value + step);
    }

    public changeValue4(step: number): void {
        this.numberForm.controls.numberValue4.setValue(+this.numberForm.controls.numberValue4.value + step);
    }

    public changeValue5(step: number): void {
        this.numberForm.controls.numberValue5.setValue(+this.numberForm.controls.numberValue5.value + step);
    }

    public changeValue6(step: number): void {
        this.numberForm.controls.numberValue6.setValue(+this.numberForm.controls.numberValue6.value + step);
    }
}
