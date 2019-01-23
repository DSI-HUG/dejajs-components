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
import {
    MatButtonModule, MatButtonToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { DejaPipeModule } from '../../common/core/pipes/index';
import { DejaColorSelectorModule } from '../color-selector/index';
import { DejaEditorModule } from '../editor/index';
import { DejaMouseDragDropModule } from '../mouse-dragdrop/index';
import { DejaMouseDragDropService } from '../mouse-dragdrop/mouse-dragdrop.service';
import { DejaNumericStepperModule } from '../numeric-stepper/index';
import { DejaOverlayModule } from '../overlay/index';
import { DejaPopupModule } from '../popup/index';
import { TileGroupStyleEditorComponent } from './tile-group-style-editor.component';
import { DejaTileGroupComponent } from './tile-group.component';
import { DejaTilePositionDirective } from './tile-position.directive';
import { DejaTileComponent } from './tile.component';
import { DejaTilesComponent } from './tiles.component';

@NgModule({
    declarations: [DejaTileComponent, DejaTilesComponent, DejaTileGroupComponent, DejaTilePositionDirective, TileGroupStyleEditorComponent],
    exports: [DejaTileComponent, DejaTilesComponent, DejaTileGroupComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        DejaColorSelectorModule,
        DejaMouseDragDropModule,
        DejaNumericStepperModule,
        DejaEditorModule,
        DejaOverlayModule,
        DejaPipeModule,
        DejaPopupModule
    ],
    providers: [
        DejaMouseDragDropService,
    ],
    entryComponents: [TileGroupStyleEditorComponent]
})
export class DejaTilesModule { }

export * from './tile-group.component';
export * from './tile.interface';
export * from './tile.class';
export * from './tile.component';
export * from './tile-position.directive';
export * from './tiles.event';
export * from './tiles-layout.provider';
export * from './tiles.component';
