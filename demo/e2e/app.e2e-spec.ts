/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { browser } from 'protractor';
import { DejajsComponentsDemoPage } from './app.po';

describe('dejajs-components-demo App', () => {
    let page: DejajsComponentsDemoPage;

    beforeEach(() => {
        browser.ignoreSynchronization = true;
        page = new DejajsComponentsDemoPage();
    });

    it('should have a sidenav', async () => {
        page.navigateTo().then(() => {
            browser.waitForAngular().then(() => {
                expect(page.getSideNav()).toBeDefined();
            });
        });
    });
});
