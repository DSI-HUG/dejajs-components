/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Rect } from '../../common/core/graphics/rect';

export interface IDejaTileEffect {
    selected: boolean;
    cutted: boolean;
    pending: boolean;
    fading: boolean;
}

export interface IDejaTile {
    id?: string;
    type?: string;
    bounds?: Rect;
    color?: string;
    templateModel?: any;
    effects?: IDejaTileEffect;
}
