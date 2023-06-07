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
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { DejaColorSelectorComponent } from './color-selector.component';

@NgModule({
    declarations: [DejaColorSelectorComponent],
    exports: [DejaColorSelectorComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class DejaColorSelectorModule { }

export * from './color-selector.component';
