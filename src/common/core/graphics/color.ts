/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

export class Color {
    public static equals(c1: Color, c2: Color) {
        return !c1 === !c2 && !c1.isEmpty() && c1.r === c2.r && c1.g === c2.g && c1.b === c2.b;
    }

    public static fromHex(color: string) {
        if (!color || color.length < 3) {
            return new Color();
        }

        let r: number;
        let g: number;
        let b: number;
        let startIndex = color[0] === '#' ? 1 : 0;
        if (color.length < 6) {
            r = parseInt(color[startIndex] + color[startIndex], 16);
            g = parseInt(color[++startIndex] + color[startIndex], 16);
            b = parseInt(color[++startIndex] + color[startIndex], 16);
        } else {
            r = parseInt(color[startIndex] + color[++startIndex], 16);
            g = parseInt(color[++startIndex] + color[++startIndex], 16);
            b = parseInt(color[++startIndex] + color[++startIndex], 16);
        }

        return new Color(r, g, b);
    }

    private _r: number;
    private _g: number;
    private _b: number;

    constructor(r?: number, g?: number, b?: number) {
        this._r = r;
        this._g = g;
        this._b = b;
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

    public get bestTextColor() {
        let a = 1 - (0.299 * this.r + 0.587 * this.g + 0.114 * this.b) / 255;
        let d = a < 0.5 ? 0 : 255;
        return new Color(d, d, d);
    }

    public isEmpty() {
        return this.r === undefined || this.g === undefined || this.b === undefined;
    }

    public clone() {
        return new Color(this.r, this.g, this.b);
    }

    public toHex() {
        let toHex = (d) => {
            return ("0" + (Number(d).toString(16))).slice(-2).toUpperCase();
        };

        if (!this.isEmpty()) {
            return '#' + toHex(this.r) + toHex(this.g) + toHex(this.b);
        } else {
            return undefined;
        }
    }
}
