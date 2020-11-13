/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Position } from './position';
import { Rect } from './rect';

interface IRect {
    left: number;
    top: number;
    width: number;
    height: number;
}

export class Circle {
    /** Create e new circle instance from the center position and the radius */
    public constructor(public center: Position, public radius: number) {

    }

    /**
     * Return a circle from his outer rectangle.
     *
     * @param left      The left position of the circle center or a rectangle object.
     * @param top       The top position of the circle center
     * @param width     The width of the outer rectangle
     * @param height    The height of the outer rectangle
     * @return A circle contained end centered inside the passed ractangle
     */
    public static fromOuterRect(left?: number | unknown, top?: number, width?: number, height?: number): Circle {
        if (typeof left === 'object') {
            const bounds = left as IRect;
            left = bounds.left;
            top = bounds.top;
            width = bounds.width;
            height = bounds.height;
        }
        const radius = Math.min(width, height) / 2;

        const center = new Position(+left + (width / 2), top + (height / 2));
        return new Circle(center, radius);
    }

    /** Return a boolean indicating if the two circle are equals */
    public static equals(c1: Circle, c2: Circle): boolean {
        return !c1 === !c2 && Position.equals(c1.center, c2.center) && c1.radius === c2.radius;
    }

    /** Return the outer rectangle of the circle */
    public get outerRect(): Rect {
        return Rect.fromLTRB(this.center.left - this.radius, this.center.top - this.radius, this.center.left + this.radius, this.center.top + this.radius);
    }

    /** Return a boolean indicate if the circle contains the passed circle */
    public contains(circle: Circle): boolean {
        return this.outerRect.contains(circle.outerRect);
    }

    /** Return a boolean indicate if the passed point is inside the circle */
    public containsPoint(point: Position): boolean {
        const dx = Math.abs(point.left - this.center.left);
        const dy = Math.abs(point.top - this.center.top);

        return dx * dx + dy * dy <= this.radius * this.radius;
    }

    /** Return a the cloned of the cirlce */
    public clone(): Circle {
        return new Circle(this.center, this.radius);
    }

    /** Inflate the circle radius with the specified value */
    public inflate(radius: number): Circle {
        return new Circle(this.center, this.radius + radius);
    }
}
