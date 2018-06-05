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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaComboListModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { routing } from './combo-list-demo.routes';
import { DejaComboListDemoComponent } from './combo-list.component';

@NgModule({
  declarations: [
    DejaComboListDemoComponent,
  ],
  exports: [
    DejaComboListDemoComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    DejaComboListModule,
    DejaMarkdownModule,
    routing,
  ],
  providers: [],
})
export class DejaComboListDemoModule { }
