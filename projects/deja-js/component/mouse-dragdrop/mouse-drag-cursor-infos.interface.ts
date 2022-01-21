/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Position } from '@deja-js/component/core/graphics';

import { IDropCursorInfos } from './mouse-drop-cursor-infos.interface';

export interface IDragCursorInfos extends IDropCursorInfos {
    position: Position;
    originalHtml: string;
    originalEvent: MouseEvent;
}
