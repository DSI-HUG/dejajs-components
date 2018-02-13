/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
export interface HSL {
    h: number;
    s: number;
    l: number;
}

export class Color {
    private static colorNames = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrodyellow: '#fafad2',
        lightgrey: '#d3d3d3',
        lightgreen: '#90ee90',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370d8',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#d87093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd3',
    } as { [color: string]: string };

    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;

    public static equals(c1: Color, c2: Color) {
        return !c1 === !c2 && !c1.isEmpty() && c1.r === c2.r && c1.g === c2.g && c1.b === c2.b && c1.a === c2.a;
    }

    public static fromHSL(h: number, s: number, l: number) {
        let r: number;
        let g: number;
        let b: number;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {

            const hue2rgb = (p: number, q: number, t: number) => {
                if (t < 0) {
                    t += 1;
                }
                if (t > 1) {
                    t -= 1;
                }
                if (t < 1 / 6) {
                    return p + (q - p) * 6 * t;
                }
                if (t < 1 / 2) {
                    return q;
                }
                if (t < 2 / 3) {
                    return p + (q - p) * (2 / 3 - t) * 6;
                }
                return p;
            };

            const qq = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const pp = 2 * l - qq;

            r = hue2rgb(pp, qq, h + 1 / 3);
            g = hue2rgb(pp, qq, h);
            b = hue2rgb(pp, qq, h - 1 / 3);
        }

        return new Color(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
    }

    /**
     * @param hex hexadecimal color value, exemple: #127bdc #FFF #127bdc56
     */
    public static fromHex(hex: string) {
        if (!hex || hex.length < 3) {
            return new Color();
        }

        let r: number;
        let g: number;
        let b: number;
        let a: number;
        let startIndex = hex[0] === '#' ? 1 : 0;
        switch (hex.length - startIndex) {
            case 3:
                r = parseInt(hex[startIndex] + hex[startIndex], 16);
                g = parseInt(hex[++startIndex] + hex[startIndex], 16);
                b = parseInt(hex[++startIndex] + hex[startIndex], 16);
                break;
            case 4:
                r = parseInt(hex[startIndex] + hex[startIndex], 16);
                g = parseInt(hex[++startIndex] + hex[startIndex], 16);
                b = parseInt(hex[++startIndex] + hex[startIndex], 16);
                a = parseInt(hex[++startIndex] + hex[startIndex], 16);
                break;
            case 6:
                r = parseInt(hex[startIndex] + hex[++startIndex], 16);
                g = parseInt(hex[++startIndex] + hex[++startIndex], 16);
                b = parseInt(hex[++startIndex] + hex[++startIndex], 16);
                break;
            case 8:
                r = parseInt(hex[startIndex] + hex[++startIndex], 16);
                g = parseInt(hex[++startIndex] + hex[++startIndex], 16);
                b = parseInt(hex[++startIndex] + hex[++startIndex], 16);
                a = parseInt(hex[++startIndex] + hex[++startIndex], 16);
                break;
            default:
                throw new Error('Invalid color.');
        }

        return new Color(r, g, b, a);
    }

    public static parse(color: string) {
        if (!color || color.length === 0) {
            return new Color();
        } else if (Color.colorNames[color]) {
            return Color.fromHex(Color.colorNames[color]);
        } else if (color[0] === '#') {
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
        if (this.isEmpty()) {
            return new Color();
        }
        const a = 1 - (0.299 * this.r + 0.587 * this.g + 0.114 * this.b) / 255;
        const d = a < 0.5 ? 0 : 255;
        return new Color(d, d, d, this.a);
    }

    public get grayScale() {
        if (this.isEmpty()) {
            return new Color();
        }
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
        const toHex = (d: number) => {
            const s = Number(d).toString(16);
            return `0${s}`.slice(-2).toUpperCase();
        };

        if (this.isEmpty()) {
            return undefined;
        } else if (this.a !== undefined) {
            return `#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}${toHex(this.a)}`;
        } else {
            return `#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}`;
        }
    }

    public toHSL(): HSL {
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = (max + min) / 2;
        let s = h;
        const l = h;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            if (r > g && r > b) {
                h = (g - b) / d + (g < b ? 6 : 0);
            } else if (g > b) {
                h = (b - r) / d + 2;
            } else {
                h = (r - g) / d + 4;
            }

            h /= 6;
        }

        return { h: h, s: s, l: l } as HSL;
    }
}
