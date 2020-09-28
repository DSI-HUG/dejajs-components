/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Circle } from './circle';
import { Position } from './position';

describe('Circle', () => {
    const c1 = new Circle(new Position(10, 20), 100);
    const c2 = Circle.fromOuterRect(-90, -80, 200, 200);

    it('should create the class', () => {
        void expect(c1 instanceof Circle).toBeTruthy();
        void expect(c1.center.left).toBe(10);
        void expect(c1.center.top).toBe(20);
        void expect(c1.radius).toBe(100);
        void expect(Circle.equals(c1, c2)).toBeTruthy();
    });

    it('should clone the circle', () => {
        const cloned = c1.clone();
        void expect(c1 === cloned).toBeFalsy();
        void expect(Circle.equals(c1, cloned)).toBeTruthy();
    });

    it('should get the outer rect', () => {
        const c = Circle.fromOuterRect(c1.outerRect);
        void expect(Circle.equals(c1, c)).toBeTruthy();
    });

    it('should inflate the circle', () => {
        const c = c1.inflate(10);
        void expect(c.center.left).toBe(10);
        void expect(c.center.top).toBe(20);
        void expect(c.radius).toBe(110);
        void expect(c.contains(c1)).toBeTruthy();
        void expect(Circle.equals(c1, c)).toBeFalsy();
        const p = new Position(115, 20);
        void expect(c1.containsPoint(p)).toBeFalsy();
        void expect(c.containsPoint(p)).toBeTruthy();
    });
});
