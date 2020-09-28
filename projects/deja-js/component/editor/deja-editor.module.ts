/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DejaEditorComponent } from './deja-editor.component';
import { DejaEditorService } from './deja-editor.service';

/**
 * CKEditorModule
 */
@NgModule({
    imports: [CommonModule],
    declarations: [DejaEditorComponent],
    exports: [DejaEditorComponent],
    providers: [DejaEditorService]
})
export class DejaEditorModule {}

export * from './deja-editor.component';
export * from './string.utils';
