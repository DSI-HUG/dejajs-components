/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

export class Color {
    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;

    public static equals(c1: Color, c2: Color) {
        return !c1 === !c2 && !c1.isEmpty() && c1.r === c2.r && c1.g === c2.g && c1.b === c2.b && c1.a === c2.a;
    }

    /**
     *
     * @param colorValueHex exemple: #127bdc #FFF #
     * @returns {Color}
     */
    public static fromHex(colorValueHex: string) {
        if (!colorValueHex || colorValueHex.length < 3) {
            return new Color();
        }

        let r: number;
        let g: number;
        let b: number;
        let a: number;

        if (colorValueHex[0] === '#') {
            colorValueHex = colorValueHex.substring(1) ;
        }
        switch (colorValueHex.length) {
            case 3: // short
                r = parseInt(colorValueHex[0] + colorValueHex[0], 16);
                g = parseInt(colorValueHex[2] + colorValueHex[2], 16);
                b = parseInt(colorValueHex[4] + colorValueHex[4], 16);
                break;
            case 6: // Standard
                r = parseInt(colorValueHex.substring(0,2), 16);
                g = parseInt(colorValueHex.substring(2,4), 16);
                b = parseInt(colorValueHex.substring(4,6), 16);
                break;
            case 8: // with alpha
                r = parseInt(colorValueHex.substring(0,2), 16);
                g = parseInt(colorValueHex.substring(2,4), 16);
                b = parseInt(colorValueHex.substring(4,6), 16);
                a = parseInt(colorValueHex.substring(6,8), 16);
                break;
            default:
                throw new Error('Invalid color.');
        }

        return new Color(r, g, b, a);
    }

    public static parse(color: string) {
        if (color[0] === '#') {
            return Color.fromHex(color);
        } else {
            const rgb = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/.exec(color);
            if (rgb !== null) {
                return new Color(+rgb[1], +rgb[2], +rgb[3]);
        }

            const rgba = /rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (\d{1,3})\)/.exec(color);
            if (rgba !== null) {
                return new Color(+rgba[1], +rgba[2], +rgba[3], +rgba[4]);
            }
        }
    }


    constructor(r?: number, g?: number, b?: number, a?: number) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }

    public get r() {
        return this._r;
    }

    public get g() {
        return this._g;
    }

    public get b() {
        return this._b;
    }

    public get a() {
        return this._a;
    }

    public get bestTextColor() {
        const a = 1 - (0.299 * this.r + 0.587 * this.g + 0.114 * this.b) / 255;
        const d = a < 0.5 ? 0 : 255;
        return new Color(d, d, d, this.a);
    }

    public get grayScale() {
        const g = Math.round((this.r + this.g + this.b) / 3);
        return new Color(g, g, g, this.a);
    }

    public isEmpty() {
        return this.r === undefined || this.g === undefined || this.b === undefined;
    }

    public clone() {
        return new Color(this.r, this.g, this.b, this.a);
    }

    public toHex() {
        const toHex = (d) => {
            return ('0' + (Number(d).toString(16))).slice(-2).toUpperCase();
        };

        if (this.isEmpty()) {
            return undefined;
        } else if (this.a !== undefined) {
            return `#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}${toHex(this.a)}`;
        } else {
            return `#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}`;
        }
    }
}
