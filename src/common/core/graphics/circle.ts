/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Position } from './position';
import { Rect } from './rect';

/**
 * Utils class for operations in a Circle
 */
export class Circle {
    /**
     * Return a circle from his outer rectangle.
     *
     * @param left      The left position of the circle center or a rectangle object.
     * @param top       The top position of the circle center
     * @param width     The width of the outer rectangle
     * @param height    The height of the outer rectangle
     * @return A circle contained end centered inside the passed ractangle
     */
    public static fromOuterRect(left?: number | Object, top?: number, width?: number, height?: number) {
        if (typeof left === 'object') {
            const bounds = left as any;
            left = bounds.left;
            top = bounds.top;
            width = bounds.width;
            height = bounds.height;
        }
        const radius = Math.min(width, height) / 2;

        const center = new Position(+left + (width / 2), top + (height / 2));
        return new Circle(center, radius);
    }

    /** Create e new circle instance from the center position and the radius */
    constructor(public center: Position, public radius: number) {

    }

    /** Return the outer rectangle of the circle */
    public get outerRect(): Rect {
        return Rect.fromLTRB(this.center.left - this.radius, this.center.top - this.radius, this.center.left + this.radius, this.center.top + this.radius);
    }

    /** Return a boolean indicate if the circle contains the passed circle */
    public contains(circle: Circle) {
        return this.outerRect.contains(circle.outerRect);
    }

    /** Return a boolean indicate if the passed point is inside the circle */
    public containsPoint(point: Position): boolean {
        const dx = Math.abs(point.left - this.center.left);
        const dy = Math.abs(point.top - this.center.top);

        return dx * dx + dy * dy <= this.radius * this.radius;
    }

    /** Return a the cloned of the cirlce */
    public clone() {
        return new Circle(this.center, this.radius);
    }

    /** Inflate the circle radius with the specified value */
    public inflate(radius: number) {
        return new Circle(this.center, this.radius + radius);
    }
}
