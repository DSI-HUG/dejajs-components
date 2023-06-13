/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { ColorEvent } from '@deja-js/component/color-selector';
import { Color, MaterialColorService } from '@deja-js/component/core/graphics';

@Component({
    selector: 'deja-color-selector-demo',
    styleUrls: ['./color-selector-demo.scss'],
    templateUrl: './color-selector-demo.html'
})
export class DejaColorSelectorDemoComponent {
    public tabIndex = 1;

    public selectedColor = new Color(233, 30, 99);
    public invalidColor = Color.fromHex('#D02D06');
    public hoveredColor: Color;

    public constructor(public materialColors: MaterialColorService) { }

    public onColorPickerHover(event: ColorEvent): void {
        this.hoveredColor = event.color;
    }

    public onColorPickerChange(event: ColorEvent): void {
        this.hoveredColor = event.color;
    }
}
