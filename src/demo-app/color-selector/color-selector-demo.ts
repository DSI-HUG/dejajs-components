/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import {Component} from '@angular/core';
import { Color, ColorEvent } from '../../common/core/graphics';
import {MaterialColors} from '../../common/core/style';

@Component({
    selector: 'deja-color-selector-demo',
    styleUrls: ['./color-selector-demo.scss'],
    templateUrl: './color-selector-demo.html',
})
export class DejaColorSelectorDemo {
    protected selectedColor = Color.fromHex('#FFA000');
    protected invalidColor = Color.fromHex('#FFA012');
    private hoveredColor: string;

    constructor(protected materialColors: MaterialColors) { }

    protected onColorPickerHover(event: ColorEvent) {
        this.hoveredColor = event.colorName;
    }

    protected onColorPickerChange(event: ColorEvent) {
        this.hoveredColor = event.colorName;
    }
}
