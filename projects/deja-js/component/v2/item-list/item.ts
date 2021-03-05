/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ViewPortItem } from '@deja-js/component/v2/viewport';

export interface Item<T> extends ViewPortItem<T> {
    id?: string;
    selectable?: boolean;
    selected?: boolean;
    dragged?: boolean;
    displayName?: string;
    searchText?: string;
    visible?: boolean;
    odd?: boolean;
    className?: string;
    /** Indique si l'élément peut être réduit. */
    collapsible?: boolean;
    /** Indique si l'élément est réduit. */
    collapsed?: boolean;
    /** Usage interne. */
    expanding?: boolean;
    /** Usage interne. */
    collapsing?: boolean;
    /** Retourne la profondeur de l'élément dans la hierarchie. */
    depth?: number;
    /** Enfants */
    items?: Item<T>[];
}
