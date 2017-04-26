/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdCardModule, MdIconModule } from '@angular/material';
import { DejaMessageBoxComponent } from './message-box.component';

@NgModule({
    declarations: [
        DejaMessageBoxComponent,
    ],
    exports: [
        DejaMessageBoxComponent,
    ],
    imports: [
        CommonModule,
        MdCardModule,
        MdIconModule,
        MdButtonModule,
    ],
})
export class DejaMessageBoxModule { }
