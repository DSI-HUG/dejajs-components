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

import { Injectable } from '@angular/core';

@Injectable()
export class DragDropService {
    private static _dragInfos = {} as IDejaDragInfos;

    constructor() { }

    public get dragInfos() {
        return DragDropService._dragInfos;
    }

    public clearDragInfos() { 
        DragDropService._dragInfos = {};
    }
}

export interface IDejaDragInfos  {
    [key: string]: any;
}
