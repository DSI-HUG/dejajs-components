/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, from as observableFrom } from 'rxjs';
import { delay, filter, takeWhile, tap } from 'rxjs/operators';
import { Position } from './../../common/core/graphics/position';
import { DejaMouseDragDropService, IDragCursorInfos, IDropCursorInfos } from './mouse-dragdrop.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-mouse-dragdrop-cursor',
    styleUrls: [
        './mouse-dragdrop-cursor.component.scss',
    ],
    templateUrl: './mouse-dragdrop-cursor.component.html',
})
export class DejaMouseDragDropCursorComponent implements OnDestroy {
    @ViewChild('block') private icon: ElementRef;
    @ViewChild('content') private content: ElementRef;
    private position$ = new BehaviorSubject<Position>(undefined);
    private cursor$ = new BehaviorSubject<IDragCursorInfos>(undefined);
    private _dragCursor: IDragCursorInfos;
    private _currentCursor: IDragCursorInfos;
    private _dropCursor: IDropCursorInfos;
    private isAlive = true;

    constructor(elementRef: ElementRef, private dragDropService: DejaMouseDragDropService) {
        const element = elementRef.nativeElement as HTMLElement;

        observableFrom(this.position$).pipe(
            takeWhile(() => this.isAlive))
            .subscribe((pos) => {
                element.style.left = pos ? `${pos.left}px` : '-1000px';
                element.style.top = pos ? `${pos.top}px` : '-1000px';
            });

        const cursor$ = observableFrom(this.cursor$);

        // Hide
        cursor$.pipe(
            takeWhile(() => this.isAlive),
            filter((dragCursor) => !dragCursor),
            tap((dragCursor) => {
                if (this._currentCursor && this.contentElement && this.iconElement) {
                    this.contentElement.style.opacity = '0';
                    this.iconElement.style.opacity = '0';
                }
                this._currentCursor = dragCursor;
            }),
            delay(300))
            .subscribe(() => {
                this.position$.next(null);
                element.style.display = 'none';
            });

        // Show
        cursor$.pipe(
            takeWhile(() => this.isAlive),
            filter((dragCursor) => !!dragCursor),
            tap((dragCursor) => {
                element.style.display = '';
                if (this.contentElement && this.iconElement) {
                    this.contentElement.style.opacity = '0';
                    this.iconElement.style.opacity = '0';
                }
                this._currentCursor = dragCursor;
            }),
            filter((dragCursor) => !dragCursor.className || dragCursor.className !== 'hidden'),
            tap((dragCursor) => {
                if (!!dragCursor.html) {
                    element.className = dragCursor.className;
                    if (this.contentElement && this.iconElement) {
                        this.contentElement.innerHTML = dragCursor.html;
                        this.contentElement.style.width = `${dragCursor.width || 48}px`;
                        this.contentElement.style.height = `${dragCursor.height || 48}px`;
                    }
                } else {
                    if (this.iconElement) {
                        this.iconElement.style.opacity = '1';
                    }
                }
            }),
            delay(1))
            .subscribe((dragCursor) => {
                if (!!dragCursor.html && this.contentElement) {
                    this.contentElement.style.opacity = '1';
                }
            });

        observableFrom(this.dragDropService.dragCursor$).pipe(
            takeWhile(() => this.isAlive))
            .subscribe((dragCursor) => {
                if (!!dragCursor !== !!this._dragCursor) {
                    this._dragCursor = dragCursor;
                }

                if (this._dropCursor && this._dragCursor) {
                    dragCursor.className = this._dropCursor.className || this._dragCursor.className;
                    dragCursor.html = this._dropCursor.html || this._dragCursor.html;
                    dragCursor.width = this._dropCursor.width || this._dragCursor.width;
                    dragCursor.height = this._dropCursor.height || this._dragCursor.height;
                }

                if (!!dragCursor !== !!this._currentCursor || (dragCursor && !!dragCursor.html !== !!this._currentCursor.html)) {
                    // Update Content
                    this.cursor$.next(dragCursor);
                } else if (dragCursor) {
                    // Update only Position
                    this.position$.next(dragCursor.position);
                }
            });

        observableFrom(this.dragDropService.dropCursor$).pipe(
            takeWhile(() => this.isAlive))
            .subscribe((dropCursor) => {
                this._dropCursor = dropCursor;
            });
    }

    private get iconElement() {
        return this.icon.nativeElement as HTMLElement;
    }

    private get contentElement() {
        return this.content.nativeElement as HTMLElement;
    }

    public ngOnDestroy() {
        this.isAlive = false;
    }
}
