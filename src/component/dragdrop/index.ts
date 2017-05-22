/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { DejaDraggableDirective } from './draggable.directive';
import { DejaDroppableDirective } from './droppable.directive';

@NgModule({
    declarations: [DejaDraggableDirective, DejaDroppableDirective],
    exports: [DejaDraggableDirective, DejaDroppableDirective],
})
export class DejaDragDropModule { }

export * from './draggable.directive';
export * from './droppable.directive';
