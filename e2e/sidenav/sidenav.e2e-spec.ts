/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { browser, by, element } from 'protractor';
import { Util } from '../util/index';
import { SidenavPage } from './sidenav.po';

describe('Sidenav component', () => {
    let sidenav: SidenavPage;

    beforeEach(() => {
        Util.init();
        sidenav = new SidenavPage();
    });

    it('should be visible by default', () => {
        sidenav.navigateTo();
        expect(element(by.css('deja-sidenav-menu')).isPresent()).toBe(true);
        expect(element(by.css('deja-sidenav-menu')).isDisplayed()).toBe(true);
    });

    it('should open on menu click', () => {
        sidenav.navigateTo();

        Util.waitForElement('deja-sidenav-menu mat-list-item.active');
        expect(element(by.css('deja-sidenav-menu mat-list-item.active')).isPresent()).toBe(true);
        expect(element(by.css('deja-sidenav-menu mat-list-item.active .mat-list-text')).isDisplayed()).toBe(false, 'Should be close by default');

        element(by.css('mat-sidenav .header-menu-btn')).click();
        browser.sleep(500);
        expect(element(by.css('deja-sidenav-menu mat-list-item.active .mat-list-text')).isDisplayed()).toBe(true, 'Should be open');

        element(by.css('mat-sidenav .header-menu-btn')).click();
        browser.sleep(500);
        expect(element(by.css('deja-sidenav-menu mat-list-item.active .mat-list-text')).isDisplayed()).toBe(false, 'Should be close');
    });

    it('should be open by default on desktop', () => {
        sidenav.navigateTo();
        browser.driver.manage().window().setSize(1920, 1080);

        Util.waitForElement('deja-sidenav-menu mat-list-item.active');
        expect(element(by.css('deja-sidenav-menu mat-list-item.active')).isPresent()).toBe(true);
        expect(element(by.css('deja-sidenav-menu mat-list-item.active .mat-list-text')).isDisplayed()).toBe(true, 'Should be open');

        browser.driver.manage().window().setSize(1024, 768);
        browser.sleep(500);
    });

    it('should be hidden on mobile', () => {
        sidenav.navigateTo();
        browser.driver.manage().window().setSize(375, 667);

        Util.waitForElement('deja-sidenav-menu');
        expect(element(by.css('deja-sidenav-menu')).isDisplayed()).toBe(false, 'Should be hidden');

        element(by.css('mat-toolbar .menu-btn')).click();
        browser.sleep(500);
        expect(element(by.css('deja-sidenav-menu')).isDisplayed()).toBe(true, 'Should be visible');

        browser.driver.manage().window().setSize(1024, 768);
        browser.sleep(500);
    });
});
