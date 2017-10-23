/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

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
    });
});
