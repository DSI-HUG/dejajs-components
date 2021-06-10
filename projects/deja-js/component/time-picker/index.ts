/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DejaNumericStepperModule } from '@deja-js/component/v2/numeric-stepper';

import { DejaTimePickerComponent } from './time-picker.component';

@NgModule({
    declarations: [DejaTimePickerComponent],
    exports: [DejaTimePickerComponent],
    imports: [
        CommonModule,
        DejaNumericStepperModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class DejaTimePickerModule { }

export * from './time-picker.component';
