/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Color } from './index';

export class ColorEvent extends CustomEvent {
    public color: Color;

    constructor(color: Color, eventInitDict?: CustomEventInit) {
        super('ColorEvent', eventInitDict);
            this.color = color;
        }
    }
