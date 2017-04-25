/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';

/**
 * Global property bag for copy paste
 */
@Injectable()
export class DejaClipboardService {
    private clipboard = {} as { [key: string]: any };

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

