/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { NgModule } from '@angular/core';

import { DejaDraggableDirective } from './draggable.directive';
import { DejaDroppableDirective } from './droppable.directive';
import { DejaMouseDraggableDirective } from './mouse-draggable.directive';

@NgModule({
    declarations: [DejaDraggableDirective, DejaDroppableDirective, DejaMouseDraggableDirective],
    exports: [DejaDraggableDirective, DejaDroppableDirective, DejaMouseDraggableDirective],
    imports: [],
})
export class DejaDragDropModule {}
