/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DejaNumericStepperComponent } from '@deja-js/component/numeric-stepper';

@Component({
    selector: 'deja-numeric-stepper-demo',
    styleUrls: ['./numeric-stepper-demo.component.scss'],
    templateUrl: './numeric-stepper-demo.component.html'
})
export class DejaNumericStepperDemoComponent {
    public tabIndex = 1;
    public control = new FormControl(null as number, Validators.required);

    public focus(numStepper: DejaNumericStepperComponent): void {
        numStepper.setFocus();
    }

}
