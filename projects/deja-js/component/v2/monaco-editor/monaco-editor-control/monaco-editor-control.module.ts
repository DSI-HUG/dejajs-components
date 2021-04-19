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
import { ResizeListenerModule } from '@deja-js/component/core';

import { MonacoEditorControlComponent } from './monaco-editor-control.component';

@NgModule({
    declarations: [MonacoEditorControlComponent],
    exports: [MonacoEditorControlComponent],
    imports: [
        CommonModule,
        FormsModule,
        ResizeListenerModule
    ]
})
export class MonacoEditorControlModule {}
