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

import { Injectable } from '@angular/core';

/**
 * Service for cloning or copying an object
 */
@Injectable()
export class ClipboardService {
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

