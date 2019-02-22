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
import { MatButtonModule, MatIconModule } from '@angular/material';
import { DejaCircularPickerModule } from '@deja-js/component/circular-picker';
import { DejaDateFormatPipe } from './date-format.pipe';
import { DejaDateSelectorComponent } from './date-selector.component';

@NgModule({
    declarations: [DejaDateFormatPipe, DejaDateSelectorComponent],
    exports: [DejaDateSelectorComponent],
    imports: [
        DejaCircularPickerModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
    ],
})
export class DejaDateSelectorModule { }

export * from './date-format.pipe';
export * from './date-selector-item.model';
export * from './date-selector.component';
