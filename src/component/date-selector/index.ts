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
import { MdButtonModule, MdIconModule } from '@angular/material';
import { DejaCircularPickerModule } from '../circular-picker/index';
import { DejaDateSelectorComponent } from './date-selector.component';

@NgModule({
    declarations: [DejaDateSelectorComponent],
    exports: [DejaDateSelectorComponent],
    imports: [
        DejaCircularPickerModule,
        CommonModule,
        FormsModule,
        MdButtonModule,
        MdIconModule,
    ],
})
export class DejaDateSelectorModule { }

export * from './date-selector.component';
