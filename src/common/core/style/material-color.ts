/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Color } from '../graphics/color';
import { MaterialColors } from '../index';

export class MaterialColor extends Color {
    public name: string;
    public subColors = [] as MaterialColor[];

    public static fromText(text: string) {
        let sum = 0;
        for (let i = 0; i < text.length; i++) {
            sum += text.charCodeAt(i);
        }
        const colors = new MaterialColors().colors;
        const subColors = (colors[sum % colors.length]).subColors;
        return subColors[sum % subColors.length];
    }
}
