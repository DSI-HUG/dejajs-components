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
import { DejaDraggableDirective, DejaDroppableDirective, DragDropService }   from './index';

@NgModule({
    declarations: [DejaDraggableDirective, DejaDroppableDirective],
    exports: [DejaDraggableDirective, DejaDroppableDirective],
    imports: [],
    providers: [DragDropService],
})
export class DejaDragDropModule {}
