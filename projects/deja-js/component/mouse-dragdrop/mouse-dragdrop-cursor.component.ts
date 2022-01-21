/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { Position } from '@deja-js/component/core/graphics';
import { BehaviorSubject, combineLatestWith, delay, filter, takeUntil, tap } from 'rxjs';

import { IDragCursorInfos } from './mouse-drag-cursor-infos.interface';
import { DejaMouseDragDropService } from './mouse-dragdrop.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-mouse-dragdrop-cursor',
    styleUrls: [
        './mouse-dragdrop-cursor.component.scss'
    ],
    templateUrl: './mouse-dragdrop-cursor.component.html'
})
export class DejaMouseDragDropCursorComponent extends Destroy {
    @ViewChild('block', { static: true }) private icon: ElementRef<HTMLElement>;
    @ViewChild('content', { static: true }) private content: ElementRef<HTMLElement>;
    private position$ = new BehaviorSubject<Position>(null);
    private cursor$ = new BehaviorSubject<IDragCursorInfos>(null);
    private currentCursor: IDragCursorInfos;

    public constructor(elementRef: ElementRef, private dragDropService: DejaMouseDragDropService) {
        super();

        const element = elementRef.nativeElement as HTMLElement;

        this.position$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe(pos => {
            element.style.left = pos ? `${pos.left}px` : '-1000px';
            element.style.top = pos ? `${pos.top}px` : '-1000px';
        });

        // Hide
        this.cursor$.pipe(
            filter(cursor => !cursor),
            tap(cursor => {
                if (this.currentCursor) {
                    if (this.contentElement) {
                        this.contentElement.style.opacity = '0';
                    }
                    if (this.iconElement) {
                        this.iconElement.style.opacity = '0';
                    }
                }
                this.currentCursor = cursor;
            }),
            delay(300),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.position$.next(null);
            element.style.display = 'none';
        });

        // Show
        this.cursor$.pipe(
            filter(cursor => !!cursor),
            tap(cursor => {
                element.style.display = '';
                if (this.contentElement) {
                    this.contentElement.style.opacity = '0';
                }
                if (this.iconElement) {
                    this.iconElement.style.opacity = '0';
                }
                this.currentCursor = cursor;
            }),
            filter(cursor => !cursor.className || cursor.className !== 'hidden'),
            tap(cursor => {
                if (cursor.html) {
                    element.className = cursor.className;
                    if (this.contentElement) {
                        this.contentElement.innerHTML = cursor.html;
                        this.contentElement.style.width = `${cursor.width || 48}px`;
                        this.contentElement.style.height = `${cursor.height || 48}px`;
                    }
                } else if (this.iconElement) {
                    this.iconElement.style.opacity = '1';
                }
            }),
            delay(1),
            takeUntil(this.destroyed$)
        ).subscribe(cursor => {
            if (!!cursor.html && this.contentElement) {
                this.contentElement.style.opacity = '1';
            }
        });

        this.dragDropService.dragCursor$.pipe(
            combineLatestWith(this.dragDropService.dropCursor$),
            takeUntil(this.destroyed$)
        ).subscribe(([dragCursor, dropCursor]) => {
            const cursor = (dragCursor || dropCursor) && {
                className: dropCursor?.className || dragCursor?.className,
                html: dropCursor?.html || dragCursor?.html || (dropCursor && dragCursor?.originalHtml),
                width: dropCursor?.width || dragCursor?.width,
                height: dropCursor?.height || dragCursor?.height,
                position: dragCursor?.position,
                originalEvent: dragCursor?.originalEvent
            } as IDragCursorInfos;

            if (cursor?.html !== this.currentCursor?.html || cursor?.className !== this.currentCursor?.className || cursor?.width !== this.currentCursor?.width || cursor?.height !== this.currentCursor?.height) {
                // Update Content
                this.cursor$.next(cursor);
            } else {
                // Update only Position
                this.position$.next(cursor?.position);
            }
        });
    }

    private get iconElement(): HTMLElement {
        return this.icon?.nativeElement;
    }

    private get contentElement(): HTMLElement {
        return this.content?.nativeElement;
    }
}
