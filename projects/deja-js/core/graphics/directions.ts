/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/* eslint-disable @typescript-eslint/naming-convention */
export enum Directions {
    none = 0x0,
    left = 0x1,
    right = 0x2,
    top = 0x4,
    bottom = 0x8,
    horizontal = 0x3,
    vertical = 0xc,
    all = 0xf,
}
