export declare class Color {
    private _r;
    private _g;
    private _b;
    private _a;
    static equals(c1: Color, c2: Color): boolean;
    static fromHex(hex: string): Color;
    static parse(color: string): Color;
    constructor(r?: number, g?: number, b?: number, a?: number);
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;
    readonly bestTextColor: Color;
    readonly grayScale: Color;
    isEmpty(): boolean;
    clone(): Color;
    toHex(): string;
}
