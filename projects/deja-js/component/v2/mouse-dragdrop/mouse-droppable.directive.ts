/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, inject, Input } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { Position, Rect } from '@deja-js/component/core/graphics';
import { distinctUntilChanged, filter, Observable, of, switchMap, take, takeUntil, tap } from 'rxjs';

import { DragCursorInfos, DropCursorInfos, MouseDragDropService } from './mouse-dragdrop.service';


@Directive({
    selector: '[mouse-droppable]'
})
export class MouseDroppableDirective<T> extends Destroy {
    private _context?: MouseDroppableContext<T>;

    @Input('mouse-droppable')
    public set context(value: MouseDroppableContext<T> | undefined) {
        this._context = value;
    }

    public get context(): MouseDroppableContext<T> | undefined {
        return this._context;
    }

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    public constructor(dragDropService: MouseDragDropService<T>) {
        super();

        const element = this.elementRef.nativeElement;
        let dragContext: T | undefined;

        const dragging$ = dragDropService.dragging$.pipe(
            distinctUntilChanged()
        );

        const drop$ = dragDropService.dragCursor$.pipe(
            filter(Boolean),
            switchMap(dragCursor => dragging$.pipe(
                filter(value => !value),
                take(1),
                tap(() => {
                    // console.log(`Drop ${!!this._dragContext}`)
                    if (dragContext && this.context?.drop) {
                        this.context.drop(dragContext, dragCursor);
                    }
                    dragContext = undefined;
                    dragDropService.dropCursor$.next(undefined);
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
                                    if (dragContext && this.context.dragEnter) {
                                        const dropCursor$ = this.context.dragEnter(dragContext, dragCursor);
                                        if (dropCursor$ instanceof Observable) {
                                            // Observable
                                            return dropCursor$;
                                        } else {
                                            return of(dropCursor$);
                                        }
                                    }
                                } else if (this.context.dragOver) {
                                    const dropCursor = this.context.dragOver(dragContext, dragCursor);
                                    if (dropCursor) {
                                        return of(dropCursor);
                                    }
                                }
                            } else if (dragContext) {
                                if (this.context?.dragLeave) {
                                    this.context.dragLeave(dragContext);
                                }
                                dragContext = undefined;
                                dragDropService.dropCursor$.next(undefined);
                            }
                        }

                        return of(undefined);
                    })
                )
            ),
            filter(Boolean),
            takeUntil(this.destroyed$)
        ).subscribe(dropCursor => dragDropService.dropCursor$.next(dropCursor));
    }
}

export interface MouseDroppableContext<T> {
    // eslint-disable-next-line rxjs/finnish
    dragEnter?: (dragContext$: T, dragCursor: DragCursorInfos) => DropCursorInfos | Observable<DropCursorInfos>; // Return object or observable<object>
    dragOver?: (dragContext$: T, dragCursor: DragCursorInfos) => DropCursorInfos;
    dragLeave?: (dragContext$: T) => void;
    drop?: (dragContext$: T, dragCursor: DragCursorInfos | undefined) => void;
}
