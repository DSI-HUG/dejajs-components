/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DejaListLoaderComponent } from './list-loader.component';

@NgModule({
    declarations: [DejaListLoaderComponent],
    exports: [DejaListLoaderComponent],
    imports: [
        CommonModule
    ]
})
export class DejaListLoaderModule { }

export * from './list-loader.component';
