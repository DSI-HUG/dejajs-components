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
import { MdButtonModule, MdCheckboxModule, MdInputModule } from '@angular/material';
import { DejaChildValidatorModule } from './../../common/core/validation/index';
import { DejaDragDropModule } from './../dragdrop/index';
import { DejaListLoaderModule } from './../loaders/index';
import { DejaTextMetricsModule } from './text-metrics/index';
import { DejaTreeListComponent } from './tree-list.component';

@NgModule({
    declarations: [
        DejaTreeListComponent,
    ],
    exports: [DejaTreeListComponent],
    imports: [
        CommonModule,
        FormsModule,
        MdButtonModule,
        MdInputModule,
        MdCheckboxModule,
        DejaChildValidatorModule,
        DejaListLoaderModule,
        DejaDragDropModule,
        DejaTextMetricsModule,
    ],
})
export class DejaTreeListModule { }

export * from './tree-list-scroll-event';
export * from './tree-list.component';
export * from './text-metrics/index';
