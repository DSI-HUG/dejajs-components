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
import { MdProgressSpinnerModule } from '@angular/material';
import { CloningService } from '../../common/core/cloning/index';
import { DejaEditableModule } from '../content-editable/index';
import { DejaMouseDragDropModule, DejaMouseDragDropService } from '../mouse-dragdrop/index';
import { DejaTileComponent, DejaTileGroupComponent, DejaTilePositionDirective, DejaTilesComponent } from './index';

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
        DejaMouseDragDropService,
    ]
})
export class DejaTilesModule { }
