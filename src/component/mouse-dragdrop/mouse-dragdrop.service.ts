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

/**
 * Dragdrop service for mouse drag and drop
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Position } from '../../common/core/graphics/position';

@Injectable()
export class DejaMouseDragDropService {
    private clipboard = {} as { [key: string]: any };
    public cursorInfos$ = new BehaviorSubject<ICursorInfos>(undefined);

    constructor() {

    }

    get(key: string) {
        return this.clipboard[key];
    }

    set(key: string, value: any) {
        this.clipboard[key] = value;
    }

    isAvailable(key: string) {
        return !!this.clipboard[key];
    }

    clear() {
        this.clipboard = {};
    }
}

export interface ICursorInfos {
    position: Position;
    html?: string;
    width?: number;
    height?: number;
    className?: string;
}
