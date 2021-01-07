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
        void expect(value1 instanceof UnitValue).toBeTruthy();
        void expect(value2 instanceof UnitValue).toBeTruthy();
        void expect(UnitValue.equals(value1, value2)).toBeTruthy();
        void expect(value3 instanceof UnitValue).toBeTruthy();
        void expect(value1.isInvalid()).toBeFalsy();
        void expect(value2.isInvalid()).toBeFalsy();
        void expect(value3.isInvalid()).toBeTruthy();
        void expect(value1.toString()).toEqual('12px');
    });

    it('should clone the class', () => {
        const cloned = value1.clone();
        void expect(value1 === cloned).toBeFalsy();
        void expect(UnitValue.equals(value1, cloned)).toBeTruthy();
    });
});
