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

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'deja-dialog',
    styleUrls: ['./dialog.component.scss'],
    templateUrl: './dialog.component.html',
})
export class DejaDialogComponent {
    @Output() public closed = new EventEmitter();

    constructor() { }

    public close() {
        this.closed.emit();
    }
}
