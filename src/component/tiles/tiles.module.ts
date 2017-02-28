/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DejaEditableModule } from '../content-editable';
import { DejaDragDropModule } from '../dragdrop';
import { DejaTileGroupComponent, DejaTilesComponent } from "./";

@NgModule({
    declarations: [DejaTilesComponent, DejaTileGroupComponent],
    exports: [DejaTilesComponent, DejaTileGroupComponent],
    imports: [
        CommonModule,
        FormsModule,
        DejaDragDropModule,
        DejaEditableModule,
    ],
})
export class DejaTilesModule { }
