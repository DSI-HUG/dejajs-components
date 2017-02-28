/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { Color } from './index';

export class ColorEvent {
    private _colorName: string;
    private _color: Color;
    private _event: Event;

    constructor(event: Event) {
        this._event = event;
    }

    public get originalEvent() {
        return this._event;
    }

    public get colorName() {
        return this._colorName || (this._color && this._color.toHex());
    }

    public set colorName(colr: string) {
        this._colorName = colr;
        this._color = undefined;
    }

    public get color() {
        // Parse on demand only
        return this._color || Color.fromHex(this._colorName);
    }

    public set color(colr: Color) {
        this._color = colr;
        this._colorName = undefined;
    }

    public initColorEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, color?: string | Color) {
        this._event.initEvent(typeArg, canBubbleArg, cancelableArg);
        if (typeof color === 'string') {
            this.colorName = color;
        } else {
            this.color = color;
        }
    }
}
