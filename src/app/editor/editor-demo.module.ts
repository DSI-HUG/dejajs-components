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
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
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
        DejaMarkdownModule,
        DejaMatEditorModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        routing
    ],
    providers: []
})
export class DejaEditorDemoModule { }
