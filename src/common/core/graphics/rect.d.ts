import { Position } from './position';
export declare enum RectOverlapDirection {
    horizontal = 0,
    vertical = 1,
}
export interface IRectOverlapInfos {
    area: number;
    width: number;
    height: number;
    direction: RectOverlapDirection;
}
export declare class Rect {
    left: number;
    top: number;
    width: number;
    height: number;
    static equals(r1: Rect, r2: Rect): boolean;
    static union(r1: Rect, r2: Rect): Rect;
    static overlapInfos(rect1: Rect, rect2: Rect): IRectOverlapInfos;
    static fromLTRB(left: number, top: number, right: number, bottom: number): Rect;
    static fromPoints(p1: Position, p2: Position): Rect;
    constructor(left?: number | Object, top?: number, width?: number, height?: number);
    right: number;
    bottom: number;
    readonly position: Position;
    offset(x: number, y: number): Rect;
    adjacent(bounds: Rect): boolean;
    contains(bounds: Rect): boolean;
    containsPoint(point: Position): boolean;
    intersectWith(bounds: Rect): boolean;
    isEmpty(): boolean;
    clone(): Rect;
    toClientRect(): ClientRect;
    toRectStruct(): ClientRect;
}
