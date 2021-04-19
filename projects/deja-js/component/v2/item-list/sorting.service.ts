/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { sortBy } from 'lodash-es';

export type SortOrder = 'ascending' | 'descending';

/** Model de tri pour le SortingService */
export interface SortInfos {
    /* Nom du champ par lequel effectuer le tri ou fonction renvoyant le nom du champ */
    name: string;
    /* Ordre de tri */
    order?: SortOrder;
}

/** Classe de tri d'une liste plate ou hierarchique */
@Injectable({
    providedIn: 'root'
})
export class SortingService {
    /** Trie les éléments de la liste plate spécifiée en fonction du modèle de tri spécifié
     * @param list Liste à trier.
     * @param sortInfos Modèle de tri à appliquer.
     * @return Liste triée.
     */
    public sort<T>(list: T[], sortInfo: SortInfos | SortInfos[]): T[] {
        if (list?.length) {
            const sortInfos = sortInfo instanceof Array ? sortInfo : [sortInfo];
            let i = sortInfos.length;
            // eslint-disable-next-line no-loops/no-loops
            while (--i >= 0) {
                const si = sortInfos[i];
                list = sortBy(list, si.name);
                if (si.order === 'descending') {
                    list = list.reverse();
                }
            }
        }
        return list;
    }

    /** Trie les éléments de la liste hierarchique spécifiée en fonction du modèle de tri spécifié.  Peut être surchargé pour implémenter un tri asynchrone
     * @param tree Liste à trier.
     * @param sortInfos Modèle de tri à appliquer.
     * @param childrenField Champ à utiliser pour la recherche dans les enfants d'un parent.
     * @return Observable résolue par la fonction.
     */
    public sortTree<T>(tree: T[], sortInfo: SortInfos | SortInfos[], childrenField = 'items'): T[] {
        return this.sort<T>(tree, sortInfo).map(child => {
            const indexed = child as Record<string, unknown>;
            if (indexed?.[childrenField] && indexed?.[childrenField] instanceof Array) {
                this.sortTree(indexed[childrenField] as T[], sortInfo, childrenField);
            }
            return child;
        });
    }
}
