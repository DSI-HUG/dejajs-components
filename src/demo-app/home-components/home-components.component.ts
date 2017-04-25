/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
    selector: 'home-components',
    styleUrls: ['home-components.component.scss'],
    templateUrl: 'home-components.component.html',
})
export class HomeComponentsComponent {
    protected iframeOpened = false;

    protected openIFrame(e: Event) {
        this.iframeOpened = true;
        e.preventDefault();
        return false;
    }
}
