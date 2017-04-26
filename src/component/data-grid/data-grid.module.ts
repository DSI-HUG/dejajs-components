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
import { DejaSortingModule } from '../../common/core/sorting/index';
import { DejaDragDropModule } from '../dragdrop/dragdrop.module';
import { DejaTreeListModule } from '../tree-list/tree-list.module';
import { DejaGridComponent, DejaGridGroupAreaComponent, DejaGridHeaderComponent, DejaGridParentRowComponent, DejaGridRowComponent } from './index';

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
