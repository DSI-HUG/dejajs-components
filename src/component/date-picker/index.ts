/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { DejaChildValidatorModule } from '../../common/core/validation/index';
import { DejaCircularPickerModule } from '../circular-picker/index';
import { DejaDateSelectorModule } from '../date-selector/index';
import { DejaDatePickerComponent } from './date-picker.component';

@NgModule({
    declarations: [DejaDatePickerComponent],
    exports: [DejaDatePickerComponent],
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        DejaChildValidatorModule,
        DejaCircularPickerModule,
        DejaDateSelectorModule,
        TextMaskModule,
    ],
})
export class DejaDatePickerModule { }

export * from './format-to-mask';
export * from './date-picker.component';
