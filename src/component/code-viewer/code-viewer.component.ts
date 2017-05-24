/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterViewChecked, Component, Input, ViewEncapsulation } from '@angular/core';

import * as Prism from 'prismjs';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-code-viewer',
    styleUrls: ['./code-viewer.component.scss'],
    templateUrl: './code-viewer.component.html',
})
export class DejaCodeViewerComponent implements AfterViewChecked {
    @Input() public language: string;

    private initialised = false;

    constructor() {
        // console.log('ok');
    }

    public ngAfterViewChecked() {
        // console.log('ok');
        if (!this.initialised) {
            // console.warn('not initialised');
            Prism.highlightAll(false, () => {
                this.initialised = true;
            });
        }
    }
}
