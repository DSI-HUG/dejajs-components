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
import { MatIconModule } from '@angular/material/icon';
import { DejaChipsModule } from '@deja-js/component/chips';
import { DejaDragDropModule } from '@deja-js/component/dragdrop';
import { DejaTreeListModule } from '@deja-js/component/tree-list';
import { DejaSortingModule } from '@deja-js/core';
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
        MatIconModule,
        DejaTreeListModule,
        DejaDragDropModule,
        DejaSortingModule,
        DejaChipsModule,
    ],
})
export class DejaGridModule {}

export * from './data-grid-column/data-grid-column';
export * from './data-grid-column/data-grid-column-layout';
export * from './data-grid-column/data-grid-column-layout-infos';
export * from './data-grid-row/data-grid-row-event';
export * from './data-grid-row/data-grid-rows-event';
export * from './data-grid-row/data-grid-row';
export * from './data-grid-parent-row/data-grid-parent-row';
export * from './data-grid-grouparea/data-grid-group';
export * from './data-grid-grouparea/data-grid-grouparea.component';
export * from './data-grid-header/data-grid-header.component';
export * from './data-grid-parent-row/data-grid-parent-row.component';
export * from './data-grid-row/data-grid-row.component';
export * from './data-grid.component';
