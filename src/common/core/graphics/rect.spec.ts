/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Rect } from './rect';

describe('Rect', () => {
    const rect = new Rect(null, null);

    it('should create the class', () => {
        expect(rect instanceof Rect).toBeTruthy();
    });
});
