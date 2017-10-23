/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { by, element } from 'protractor';
import { Util } from '../util/index';
import { TreeListPage } from './treelist.po';

describe('TreeList component', () => {
    let page: TreeListPage;

    beforeEach(() => {
        Util.init();
        page = new TreeListPage();
    });

    it('should have 2 default items', async () => {
        page.navigateTo();
        let item = element(by.css('deja-tag deja-chips > span:first-child > span'));
        expect<any>(item.getText()).toBe('HTML5');

        element(by.css('deja-tag deja-chips > span:first-child > i')).click();

        item = element(by.css('deja-tag deja-chips > span:first-child > span'));
        expect<any>(item.getText()).toBe('ANGULAR');

        const input = element(by.css('deja-tag input'));
        input.sendKeys('CSS3');
        element(by.css('deja-tag mat-form-field i')).click();
        item = element(by.css('deja-tag deja-chips > span:last-child > span'));
        expect<any>(item.getText()).toBe('CSS3');

        // const items = element.all(by.css('deja-tag deja-chips > span:first-child'));
        // const count = await items.count();
        // expect<any>(count).toBe(2);
    });
});
