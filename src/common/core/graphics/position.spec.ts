/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Position } from './position';

describe('Position', () => {
    const position = new Position(20, 30);

    it('should create the class', () => {
        expect(position instanceof Position).toBeTruthy();
        expect(position.left).toBe(20);
        expect(position.top).toBe(30);
    });

    it('should offset the position', () => {
        const offset = position.offset(5, -5);
        expect(offset.left).toBe(25);
        expect(offset.top).toBe(25);
    });

    it('should clone the position', () => {
        const cloned = position.clone();
        expect(position === cloned).toBeFalsy();
        expect(Position.equals(position, cloned)).toBeTruthy();
    });

    it('should constrain the position', () => {
        const c1 = position.constrain(0, 100, 0, 100);
        expect(c1.left).toBe(20);
        expect(c1.top).toBe(30);
        const c2 = position.constrain(0, 10, 0, 10);
        expect(c2.left).toBe(10);
        expect(c2.top).toBe(10);
        const c3 = position.constrain(50, 100, 50, 100);
        expect(c3.left).toBe(50);
        expect(c3.top).toBe(50);
    });

    it('should check around a span', () => {
        expect(position.around(10, 20, 10, 10)).toBeTruthy();
        expect(position.around(10, 10, 10, 10)).toBeFalsy();
        expect(position.around(20, 30, 0, 0)).toBeTruthy();
        expect(position.around(25, 35, 5, 5)).toBeTruthy();
        expect(position.around(25, 36, 5, 5)).toBeFalsy();
    });
});
