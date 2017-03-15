export declare class Size {
    width: number;
    height: number;
    static equals(s1: Size, s2: Size): boolean;
    constructor(width?: number, height?: number);
    clone(): Size;
}
