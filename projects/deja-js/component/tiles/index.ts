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
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { DejaEditableModule } from '@deja-js/component/content-editable';
import { DejaMouseDragDropModule, DejaMouseDragDropService } from '@deja-js/component/mouse-dragdrop';
import { DejaTileGroupComponent } from './tile-group.component';
import { DejaTilePositionDirective } from './tile-position.directive';
import { DejaTileComponent } from './tile.component';
import { DejaTilesComponent } from './tiles.component';

@NgModule({
    declarations: [DejaTileComponent, DejaTilesComponent, DejaTileGroupComponent, DejaTilePositionDirective],
    exports: [DejaTileComponent, DejaTilesComponent, DejaTileGroupComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatIconModule,
        DejaMouseDragDropModule,
        DejaEditableModule,
    ],
    providers: [
        DejaMouseDragDropService,
    ]
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
