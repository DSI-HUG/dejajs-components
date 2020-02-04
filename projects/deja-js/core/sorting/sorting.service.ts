/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import * as _ from 'lodash';
import { Observable, of as observableOf } from 'rxjs';
import { map, reduce, switchMap } from 'rxjs/operators';
import { ISortInfos } from './sort-infos.model';
import { SortOrder } from './sort-order.model';
import { Injectable } from "@angular/core";

/** Classe de tri d'une liste plate ou hierarchique */
@Injectable()
export class SortingService {
    /** Trie les éléments de la liste plate spécifiée en fonction du modèle de tri spécifié. Peut être surchargé pour implémenter un tri asynchrone
     * @param list Liste à trier.
     * @param sortInfos Modèle de tri à appliquer.
     * @return Observable résolu par la fonction.
     */
    public sort$(list: any[], sortInfos: ISortInfos | ISortInfos[]) {
        return observableOf(this.sort(list, sortInfos));
    }

    /** Trie les éléments de la liste plate spécifiée en fonction du modèle de tri spécifié
     * @param list Liste à trier.
     * @param sortInfos Modèle de tri à appliquer.
     * @return Liste triée.
     */
    public sort(list: any[], sortInfos: ISortInfos | ISortInfos[]) {
        if (list && list.length) {
            const sis = sortInfos instanceof Array ? sortInfos : [sortInfos];
            let i = sis.length;
            while (--i >= 0) {
                const si = sis[i];
                list = _.sortBy(list, si.name);
                if (si.order === SortOrder.descending) {
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
    public sortTree$(tree: any[], sortInfos: ISortInfos | ISortInfos[], childrenField?: string): Observable<any[]> {
        childrenField = childrenField || 'items';
        return this.sort$(tree, sortInfos).pipe(
            switchMap((child) => child),
            switchMap((child) => {
                if (!child || !child[childrenField]) {
                    return observableOf(child);
                }
                return this.sortTree$(child[childrenField], sortInfos, childrenField).pipe(
                    map((sortedList) => {
                        child[childrenField] = sortedList;
                        return child;
                    }));
            }),
            reduce((acc: any[], cur: any) => [...acc, cur], []));
    }
}
