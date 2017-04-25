/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/** Classe de génération d'un guid. */
export class UUID {
    private uuid: string;

    constructor() {
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === 'function') {
            d += performance.now();
        }
        this.uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            // tslint:disable-next-line:no-bitwise
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            // tslint:disable-next-line:no-bitwise
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    /** Le renoive le guid sous format string. */
    public toString() {
        return this.uuid;
    }
}
