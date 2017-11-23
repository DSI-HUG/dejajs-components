/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Color } from './color';

describe('Color', () => {
    const c1 = new Color(10, 128, 192);
    const c2 = Color.parse('rgb(10, 128, 192)');
    const empty1 = Color.parse('');
    const empty2 = Color.fromHex('');
    const c3 = Color.parse('#456');
    const c4 = Color.parse('#789A');
    const c5 = Color.parse('#445566');
    const c6 = Color.parse('#778899AA');
    const c7 = Color.parse('rgba(119, 136, 153, 170)');

    it('should create the class', () => {
        expect(c1 instanceof Color).toBeTruthy();
        expect(Color.equals(c1, c2)).toBeTruthy();
        expect(empty1.isEmpty()).toBeTruthy();
        expect(empty2.isEmpty()).toBeTruthy();
        expect(Color.equals(c3, c5)).toBeTruthy();
        expect(Color.equals(c4, c6)).toBeTruthy();
        expect(Color.equals(c7, c6)).toBeTruthy();
        expect(Color.equals(c3, c7)).toBeFalsy();
    });

    it('should clone the color', () => {
        const cloned = c1.clone();
        expect(c1 === cloned).toBeFalsy();
        expect(Color.equals(c1, cloned)).toBeTruthy();
    });

    it('should convert from and to HSL', () => {
        const hsl = c1.toHSL();
        expect(hsl.h).toBeCloseTo(0.5586, 4);
        expect(hsl.s).toBeCloseTo(0.901, 4);
        expect(hsl.l).toBeCloseTo(0.3961, 4);
        expect(Color.equals(c1, Color.fromHSL(hsl.h, hsl.s, hsl.l))).toBeTruthy();

        const c = new Color(10, 10, 10);
        const hsl2 = c.toHSL();
        expect(Color.equals(c, Color.fromHSL(hsl2.h, hsl2.s, hsl2.l))).toBeTruthy();
    });

    it('should convert to HEX', () => {
        expect(c1.toHex()).toEqual('#0A80C0');
        expect(c7.toHex()).toEqual('#778899AA');
        expect(empty1.toHex()).toBeUndefined();
    });

    it('should convert to grayScale', () => {
        const g1 = c1.grayScale;
        const g2 = empty1.grayScale;
        const g3 = c7.grayScale;
        expect(g1.toHex()).toEqual('#6E6E6E');
        expect(g2.toHex()).toBeUndefined();
        expect(g3.toHex()).toEqual('#888888AA');
    });

    it('should get the best foreground color', () => {
        const t1 = c1.bestTextColor;
        const t2 = empty1.bestTextColor;
        const t3 = c7.bestTextColor;
        expect(t1.toHex()).toEqual('#FFFFFF');
        expect(t2.toHex()).toBeUndefined();
        expect(t3.toHex()).toEqual('#000000AA');
    });

});
