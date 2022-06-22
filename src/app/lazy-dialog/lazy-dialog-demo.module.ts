/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { LazyDialogDemoComponent } from './lazy-dialog-demo';
import { routing } from './lazy-dialog-demo.routes';

@NgModule({
    declarations: [LazyDialogDemoComponent],
    exports: [LazyDialogDemoComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatTabsModule,
        routing
    ]
})
export class LazyDialogDemoModule { }
