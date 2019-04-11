/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { SafeHtml } from '@angular/platform-browser';
import { Rect } from '@deja-js/core';
import { DejaTile } from './tile.class';

export enum DejaTileBorderDirection {
    top = 0x1,
    right = 0x2,
    bottom = 0x4,
    left = 0x8,
    all = 0xF,
}

export class DejaTileGroup extends DejaTile {
    public html: SafeHtml;
    public borderWidth: number;
    public borderColor: string;
    public borderDirection: DejaTileBorderDirection;

    constructor(id?: string) {
        super(id);
        this.color = 'rgb(38, 50, 56)';
        this.clearBorder();
    }

    public get idealBounds() {
        return new Rect(0, 0, 15, 5);
    }

    public clearBorder() {
        this.borderDirection = DejaTileBorderDirection.all;
        this.borderWidth = 0;
        this.borderColor = '#000';
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
