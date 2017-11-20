/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Position } from './position';

describe('Position', () => {
    const position = new Position(null, null);

    it('should create the class', () => {
        expect(position instanceof Position).toBeTruthy();
    });
});
