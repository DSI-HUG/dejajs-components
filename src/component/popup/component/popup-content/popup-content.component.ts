/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component, Input, OnInit } from '@angular/core';
import { DejaPopupConfig } from '../../model/popup-config.model';

@Component({
    selector: 'deja-popup-content',
    templateUrl: './popup-content.component.html',
    styleUrls: ['./popup-content.component.scss']
})
export class DejaPopupContentComponent implements OnInit {

    @Input() public config: DejaPopupConfig;

    constructor() { }

    public ngOnInit() {
    }

}
