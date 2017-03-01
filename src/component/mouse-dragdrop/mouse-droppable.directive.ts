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

import { Directive, ElementRef, Input } from '@angular/core';
import { DejaMouseDragDropService, IDragDropContext, IDropCursorInfos } from './mouse-dragdrop.service';
import { Observable } from 'rxjs/Rx';
import { Position, Rect } from '../../common/core/graphics/index';

@Directive({
    selector: '[deja-mouse-droppable]',
})
export class DejaMouseDroppableDirective {
    private _context: IDejaMouseDroppableContext;

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
                    .subscribe(() => dragDropService.dropCursor$.next(undefined));

                Observable.fromEvent(element.ownerDocument, 'mousemove')
                    .takeUntil(kill$)
                    .subscribe((ev: MouseEvent) => {
                        if (ev.buttons === 1) {
                            const bounds = new Rect(element.getBoundingClientRect());
                            const position = new Position(ev.pageX, ev.pageY);
                            if (bounds.containsPoint(position)) {
                                if (this.context.getContext) {
                                    const dragContext = dragDropService.context;
                                    const dropContext = this.context.getContext(dragContext, ev);
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
                                }
                            }
                        }
                    });
            });
    }
}

export interface IDejaMouseDroppableContext {
    getContext?: (dragContext: IDragDropContext, event: MouseEvent) => IDropCursorInfos | Observable<IDropCursorInfos>; // Return object or observable<object>
}
