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
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaMatEditorModule, DejaPipeModule, SafeHTMLPipe } from '@deja-js/component';

import { DejaMarkdownModule } from '../../component/markdown';
import { DejaEditorDemoComponent } from './editor-demo.component';
import { routing } from './editor-demo.routes';

@NgModule({
    declarations: [DejaEditorDemoComponent],
    exports: [DejaEditorDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        DejaMatEditorModule,
        DejaMarkdownModule,
        DejaPipeModule,
        routing,
    ],
    providers: [
      SafeHTMLPipe
    ],
})
export class DejaEditorDemoModule { }
