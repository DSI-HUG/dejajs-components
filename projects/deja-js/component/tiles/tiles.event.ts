/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { IDejaCancelableEvent } from '@deja-js/core';
import { IDejaTile } from './tile.interface';

export interface IDejaTilesEvent extends CustomEvent {
    tiles: IDejaTile[];
}

export interface IDejaTilesCancelableEvent extends IDejaCancelableEvent {
    tiles: IDejaTile[];
}

export interface IDejaTilesRemoveEvent extends IDejaTilesCancelableEvent {
    removed: IDejaTile[];
}

export interface IDejaTilesAddEvent extends IDejaTilesCancelableEvent {
    added: IDejaTile[];
}

export interface IDejaTilesModelEvent extends IDejaTilesEvent {
    removed?: IDejaTile[];
    added?: IDejaTile[];
}
