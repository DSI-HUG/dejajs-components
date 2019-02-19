/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { Color, MaterialColors } from '@deja-js/core';
import { IColorEvent } from '@deja-js/component/color-selector';

@Component({
    selector: 'deja-color-selector-demo',
    styleUrls: ['./color-selector-demo.scss'],
    templateUrl: './color-selector-demo.html',
})
export class DejaColorSelectorDemoComponent {
    public tabIndex = 1;

    protected selectedColor = new Color(233, 30, 99);
    protected invalidColor = Color.fromHex('#D02D06');
    private hoveredColor: Color;

    constructor(protected materialColors: MaterialColors) { }

    protected onColorPickerHover(event: IColorEvent) {
        this.hoveredColor = event.color;
    }

    protected onColorPickerChange(event: IColorEvent) {
        this.hoveredColor = event.color;
    }
}
