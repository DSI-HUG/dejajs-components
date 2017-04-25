/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
    selector: 'deja-content-editable-demo',
    styleUrls: ['./content-editable-demo.scss'],
    templateUrl: './content-editable-demo.html',
})
export class DejaContentEditableDemoComponent {
    protected tabIndex = 1;

    protected designMode = false;

    constructor() { }

}
