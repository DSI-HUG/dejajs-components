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
import { DejaBackdropModule } from '../backdrop';
import { DejaCircularPickerModule }   from '../circular-picker/circular-picker.module';
import { DejaDateSelectorModule }   from '../date-selector';
import { DejaDropDownModule } from '../dropdown';
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
        DejaBackdropModule,
        DejaCircularPickerModule,
        DejaDateSelectorModule,
        DejaDropDownModule,
    ],
})
export class DejaDatePickerModule { }

