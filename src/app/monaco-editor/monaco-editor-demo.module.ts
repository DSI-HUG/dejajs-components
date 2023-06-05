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
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { DejaMonacoEditorModule } from '@deja-js/component/monaco-editor';
import { DejaSplitterModule } from '@deja-js/component/v2/splitter';

import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaMonacoEditorDemoComponent } from './monaco-editor-demo.component';

const routes: Routes = [
    { path: '', component: DejaMonacoEditorDemoComponent }
];

@NgModule({
    imports: [
        CommonModule,
        DejaMarkdownModule,
        DejaMonacoEditorModule,
        DejaSplitterModule,
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTabsModule,
        MatToolbarModule,
        RouterModule.forChild(routes)
    ],
    declarations: [DejaMonacoEditorDemoComponent]
})
export class MonacoEditorDemoModule { }
