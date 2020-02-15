/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, Input } from '@angular/core';
import { Destroy, Position, Rect } from '@deja-js/core';
import { from, Observable, of } from 'rxjs';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';
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
            filter((value) => !value)
        );

        const dragCursor$ = from(dragDropService.dragCursor$).pipe(
            takeUntil(kill$),
        );

        dragging$.pipe(
            filter((value) => value),
            switchMap(() => dragCursor$),
            switchMap(dragCursor => {
                kill$.pipe(
                    take(1),
                    takeUntil(this.destroyed$)
                ).subscribe(() => {
                    if (this._dragContext && this.context?.drop) {
                        this.context.drop(this._dragContext);
                    }
                    this._dragContext = undefined;
                    dragDropService.dropCursor$.next(null);
                });

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
                                        return dropContextObs;
                                    } else {
                                        return of(dropContext as IDropCursorInfos);
                                    }
                                }
                            }
                        } else if (this.context.dragOver) {
                            const overContext = this.context.dragOver(this._dragContext, dragCursor);
                            if (overContext) {
                                return of(overContext);
                            }
                        }
                    } else if (this._dragContext) {
                        if (this.context?.dragLeave) {
                            this.context.dragLeave(this._dragContext);
                        }
                        this._dragContext = undefined;
                        dragDropService.dropCursor$.next(null);
                    }
                }

                return of(null);
            }),
            filter(dropCursor => !!dropCursor),
            takeUntil(this.destroyed$)
        ).subscribe(dropCursor => dragDropService.dropCursor$.next(dropCursor));
    }
}

export interface IDejaMouseDroppableContext {
    dragEnter?(dragContext: IDragDropContext, dragCursor: IDragCursorInfos): IDropCursorInfos | Observable<IDropCursorInfos>; // Return object or observable<object>
    dragOver?(dragContext: IDragDropContext, dragCursor: IDragCursorInfos): IDropCursorInfos;
    dragLeave?(dragContext: IDragDropContext): void;
    drop?(dragContext: IDragDropContext): void;
}
