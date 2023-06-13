/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DejaDialogComponent } from './dialog.component';

@NgModule({
    declarations: [
        DejaDialogComponent
    ],
    exports: [
        DejaDialogComponent
    ],
    imports: [
        CommonModule,
        MatToolbarModule
    ]
})
export class DejaDialogModule { }

export * from './dialog.component';
