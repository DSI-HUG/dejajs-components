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
    public visible?: boolean;
    public odd?: boolean;
    public searchText?: string;
    public className?: string;
    /** Indique si l'élément peut être réduit. */
    public collapsible?: boolean;
    /** Indique si l'élément est réduit. */
    public collapsed?: boolean;
    /** Retourne la profondeur de l'élément dans la hierarchie. */
    public depth?: number;
    /** Enfants */
    public items?: ReadonlyArray<Item<T>>;

    public dragged?: boolean;
    /** Usage interne. */
    public selecting?: boolean | undefined;
    /** Usage interne. */
    public expanding?: boolean;
    /** Usage interne. */
    public collapsing?: boolean;

    /** Définit si l'élément peut être réduit.
     * @return True si l'élément peut être réduit.
     */
    public get isCollapsible(): boolean {
        return this.items && (this.collapsible ?? true);
    }

    /** Définit si l'élément est visible.
     * @return True si l'élément est visible.
     */
    public get isVisible(): boolean {
        return this.visible ?? true;
    }

    /** Définit si l'élément peut-être sélectionné.
     * @return True si l'élément peut-être sélectionné.
     */
    public get isSelectable(): boolean {
        return this.selectable ?? true;
    }

    public constructor(id?: string, label?: string, model?: T) {
        this.model = model;
        this.id = id;
        this.label = label;
    }
}
