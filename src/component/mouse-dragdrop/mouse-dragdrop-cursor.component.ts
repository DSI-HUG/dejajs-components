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

import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DejaMouseDragDropService, IDragCursorInfos } from './mouse-dragdrop.service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Position } from './../../common/core/graphics/position';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-mouse-dragdrop-cursor',
    styleUrls: [
        './mouse-dragdrop-cursor.component.scss',
    ],
    templateUrl: './mouse-dragdrop-cursor.component.html',
})
export class DejaMouseDragDropCursorComponent {
    @ViewChild('block') private icon: ElementRef;
    @ViewChild('content') private content: ElementRef;
    private position$ = new BehaviorSubject<Position>(undefined);
    private dragCursor$ = new BehaviorSubject<IDragCursorInfos>(undefined);
    private _dragCursor: IDragCursorInfos;

    constructor(elementRef: ElementRef, private dragDropService: DejaMouseDragDropService) {
        const element = elementRef.nativeElement as HTMLElement;

        Observable
            .from(this.position$)
            .subscribe((pos) => {
                element.style.left = pos ? `${pos.left}px` : '-1000px';
                element.style.top = pos ? `${pos.top}px` : '-1000px';
            });


        const dragCursor$ = Observable.from(this.dragCursor$);

        // Hide
        dragCursor$
            .filter((dragCursor) => !dragCursor)
            .do(() => console.log('hide'))
            .do((dragCursor) => {
                if (this._dragCursor) {
                    this.contentElement.style.opacity = '0';
                    this.iconElement.style.opacity = '0';
                }
                this._dragCursor = dragCursor;
            })
            .delay(300)
            .subscribe(() => {
                this.position$.next(null);
                element.style.display = 'none';
            });

        // Show
        dragCursor$
            .filter((dragCursor) => !!dragCursor)
            .do((dragCursor) => console.log('Show ' + !!dragCursor.html))
            .do((dragCursor) => {
                element.style.display = '';
                this.contentElement.style.opacity = '0';
                this.iconElement.style.opacity = '0';
                this._dragCursor = dragCursor;
            })
            .do((dragCursor) => {
                if (!!dragCursor.html) {
                    this.contentElement.innerHTML = dragCursor.html;
                    element.className = dragCursor.className;
                    this.contentElement.style.width = `${dragCursor.width || 48}px`;
                    this.contentElement.style.height = `${dragCursor.height || 48}px`;
                } else {
                    this.iconElement.style.opacity = '1';
                }
            })
            .delay(1)
            .do((dragCursor) => {
                if (!!dragCursor.html) {
                    this.contentElement.style.opacity = '1';
                }
            })
            .delay(300)
            .subscribe((dragCursor) => {
                if (!dragCursor.html) {
                    this.contentElement.innerHTML = '';
                    element.className = '';
                }
            });

        Observable.from(this.dragDropService.dragCursor$)
            .subscribe((dragCursor) => {
                if (!!dragCursor !== !!this._dragCursor || (dragCursor && !!dragCursor.html !== !!this._dragCursor.html)) {
                    // Update Content
                    this.dragCursor$.next(dragCursor);
                } else if (dragCursor) {
                    // Update only Position
                    this.position$.next(dragCursor.position);
                }
            });

        Observable.from(this.dragDropService.dropCursor$)
            .subscribe((dropCursor) => {
                console.log(dropCursor);
            });
    }

    private get iconElement() {
        return this.icon.nativeElement as HTMLElement;
    }

    private get contentElement() {
        return this.content.nativeElement as HTMLElement;
    }
}
