/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/**
 * Dragdrop service for mouse drag and drop
 */
import { Injectable } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { Position } from '@deja-js/component/core/graphics';
import { BehaviorSubject, filter, takeUntil, tap } from 'rxjs';

export interface DropCursorInfos {
    html?: string;
    width?: number;
    height?: number;
    className?: string;
}

export interface DragCursorInfos extends DropCursorInfos {
    position: Position;
    originalHtml: string;
    originalEvent: MouseEvent;
}

@Injectable({
    providedIn: 'root'
})
export class MouseDragDropService<T> extends Destroy {
    public dragCursor$ = new BehaviorSubject<DragCursorInfos | undefined>(undefined);
    public dropCursor$ = new BehaviorSubject<DropCursorInfos | undefined>(undefined);
    public dragging$ = new BehaviorSubject<boolean>(false);
    public context?: T;

    private _isDragging = false;

    public constructor() {
        super();

        this.dragging$.pipe(
            tap(value => this._isDragging = value),
            filter(value => !value),
            takeUntil(this.destroyed$)
        ).subscribe(() => this.context = undefined);
    }

    public get isDragging(): boolean {
        return this._isDragging;
    }
}
