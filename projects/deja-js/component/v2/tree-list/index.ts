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
import { DejaChildValidatorModule } from '@deja-js/component/core';
import { DejaTextMetricsModule } from '@deja-js/component/core';
import { DejaDragDropModule } from '@deja-js/component/dragdrop';
import { DejaListLoaderModule } from '@deja-js/component/loaders';
import { ItemModule } from '@deja-js/component/v2/item-list';
import { ViewPortModule } from '@deja-js/component/v2/viewport';

import { TreeListComponent } from './tree-list.component';

@NgModule({
    declarations: [
        TreeListComponent
    ],
    exports: [
        TreeListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
        DejaChildValidatorModule,
        DejaListLoaderModule,
        DejaDragDropModule,
        DejaTextMetricsModule,
        ItemModule,
        ViewPortModule
    ]
})
export class TreeListModule { }

export * from './tree-list.component';
