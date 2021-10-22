/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ViewPortComponent } from './viewport.component';

@NgModule({
    declarations: [
        ViewPortComponent
    ],
    exports: [
        ViewPortComponent
    ],
    imports: [
        CommonModule,
        MatIconModule
    ]
})
export class ViewPortModule { }

export * from './viewport.service';
export * from './viewport.component';
