/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DejaMonacoEditorComponent } from "./monaco-editor.component";

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [DejaMonacoEditorComponent],
    declarations: [DejaMonacoEditorComponent],
})
export class DejaMonacoEditorModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: DejaMonacoEditorModule,
            providers: [],
        };
    }
}
