/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaNumericStepperModule } from '@deja-js/component/numeric-stepper';

import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaNumericStepperDemoComponent } from './numeric-stepper-demo.component';
import { routing } from './numeric-stepper-demo.routes';

@NgModule({
    declarations: [DejaNumericStepperDemoComponent],
    exports: [DejaNumericStepperDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        MatFormFieldModule,
        DejaNumericStepperModule,
        DejaMarkdownModule,
        routing,
        MatButtonModule,
        ReactiveFormsModule
    ],
    providers: [
    ]
})
export class DejaNumericStepperDemoModule { }
