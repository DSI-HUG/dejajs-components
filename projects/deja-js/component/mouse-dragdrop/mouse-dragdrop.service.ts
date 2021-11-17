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
import { Destroy } from '@deja-js/component/core/destroy';
import { BehaviorSubject, filter, takeUntil, tap } from 'rxjs';

import { IDragCursorInfos } from './mouse-drag-cursor-infos.interface';
import { IDragDropContext } from './mouse-dragdrop-context.interface';
import { IDropCursorInfos } from './mouse-drop-cursor-infos.interface';

@Injectable({
    providedIn: 'root'
})
export class DejaMouseDragDropService extends Destroy {
    public dragCursor$ = new BehaviorSubject<IDragCursorInfos>(null);
    public dropCursor$ = new BehaviorSubject<IDropCursorInfos>(null);
    public dragging$ = new BehaviorSubject<boolean>(false);

    private _context = {} as IDragDropContext;
    private _isDragging = false;

    public constructor() {
        super();

        console.warn('@deja-js/component/mouse-dragdrop is deprecated, and will be removed in a further version. Please use @deja-js/component/v2/mouse-dragdrop.');

        this.dragging$.pipe(
            tap(value => this._isDragging = value),
            filter(value => !value),
            takeUntil(this.destroyed$)
        ).subscribe(() => this._context = {});
    }

    public get isDragging(): boolean {
        return this._isDragging;
    }

    public set context(value: IDragDropContext) {
        this._context = value;
    }

    public get context(): IDragDropContext {
        return this._context;
    }
}
