/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { MonacoEditorModule } from '@deja-js/component/v2/monaco-editor';
import { DejaSplitterModule } from '@deja-js/component/v2/splitter';

import { DejaMarkdownModule } from '../../../component/markdown/index';
import { MonacoEditorDemoComponent } from './monaco-editor-demo.component';


const routes: Routes = [
    { path: '', component: MonacoEditorDemoComponent }
];

@NgModule({
    imports: [
        CommonModule,
        DejaMarkdownModule,
        DejaSplitterModule,
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTabsModule,
        MatToolbarModule,
        MonacoEditorModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MonacoEditorDemoComponent]
})
export class MonacoEditorDemoModule { }
