/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { HomePage } from './home.po';

describe('dejajs-component App', () => {
    let page: HomePage;

    beforeEach(() => {
        page = new HomePage();
    });

    it('should display DEJA JS title', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('DEJA JS Components');
    });
});
