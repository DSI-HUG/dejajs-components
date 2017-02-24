/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
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
import { DejaTileComponent, DejaTileGroupComponent, DejaTilesComponent, DejaTilePositionDirective } from './index';
import { CloningService } from '../../common/core/cloning';

@NgModule({
    declarations: [DejaTileComponent, DejaTilesComponent, DejaTileGroupComponent, DejaTilePositionDirective],
    exports: [DejaTileComponent, DejaTilesComponent, DejaTileGroupComponent],
    imports: [
        CommonModule,
        FormsModule,
        DejaDragDropModule,
        DejaEditableModule,
    ],
    providers: [
        CloningService,
    ]
})
export class DejaTilesModule { }
