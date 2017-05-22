/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { DejaSortingModule } from '../../common/core/sorting/sorting.module';
import { DejaDragDropModule } from '../dragdrop/dragdrop.module';
import { DejaTreeListModule } from '../tree-list/tree-list.module';
import { DejaGridGroupAreaComponent } from './data-grid-grouparea/data-grid-grouparea.component';
import { DejaGridHeaderComponent } from './data-grid-header/data-grid-header.component';
import { DejaGridParentRowComponent } from './data-grid-parent-row/data-grid-parent-row.component';
import { DejaGridRowComponent } from './data-grid-row/data-grid-row.component';
import { DejaGridComponent } from './data-grid.component';

@NgModule({
    declarations: [
        DejaGridComponent,
        DejaGridRowComponent,
        DejaGridParentRowComponent,
        DejaGridHeaderComponent,
        DejaGridGroupAreaComponent,
    ],
    exports: [
        DejaGridComponent,
        DejaGridRowComponent,
        DejaGridParentRowComponent,
        DejaGridHeaderComponent,
        DejaGridGroupAreaComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        DejaTreeListModule,
        DejaDragDropModule,
        DejaSortingModule,
    ],
})
export class DejaGridModule {

}
