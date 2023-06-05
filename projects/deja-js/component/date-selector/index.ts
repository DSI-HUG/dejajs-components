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
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { DejaTimePickerModule } from '@deja-js/component/time-picker';

import { DejaDateSelectorComponent } from './date-selector.component';

@NgModule({
    declarations: [DejaDateSelectorComponent],
    exports: [DejaDateSelectorComponent],
    imports: [
        CommonModule,
        DejaTimePickerModule,
        FormsModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class DejaDateSelectorModule { }

export * from './date-selector-item.model';
export * from './date-selector.component';
