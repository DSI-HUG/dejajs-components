/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { UnitValue } from './unit-value';

describe('UnitValue', () => {
    const value1 = new UnitValue(12, 'px');
    const value2 = new UnitValue('12px');
    const value3 = new UnitValue();

    it('should create the class', () => {
        expect(value1 instanceof UnitValue).toBeTruthy();
        expect(value2 instanceof UnitValue).toBeTruthy();
        expect(UnitValue.equals(value1, value2)).toBeTruthy();
        expect(value3 instanceof UnitValue).toBeTruthy();
        expect(value1.isInvalid()).toBeFalsy();
        expect(value2.isInvalid()).toBeFalsy();
        expect(value3.isInvalid()).toBeTruthy();
        expect(value1.toString()).toEqual('12px');
    });

    it('should clone the class', () => {
        const cloned = value1.clone();
        expect(value1 === cloned).toBeFalsy();
        expect(UnitValue.equals(value1, cloned)).toBeTruthy();
    });
});
