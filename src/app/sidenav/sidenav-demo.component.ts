/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { DejaSidenavService } from '@deja-js/component/sidenav';

@Component({
    selector: 'sidenav-demo',
    templateUrl: 'sidenav-demo.component.html',
    styleUrls: ['sidenav-demo.component.scss']
})
export class SidenavDemoComponent {

    public tabIndex = 1;

    public constructor(
        private sidenavService: DejaSidenavService
    ) { }

    public toggle() {
        this.sidenavService.toggle();
    }

    public open() {
        this.sidenavService.open();
    }

    public close() {
        this.sidenavService.close();
    }
}
