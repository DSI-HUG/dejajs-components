/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { Directive, ElementRef, Input } from '@angular/core';
import { DejaMouseDragDropService, IDragCursorInfos, IDragDropContext, IDropCursorInfos } from './mouse-dragdrop.service';
import { Observable } from 'rxjs/Rx';
import { Position, Rect } from '../../common/core/graphics/index';

@Directive({
    selector: '[deja-mouse-droppable]',
})
export class DejaMouseDroppableDirective {
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
        const element = elementRef.nativeElement as HTMLElement;

        const dragging$ = Observable.from(dragDropService.dragging$);

        const kill$ = dragging$
            .filter((value) => !value);

        dragging$
            .filter((value) => value)
            .subscribe(() => {
                kill$
                    .first()
                    .subscribe(() => {
                        if (this._dragContext) {
                            this.context.drop(this._dragContext);
                            this._dragContext = undefined;
                        }
                        dragDropService.dropCursor$.next(undefined);
                    });

                Observable.from(dragDropService.dragCursor$)
                    .takeUntil(kill$)
                    .subscribe((dragCursor) => {
                        const bounds = new Rect(element.getBoundingClientRect());
                        if (this.context && dragCursor) {
                            if (bounds.containsPoint(new Position(dragCursor.pageX, dragCursor.pageY))) {
                                this._dragContext = dragDropService.context;
                                if (this.context.getContext) {
                                    const dropContext = this.context.getContext(this._dragContext, dragCursor);
                                    const dropContextObs = dropContext as Observable<IDropCursorInfos>;
                                    if (dropContextObs.subscribe) {
                                        // Observable
                                        dropContextObs
                                            .first()
                                            .subscribe((cursor) => {
                                                dragDropService.dropCursor$.next(cursor);
                                            });
                                        return;
                                    } else {
                                        dragDropService.dropCursor$.next(dropContext as IDropCursorInfos);
                                    }
                                } else {
                                    dragDropService.dropCursor$.next(undefined);
                                }
                            } else {
                                this._dragContext = undefined;
                                dragDropService.dropCursor$.next(undefined);
                            }
                        } else {
                            dragDropService.dropCursor$.next(undefined);
                        }
                    });
            });
    }
}

export interface IDejaMouseDroppableContext {
    getContext?: (dragContext: IDragDropContext, dragCursor: IDragCursorInfos) => IDropCursorInfos | Observable<IDropCursorInfos>; // Return object or observable<object>
    drop?: (dragContext: IDragDropContext) => void;
}
