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
import { MatButtonModule, MatButtonToggleModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule } from '@angular/material';
import { DejaColorSelectorModule } from '@deja-js/component/color-selector';
import { DejaEditorModule } from '@deja-js/component/editor';
import { DejaMouseDragDropModule, DejaMouseDragDropService } from '@deja-js/component/mouse-dragdrop';
import { DejaNumericStepperModule } from '@deja-js/component/numeric-stepper';
import { DejaOverlayModule } from '@deja-js/component/overlay';
import { DejaPopupModule } from '@deja-js/component/popup';
import { DejaMaterialColorsModule } from '@deja-js/core';
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
        MatTooltipModule,
        DejaColorSelectorModule,
        DejaMouseDragDropModule,
        DejaNumericStepperModule,
        DejaMaterialColorsModule,
        DejaEditorModule,
        DejaOverlayModule,
        DejaPopupModule
    ],
    providers: [
        DejaMouseDragDropService,
    ],
    entryComponents: [TileGroupStyleEditorComponent]
})
export class DejaTilesModule { }

export * from './tile-group-style-editor-config';
export * from './tile-group-style-editor.component';
export * from './tile-group.class';
export * from './tile-group.component';
export * from './tile.class';
export * from './tile.component';
export * from './tile-position.directive';
export * from './tiles.event';
export * from './tiles-layout.provider';
export * from './tiles.component';
