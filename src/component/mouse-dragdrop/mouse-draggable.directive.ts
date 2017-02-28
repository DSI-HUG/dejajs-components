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

import { Directive, ElementRef } from '@angular/core';
import { DejaMouseDragDropService } from './mouse-dragdrop.service';
import { Observable } from 'rxjs/Rx';
import { Position } from '../../common/core/graphics/position';

@Directive({
    selector: '[deja-mouse-draggable]',
})
export class DejaMouseDraggableDirective {
    constructor(elementRef: ElementRef, dragDropService: DejaMouseDragDropService) {
        const element = elementRef.nativeElement as HTMLElement;

        const leave$ = Observable.fromEvent(element, 'mouseleave')
            .first();

        Observable.fromEvent(element, 'mouseenter')
            .takeUntil(leave$)
            .subscribe(() => {
                const mouseUp$ = Observable.fromEvent(element, 'mouseup')
                    .first();

                Observable.fromEvent(element, 'mousedown')
                    .takeUntil(mouseUp$)
                    .filter((event: MouseEvent) => event.buttons === 1)
                    .subscribe((event: MouseEvent) => {
                        // Post position to service
                        dragDropService.mousePosition$.next(new Position(event.pageX, event.pageY));
                    });
            });
    }
}

