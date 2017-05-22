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
import { MdInputModule } from '@angular/material';
import { DejaAutosizeTextAreaDirective } from './autosize-textarea.directive';

@NgModule({
    declarations: [DejaAutosizeTextAreaDirective],
    exports: [DejaAutosizeTextAreaDirective],
    imports: [
        CommonModule,
        FormsModule,
        MdInputModule,
    ],
})
export class DejaAutosizeTextAreaModule { }

export * from './autosize-textarea.directive';
