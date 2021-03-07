/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ViewPortItem } from '@deja-js/component/v2/viewport';

export class Item<T> implements ViewPortItem<T> {
    public size?: number;
    public model?: T;
    public id?: string;
    public label?: string;
    public selectable?: boolean;
    public selected?: boolean;
    public dragged?: boolean;
    public searchText?: string;
    public visible?: boolean;
    public odd?: boolean;
    public className?: string;
    /** Indique si l'élément peut être réduit. */
    public collapsible?: boolean;
    /** Indique si l'élément est réduit. */
    public collapsed?: boolean;
    /** Usage interne. */
    public expanding?: boolean;
    /** Usage interne. */
    public collapsing?: boolean;
    /** Retourne la profondeur de l'élément dans la hierarchie. */
    public depth?: number;
    /** Enfants */
    public items?: Item<T>[];

    public constructor(id?: string, label?: string, model?: T) {
        this.model = model;
        this.id = id;
        this.label = label;
    }

    public class(): string {
        return this.selected ? 'selected' : '';
    }
}
