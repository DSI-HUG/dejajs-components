/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { IViewPortItem } from './viewport.service';

export interface IItemBase<T> extends IViewPortItem {
    id?: string;
    selectable?: boolean;
    selected?: boolean;
    dragged?: boolean;
    displayName?: (() => string) | string;
    visible?: boolean;
    odd?: boolean; // For style only
    className?: string;
    /** Immutable model */
    model?: T;
    toString?: () => string;
    equals?: (item: IItemBase<T>) => boolean;
}
