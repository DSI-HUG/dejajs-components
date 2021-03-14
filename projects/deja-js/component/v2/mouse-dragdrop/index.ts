/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { MouseDragDropCursorComponent } from './mouse-dragdrop-cursor.component';
import { MouseDraggableDirective } from './mouse-draggable.directive';
import { MouseDroppableDirective } from './mouse-droppable.directive';

@NgModule({
    declarations: [
        MouseDraggableDirective,
        MouseDroppableDirective,
        MouseDragDropCursorComponent
    ],
    imports: [
        MatIconModule
    ],
    exports: [
        MouseDraggableDirective,
        MouseDroppableDirective,
        MouseDragDropCursorComponent
    ],
    providers: []
})
export class MouseDragDropModule { }

export * from './mouse-draggable.directive';
export * from './mouse-droppable.directive';
export * from './mouse-dragdrop-cursor.component';
export * from './mouse-dragdrop.service';
