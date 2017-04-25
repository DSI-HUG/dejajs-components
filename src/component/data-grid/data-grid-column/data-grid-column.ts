/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/** Interface qui représente une colonne de grille */
export interface IDejaGridColumn {
    /** Titre de la colonne */
    label?: string;
    /** Nom unique identifiant de la colonne */
    name: string;
    /** Internal usage */
    w?: number;
    /** Largeur et unité de la colonne. L'unité peut être en % ou en px (Exemple: 100px, 10%) */
    width?: string;
    /** largeur minimum en pixels à laquelle la colonne peut réduire sa taille */
    minWidth?: number;
    /** Indique si les cellules de la colonnes utilisent un template de cellule */
    useCellTemplate?: boolean;
    /** Indique si la colonne peut-être déplacée vers un autre composant */
    draggable?: boolean;
    /** Indique si la colonne est en déplacement (Usage Interne) */
    dragged?: boolean;
    /** Indique si la colonne peut-être redimensionée */
    sizeable?: boolean;
    /** Indique si la colonne est déplacable parmis les autres colonnes */
    sortable?: boolean;
    /** Indique si la colonne est en déplacement (Usage Interne) */
    sorting?: boolean;
    /** Indique si la colonne est masquée si la place necessaire n'est plus suffisante.
     * Cette valeur peut-être true, false ou un nombre
     * Si true, la colonne est masquée
     * Si un nonbre est spécifiée, les colonnes avec un nombre inférieur seront masquées avant.
     */
    responsive?: boolean | number;
    /** Indique si la colonne est groupable */
    groupable?: boolean;
    /** Indique le champ utilisé pour le regroupement de la colonne */
    groupByField?: ((model: any) => string) | string;
    /** Indique le champ utilisé pour le titre des groupes ajoutés lors du regroupement */
    groupTextField?: ((model: any) => string) | string;
    /** Indique si la colonne est la colonne courante */
    isCurrent?: boolean;
}

export interface IDejaGridColumnEvent {
    column: IDejaGridColumn;
    originalEvent: MouseEvent;
}

export interface IDejaGridColumnSizeEvent {
    column: IDejaGridColumn;
    offsetWidth: number;
    originalEvent: MouseEvent;
}

export interface IDejaGridColumnLayoutEvent extends IDejaGridColumnEvent {
    target: IDejaGridColumn;
}
