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
import { MdButtonModule, MdIconModule, MdInputModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { DejaChildValidatorModule } from '../../common/core/validation/index';
import { DejaCircularPickerModule } from '../circular-picker/index';
import { DejaDateSelectorModule } from '../date-selector/index';
import { DejaOverlayModule } from '../overlay/index';
import { DejaDatePickerComponent } from './date-picker.component';

@NgModule({
    declarations: [DejaDatePickerComponent],
    exports: [DejaDatePickerComponent],
    imports: [
        CommonModule,
        FormsModule,
        MdIconModule,
        MdInputModule,
        MdButtonModule,
        DejaChildValidatorModule,
        DejaCircularPickerModule,
        DejaDateSelectorModule,
        DejaOverlayModule,
        TextMaskModule,
    ],
})
export class DejaDatePickerModule { }

export * from './format-to-mask';
export * from './date-picker.component';
