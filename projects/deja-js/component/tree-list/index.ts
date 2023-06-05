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
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { DejaChildValidatorModule, DejaTextMetricsModule } from '@deja-js/component/core';
import { DejaItemModule } from '@deja-js/component/core/item-list';
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
