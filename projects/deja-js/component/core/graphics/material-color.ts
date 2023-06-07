/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Color } from './color';

export class MaterialColor extends Color {
    public name: string;
    public subColors = new Array<MaterialColor>() as ReadonlyArray<MaterialColor>;
}
