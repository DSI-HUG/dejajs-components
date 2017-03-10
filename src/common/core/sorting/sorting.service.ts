/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { ISortInfos, SortOrder } from './index';

/** Classe de tri d'une liste plate ou hierarchique */
export class SortingService {
    /** Fonction de comparaison de deux objets
     * @param {any} a Objet 1.
     * @param {any} b Objet 2.
     * @param {ISortInfos} sortInfos Modèle de tri à appliquer pour la comparaison.
     * @return {number} 0 si les objet sont égaux, 1 si b est après a, -1 si a après b
     */
    public compare(a: any, b: any, sortInfo: ISortInfos) {
        const orderfact = sortInfo.order === SortOrder.ascending ? 1 : -1;

        if (!a && !b) {
            return 0;
        }

        if (!a) {
            return -orderfact;
        }

        if (!b) {
            return orderfact;
        }

        const sortnamea = a.sortField || (typeof sortInfo.name === 'function' ? sortInfo.name(a) : sortInfo.name);
        const sortnameb = b.sortField || (typeof sortInfo.name === 'function' ? sortInfo.name(b) : sortInfo.name);

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

        const stra = flda.toString() as string;
        const strb = fldb.toString() as string;
        return orderfact * stra.localeCompare(strb);
    }

    /** Trie les éléments de la liste plate spécifiée en fonction du modèle de tri spécifié
     * @param {any[]} list Liste à trier.
     * @param {ISortInfos} sortInfos Modèle de tri à appliquer.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public sort(list: any[], sortInfo: ISortInfos | ISortInfos[]) {
        const sort = (sortInfos: ISortInfos[]) => {
            return new Promise<any[]>((resolved?: (value: any[]) => void) => {
                const compareFn = (a: any, b: any) => {
                    let i = -1;
                    let result = 0;
                    while (++i < sortInfos.length && result === 0) {
                        result = this.compare(a, b, sortInfos[i]);
                    }
                    return result;
                };

                list.sort(compareFn);
                resolved(list);
            });
        };

        if (sortInfo instanceof Array) {
            return sort(sortInfo as ISortInfos[]);
        } else {
            return sort([sortInfo as ISortInfos]);
        }
    }


    /** Trie les éléments de la liste hierarchique spécifiée en fonction du modèle de tri spécifié
     * @param {any[]} tree Liste à trier.
     * @param {ISortInfos} sortInfos Modèle de tri à appliquer.
     * @param {string} childrenField Champ à utiliser pour la recherche dans les enfants d'un parent.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public sortTree(tree: any[], sortInfo: ISortInfos | ISortInfos[], childrenField?: string) {
        if (!childrenField) {
            childrenField = 'items';
        }

        return new Promise<any[]>((resolved?: (value: any[]) => void, rejected?: (reason: any) => void) => {
            this.sort(tree, sortInfo).then((sortedTree) => {
                // Sort children
                const sortChildren = (index: number) => {
                    if (index >= sortedTree.length) {
                        resolved(sortedTree);
                    }

                    const subitems = sortedTree[index][childrenField];
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
