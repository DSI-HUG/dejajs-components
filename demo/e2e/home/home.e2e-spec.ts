/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { browser } from 'protractor';
import { HomePage } from './home.po';

describe('dejajs-components-demo Home', () => {
    let page: HomePage;

    beforeEach(() => {
        browser.ignoreSynchronization = true;
        page = new HomePage();
    });

    it('should display DEJA JS title', async () => {
        page.navigateTo().then(() => {
            browser.waitForAngular().then(() => {
                expect(page.getTitleText()).toEqual('DEJA JS Components');
            });
        });
    });
});
