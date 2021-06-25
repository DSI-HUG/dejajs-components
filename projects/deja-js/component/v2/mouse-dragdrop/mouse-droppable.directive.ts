/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, Input } from '@angular/core';
import { Destroy, Position, Rect } from '@deja-js/component/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { DragCursorInfos, DropCursorInfos, MouseDragDropService } from './mouse-dragdrop.service';

@Directive({
    selector: '[mouse-droppable]'
})
export class MouseDroppableDirective<T> extends Destroy {
    private _context: MouseDroppableContext<T>;

    @Input('mouse-droppable')
    public set context(value: MouseDroppableContext<T>) {
        this._context = value;
    }

    public get context(): MouseDroppableContext<T> {
        return this._context;
    }

    public constructor(elementRef: ElementRef<HTMLElement>, dragDropService: MouseDragDropService<T>) {
        super();

        const element = elementRef.nativeElement;
        let dragContext: T;

        const dragging$ = dragDropService.dragging$.pipe(
            distinctUntilChanged()
        );

        const drop$ = dragDropService.dragCursor$.pipe(
            filter(value => !!value),
            switchMap(dragCursor => dragging$.pipe(
                filter(value => !value),
                take(1),
                tap(() => {
                    // console.log(`Drop ${!!this._dragContext}`)
                    if (dragContext && this.context?.drop) {
                        this.context.drop(dragContext, dragCursor);
                    }
                    dragContext = undefined;
                    dragDropService.dropCursor$.next(null);
                })
            ))
        );

        dragging$.pipe(
            filter(value => value),
            switchMap(() =>
                // console.log(`Drag ${!!this._dragContext}`)
                dragDropService.dragCursor$.pipe(
                    // eslint-disable-next-line rxjs/no-unsafe-takeuntil
                    takeUntil(drop$),
                    switchMap(dragCursor => {
                        const bounds = new Rect(element.getBoundingClientRect());
                        if (this.context && dragCursor) {
                            const { pageX, pageY } = dragCursor.originalEvent;
                            if (bounds.containsPoint(new Position(pageX, pageY))) {
                                if (!dragContext) {
                                    dragContext = dragDropService.context;
                                    if (this.context.dragEnter) {
                                        const dropContext$ = this.context.dragEnter(dragContext, dragCursor);
                                        if (dropContext$) {
                                            const dropContextObs$ = dropContext$ as Observable<DropCursorInfos>;
                                            if (dropContextObs$.subscribe) {
                                                // Observable
                                                return dropContextObs$;
                                            } else {
                                                return of(dropContext$);
                                            }
                                        }
                                    }
                                } else if (this.context.dragOver) {
                                    const overContext = this.context.dragOver(dragContext, dragCursor);
                                    if (overContext) {
                                        return of(overContext);
                                    }
                                }
                            } else if (dragContext) {
                                if (this.context?.dragLeave) {
                                    this.context.dragLeave(dragContext);
                                }
                                dragContext = undefined;
                                dragDropService.dropCursor$.next(null);
                            }
                        }

                        return of(null);
                    })
                )
            ),
            filter(dropCursor => !!dropCursor),
            takeUntil(this.destroyed$)
        ).subscribe(dropCursor => dragDropService.dropCursor$.next(dropCursor));
    }
}

export interface MouseDroppableContext<T> {
    // eslint-disable-next-line rxjs/finnish
    dragEnter?(dragContext$: T, dragCursor: DragCursorInfos): DropCursorInfos | Observable<DropCursorInfos>; // Return object or observable<object>
    dragOver?(dragContext$: T, dragCursor: DragCursorInfos): DropCursorInfos;
    dragLeave?(dragContext$: T): void;
    drop?(dragContext$: T, dragCursor: DragCursorInfos): void;
}