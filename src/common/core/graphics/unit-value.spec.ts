/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { UnitValue } from './unit-value';

describe('UnitValue', () => {
    const unitValue = new UnitValue(null, null);

    it('should create the class', () => {
        expect(unitValue instanceof UnitValue).toBeTruthy();
    });
});
