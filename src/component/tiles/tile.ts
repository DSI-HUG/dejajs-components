/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { Rect } from '../../common/core/graphics';

export interface IDejaTile {
  id?: string;
  type?: string;
  color?: string; 
  bounds?: Rect;
  l?: number; // computed -- do not modify
  t?: number; // computed -- do not modify
  r?: number; // computed -- do not modify
  b?: number; // computed -- do not modify
  dragging?: boolean;
  dropping?: boolean;
  expanded?: boolean;
  pressed?: boolean;
  selected?: boolean;
  templateModel?: any;
}
