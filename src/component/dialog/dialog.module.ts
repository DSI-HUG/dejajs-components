/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DejaBackdropModule } from '../backdrop';
import { DejaDialogComponent } from './dialog.component';

@NgModule({
    declarations: [
        DejaDialogComponent,
    ],
    exports: [
        DejaDialogComponent,
    ],
    imports: [
        CommonModule,
        DejaBackdropModule,
    ],
})
export class DejaDialogModule { }
