/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DejaItemComponent } from './item.component';

@NgModule({
    declarations: [
        DejaItemComponent
    ],
    exports: [
        DejaItemComponent
    ],
    imports: [
        CommonModule
    ]
})
export class DejaItemModule { }

export * from './viewport.service';
export * from './item-base';
export * from './item-tree';
export * from './item-list.service';
export * from './item-list-base';
export * from './item-event';
export * from './items-event';
export * from './item.component';
