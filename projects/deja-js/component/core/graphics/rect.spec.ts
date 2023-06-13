/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Position } from './position';
import { Rect } from './rect';

describe('Rect', () => {
    const r1 = new Rect(10, 20, 100, 200);
    const r2 = Rect.fromLTRB(10, 20, 110, 220);
    const r3 = Rect.fromPoints(new Position(210, 120), new Position(310, 320));
    const r4 = new Rect({
        left: 210,
        top: 120,
        right: 310,
        bottom: 320
    } as ClientRect);

    it('should create the class', () => {
        void expect(r1 instanceof Rect).toBeTruthy();
        void expect(r1.left).toBe(10);
        void expect(r1.top).toBe(20);
        void expect(r1.width).toBe(100);
        void expect(r1.height).toBe(200);
        void expect(Rect.equals(r1, r2)).toBeTruthy();
        void expect(Rect.equals(r1, r3)).toBeFalsy();
        void expect(Rect.equals(r3, r4)).toBeTruthy();
    });

    it('should union the rectangles', () => {
        const union = Rect.union(r1, r3);
        void expect(union.left).toBe(10);
        void expect(union.top).toBe(20);
        void expect(union.width).toBe(300);
        void expect(union.height).toBe(300);
    });

    it('should clone the rectangle', () => {
        const cloned = r1.clone();
        void expect(r1 === cloned).toBeFalsy();
        void expect(Rect.equals(r1, cloned)).toBeTruthy();
    });

    it('should set the right', () => {
        const clone = r1.clone();
        clone.right = 200;
        void expect(clone.right).toBe(200);
        void expect(clone.width).toBe(190);
    });

    it('should set the bottom', () => {
        const clone = r1.clone();
        clone.bottom = 200;
        void expect(clone.bottom).toBe(200);
        void expect(clone.height).toBe(180);
    });

    it('should get the position', () => {
        const p = r1.position;
        void expect(p.left).toBe(10);
        void expect(p.top).toBe(20);
    });

    it('should offset the rectangle', () => {
        const offset = r1.offset(5, -5);
        void expect(offset.left).toBe(15);
        void expect(offset.top).toBe(15);
    });

    it('should check if empty', () => {
        void expect(r1.isEmpty()).toBeFalsy();
        void expect((new Rect()).isEmpty()).toBeTruthy();
    });

    it('should export to ClientRect struct', () => {
        const crect = r1.toDomRect();
        void expect(crect.left).toBe(10);
        void expect(crect.top).toBe(20);
        void expect(crect.width).toBe(100);
        void expect(crect.height).toBe(200);
        void expect(crect.right).toBe(110);
        void expect(crect.bottom).toBe(220);

        const crect2 = r1.toDomRect();
        void expect(crect2.left).toBe(10);
        void expect(crect2.top).toBe(20);
        void expect(crect2.width).toBe(100);
        void expect(crect2.height).toBe(200);
        void expect(crect2.right).toBe(110);
        void expect(crect2.bottom).toBe(220);
    });

    it('should check intersection', () => {
        void expect(r1.intersectWith(r2)).toBeTruthy();
        void expect(r1.intersectWith(r3.offset(-100, 0))).toBeFalsy();
        void expect(r1.intersectWith(r3)).toBeFalsy();
        void expect(r1.intersectWith(r3.offset(-100, 100))).toBeFalsy();
    });

    it('should check contains', () => {
        void expect(r1.contains(r2)).toBeTruthy();
        void expect(r1.contains(r3)).toBeFalsy();
        void expect(r1.contains(r2.offset(1, 0))).toBeFalsy();
        const p = new Position(10, 20);
        void expect(r1.containsPoint(p)).toBeTruthy();
        void expect(r1.containsPoint(p.offset(100, 200))).toBeTruthy();
        void expect(r1.containsPoint(p.offset(101, 200))).toBeFalsy();
    });

    it('should check adjacent', () => {
        const r = r1.offset(r1.width, 0);
        void expect(r1.adjacent(r)).toBeTruthy();
    });

    it('should get overlapInfos', () => {
        const infos = Rect.overlapInfos(r1, r3.offset(-150, 0));
        void expect(infos.width).toBe(50);
        void expect(infos.height).toBe(100);
        void expect(infos.area).toBe(5000);
        void expect(infos.direction).toBe('vertical');
    });
});
