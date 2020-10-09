/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { DejaMouseDragDropCursorComponent } from './mouse-dragdrop-cursor.component';
import { DejaMouseDraggableDirective } from './mouse-draggable.directive';
import { DejaMouseDroppableDirective } from './mouse-droppable.directive';

@NgModule({
    declarations: [
        DejaMouseDraggableDirective,
        DejaMouseDroppableDirective,
        DejaMouseDragDropCursorComponent
    ],
    imports: [
        MatIconModule
    ],
    exports: [
        DejaMouseDraggableDirective,
        DejaMouseDroppableDirective,
        DejaMouseDragDropCursorComponent
    ],
    providers: []
})
export class DejaMouseDragDropModule { }

export * from './mouse-draggable.directive';
export * from './mouse-droppable.directive';
export * from './mouse-dragdrop-cursor.component';
export * from './mouse-drop-cursor-infos.interface';
export * from './mouse-drag-cursor-infos.interface';
export * from './mouse-dragdrop-context.interface';
export * from './mouse-dragdrop.service';
