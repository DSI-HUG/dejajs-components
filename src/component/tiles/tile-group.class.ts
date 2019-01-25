/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { DejaTile } from './tile.class';

export enum DejaTileBorderDirection {
    top = 0x1,
    right = 0x2,
    bottom = 0x4,
    left = 0x8,
}

export class DejaTileGroup extends DejaTile {
    public html: string;
    public borderWidth: string;
    public borderColor: string;
    public borderDirection: DejaTileBorderDirection;

    constructor() {
        super();
        this.color = 'rgb(38, 50, 56)';
        this.borderDirection = DejaTileBorderDirection.top + DejaTileBorderDirection.right + DejaTileBorderDirection.bottom + DejaTileBorderDirection.left;
    }

    public clone(tile?: DejaTileGroup) {
        if (!tile) {
            tile = new DejaTileGroup();
        }

        super.clone(tile);
        tile.html = this.html;
        tile.borderWidth = this.borderWidth;
        tile.borderColor = this.borderColor;
        tile.borderDirection = this.borderDirection;
        return tile;
    }
}
