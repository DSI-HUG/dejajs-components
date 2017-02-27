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
import { ClipboardService } from '../../common/core/clipboard/clipboard.service';
import { Observable } from 'rxjs/Rx';

@Directive({
    selector: '[deja-mouse-draggable]',
})
export class DejaMouseDraggableDirective {
    constructor(elementRef: ElementRef, private clipboardService: ClipboardService) {
        const element = elementRef.nativeElement as HTMLElement;

        let cursor = element.ownerDocument.getElementById('#ddcursor');
        if (!cursor) {
            cursor = element.ownerDocument.createElement('div');
            element.ownerDocument.body.appendChild(cursor);
            cursor.id = '#ddcursor';
            cursor.innerHTML = `<svg fill="#000000" height= "24" viewBox= "0 0 24 24" width= "24" xmlns= "http://www.w3.org/2000/svg" >
                <path d="M0 0h24v24H0z" fill= "none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z" />
            </svg>`;

        }

        const leave$ = Observable.fromEvent(element, 'mouseleave')
            .first();

        Observable.fromEvent(element, 'mouseenter')
            .takeUntil(leave$)
            .subscribe(() => {
                const mouseUp$ = Observable.fromEvent(element, 'mouseup')
                    .first();

                const mouseDown$ = Observable.fromEvent(element, 'mousedown')
                    .takeUntil(mouseUp$)
                    .filter((event: MouseEvent) => event.buttons === 1)
                    .subscribe(() => {




                    });
            });
    }
}

