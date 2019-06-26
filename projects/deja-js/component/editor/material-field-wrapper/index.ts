/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DejaEditorComponent } from '../deja-editor.component';
import { DejaEditorModule } from '../deja-editor.module';
import { DejaEditorSelectorDirective } from './deja-editor-selector.directive';

@NgModule({
  imports: [DejaEditorModule, MatFormFieldModule],
  declarations: [DejaEditorSelectorDirective],
  exports: [DejaEditorSelectorDirective, DejaEditorComponent]
})
export class DejaMatEditorModule {}

export * from './deja-editor-selector.directive';
