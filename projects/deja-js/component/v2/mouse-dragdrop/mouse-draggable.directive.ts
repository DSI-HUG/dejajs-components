/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { Position } from '@deja-js/component/core';
import { Rect } from '@deja-js/component/core';
import { fromEvent, isObservable, merge, Observable, of, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { DragCursorInfos, MouseDragDropService } from './mouse-dragdrop.service';

@Directive({
    selector: '[mouse-draggable]'
})
export class MouseDraggableDirective<T> extends Destroy {
    private _context: MouseDraggableContext<T>;

    @Input('mouse-draggable')
    public set context(value: MouseDraggableContext<T>) {
        this._context = value;
    }

    public get context(): MouseDraggableContext<T> {
        return this._context;
    }

    public constructor(elementRef: ElementRef, dragDropService: MouseDragDropService<T>) {
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

                    const match = (el: HTMLElement) => el.tagName === this.context.target.toUpperCase() || `#${el.id}` === this.context.target || el.hasAttribute(this.context.target.substring(1, this.context.target.length - 1)) || el.className.split(' ').some(className => `.${className}` === this.context.target);

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
                            const dragContext = this.context.dragStart(target);
                            if (dragContext) {
                                if (isObservable(dragContext)) {
                                    const context$ = dragContext as Observable<T>;
                                    // Observable
                                    return context$.pipe(
                                        take(1),
                                        map(context => {
                                            dragDropService.context = context;
                                            return context && target; // Map to target if ddctx is defined
                                        })
                                    );
                                } else {
                                    dragDropService.context = dragContext;
                                    return of(target);
                                }
                            }
                        }
                    }
                    return of(null);
                }),
                filter(target => !!target), // Start Drag if target is defined
                switchMap(target => {
                    dragDropService.dragging$.next(true);

                    const moveUp$ = new Subject();

                    const enterWhileNotDragDropEvent$ = mouseEnterEvent$.pipe(
                        filter(event => event.buttons !== 1 && dragDropService.isDragging)
                    );

                    const kill$ = merge(mouseUpEvent$, enterWhileNotDragDropEvent$, moveUp$).pipe(
                        take(1),
                        tap(() => {
                            dragDropService.dragCursor$.next(null);
                            dragDropService.dragging$.next(false);
                        }));

                    return mouseMoveEvent$.pipe(
                        // eslint-disable-next-line rxjs/no-unsafe-takeuntil
                        takeUntil(kill$),
                        tap(ev => {
                            console.log('mouseMoveEvent');
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
                                } as DragCursorInfos);

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

export interface MouseDraggableContext<T> {
    target?: string; // Tagname or #id or [attribute]
    className?: string;
    dragStart?(element: HTMLElement): T;
}