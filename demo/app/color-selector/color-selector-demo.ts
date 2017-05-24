/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { Color } from '../../../src/common/core/graphics/color';
import { ColorEvent } from '../../../src/common/core/graphics/color-event';
import { MaterialColors } from '../../../src/common/core/style/material-colors';

@Component({
    selector: 'deja-color-selector-demo',
    styleUrls: ['./color-selector-demo.scss'],
    templateUrl: './color-selector-demo.html',
})
export class DejaColorSelectorDemoComponent {
    protected tabIndex = 1;

    protected selectedColor = Color.fromHex('#FFA000');
    protected invalidColor = Color.fromHex('#FFA012');
    private hoveredColor: Color;

    constructor(protected materialColors: MaterialColors) { }

    protected onColorPickerHover(event: ColorEvent) {
        this.hoveredColor = event.color;
    }

    protected onColorPickerChange(event: ColorEvent) {
        this.hoveredColor = event.color;
    }
}
