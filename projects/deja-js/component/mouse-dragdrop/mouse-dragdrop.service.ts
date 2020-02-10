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
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { IDragCursorInfos } from './mouse-drag-cursor-infos.interface';
import { IDragDropContext } from './mouse-dragdrop-context.interface';
import { IDropCursorInfos } from './mouse-drop-cursor-infos.interface';

@Injectable({
    providedIn: 'root'
})
export class DejaMouseDragDropService {
    private _context = {} as IDragDropContext;
    private _isDragging = false;
    public dragCursor$ = new BehaviorSubject<IDragCursorInfos>(undefined);
    public dropCursor$ = new Subject<IDropCursorInfos>();
    public dragging$ = new BehaviorSubject<boolean>(false);

    constructor() {
        this.dragging$.pipe(
            tap((value) => this._isDragging = value),
            filter((value) => !value))
            .subscribe(() => this._context = {});
    }

    public get isDragging() {
        return this._isDragging;
    }

    public set context(value: IDragDropContext) {
        this._context = value;
    }

    public get context() {
        return this._context;
    }
}
