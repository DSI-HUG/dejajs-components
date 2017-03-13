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

import { DejaCancelableEvent } from '../../common/core/events/cancelable-event';
import { IDejaTile } from './index';

export interface DejaTilesEvent extends CustomEvent {
    tiles: IDejaTile[];
}

export interface DejaTilesCancelableEvent extends DejaCancelableEvent {
    tiles: IDejaTile[];
}

export interface DejaTilesRemoveEvent extends DejaTilesCancelableEvent {
    removed: IDejaTile[];
}

export interface DejaTilesAddEvent extends DejaTilesCancelableEvent {
    added: IDejaTile[];
}
