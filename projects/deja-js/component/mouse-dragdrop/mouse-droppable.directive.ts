/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, Input } from '@angular/core';
import { Destroy, Position, Rect } from '@deja-js/core';
import { from, Observable } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';
import { IDragCursorInfos } from './mouse-drag-cursor-infos.interface';
import { IDragDropContext } from './mouse-dragdrop-context.interface';
import { DejaMouseDragDropService } from './mouse-dragdrop.service';
import { IDropCursorInfos } from './mouse-drop-cursor-infos.interface';

@Directive({
    selector: '[deja-mouse-droppable]',
})
export class DejaMouseDroppableDirective extends Destroy {
    private _context: IDejaMouseDroppableContext;
    private _dragContext: IDragDropContext;

    @Input('deja-mouse-droppable')
    public set context(value: IDejaMouseDroppableContext) {
        this._context = value;
    }

    public get context() {
        return this._context;
    }

    constructor(elementRef: ElementRef, dragDropService: DejaMouseDragDropService) {
        super();

        const element = elementRef.nativeElement as HTMLElement;

        const dragging$ = from(dragDropService.dragging$);

        const kill$ = dragging$.pipe(
            filter((value) => !value));

        dragging$.pipe(
            filter((value) => value),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            kill$.pipe(
                first())
                .subscribe(() => {
                    if (this._dragContext) {
                        if (this.context && this.context.drop) {
                            this.context.drop(this._dragContext);
                        }
                        this._dragContext = undefined;
                    }
                    dragDropService.dropCursor$.next(null);
                });

            from(dragDropService.dragCursor$).pipe(
                takeUntil(kill$))
                .subscribe((dragCursor) => {
                    const bounds = new Rect(element.getBoundingClientRect());
                    if (this.context && dragCursor) {
                        const { pageX, pageY } = dragCursor.originalEvent;
                        if (bounds.containsPoint(new Position(pageX, pageY))) {
                            if (!this._dragContext) {
                                this._dragContext = dragDropService.context;
                                if (this.context.dragEnter) {
                                    const dropContext = this.context.dragEnter(this._dragContext, dragCursor);
                                    if (dropContext) {
                                        const dropContextObs = dropContext as Observable<IDropCursorInfos>;
                                        if (dropContextObs.subscribe) {
                                            // Observable
                                            dropContextObs.pipe(
                                                first())
                                                .subscribe((cursor) => {
                                                    dragDropService.dropCursor$.next(cursor);
                                                });
                                            return;
                                        } else {
                                            dragDropService.dropCursor$.next(dropContext as IDropCursorInfos);
                                        }
                                    }
                                }
                            } else if (this.context.dragOver) {
                                const overContext = this.context.dragOver(this._dragContext, dragCursor);
                                if (overContext) {
                                    dragDropService.dropCursor$.next(overContext);
                                }
                            }
                        } else if (this._dragContext) {
                            if (this.context && this.context.dragLeave) {
                                this.context.dragLeave(this._dragContext);
                            }
                            this._dragContext = undefined;
                            dragDropService.dropCursor$.next(null);
                        }
                    }
                });
        });
    }
}

export interface IDejaMouseDroppableContext {
    dragEnter?(dragContext: IDragDropContext, dragCursor: IDragCursorInfos): IDropCursorInfos | Observable<IDropCursorInfos>; // Return object or observable<object>
    dragOver?(dragContext: IDragDropContext, dragCursor: IDragCursorInfos): IDropCursorInfos;
    dragLeave?(dragContext: IDragDropContext): void;
    drop?(dragContext: IDragDropContext): void;
}
