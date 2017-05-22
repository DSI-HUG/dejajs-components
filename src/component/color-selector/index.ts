/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { DejaColorFabComponent } from './color-fab.component';
import { DejaColorSelectorComponent } from './color-selector.component';

@NgModule({
    declarations: [DejaColorSelectorComponent, DejaColorFabComponent],
    exports: [DejaColorSelectorComponent, DejaColorFabComponent],
    imports: [
        CommonModule,
        FormsModule,
    ],
})
export class DejaColorSelectorModule { }

export * from './color-fab.class';
export * from './color-fab.component';
export * from './color-selector.component';
