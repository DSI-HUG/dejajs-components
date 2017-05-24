/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'deja-splitter-demo',
    styleUrls: [
        'splitter-demo.scss',
    ],
    templateUrl: 'splitter-demo.html',
})
export class DejaSplitterDemoComponent implements OnInit {
    protected tabIndex = 1;

    constructor() {
    }

    public ngOnInit() {

    }
}
