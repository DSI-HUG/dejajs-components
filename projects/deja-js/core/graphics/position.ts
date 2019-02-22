/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

export class Position {
    public left: number;
    public top: number;

    public static equals(p1: Position, p2: Position) {
        return p1.left === p2.left && p1.top === p2.top;
    }

    constructor(left?: number, top?: number) {
        this.left = left || 0;
        this.top = top || 0;
    }

    public offset(x: number, y: number): Position {
        return new Position(
            this.left + x,
            this.top + y,
        );
    }

    public clone() {
        return new Position(this.left, this.top);
    }

    public constrain(xmin: number, xmax: number, ymin: number, ymax: number): Position {
        return new Position(Math.min(Math.max(xmin, this.left), xmax), Math.min(Math.max(ymin, this.top), ymax));
    }

    public around(x: number, y: number, xspan: number, yspan?: number): boolean {
        return Math.abs(this.left - x) <= xspan && Math.abs(this.top - y) <= (yspan || xspan);
    }
}
