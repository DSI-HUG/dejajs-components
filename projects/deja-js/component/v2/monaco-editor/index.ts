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

import { MonacoEditorComponent } from './monaco-editor.component';
import { MonacoEditorControlModule } from './monaco-editor-control/monaco-editor-control.module';

@NgModule({
    declarations: [MonacoEditorComponent],
    exports: [MonacoEditorComponent],
    imports: [
        CommonModule,
        FormsModule,
        MonacoEditorControlModule
    ]
})
export class MonacoEditorModule { }

export * from './options/editor-options.model';
export * from './options/editor-scrollbar-options.model';
export * from './monaco-editor.component';
