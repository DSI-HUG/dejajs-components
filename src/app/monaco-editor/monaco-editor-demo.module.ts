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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { DejaMonacoEditorModule } from '@deja-js/component/monaco-editor';
import { DejaSplitterModule } from '@deja-js/component/splitter';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaMonacoEditorDemoComponent } from './monaco-editor-demo.component';
import { MonacoEditorDemoService } from './monaco-editor-demo.service';

const routes: Routes = [
    { path: '', component: DejaMonacoEditorDemoComponent },
];

@NgModule({
    imports: [
        DejaMonacoEditorModule,
        CommonModule,
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTabsModule,
        MatToolbarModule,
        DejaSplitterModule,
        DejaMarkdownModule,
        RouterModule.forChild(routes),
    ],
    declarations: [DejaMonacoEditorDemoComponent],
    providers: [
        MonacoEditorDemoService
    ],
})
export class MonacoEditorDemoModule { }
