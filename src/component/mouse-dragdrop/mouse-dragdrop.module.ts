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

import { ModuleWithProviders, NgModule } from '@angular/core';
import { DejaMouseDraggableDirective } from './mouse-draggable.directive';
import { DejaMouseDragDropService } from './mouse-dragdrop.service';
import { DejaMouseDragDropCursorComponent } from './mouse-dragdrop-cursor.component';

@NgModule({
    declarations: [DejaMouseDraggableDirective, DejaMouseDragDropCursorComponent],
    exports: [DejaMouseDraggableDirective, DejaMouseDragDropCursorComponent],
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
