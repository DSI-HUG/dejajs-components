/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ElementRef, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { Position } from '@deja-js/component/core/graphics';
import { BehaviorSubject, combineLatestWith, delay, filter, takeUntil, tap } from 'rxjs';

import { DragCursorInfos, MouseDragDropService } from './mouse-dragdrop.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'mouse-dragdrop-cursor',
    styleUrls: [
        './mouse-dragdrop-cursor.component.scss'
    ],
    templateUrl: './mouse-dragdrop-cursor.component.html'
})
export class MouseDragDropCursorComponent extends Destroy {
    @ViewChild('block', { static: true }) private icon?: ElementRef<HTMLElement>;
    @ViewChild('content', { static: true }) private content?: ElementRef<HTMLElement>;
    private cursor$ = new BehaviorSubject<DragCursorInfos | undefined>(undefined);
    private currentCursor?: DragCursorInfos;

    public set position(value: Position | undefined) {
        if (value) {
            this.elementRef.nativeElement.style.left = `${value.left}px`;
            this.elementRef.nativeElement.style.top = `${value.top}px`;
            this.elementRef.nativeElement.style.display = '';
        } else {
            this.elementRef.nativeElement.style.display = 'none';
        }
    }

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private dragDropService = inject(MouseDragDropService);

    public constructor() {
        super();

        const element = this.elementRef.nativeElement;

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
            this.position = undefined;
        });

        // Show
        this.cursor$.pipe(
            filter(Boolean),
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
                    if (element) {
                        element.className = cursor.className || '';
                    }
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
            } as DragCursorInfos;

            if (cursor?.html !== this.currentCursor?.html || cursor?.className !== this.currentCursor?.className || cursor?.width !== this.currentCursor?.width || cursor?.height !== this.currentCursor?.height) {
                // Update Content
                this.cursor$.next(cursor);
            } else {
                // Update only Position
                this.position = cursor?.position;
            }
        });
    }

    private get iconElement(): HTMLElement | undefined {
        return this.icon?.nativeElement;
    }

    private get contentElement(): HTMLElement | undefined {
        return this.content?.nativeElement;
    }
}
