import { ICursorInfos } from './mouse-dragdrop.service';
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
import { DejaMouseDragDropService } from './mouse-dragdrop.service';
import { Observable, Subject } from 'rxjs/Rx';
import { Position, Rect } from '../../common/core/graphics/index';

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

                        if (this.context) {
                            if (this.context.target) {
                                target = event.target as HTMLElement;
                                while (target && !match(target)) {
                                    target = target.parentElement;
                                }
                            }

                            if (!target) {
                                target = element;
                            }
                        }

                        Observable.merge(mouseUp$, moveUp$)
                            .first()
                            .subscribe(() => dragDropService.cursorInfos$.next(undefined));

                        Observable.fromEvent(element.ownerDocument, 'mousemove')
                            .takeUntil(mouseUp$.first())
                            .subscribe((ev: MouseEvent) => {
                                if (ev.buttons === 1) {
                                    const bounds = new Rect(element.getBoundingClientRect());
                                    const position = new Position(ev.pageX, ev.pageY);
                                    const html = bounds.containsPoint(position) ? target.innerHTML : undefined;

                                    // Post cursor infos to service
                                    dragDropService.cursorInfos$.next({
                                        position: position,
                                        visible: true,
                                        html: html,
                                        width: target.offsetWidth,
                                        height: target.offsetHeight,
                                        className: this.context.className,
                                    } as ICursorInfos);
                                } else {
                                    moveUp$.next();
                                }
                            });

                        // Post position to service
                        dragDropService.cursorInfos$.next({
                            position: new Position(event.pageX, event.pageY),
                        });
                    });
            });
    }
}

export interface IDejaMouseDraggableContext {
    target?: string; // Tagname or #id or [attribute]
    className?: string;
}
