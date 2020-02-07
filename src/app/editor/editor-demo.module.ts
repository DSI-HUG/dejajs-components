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
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaMatEditorModule } from '@deja-js/component/editor';

import { DejaMarkdownModule } from '../../component/markdown';
import { DejaEditorDemoComponent } from './editor-demo.component';
import { routing } from './editor-demo.routes';

@NgModule({
    declarations: [DejaEditorDemoComponent],
    exports: [DejaEditorDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        DejaMatEditorModule,
        DejaMarkdownModule,
        routing,
    ],
    providers: [],
})
export class DejaEditorDemoModule { }
