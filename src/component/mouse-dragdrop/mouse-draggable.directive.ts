/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, Input } from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/takeUntil';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Position } from '../../common/core/graphics/position';
import { Rect } from '../../common/core/graphics/rect';
import { DejaMouseDragDropService, IDragCursorInfos } from './mouse-dragdrop.service';

@Directive({
    selector: '[deja-mouse-draggable]',
})
export class DejaMouseDraggableDirective {
    private _context: IDejaMouseDraggableContext;

    @Input('deja-mouse-draggable')
    public set context(value: IDejaMouseDraggableContext) {
        this._context = value;
    }

    public get context() {
        return this._context;
    }

    constructor(elementRef: ElementRef, dragDropService: DejaMouseDragDropService) {
        const element = elementRef.nativeElement as HTMLElement;

        const leave$ = Observable.fromEvent(element, 'mouseleave');

        const mouseUp$ = Observable.fromEvent(element.ownerDocument, 'mouseup');

        Observable.fromEvent(element, 'mouseenter')
            .subscribe(() => {
                Observable.fromEvent(element, 'mousedown')
                    .takeUntil(leave$)
                    .filter((event: MouseEvent) => event.buttons === 1)
                    .subscribe((event: MouseEvent) => {
                        const moveUp$ = new Subject();
                        let target: HTMLElement;

                        const match = (el: HTMLElement) => {
                            return el.tagName === this.context.target.toUpperCase() || el.id === this.context.target.substr(1) || el.hasAttribute(this.context.target.substring(1, this.context.target.length - 1));
                        };

                        const startDrag = () => {
                            const kill$ = Observable.merge(mouseUp$, moveUp$)
                                .first()
                                .do(() => {
                                dragDropService.dragCursor$.next(undefined);
                                dragDropService.dragging$.next(false);
                            });

                            Observable.fromEvent(element.ownerDocument, 'mousemove')
                                .takeUntil(kill$)
                                .subscribe((ev: MouseEvent) => {
                                    if (target && ev.buttons === 1) {
                                        const bounds = new Rect(element.getBoundingClientRect());
                                        const position = new Position(ev.pageX, ev.pageY);
                                        const html = bounds.containsPoint(position) ? target.innerHTML : undefined;

                                        // Post cursor infos to service
                                        dragDropService.dragCursor$.next({
                                            position: position,
                                            html: html,
                                            width: target.offsetWidth,
                                            height: target.offsetHeight,
                                            className: this.context.className,
                                            originalEvent: ev,
                                        } as IDragCursorInfos);

                                    } else {
                                        moveUp$.next();
                                    }

                                    ev.preventDefault();
                                    return false;
                                });

                            dragDropService.dragging$.next(true);
                        };

                        if (this.context) {
                            if (this.context.target) {
                                target = event.target as HTMLElement;
                                while (target && !match(target)) {
                                    target = target.parentElement;
                                }
                            } else {
                                target = element;
                            }

                            if (target && this.context.dragStart) {
                                const dragContext = this.context.dragStart(target);
                                if (dragContext) {
                                    if (dragContext.subscribe) {
                                        // Observable
                                        dragContext
                                            .first()
                                            .subscribe((ddctx) => {
                                                dragDropService.context = ddctx;
                                                if (ddctx) {
                                                startDrag();
                                                }
                                            });
                                        return;
                                    } else {
                                        dragDropService.context = dragContext;
                                        startDrag();
                                    }
                                }
                            }
                        }
                    });
            });
    }
}

export interface IDejaMouseDraggableContext {
    target?: string; // Tagname or #id or [attribute]
    className?: string;
    dragStart?: (HTMLElement) => any; // Return object or observable<object>
}
