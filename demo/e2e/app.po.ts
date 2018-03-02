/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { browser, by, element } from 'protractor';

export class DejajsComponentsDemoPage {
    public navigateTo() {
        return browser.get('/');
    }

    public getSideNav() {
        return element(by.css('app-root deja-sidenav'));
    }
}
