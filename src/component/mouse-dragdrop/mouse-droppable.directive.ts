/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { from as observableFrom, Observable } from 'rxjs';
import { filter, first, takeUntil, takeWhile } from 'rxjs/operators';
import { Position } from '../../common/core/graphics/position';
import { Rect } from '../../common/core/graphics/rect';
import { DejaMouseDragDropService, IDragCursorInfos, IDragDropContext, IDropCursorInfos } from './mouse-dragdrop.service';

@Directive({
    selector: '[deja-mouse-droppable]',
})
export class DejaMouseDroppableDirective implements OnDestroy {
    private _context: IDejaMouseDroppableContext;
    private _dragContext: IDragDropContext;
    private isAlive = true;

    @Input('deja-mouse-droppable')
    public set context(value: IDejaMouseDroppableContext) {
        this._context = value;
    }

    public get context() {
        return this._context;
    }

    constructor(elementRef: ElementRef, dragDropService: DejaMouseDragDropService) {
        const element = elementRef.nativeElement as HTMLElement;

        const dragging$ = observableFrom(dragDropService.dragging$);

        const kill$ = dragging$.pipe(
            filter((value) => !value));

        dragging$.pipe(
            takeWhile(() => this.isAlive),
            filter((value) => value))
            .subscribe(() => {
                kill$.pipe(
                    first())
                    .subscribe(() => {
                        if (this._dragContext) {
                            if (this.context && this.context.drop) {
                                this.context.drop(this._dragContext);
                            }
                            this._dragContext = undefined;
                        }
                        dragDropService.dropCursor$.next(undefined);
                    });

                observableFrom(dragDropService.dragCursor$).pipe(
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
                                dragDropService.dropCursor$.next(undefined);
                            }
                        }
                    });
            });
    }

    public ngOnDestroy() {
        this.isAlive = false;
    }
}

export interface IDejaMouseDroppableContext {
    dragEnter?(dragContext: IDragDropContext, dragCursor: IDragCursorInfos): IDropCursorInfos | Observable<IDropCursorInfos>; // Return object or observable<object>
    dragOver?(dragContext: IDragDropContext, dragCursor: IDragCursorInfos): IDropCursorInfos;
    dragLeave?(dragContext: IDragDropContext): void;
    drop?(dragContext: IDragDropContext): void;
}
