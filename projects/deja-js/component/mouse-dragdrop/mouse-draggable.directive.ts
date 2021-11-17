/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, Input } from '@angular/core';
import { Destroy } from '@deja-js/component/core/destroy';
import { Position, Rect } from '@deja-js/component/core/graphics';
import { filter, fromEvent, map, mergeWith, Observable, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';

import { IDragCursorInfos } from './mouse-drag-cursor-infos.interface';
import { DejaMouseDragDropService } from './mouse-dragdrop.service';
import { IDragDropContext } from './mouse-dragdrop-context.interface';

@Directive({
    selector: '[deja-mouse-draggable]'
})
export class DejaMouseDraggableDirective extends Destroy {
    private _context: IDejaMouseDraggableContext;

    @Input('deja-mouse-draggable')
    public set context(value: IDejaMouseDraggableContext) {
        this._context = value;
    }

    public get context(): IDejaMouseDraggableContext {
        return this._context;
    }

    public constructor(elementRef: ElementRef, dragDropService: DejaMouseDragDropService) {
        super();

        const element = elementRef.nativeElement as HTMLElement;

        const mouseLeaveEvent$ = fromEvent<MouseEvent>(element, 'mouseleave');
        const mouseEnterEvent$ = fromEvent<MouseEvent>(element, 'mouseenter');
        const mouseUpEvent$ = fromEvent<MouseEvent>(element.ownerDocument, 'mouseup');
        const mouseDownEvent$ = fromEvent<MouseEvent>(element, 'mousedown');
        const mouseMoveEvent$ = fromEvent<MouseEvent>(element.ownerDocument, 'mousemove');

        mouseEnterEvent$.pipe(
            filter(() => !dragDropService.isDragging),
            switchMap(() => mouseDownEvent$.pipe(
                filter(event => event.buttons === 1),
                // eslint-disable-next-line rxjs/no-unsafe-takeuntil
                takeUntil(mouseLeaveEvent$),
                switchMap(event => {
                    let target: HTMLElement;

                    const match = (el: HTMLElement): boolean => el.tagName === this.context.target.toUpperCase() || el.id === this.context.target.substr(1) || el.hasAttribute(this.context.target.substring(1, this.context.target.length - 1));

                    if (this.context) {
                        if (this.context.target) {
                            target = event.target as HTMLElement;
                            // eslint-disable-next-line no-loops/no-loops
                            while (target && !match(target)) {
                                target = target.parentElement;
                            }
                        } else {
                            target = element;
                        }

                        if (target && this.context.dragStart) {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            const dragContext = this.context.dragStart(target);
                            if (dragContext) {
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                if (dragContext.subscribe) {
                                    const context$ = dragContext as Observable<IDragDropContext>;
                                    // Observable
                                    return context$.pipe(
                                        take(1),
                                        map((ddctx: IDragDropContext) => {
                                            dragDropService.context = ddctx;
                                            return ddctx && target; // Map to target if ddctx is defined
                                        })
                                    );
                                } else {
                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                    dragDropService.context = dragContext;
                                    return of(target);
                                }
                            }
                        }
                    }
                    return of(null as HTMLElement);
                }),
                filter(target => !!target), // Start Drag if target is defined
                switchMap(target => {
                    dragDropService.dragging$.next(true);

                    const moveUp$ = new Subject<void>();

                    const enterWhileNotDragDropEvent$ = mouseEnterEvent$.pipe(
                        filter(event => event.buttons !== 1 && dragDropService.isDragging)
                    );

                    const kill$ = mouseUpEvent$.pipe(
                        mergeWith(enterWhileNotDragDropEvent$, moveUp$),
                        take(1),
                        tap(() => {
                            dragDropService.dragCursor$.next(null);
                            dragDropService.dragging$.next(false);
                        }));

                    return mouseMoveEvent$.pipe(
                        // eslint-disable-next-line rxjs/no-unsafe-takeuntil
                        takeUntil(kill$),
                        tap(ev => {
                            if (target && ev.buttons === 1) {
                                const bounds = new Rect(element.getBoundingClientRect());
                                const position = new Position(ev.pageX, ev.pageY);
                                const html = bounds.containsPoint(position) ? target.innerHTML : undefined;

                                // Post cursor infos to service
                                dragDropService.dragCursor$.next({
                                    position: position,
                                    html: html,
                                    originalHtml: target.innerHTML,
                                    width: target.offsetWidth,
                                    height: target.offsetHeight,
                                    className: this.context.className,
                                    originalEvent: ev
                                } as IDragCursorInfos);

                            } else {
                                moveUp$.next();
                            }

                            // ev.preventDefault();
                            return false;
                        })
                    );
                })
            )),
            takeUntil(this.destroyed$)
        ).subscribe();
    }
}

export interface IDejaMouseDraggableContext {
    target?: string; // Tagname or #id or [attribute]
    className?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dragStart?: (element: HTMLElement) => any; // Return object or observable<object>
}
