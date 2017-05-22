/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/** Model de tri pour le SortingService */
export interface ISortInfos {
    /* Nom du champ par lequel effectuer le tri ou fonction renvoyant le nom du champ */
    name?: ((model: any) => string) | string;
    /* Ordre de tri */
    order?: SortOrder;
    /* Type de la donée de tri ('number', 'string', 'date') */
    type?: string;
}

/** Ordres de tri possibles */
export enum SortOrder {
    /** Ascendant */
    ascending,
    /** Descendant */
    descending,
}

