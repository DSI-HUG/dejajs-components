/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Position } from './position';

interface IRect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
}

export type RectOverlapDirection = 'horizontal' | 'vertical';

export interface IRectOverlapInfos {
    area: number;
    width: number;
    height: number;
    direction: RectOverlapDirection;
}

export class Rect {
    public left: number;
    public top: number;
    public width: number;
    public height: number;

    public constructor(left?: number | unknown, top?: number, width?: number, height?: number) {
        if (typeof left === 'number') {
            this.left = left || 0;
            this.top = top || 0;
            this.width = width || 0;
            this.height = height || 0;
        } else {
            const bounds = (left || {}) as IRect;
            this.left = bounds.left || 0;
            this.top = bounds.top || 0;
            this.width = bounds.right !== undefined ? bounds.right - this.left : bounds.width || 0;
            this.height = bounds.bottom !== undefined ? bounds.bottom - this.top : bounds.height || 0;
        }
    }

    public static equals(r1: Rect, r2: Rect): boolean {
        return r1 && r2 && r1.left === r2.left && r1.top === r2.top && r1.width === r2.width && r1.height === r2.height;
    }

    public static union(r1: Rect, r2: Rect): Rect {
        return Rect.fromLTRB(Math.min(r1.left, r2.left), Math.min(r1.top, r2.top), Math.max(r1.left + r1.width, r2.left + r2.width), Math.max(r1.top + r1.height, r2.top + r2.height));
    }

    public static overlapInfos(rect1: Rect, rect2: Rect): IRectOverlapInfos {
        const x = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
        const y = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
        return {
            area: x * y,
            width: x,
            height: y,
            direction: x > y ? 'horizontal' : 'vertical'
        };
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static fromLTRB(left: number, top: number, right: number, bottom: number): Rect {
        return new Rect(left, top, right - left, bottom - top);
    }

    public static fromPoints(p1: Position, p2: Position): Rect {
        return Rect.fromLTRB(Math.min(p1.left, p2.left), Math.min(p1.top, p2.top), Math.max(p1.left, p2.left), Math.max(p1.top, p2.top));
    }

    public set right(value: number) {
        this.width = value - this.left;
    }

    public get right(): number {
        return this.left + this.width;
    }

    public set bottom(value: number) {
        this.height = value - this.top;
    }

    public get bottom(): number {
        return this.top + this.height;
    }

    public get position(): Position {
        return new Position(this.left, this.top);
    }

    public offset(x: number, y: number): Rect {
        return new Rect(
            this.left + x,
            this.top + y,
            this.width,
            this.height
        );
    }

    public adjacent(bounds: Rect): boolean {
        return bounds.left <= this.right &&
            bounds.right >= this.left &&
            bounds.top <= this.bottom &&
            bounds.bottom >= this.top;
    }

    public contains(bounds: Rect): boolean {
        return bounds.left >= this.left && bounds.right <= this.right && bounds.top >= this.top && bounds.bottom <= this.bottom;
    }

    public containsPoint(point: Position): boolean {
        return point.left >= this.left && point.left <= this.right && point.top >= this.top && point.top <= this.bottom;
    }

    public intersectWith(bounds: Rect): boolean {
        return bounds.left < this.right &&
            bounds.right > this.left &&
            bounds.top < this.bottom &&
            bounds.bottom > this.top;
    }

    public isEmpty(): boolean {
        return !this.width || !this.height;
    }

    public clone(): Rect {
        return new Rect(this.left, this.top, this.width, this.height);
    }

    public toClientRect(): ClientRect {
        return {
            left: this.left,
            top: this.top,
            bottom: this.bottom,
            right: this.right,
            width: this.width,
            height: this.height
        } as ClientRect;
    }

    /**
     * @deprecated use toClientRect instead
     */
    public toRectStruct(): ClientRect {
        return this.toClientRect();
    }
}
