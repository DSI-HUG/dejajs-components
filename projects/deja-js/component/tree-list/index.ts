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
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DejaChildValidatorModule, DejaItemModule } from '@deja-js/component/core';
import { DejaTextMetricsModule } from '@deja-js/component/core/text';
import { DejaDragDropModule } from '@deja-js/component/dragdrop';
import { DejaListLoaderModule } from '@deja-js/component/loaders';

import { DejaTreeListComponent } from './tree-list.component';

@NgModule({
    declarations: [
        DejaTreeListComponent
    ],
    exports: [
        DejaTreeListComponent
    ],
    imports: [
        CommonModule,
        DejaChildValidatorModule,
        DejaDragDropModule,
        DejaItemModule,
        DejaListLoaderModule,
        DejaTextMetricsModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatInputModule
    ]
})
export class DejaTreeListModule { }

export * from './tree-list-scroll-event';
export * from './tree-list.component';
