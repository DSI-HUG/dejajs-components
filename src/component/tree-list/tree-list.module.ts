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
import { MdButtonModule, MdCheckboxModule, MdInputModule } from '@angular/material';
import { DejaDragDropModule } from '../dragdrop/dragdrop.module';
import { DragDropService } from '../dragdrop/dragdrop.service';
import { DejaTextMetricsModule } from "./text-metrics/text-metrics.module";
import { DejaTreeListComponent } from "./tree-list.component";

@NgModule({
    declarations: [DejaTreeListComponent],
    exports: [DejaTreeListComponent],
    imports: [
        CommonModule,
        FormsModule,
        MdButtonModule,
        MdInputModule.forRoot(),
        MdCheckboxModule.forRoot(),
        DejaDragDropModule,
        DejaTextMetricsModule,
    ],
    providers: [DragDropService],
})
export class DejaTreeListModule { }
