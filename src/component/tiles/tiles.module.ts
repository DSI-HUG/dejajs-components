/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdProgressSpinnerModule } from '@angular/material';
import { DejaEditableModule } from '../content-editable';
import { DejaMouseDragDropModule } from '../mouse-dragdrop';
import { DejaTileComponent, DejaTileGroupComponent, DejaTilesComponent, DejaTilePositionDirective } from './index';
import { CloningService } from '../../common/core/cloning';

@NgModule({
    declarations: [DejaTileComponent, DejaTilesComponent, DejaTileGroupComponent, DejaTilePositionDirective],
    exports: [DejaTileComponent, DejaTilesComponent, DejaTileGroupComponent],
    imports: [
        CommonModule,
        FormsModule,
        MdProgressSpinnerModule,
        DejaMouseDragDropModule,
        DejaEditableModule,
    ],
    providers: [
        CloningService,
    ]
})
export class DejaTilesModule { }
