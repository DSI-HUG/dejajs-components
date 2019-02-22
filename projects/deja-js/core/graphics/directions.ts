/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

export enum Directions {
    none = 0x0,
    left = 0x1,
    right = 0x2,
    top = 0x4,
    bottom = 0x8,
    horizontal = left + right,
    vertical = top + bottom,
    all = left + top + right + bottom,
}
