/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { DejaComboListActionbarComponent } from './component/combo-list-actionbar/combo-list-actionbar.component';
import { DejaComboListChildComponent } from './component/combo-list-child/combo-list-child.component';
import { DejaComboListComponent } from './container/combo-list.component';

import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        FlexLayoutModule,
        FormsModule,
    ],
    declarations: [
        DejaComboListComponent,
        DejaComboListChildComponent,
        DejaComboListActionbarComponent,
    ],
    exports: [
        DejaComboListComponent,
        DejaComboListChildComponent,
    ]
})
export class DejaComboListModule { }

export * from './component/combo-list-actionbar/combo-list-actionbar.component';
export * from './component/combo-list-child/combo-list-child.component';
export * from './container/combo-list.component';
