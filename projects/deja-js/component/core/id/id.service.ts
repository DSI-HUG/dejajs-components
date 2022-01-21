/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';

/** Classe de génération d'un guid. */
@Injectable({
    providedIn: 'root'
})
export class IdService {
    /** Renvoie le guid sous format string. */
    public generate(): string {
        let d = new Date().getTime();
        if (window.performance !== undefined) {
            if (typeof window.performance.now === 'function') {
                d += performance.now();
            }
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            // eslint-disable-next-line no-bitwise
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            // eslint-disable-next-line no-bitwise
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}
