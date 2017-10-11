/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { by, element } from 'protractor';
import { Util } from '../util/index';
import { SidenavPage } from './sidenav.po';

describe('Sidenav component', () => {
    let sidenav: SidenavPage;

    beforeEach(() => {
        Util.init();
        sidenav = new SidenavPage();
    });

    it('should be visible by default', async () => {
        sidenav.navigateTo();
        expect(element(by.css('deja-sidenav-menu')).isDisplayed()).toBe(true);
    });

    it('should reduce on menu click', async () => {
        sidenav.navigateTo();
        Util.waitForElement('deja-sidenav-menu');
        expect(element(by.css('deja-sidenav-menu md-list-item.active .mat-list-text')).isDisplayed()).toBe(true);

        element(by.css('md-sidenav .header-menu-btn')).click();
        expect(element(by.css('deja-sidenav-menu md-list-item.active .mat-list-text')).isDisplayed()).toBe(false);
    });
});
