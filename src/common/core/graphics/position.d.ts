export declare class Position {
    left: number;
    top: number;
    static equals(p1: Position, p2: Position): boolean;
    constructor(left?: number, top?: number);
    offset(x: number, y: number): Position;
    clone(): Position;
    constrain(xmin: number, xmax: number, ymin: number, ymax: number): Position;
    around(x: number, y: number, xspan: number, yspan?: number): boolean;
}
