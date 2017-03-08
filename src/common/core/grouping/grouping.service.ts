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

import { IItemTree } from '../item-list/index';
import { SortingService } from '../sorting/index';
import { IGroupInfo } from './index';

/** Service de regroupement d'un tableau de modèles */
export class GroupingService {
    /** Groupe les éléments de la liste hierarchique spécifiée à partir du niveau spécifié, et en fonction du modèle de groupe spécifié
     * @param {any[]} tree Liste à trier.
     * @param {IGroupInfo} groupInfos Modèle de groupe à appliquer.
     * @param {string} childrenField Champs à utiliser comme collection des enfants d'un parent.
     * @param {number} depth Niveau à partir duquel le modèle de regroupement doit être appliqué.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public group(tree: any[], groupInfos: IGroupInfo[] | IGroupInfo, childrenField?: string, depth?: number) {
        return new Promise<any[]>((resolved?: (result: any[]) => void, rejected?: (reason: any) => void) => {
            if (!tree || tree.length === 0 || !groupInfos) {
                resolved(tree);
                return;
            }

            if (!childrenField) {
                childrenField = 'items';
            }

            if (groupInfos instanceof Array) {
                const groupTree = (subtree: any[], index: number) => {
                    if (index >= groupInfos.length) {
                        resolved(subtree);
                        return;
                    }

                    this.group(subtree, groupInfos[index], childrenField, (depth || 0) + 1).then((groupedTree) => {
                        groupTree(groupedTree, index + 1);
                    }).catch(rejected);
                };

                groupTree(tree, 0);

            } else {
                const groupInfo = groupInfos as IGroupInfo;

                // Only group the last level listes
                const groupTree = (parents: any[], curdepth: number) => {
                    return new Promise<any[]>((resolvedChildren?: (result: any[]) => void, rejectedChildren?: (reason: any) => void) => {
                        try {
                            if (parents[0][childrenField]) {
                                const groupParentChildren = (index) => {
                                    if (index >= parents.length) {
                                        resolvedChildren(parents);
                                        return;
                                    }
                                    
                                    groupTree(parents[index][childrenField], curdepth + 1).then((result) => {
                                        parents[index][childrenField] = result;
                                        groupParentChildren(index + 1);
                                    }).catch(rejectedChildren);
                                };
                                groupParentChildren(0);
                            } else {                                
                                this.groupChildren(parents, groupInfo, curdepth, childrenField).then(resolvedChildren).catch(rejectedChildren);
                            }
                        } catch (err) {
                            rejectedChildren(err);
                        }
                    });
                };

                groupTree(tree, depth || 0).then(resolved).catch(rejected);
            }
        });
    }

    protected groupChildren(list: any[], groupInfo: IGroupInfo, _depth: number, childrenField: string) {
        return new Promise<any[]>((resolved?: (result: any[]) => void, rejected?: (reason: any) => void) => {
            try {
                const groups = {} as { [groupby: string]: IItemTree };
                list.forEach((item) => {
                    let groupedBy = typeof groupInfo.groupByField === 'function' ? groupInfo.groupByField(item) : item[groupInfo.groupByField];

                    if (typeof groupedBy === 'function') {
                        groupedBy = groupedBy();
                    }

                    if (!groupedBy) {
                        groupedBy = this.getTextValue(item);
                    }

                    let parent = groups[groupedBy];

                    if (!parent) {
                        let groupLabel: string;
                        if (groupInfo.groupTextField) {
                            groupLabel = typeof groupInfo.groupTextField === 'function' ? groupInfo.groupTextField(item) : item[groupInfo.groupTextField];
                        } else {
                            groupLabel = groupedBy;
                        }
                        parent = groups[groupedBy] = {
                            depth: _depth,
                            toString: () => { return groupLabel; },
                        } as IItemTree;
                        parent[childrenField] = [];
                    }

                    parent[childrenField].push(item);
                });

                const groupedChildren = Object.keys(groups).map((key) => groups[key]) as any[];

                if (groupInfo.sortInfos) {
                    const sortingService = new SortingService();
                    sortingService.sort(groupedChildren, groupInfo.sortInfos).then(resolved).catch(rejected);
                    groupedChildren.forEach((parent) => parent.sortField = groupInfo.sortInfos.name);
                } else { 
                    groupedChildren.forEach((parent) => parent.sortField = 'toString');
                    resolved(groupedChildren);
                }

            } catch (err) {
                rejected(err);
            }
        });
    }

    private getTextValue(value: any) {
        if (!value) {
            return '';
        } else {
            if (value.displayName) {
                return typeof value.displayName === 'string' ? value.displayName : value.displayName();
            } else if (typeof value.toString === 'function') {
                return value.toString();
            }
        }
    }
}
