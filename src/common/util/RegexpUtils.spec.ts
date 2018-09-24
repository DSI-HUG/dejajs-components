/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { RegExpUtils } from './RegExpUtils';

describe('RegExpUtils', () => {

    it('should escape special chars', () => {
        const value = 'regexp special chars +?^${}()|[]\\ escaping.\n';
        const escapedValue = RegExpUtils.escapeRegExp(value);
        expect('regexp special chars \\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\ escaping\\.\n').toEqual(escapedValue);
    });

});
