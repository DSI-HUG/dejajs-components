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

import { ISortInfos, SortOrder } from "./index";

/** Classe de tri d'une liste plate ou hierarchique */
export class SortingService {
    /** Fonction de comparaison de deux objets
     * @param {any} a Objet 1.
     * @param {any} b Objet 2.
     * @param {ISortInfos} sortInfos Modèle de tri à appliquer pour la comparaison.
     * @return {number} 0 si les objet sont égaux, 1 si b est après a, -1 si a après b
     */
    public compare(a: any, b: any, sortInfo: ISortInfos) {
        let orderfact = sortInfo.order === SortOrder.ascending ? 1 : -1;

        if (!a && !b) {
            return 0;
        }

        if (!a) {
            return -orderfact;
        }

        if (!b) {
            return orderfact;
        }

        let sortnamea = a.sortField || (typeof sortInfo.name === 'function' ? sortInfo.name(a) : sortInfo.name);
        let sortnameb = b.sortField || (typeof sortInfo.name === 'function' ? sortInfo.name(b) : sortInfo.name);

        let flda = sortnamea ? a[sortnamea] : a;
        let fldb = sortnameb ? b[sortnameb] : b;

        if (!flda && !fldb) {
            return 0;
        }

        if (!flda) {
            return -orderfact;
        }

        if (!fldb) {
            return orderfact;
        }

        let typea = sortInfo.type || typeof flda;
        let typeb = sortInfo.type || typeof fldb;

        if (typea === 'function') {
            flda = flda();
            typea = typeof flda;
        }

        if (typeb === 'function') {
            fldb = fldb();
            typeb = typeof fldb;
        }

        if (typea === typeb) {
            if (typea === 'number') {
                return orderfact * (fldb - flda);
            } else if (typea === 'date') {
                return orderfact * (flda.getTime() - fldb.getTime());
            } else if (typea === 'object') {
                typea = flda.constructor.name;
                typeb = fldb.constructor.name;

                if (typea === typeb) {
                    switch (typea) {
                        case 'Date':
                            return orderfact * (flda.getTime() - fldb.getTime());
                        default:
                            break;
                    }
                }
            } else {
                // for other types, write your code here
            }
        }

        let stra = flda.toString() as string;
        let strb = fldb.toString() as string;
        return orderfact * stra.localeCompare(strb);
    }

    /** Trie les éléments de la liste plate spécifiée en fonction du modèle de tri spécifié
     * @param {any[]} list Liste à trier.
     * @param {ISortInfos} sortInfos Modèle de tri à appliquer.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public sort(list: any[], sortInfo: ISortInfos) {
        return new Promise<any[]>((resolved?: (value: any[]) => void) => {
            let compareFn = (a: any, b: any) => {
                return this.compare(a, b, sortInfo);
            };

            list.sort(compareFn);
            resolved(list);
        });
    }

    /** Trie les éléments de la liste hierarchique spécifiée en fonction du modèle de tri spécifié
     * @param {any[]} tree Liste à trier.
     * @param {ISortInfos} sortInfos Modèle de tri à appliquer.
     * @param {string} childrenField Champ à utiliser pour la recherche dans les enfants d'un parent.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public sortTree(tree: any[], sortInfo: ISortInfos, childrenField?: string) {
        if (!childrenField) {
            childrenField = 'items';
        }

        return new Promise<any[]>((resolved?: (value: any[]) => void, rejected?: (reason: any) => void) => {
            this.sort(tree, sortInfo).then((sortedTree) => {
                // Sort children
                let sortChildren = (index: number) => {
                    if (index >= sortedTree.length) {
                        resolved(sortedTree);
                    }

                    let subitems = sortedTree[index][childrenField];
                    if (subitems) {
                        this.sortTree(subitems, sortInfo, childrenField)
                            .then(() => {
                                sortChildren(index + 1);
                            })
                            .catch(rejected);
                    } else {
                        sortChildren(index + 1);
                    }
                };

                // If the list is a tree, sort the children
                if (sortedTree[0][childrenField]) {
                    sortChildren(0);
                } else {
                    resolved(sortedTree);
                }

            }).catch((error) => {
                rejected(error);
            });
        });
    }
}
