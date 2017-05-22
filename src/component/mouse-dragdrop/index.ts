/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { DejaMouseDraggableDirective } from './mouse-draggable.directive';
import { DejaMouseDroppableDirective } from './mouse-droppable.directive';
import { DejaMouseDragDropService } from './mouse-dragdrop.service';
import { DejaMouseDragDropCursorComponent } from './mouse-dragdrop-cursor.component';

@NgModule({
    declarations: [DejaMouseDraggableDirective, DejaMouseDroppableDirective, DejaMouseDragDropCursorComponent],
    exports: [DejaMouseDraggableDirective, DejaMouseDroppableDirective, DejaMouseDragDropCursorComponent],
    providers: [],
})
export class DejaMouseDragDropModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: DejaMouseDragDropModule,
            providers: [DejaMouseDragDropService],
        };
    }
}

export * from './mouse-dragdrop.service';
export * from './mouse-draggable.directive';
export * from './mouse-droppable.directive';
export * from './mouse-dragdrop-cursor.component';
