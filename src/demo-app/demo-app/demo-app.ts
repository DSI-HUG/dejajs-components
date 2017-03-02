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

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'demo-app',
    styleUrls: ['./demo-app.scss', '../../scss/index.scss'],
    templateUrl: './demo-app.html',
})
export class DemoAppComponent {
    public version: string;
    protected navOpened = true;

    constructor() {

    }

    get debug() {
        // console.log('Binding ' + Date.now());
        return null;
    }
}
