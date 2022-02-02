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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MouseDragDropModule } from '@deja-js/component/v2/mouse-dragdrop';

import { DejaTileComponent } from './tile.component';
import { DejaTilePositionDirective } from './tile-position.directive';
import { DejaTilesComponent } from './tiles.component';

@NgModule({
    declarations: [DejaTileComponent, DejaTilePositionDirective, DejaTilesComponent],
    exports: [DejaTileComponent, DejaTilesComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatProgressSpinnerModule,
        MouseDragDropModule
    ]
})
export class DejaTilesModule { }

export * from './tiles-refresh-params.interface';
export * from './tile.class';
export * from './tile.component';
export * from './tile-position.directive';
export * from './tiles.event';
export * from './tiles-layout.provider';
export * from './tiles.component';
