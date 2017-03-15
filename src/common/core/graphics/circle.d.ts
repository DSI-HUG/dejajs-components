import { Position, Rect } from './index';
export declare class Circle {
    center: Position;
    radius: number;
    static fromOuterRect(left?: number | Object, top?: number, width?: number, height?: number): Circle;
    constructor(center: Position, radius: number);
    readonly outerRect: Rect;
    contains(circle: Circle): boolean;
    containsPoint(point: Position): boolean;
    clone(): Circle;
    inflate(radius: number): Circle;
}
