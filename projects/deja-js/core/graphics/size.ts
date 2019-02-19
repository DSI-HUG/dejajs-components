/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

export class Size {
    public width: number;
    public height: number;

    public static equals(s1: Size, s2: Size) {
        return s1.width === s2.width && s1.height === s2.height;
    }

    constructor(width?: number, height?: number) {
        this.width = width || 0;
        this.height = height || 0;
    }

    public clone() {
        return new Size(this.width, this.height);
    }
}
