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
import { MdButtonModule } from '@angular/material';
import { DejaColorSelectorModule } from '../color-selector/color-selector.module';
import { DejaDropDownModule } from '../dropdown/dropdown.module';
import { DejaColorPickerComponent } from './color-picker.component';

@NgModule({
    declarations: [DejaColorPickerComponent],
    exports: [DejaColorPickerComponent],
    imports: [
        CommonModule,
        FormsModule,
        DejaColorSelectorModule,
        DejaDropDownModule,
        MdButtonModule,
    ],
})
export class DejaColorPickerModule { }
