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

import { Observable } from 'rxjs/Rx';
import { Subscriber } from 'rxjs/Subscriber';
import { GroupingService, IGroupInfo } from '../grouping/index';
import { ISortInfos, SortingService } from '../sorting/index';
import { IItemBase, IItemTree } from './index';

/** Service de gestion des listes (deja-treelist, deja-select et deja-grid).
 * Ce service permet la gestion du viewport et la gestion des caches des listes.
 * Il peut-être surchargé pour faire du lazy loading ou du paging.
 */
export class ItemListService {
    // Working item array (can be recursive)
    private _items: IItemBase[];

    // Cache for lists (flat lists only, not recursive)
    private _cache = {} as {
        rowsCount?: number;
        depthMax?: number;
        groupedList?: IItemTree[];
        flatList?: IItemBase[];
        visibleList?: IItemBase[];
    };

    // Selected items cache
    private selectedList: IItemBase[];
    private _hideSelected: boolean;

    // Cache for last query. Flat list will be regenerated only if the query change
    private lastQuery: string | RegExp;

    // Sorting
    private _sortingService: SortingService;

    // grouping
    private _groupInfos: IGroupInfo[];
    private _groupingService: GroupingService;

    // Cache for drag and drop (flat list modified by the current drag).
    private _ddList: IItemBase[];
    private _ddCurrentIndex: number;
    private _ddChildCount: number;

    private _childrenField = 'items';

    // Callback promises
    private selectingItem: (item: any) => Promise<any>;
    private unselectingItem: (item: any) => Promise<any>;

    // champs à utiliser comme valeur de comparaison
    private _valueField: string;

    /** Définit le champs utilisé comme collection pour les enfants d'un parent.
     * @param {string} value Nom du champ à utiliser comme collection d'enfants
     */
    public set childrenField(value: string) {
        this._childrenField = value || 'items';
        this.invalidateCache();
    }

    /** Renvoie le champs utilisé comme collection pour les enfants d'un parent
     * @return {string} value Nom du champ à utilisé comme collection d'enfants.
     */
    public get childrenField() {
        return this._childrenField;
    }

    /** Définit une valeur indiquant si les éléments selectionés doivent être masqué. Ce flag est principalement utilisé dans le cas d'un multi-select
     * @param {boolean} value True si les éléments selectionés doivent être masqués
     */
    public set hideSelected(value: boolean) {
        this._hideSelected = value;
    }

    /** Renvoie une valeur indiquant si les éléments selectionés doivent être masqué.
     * @return {boolean} value True si les éléments selectionés sont masqués
     */
    public get hideSelected() {
        return this._hideSelected;
    }

    /** Définit le champs à utiliser comme valeur de comparaison */
    public set valueField(valueField: string) {
        this._valueField = valueField;
    }

    private set items(items: IItemBase[]) {
        this._items = items;
        this.invalidateCache();
    }

    private get items() {
        return this._items;
    }

    /** Définit le modèle utilisé par la liste. Ce model peut ètre hierarchique sans limitation de la profondeur ou une chargé en asynchrone par une promise ou un observable.
     * @param items Provider de la liste des éléments de la liste.
     */
    public setItems(items: any[] | Promise<any[]> | Observable<any[]>) {
        return new Observable<IItemBase[]>((subscriber: Subscriber<{}>) => {
            if (!items) {
                this.items = undefined;
                subscriber.next();
            } else if (items instanceof Array) {
                this.ensureChildrenProperties(items);
                this.ensureSelectedItems(items);
                this.items = items;
                subscriber.next();
            } else {
                const promise = items as Promise<IItemBase[]>;
                if (promise.then) {
                    promise.then((its) => {
                        this.ensureChildrenProperties(its);
                        if (!this.items || !this.items.length) {
                            this.ensureSelectedItems(its);
                        }
                        this.items = its;
                        subscriber.next();
                    }).catch((err) => {
                        subscriber.error(err);
                    });
                } else {
                    const observable = items as Observable<IItemBase[]>;
                    observable.subscribe((its) => {
                        this.ensureChildrenProperties(its);
                        if (!this.items || !this.items.length) {
                            this.ensureSelectedItems(its);
                        }
                        this.items = [...this.items || [], ...its];
                        subscriber.next();
                    }, (err) => {
                        subscriber.error(err);
                    });
                }
            }
        });
    }

    public setModels(items: any[] | Promise<any[]> | Observable<any[]>) {
        return this.setItems(items);
    }

    /** Renvoie le modèle de grouping ajouté à la liste de base par le service. Ce modèle ne modifie pas la donée, mais est jsute ajouté à l'affichage
     * @return {IGroupInfo[]} value Modèle de grouping d'affichage de la liste.
     */
    public get groupInfos() {
        return this._groupInfos;
    }

    // Ne pas utiliser, cette fonction retourne la liste des éléments pour l'implémentation de ngModel.
    public getItems() {
        return this.items;
    }

    /** Retourne l'élément corresondant à l'index spéficié dans la liste des éléments visibles.
     * @param {number} index Index de l'élément à chercher sur la liste des éléments visibles.
     * @return {IItemBase} Element correspondant à l'index recherché.
     */
    public getItemFromIndex(index: number) {
        return this._cache.visibleList ? this._cache.visibleList[index] : null;
    }

    /** Retourne l'index correspondant à l'élément spéficié dans la liste des éléments visibles
     * @param {IItemBase} item Element à chercher sur la liste des éléments visibles.
     * @return {number} Index correspondant à l'élément recherché.
     */
    public getItemIndex(item: IItemBase) {
        return this._cache.visibleList ? this._cache.visibleList.findIndex((itm) => item === itm) : -1;
    }

    /** Renvoie le service utilisé pour le tri de la liste
     * @return {SortingService} Service utilisé pour le tri.
     */
    public getSortingService() {
        if (!this._sortingService) {
            this._sortingService = new SortingService();
        }
        return this._sortingService;
    }

    /** Définit le service utilisé pour le tri de la liste
     * @param {SortingService} value  Service à utiliser pour le tri.
     */
    public setSortingService(value: SortingService) {
        this._sortingService = value;
    }

    /** Renvoie le service utilisé pour le regroupement de la liste
     * @return {GroupingService} Service utilisé pour le regroupement.
     */
    public getGroupingService() {
        if (!this._groupingService) {
            this._groupingService = new GroupingService();
        }
        return this._groupingService;
    }

    /** Définit le service utilisé pour le regroupement de la liste
     * @param {GroupingService} value  Service à utiliser pour le regroupement.
     */
    public setGroupingService(value: GroupingService) {
        this._groupingService = value;
    }

    /** Evalue le texte à afficher pour l'élément spécifié.
     * @param {any} value  Model à évaluer.
     * @param {string} textField (optional) Champs à traiter comme source du texte.
     * @return {string} Texte à afficher pour le modèle spécifié.
     */
    public getTextValue(value: any, textField?: string) {
        if (!value) {
            return '';
        } else {
            if (textField && value[textField]) {
                return value[textField];
            } else if (value.displayName) {
                return typeof value.displayName === 'string' ? value.displayName : value.displayName();
            } else if (typeof value.toString === 'function') {
                return value.toString();
            }
        }
    }

    /** Usage interne. Termine le drag and drop en cours. */
    public drop(): Promise<boolean> {
        return new Promise<boolean>((resolved?: (result: boolean) => void, rejected?: (reason: any) => void) => {
            if (!this._ddList || !this.items) {
                resolved(false);
                return;
            }

            const listIndex = this._ddCurrentIndex;
            const item = this._ddList[listIndex] as IItemTree;
            if (!item) {
                rejected('invalid drag infos stored in cache.');
            }

            // La drag and drop liste est incomplète, en cas de filtrage, retrouver l'élément juste en dessus dans la liste complète
            const targetItem = this._ddList[listIndex - 1] as IItemTree;
            let targetParent: IItemTree;

            // Find target in the flat list to calculate the correct index
            let flatListIndex = this._cache.flatList.findIndex((itm) => itm === targetItem);
            let targetIndex = 0;
            while (flatListIndex >= 0) {
                const parentItem = this._cache.flatList[flatListIndex] as IItemTree;
                if (parentItem.depth === undefined) {
                    // Flat list
                    targetIndex = flatListIndex;
                    break;
                } else if (parentItem.depth === item.depth - 1) {
                    targetParent = parentItem;
                    break;
                } else if (parentItem.depth === item.depth) {
                    ++targetIndex;
                }
                --flatListIndex;
            }

            const findItem = (itemToFind: IItemTree, treeList: IItemTree[]): IFindItemsResult => {
                for (let i = 0; i < treeList.length; i++) {
                    const itm = treeList[i];
                    if (itm === itemToFind) {
                        return {
                            index: i,
                            list: treeList,
                        };
                    } else if (itm.$items !== undefined) {
                        const result = findItem(itemToFind, itm.$items);
                        if (result) {
                            return result;
                        }
                    }
                }
            };

            const originResult = findItem(item, this.items);

            // Remove item from the origin
            originResult.list.splice(originResult.index, 1);

            // Add in the new location
            const targetList = targetParent ? targetParent.$items : this.items;

            if (targetIndex > originResult.index && originResult.list === targetList) {
                --targetIndex;
            }

            targetList.splice(targetIndex, 0, item);

            // Invalidate view cache
            this.invalidateCache();
            resolved(true);
        });
    }

    /** Usage interne. Calcul l'élément cible d'un drag and drop en fonction de l'index spécifié. */
    public calcDragTargetIndex(index: number, targetIndex: number): Promise<number> {
        return new Promise<number>((resolved?: (dragDropIndex: number) => void) => {
            const currentList = this._ddList || this._cache.visibleList;

            const startIndex = this._ddCurrentIndex !== undefined ? this._ddCurrentIndex : index;
            if (startIndex >= currentList.length) {
                resolved(currentList.length - 1);
                return;
            }

            const item = currentList[startIndex] as IItemTree;
            const dragDropIndex = startIndex;

            if (item.depth !== undefined && targetIndex !== startIndex) {
                if (targetIndex < startIndex) {
                    // Remonte jusqu'au premier élément avec une profondeur plus grande
                    let beforeIndex = 0;
                    for (let b = startIndex - 1; b >= 0; b--) {
                        const targetItem = currentList[b] as IItemTree;
                        if (targetItem.depth <= item.depth) {
                            beforeIndex = b;
                            break;
                        }
                    }
                    if (targetIndex <= beforeIndex) {
                        // Descend jusqu'au premier élément avec la même profondeur
                        for (let a = targetIndex; a <= beforeIndex; a++) {
                            const targetItem = currentList[a] as IItemTree;
                            if (targetItem.depth === item.depth) {
                                resolved(a);
                                return;
                            } else if (targetItem.depth === item.depth - 1) {
                                resolved(a + 1);
                                return;
                            }
                        }
                    }
                }

                if (targetIndex > startIndex) {
                    // Descend jusqu'au premier élément avec une profondeur plus grande ou égale
                    let afterIndex = currentList.length - 1;
                    for (let a = startIndex + 1; a < currentList.length; a++) {
                        const targetItem = currentList[a] as IItemTree;
                        if (targetItem.depth <= item.depth) {
                            afterIndex = a;
                            break;
                        }
                    }
                    if (targetIndex >= afterIndex) {
                        // Descend jusqu'au premier élément avec la même profondeur
                        for (let a = targetIndex + 1; a < currentList.length; a++) {
                            const targetItem = currentList[a] as IItemTree;
                            if (targetItem.depth === item.depth) {
                                resolved(a);
                                return;
                            } else if (targetItem.depth === item.depth - 1) {
                                resolved(a - 1);
                                return;
                            }
                        }
                        // Not found
                        const targetItem = currentList[afterIndex] as IItemTree;
                        if (targetItem.depth === item.depth) {
                            resolved(afterIndex);
                            return;
                        }
                    }
                }
            }

            resolved(dragDropIndex);
        });
    }

    /** Change l'état d'expansion de tous les éléments.
     * @param {boolean} collapsed  True si les éléments doivent être réduits.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public toggleAll(collapsed: boolean): Promise<void> {
        return new Promise<void>((resolved?: () => void, rejected?: (reason: any) => void) => {
            const items = [] as IItemBase[];
            this._cache.flatList.forEach((item) => {
                const itemTree = item as IItemTree;
                if (itemTree.$items && itemTree.collapsible !== false) {
                    items.push(itemTree);
                }
            });

            // Invalidate view cache
            delete this._cache.visibleList;

            if (collapsed) {
                this.collapseItems(items).then(resolved).catch(rejected);
            } else {
                this.expandItems(items).then(resolved).catch(rejected);
            }
        });
    }

    /** Change l'état d'expansion de l'élément spécifié par son index sur la liste des éléments visibles.
     * @param {number} index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param {boolean} collapse  Etat de l'élément. True pour réduire l'élément.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public toggleCollapse(index: number, collapse?: boolean): Promise<boolean> {
        return new Promise<boolean>((resolved?: (value: boolean) => void, rejected?: (reason: any) => void) => {
            const item = this._cache.visibleList[index] as IItemTree;
            if (!item || item.collapsible === false) {
                resolved(false);
                return;
            }

            const collapsed = collapse !== undefined ? collapse : item.collapsed ? false : true;
            if (collapsed) {
                this.collapseItem(item).then(() => {
                    resolved(true);
                }).catch(rejected);
            } else {
                this.expandItem(item).then(() => {
                    resolved(true);
                }).catch(rejected);
            }
        });
    }

    /** Etends les éléments spécifiés.
     * @param {IItemBase[]} items  Liste des éléments à étendre.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public expandItems(items: IItemBase[]) {
        const promises = [] as Array<Promise<void>>;
        if (items) {
            items.forEach((item) => {
                promises.push(this.expandItem(item));
            });
        }

        return Promise.all(promises);
    }

    /** Reduits les éléments spécifiés.
     * @param {IItemBase[]} items  Liste des éléments à réduire.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public collapseItems(items: IItemBase[]) {
        const promises = [] as Array<Promise<void>>;
        if (items) {
            items.forEach((item) => {
                promises.push(this.collapseItem(item));
            });
        }

        return Promise.all(promises);
    }

    /** Etends l'élément spécifié.
     * @param {IItemBase[]} items  Eléments à étendre.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public expandItem(item: IItemTree) {
        return new Promise<void>((resolved?: () => void) => {
            item.collapsed = false;
            // Invalidate view cache
            delete this._cache.visibleList;
            resolved();
        });
    }

    /** Réduit l'élément spécifié.
     * @param {IItemBase[]} items  Eléments à réduire.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public collapseItem(item: IItemTree) {
        return new Promise<void>((resolved?: () => void) => {
            item.collapsed = true;
            // Invalidate view cache
            delete this._cache.visibleList;
            resolved();
        });
    }

    /** Retourne la liste des éléments sélectionés.
     * @return {IItemBase[]} Liste des éléments selectionés.
     */
    public getSelectedItems() {
        return this.selectedList || [];
    }

    /** Définit la liste des éléments sélectionés.
     * @param {IItemBase[]} items Liste des éléments a selectioner.
     */
    public setSelectedItems(items: IItemBase[]) {
        if (this.selectedList) {
            this.selectedList.forEach((item) => {
                item.selected = false;
            });
        }
        this.selectedList = items;
        if (this.hideSelected) {
            delete this._cache.visibleList;
        }

        this.ensureSelectedItems(this.items);
    }

    /** Déselectionne tous les éléments sélectionés.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public unselectAll(): Promise<void> {
        return new Promise<void>((resolved?: () => void, rejected?: (reason: any) => void) => {
            if (this.hideSelected) {
                delete this._cache.visibleList;
            }

            const selectedList = this.selectedList;
            this.selectedList = [];

            this.unSelectItems(selectedList).then(resolved).catch(rejected);
        });
    }

    /** Sélectionne une plage d'éléments en fonction de l'index de début et l'index de fin sur la liste des éléments visibles.
     * @param {number} indexFrom index sur la liste des éléments visibles du premier élément à sélectioner.
     * @param {number} indexTo index sur la liste des éléments visibles du dernier élément à sélectioner.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public selectRange(indexFrom: number, indexTo?: number): Promise<number> {
        return new Promise<number>((resolved?: (value: number) => void, rejected?: (reason: any) => void) => {
            if (indexTo === undefined) {
                indexTo = indexFrom;
            }

            this.unselectAll().then(() => {
                const selecting = [] as IItemBase[];

                if (this._cache.visibleList && this._cache.visibleList.length > 0) {
                    for (let i = Math.min(indexFrom, indexTo); i <= Math.max(indexFrom, indexTo); i++) {
                        const itm = this._cache.visibleList[i];
                        if (itm.selectable !== false) {
                            selecting.push(itm);
                        }
                    }
                }

                if (this.hideSelected) {
                    delete this._cache.visibleList;
                }

                this.selectItems(selecting).then(() => {
                    resolved(selecting.length);
                }).catch(rejected);
            });
        });
    }

    /** Change l'état de selection de l'élément spécifié.
     * @param {IItemBase[]} items Liste des éléments à modifier.
     * @param {boolean} selected True si les éléments divent être sélectionés, False si ils doivent être déselectionés.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public toggleSelect(items: IItemBase[], selected: boolean) {
        return new Promise<IItemBase[]>((resolved?: (selected: IItemBase[]) => void, rejected?: (reason: any) => void) => {
            const done = () => {
                if (this.hideSelected) {
                    delete this._cache.visibleList;
                }
                resolved(this.selectedList);
            };

            if (items && items.length > 0) {
                if (selected) {
                    this.selectItems(items).then(done).catch(rejected);
                } else {
                    this.unSelectItems(items).then(done).catch(rejected);
                }
            } else {
                done();
            }
        });
    }

    /** Sélectionne les éléments spécifiés
     * @param {IItemBase[]} items Liste des éléments à sélectioner.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public selectItems(items: IItemBase[]) {
        const promises = [] as Array<Promise<void>>;
        if (items) {
            items.forEach((item) => {
                promises.push(this.selectItem(item));
            });
        }

        return Promise.all(promises);
    }

    /** Déselectionne les éléments spécifiés
     * @param {IItemBase[]} items Liste des éléments à déselectioner.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public unSelectItems(items: IItemBase[]) {
        const promises = [] as Array<Promise<void>>;
        if (items) {
            items.forEach((item) => {
                promises.push(this.unSelectItem(item));
            });
        }

        return Promise.all(promises);
    }

    /**
     * Set a promise called before an item selection
     */
    public setSelectingItem(fn: (item: any) => Promise<any>) {
        this.selectingItem = fn;
    }

    /** Sélectionne l'élément spécifié
     * @param {IItemBase} item Elément à sélectioner.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public selectItem(item: IItemBase) {
        return new Promise<void>((resolved?: () => void, rejected?: (reason: any) => void) => {
            if (!item) {
                resolved();
            }

            const select = () => {
                if (!this.selectedList) {
                    this.selectedList = [];
                }

                item.selected = true;
                this.selectedList.push(item);
                resolved();
            };

            if (this.selectingItem) {
                this.selectingItem(item).then(() => {
                    select();
                }).catch(rejected);
            } else {
                select();
            }
        });
    }

    /**
     * Set a promise called before an item deselection
     */
    public setUnselectingItem(fn: (item: any) => Promise<any>) {
        this.unselectingItem = fn;
    }

    /** Déselectionne l'élément spécifié
     * @param {IItemBase} item Elément à déselectioner.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public unSelectItem(item: IItemBase) {
        return new Promise<void>((resolved?: () => void, rejected?: (reason: any) => void) => {
            if (!item) {
                resolved();
            }

            const unselect = () => {
                item.selected = false;
                if (this.selectedList && this.selectedList.length) {
                    const index = this.selectedList.findIndex((itm) => this.compareItems(itm, item));
                    if (index >= 0) {
                        this.selectedList.splice(index, 1);
                    }
                }
                resolved();
            };

            if (this.unselectingItem) {
                this.unselectingItem(item).then(() => {
                    unselect();
                }).catch(rejected);
            } else {
                unselect();
            }
        });
    }

    /** Trouve l'élément suivant répondant à la fonction de comparaison spécifiée.
     * @param {Function} compare Function de comparaison pour la recherche de l'élément.
     * @param {number} startIndex Index de départ sur la liste des éléments visibles.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public findNextMatch(compare?: (item: IItemBase, index: number) => boolean, startIndex?: number) {
        return new Promise<IFindItemResult>((resolved?: (result: IFindItemResult) => void) => {
            const list = this._cache.visibleList;
            if (list.length) {
                if (startIndex < 0 || startIndex >= list.length) {
                    startIndex = -1;
                }
                let idx = startIndex + 1;
                while (idx !== startIndex) {
                    const itm = list[idx];
                    if (compare(itm, idx)) {
                        resolved({
                            index: idx,
                            item: itm,
                        });
                        return;
                    }
                    idx++;
                    if (idx >= list.length) {
                        if (startIndex === -1) {
                            break;
                        }
                        idx = 0;
                    }
                }
            }
            resolved(null);
        });
    }

    /** Trie les éléments en fonction du modèle de tri spécifié
     * @param {ISortInfos} sortInfos Modèle de tri à appliquer.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public sort(sortInfos: ISortInfos) {
        return new Promise<ISortInfos>((resolved?: (value: ISortInfos) => void, rejected?: (reason: any) => void) => {
            if (!this.items) {
                rejected('No Items');
                return;
            }

            const sortTree = () => {
                this.getSortingService().sortTree(this._cache.groupedList, sortInfos, '$items').then(() => {
                    this.invalidateCache();
                    resolved(sortInfos);
                }).catch((err) => {
                    rejected(err);
                });
            };

            if (!this._cache.groupedList || this._cache.groupedList.length === 0) {
                this.getGroupedList(this.items).then((groupedList) => {
                    this._cache.groupedList = groupedList;
                    sortTree();
                }).catch((err) => {
                    rejected(err);
                });
            } else {
                sortTree();
            }
        });
    }

    /** Groupe les éléments en fonction du modèle de groupe spécifié
     * @param {IGroupInfo} groupInfos Modèle de groupe à appliquer.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public group(groupInfos: IGroupInfo[]) {
        return new Promise<IGroupInfo[]>((resolved?: (value: IGroupInfo[]) => void) => {
            this._groupInfos = groupInfos;
            this.invalidateCache();
            this.ensureChildrenProperties(this.items);
            resolved(groupInfos);
        });
    }

    /** Retire les groupe correspondants au modèle de groupe spécifié
     * @param {IGroupInfo} groupInfos Modèle de groupe à retirer.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public ungroup(groupInfo: IGroupInfo) {
        return new Promise<IGroupInfo>((resolved?: (value: IGroupInfo) => void) => {
            const groupIndex = this._groupInfos ? this._groupInfos.findIndex((gi) => gi.groupByField === groupInfo.groupByField) : -1;
            if (groupIndex >= 0) {
                this._groupInfos.splice(groupIndex, 1);
            }

            this.invalidateCache();
            this.ensureChildrenProperties(this.items);
            resolved(groupInfo);
        });
    }

    /** Retrouve les informations du parent de l'élément spécifié
     * @param {IItemTree} item Element enfant du parent à retrouver.
     * @return {Promise<IParentListInfoResult>} Promesse résolue par la fonction, qui retourne les informations sur le parent de l'élément spécifié
     */
    public getParentListInfos(item: IItemTree): Promise<IParentListInfoResult> {
        return new Promise<IParentListInfoResult>((resolved?: (result: IParentListInfoResult) => void, rejected?: (reason: any) => void) => {
            const search = (flatList: IItemBase[]) => {
                let flatIndex = flatList.findIndex((itm) => itm === item);
                if (flatIndex < 0) {
                    rejected('Item not found.');
                }

                if (!item.depth) {
                    const rootIndex = this.items.findIndex((itm) => itm === item);
                    resolved({
                        index: rootIndex,
                    } as IParentListInfoResult);
                } else {
                    // Search parent and treeindex
                    let idx = 0;
                    while (--flatIndex >= 0) {
                        const parentItem = flatList[flatIndex] as IItemTree;
                        if (parentItem.depth < item.depth) {
                            resolved({
                                index: idx,
                                parent: parentItem,
                            } as IParentListInfoResult);
                            return;
                        }
                        idx++;
                    }

                }
            };

            if (!this._cache.flatList) {
                this.ensureFlatListCache(true).then(() => {
                    search(this._cache.flatList);
                }).catch((err) => {
                    rejected(err);
                });
            } else {
                search(this._cache.flatList);
            }
        });
    };

    /** Supprime tous les caches internes. Ils seront recréés à la première demande de la portion de la liste à afficher. */
    public invalidateCache() {
        this._cache = {};
    }

    /** Usage interne. Retourne la portion de la liste à afficher en fonction des paramètres spécifiés. */
    public getViewList(searchField: string, query?: RegExp | string, startRow?: number, maxCount?: number, ignoreCache?: boolean, ddStartIndex?: number, ddTargetIndex?: number): Promise<IViewListResult> {
        return new Promise<IViewListResult>((resolved?: (value: IViewListResult) => void, rejected?: (reason: any) => void) => {
            const result = {} as IViewListResult;

            ignoreCache = ignoreCache || query !== this.lastQuery || !this.items || !this.items.length;
            const expandTree = query !== this.lastQuery;
            this.lastQuery = query;

            // Check regexp validity
            // regExp.test(this.getTextValue(item));
            let regExp: RegExp;
            if (query) {
                if (typeof query === 'string') {
                    try {
                        regExp = new RegExp(query, 'i');
                    } catch (exc) {
                        rejected('Invalid search parameters');
                        return;
                    }
                } else {
                    regExp = query as RegExp;
                    if (!regExp.test) {
                        regExp = undefined;
                    }
                }
            }

            const loadViewList = () => {
                let viewList: IItemBase[];
                if (ddStartIndex !== undefined && ddTargetIndex !== undefined && ddStartIndex !== ddTargetIndex) {
                    if (!this._ddList) {
                        // Generate a modified flat list for drag and drop Only
                        this._ddList = [...this._cache.visibleList];

                        // Calc child count to be dragged
                        const draggedItem = this._ddList[ddStartIndex] as IItemTree;
                        const parentDepth = draggedItem.depth;
                        let lastIndex = ddStartIndex;
                        if (parentDepth !== undefined) {
                            for (let i = ddStartIndex + 1; i < this._ddList.length; i++) {
                                const currentItem = this._ddList[i] as IItemTree;
                                if (currentItem.depth <= parentDepth) {
                                    break;
                                }
                                lastIndex = i;
                            }
                        }
                        this._ddChildCount = lastIndex - ddStartIndex + 1;
                        this._ddCurrentIndex = ddStartIndex;
                    }

                    const removed = this._ddList.splice(this._ddCurrentIndex, this._ddChildCount);
                    if (ddTargetIndex > this._ddCurrentIndex) {
                        ddTargetIndex -= this._ddChildCount;
                        ++ddTargetIndex;
                    }
                    this._ddCurrentIndex = ddTargetIndex;
                    removed.forEach((itm) => this._ddList.splice(ddTargetIndex++, 0, itm));
                    viewList = this._ddList;

                } else {
                    delete this._ddList;
                    delete this._ddCurrentIndex;
                    delete this._ddChildCount;
                    viewList = this._cache.visibleList || [];
                }

                result.startRow = 0;
                result.endRow = 0;
                result.outOfRange = false;
                result.rowsCount = viewList.length;
                result.depthMax = this._cache.depthMax;

                if (startRow !== undefined && maxCount !== undefined && maxCount > 0) {
                    const rowsCount = Math.min(viewList.length - startRow, maxCount);

                    if (rowsCount < 0) {
                        result.endRow = viewList.length - 1;
                        result.startRow = result.endRow - Math.min(viewList.length, maxCount) + 1;
                        result.outOfRange = true;
                    } else {
                        result.startRow = startRow;
                        result.endRow = result.startRow + rowsCount - 1;
                    }
                    result.visibleList = viewList.slice(result.startRow, result.endRow + 1);

                } else {
                    result.visibleList = viewList;
                }

                resolved(result);
            };

            if (ignoreCache) {
                // console.log('getItemList ' + Date.now());
                this.getItemList(query, this.selectedList).then((items) => {
                    if (!this.items || !this.items.length) {
                        this.ensureSelectedItems(items);
                    }

                    if (items !== this.items) {
                        // New item list, invalidate view cache
                        this.items = items;
                        this.ensureChildrenProperties(this.items);
                        // Be cause a new array was returned by getItemList, the list is considered as already filtered (Lazy loading)
                        regExp = undefined;
                    }

                    delete this._cache.visibleList;
                    this.ensureVisibleListCache(searchField, regExp, expandTree).then(() => {
                        loadViewList();
                    }).catch(rejected);
                }).catch(rejected);
            } else {
                this.ensureVisibleListCache(searchField, regExp, expandTree).then(() => {
                    loadViewList();
                }).catch(rejected);
            }
        });
    }

    /** Retourne la liste à utilise pour la création des caches. Surcharger cetee méthode pour fournir une liste de façon lazy.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param {string} query Texte ou regular expression par laquelle la liste doit être filtrée.
     * @param {IItemBase[]} selectedItems Liste des éléments selectionés.
     * @return {Promise} Promesse résolue par la fonction, qui retourne la liste à utiliser.
     */
    protected getItemList(_query?: RegExp | string, _selectedItems?: IItemBase[]): Promise<IItemBase[]> {
        return new Promise<IItemBase[]>((resolved?: (result: IItemBase[]) => void) => {
            this.items = this.items || [];
            resolved(this.items);
        });
    }

    /** Retourne une valeur indiquant si l'élément spécifié correspond aux critères de recherche spécifiés
     * @param {IItemBase} item Elément à analyser.
     * @param {string} searchField Nom du champ à utiliser pour la recherche. Le champ représenté peut-être une valeur ou une function.
     * @param {RegExp} regExp Expression de test sur le champs spécifié.
     * @return {boolean} True si l'élément correspond aux critères de recherche.
     */
    protected itemMatch(item: IItemBase, searchField: string, regExp: RegExp) {
        let value;
        if (typeof item[searchField] === 'function') {
            value = item[searchField]();
        } else if (item[searchField]) {
            value = item[searchField];
        } else {
            value = this.getTextValue(item);
        }
        return value && regExp.test(value);
    }

    /** Retourne une liste groupée si un modèle de groupe interne est spécifié.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param {IItemBase[]} items Liste des éléments à grouper.
     * @return {Promise} Promesse résolue par la fonction, qui retourne la liste groupés.
     */
    protected getGroupedList(items: IItemBase[]): Promise<IItemTree[]> {
        return new Promise<IItemTree[]>((resolved?: (result: IItemTree[]) => void, rejected?: (reason: any) => void) => {
            if (!items) {
                resolved([]);
                return;
            }

            if (this._cache.groupedList && this._cache.groupedList.length) {
                resolved(this._cache.groupedList);
                return;
            }

            this.getGroupingService().group(this.items, this.groupInfos, '$items').then((groupedList) => {
                resolved(groupedList);
            }).catch((err) => {
                rejected(err);
            });
        });
    }

    /** Retourne la liste des éléments visibles. Si la liste des éléments est hièrarchique, cette fonction retourne une liste plate. Cette liste est utilisé pour calculer la portion de la liste à afficher.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param {IItemBase[]} items Liste des éléments à traiter.
     * @param {string} searchField Nom du champ à utiliser pour la recherche. Le champ représenté peut-être une valeur ou une function.
     * @param {RegExp} regExp Expression de test à appliquer sur le champ de recherche.
     * @param {expandTree} Auto expand parents on search query.
     * @return {Promise} Promesse résolue par la fonction, qui retourne la liste visibles.
     */
    protected getVisibleList(items: IItemBase[], searchField?: string, regExp?: RegExp, expandTree?: boolean): Promise<IItemBase[]> {
        return new Promise<IItemBase[]>((resolved?: (result: IItemBase[]) => void) => {
            if (!items) {
                resolved([]);
                return;
            }

            if (this._cache.visibleList && this._cache.visibleList.length) {
                resolved(this._cache.visibleList);
                return;
            }

            let visibleList = [] as IItemTree[];

            const filter = () => {
                const selectedList = [];
                let odd = false;

                if (regExp) {
                    // Recalc visible list and select list from the filter
                    const getFilteredList = (treeList: IItemBase[], depth: number, hidden: boolean) => {
                        let filteredItems: IItemBase[];
                        if (treeList) {
                            treeList.forEach((itm) => {
                                const itmTree = (itm as IItemTree);
                                if (itmTree.$items) {
                                    odd = false;
                                    const filteredChildren = getFilteredList(itmTree.$items, depth + 1, hidden || itm.visible === false);
                                    if (filteredChildren) {
                                        if (itmTree.collapsed && expandTree) {
                                            itmTree.collapsed = false;
                                        }
                                        if (!filteredItems) {
                                            if (itmTree.collapsed) {
                                                filteredItems = [itmTree];
                                            } else {
                                                filteredItems = [itmTree, ...filteredChildren];
                                            }
                                        } else {
                                            if (itmTree.collapsed) {
                                                filteredItems = [...filteredItems, itmTree];
                                            } else {
                                                filteredItems = [...filteredItems, itmTree, ...filteredChildren];
                                            }
                                        }
                                        if (itmTree.selected) {
                                            selectedList.push(itmTree);
                                        }
                                    }

                                    // compare fn can be something like re.test(this.getTextValue(itm)
                                } else if (this.itemMatch(itm, searchField, regExp)) {
                                    itmTree.depth = depth;
                                    if (!filteredItems) {
                                        filteredItems = [];
                                    }
                                    if (!hidden && !(itm.visible === false)) {
                                        // For style
                                        itmTree.odd = odd;
                                        odd = !odd;

                                        filteredItems.push(itmTree);
                                    }
                                    if (itmTree.selected) {
                                        selectedList.push(itmTree);
                                    }
                                } else if (itmTree.selected) {
                                    selectedList.push(itmTree);
                                }
                            });
                        }

                        return filteredItems;
                    };

                    visibleList = getFilteredList(items || [], 0, false) || [];

                } else {
                    // Get visible items list without filter
                    const getVisibleListInternal = (treeList: IItemTree[], depth: number, hidden: boolean) => {
                        if (treeList) {
                            treeList.forEach((item) => {
                                if (!hidden && !(item.visible === false) && !(item.selected && this.hideSelected)) {
                                    // For style
                                    item.odd = odd;
                                    odd = !odd;

                                    // Add to visible list only the visible items (uncollapsed)
                                    visibleList.push(item);
                                }

                                // Add to selected list only the visible items (uncollapsed) and selected
                                if (item.selected) {
                                    selectedList.push(item);
                                }

                                // Recursive call
                                if (item.$items) {
                                    odd = false;
                                    getVisibleListInternal(item.$items, depth + 1, hidden || item.collapsed || item.visible === false);
                                }
                            });
                        }
                    };

                    getVisibleListInternal(items, 0, false);

                }

                this.selectedList = selectedList;
            };

            filter();
            resolved(visibleList);
        });
    }

    /** Retourne une liste plate depuis la liste originale sans hierarchie.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param {IItemBase[]} items Liste des éléments hierarchique.
     * @return {Promise} Promesse résolue par la fonction, qui retourne la liste hierarchique mise à plat.
     */
    protected getFlatList(items: IItemBase[], isFiltered): Promise<IItemBase[]> {
        return new Promise<IItemBase[]>((resolved?: (result: IItemBase[]) => void) => {
            if (!items) {
                resolved([]);
                return;
            }

            if (this._cache.flatList && this._cache.flatList.length) {
                resolved(this._cache.flatList);
                return;
            }

            const flatList = [];
            const visibleList = [];
            const selectedList = [];
            let depthMax = 0;
            let isTree = false;
            let odd = false;

            const getFlatListInternal = (itms: IItemTree[], depth: number, hidden: boolean) => {
                itms.forEach((item) => {
                    if (depth > depthMax) {
                        depthMax = depth;
                    }

                    // Fill system properties
                    item.depth = depth;

                    // Add to full list
                    flatList.push(item);

                    if (!hidden && !(item.visible === false) && !(item.selected && this.hideSelected)) {
                        // For style
                        item.odd = odd;
                        odd = !odd;

                        // Add to visible list only the visible items (uncollapsed)
                        visibleList.push(item);
                    }

                    // Add to selected list only the visible items (uncollapsed) and selected
                    if (item.selected) {
                        selectedList.push(item);
                    }

                    // Recursive call
                    if (item.$items) {
                        isTree = true;
                        odd = false;
                        getFlatListInternal(item.$items, depth + 1, hidden || item.collapsed);
                    }
                });
            };

            getFlatListInternal(items, 0, false);

            this.selectedList = selectedList;
            if (!isFiltered) {
                this._cache.visibleList = visibleList;
            }
            this._cache.depthMax = isTree ? depthMax : 0;

            resolved(flatList);
        });
    }

    /** Efface une partie des caches  */
    protected invalidateViewCache() {
        delete this._cache.flatList;
        delete this._cache.visibleList;
        delete this._cache.depthMax;
        this._cache.rowsCount = 0;
    }

    private compareItems = (item1: IItemBase, item2: IItemBase) => {
        if (this._valueField) {
            return item1[this._valueField] === item2[this._valueField];
        } else if (item1.equals) {
            return item1.equals(item2);
        } else if (item2.equals) {
            return item2.equals(item1);
        } else if (item1.model && item1.model.equals) {
            return item1.model.equals(item2.model);
        } else if (item2.model && item2.model.equals) {
            return item2.model.equals(item1.model);
        } else {
            return item1 === item2;
        }
    }

    private ensureSelectedItems(items: IItemBase[]) {
        if (!items || !this.selectedList || this.selectedList.length === 0) {
            return;
        }

        const newSelectedList = [] as IItemBase[];
        const ensureSelectedChildren = (children: IItemTree[]) => {
            children.forEach((item) => {
                item.selected = this.selectedList.find((selected) => this.compareItems(selected, item)) !== undefined;
                if (item.selected) {
                    newSelectedList.push(item);
                }
                if (item.$items) {
                    ensureSelectedChildren(item.$items);
                }
            });
        };

        ensureSelectedChildren(items);
        this.selectedList = newSelectedList;
    }

    private ensureVisibleListCache(searchField: string, regExp: RegExp, expandTree: boolean) {
        return new Promise((resolved?: () => void, rejected?: (reason: any) => void) => {
            this.ensureFlatListCache(!!regExp).then(() => {
                this.getVisibleList(this._cache.groupedList, searchField, regExp, expandTree).then((visibleList) => {
                    /* if (this._cache.visibleList && this._cache.visibleList.length && this._cache.visibleList !== visibleList) {
                     // New visible list
                     // Nothing to do yet
                     }*/

                    this._cache.visibleList = visibleList;
                    this._cache.rowsCount = visibleList.length;
                    resolved();
                }).catch(rejected);
            }).catch(rejected);
        });
    }

    private ensureFlatListCache(isFiltered: boolean) {
        return new Promise((resolved?: () => void, rejected?: (reason: any) => void) => {
            this.ensureGroupedListCache().then(() => {
                this.getFlatList(this._cache.groupedList, isFiltered).then((flatList) => {
                    if (this._cache.flatList && this._cache.flatList.length && this._cache.flatList !== flatList) {
                        // New flat list
                        delete this._cache.visibleList;
                        this._cache.rowsCount = 0;

                        // Ensure depth max
                        this._cache.depthMax = 0;
                        if (flatList) {
                            flatList.forEach((item: IItemTree) => {
                                if (item.depth && item.depth > this._cache.depthMax) {
                                    this._cache.depthMax = item.depth;
                                }
                            });
                        }
                    }
                    this._cache.flatList = flatList;
                    resolved();
                }).catch(rejected);
            }).catch(rejected);
        });
    }

    private ensureGroupedListCache() {
        return new Promise((resolved?: () => void, rejected?: (reason: any) => void) => {
            if (!this.groupInfos || this.groupInfos.length === 0) {
                this._cache.groupedList = this.items;
                resolved();
            } else {
                this.getGroupedList(this.items).then((groupedList) => {
                    if (this._cache.groupedList && this._cache.groupedList.length && this._cache.groupedList !== groupedList) {
                        // New grouped list
                        this.invalidateViewCache();
                    }
                    this._cache.groupedList = groupedList;
                    resolved();
                }).catch(rejected);
            }
        });
    }

    private ensureChildrenProperties(items: IItemTree[]) {
        if (items) {
            items.forEach((item) => {
                const treeItem = item as IItemTree;
                if (treeItem[this.childrenField]) {
                    treeItem.$items = treeItem[this.childrenField];
                    this.ensureChildrenProperties(treeItem.$items);
                }
            });
        }
    }
}

/** Structure de retour de getViewList. */
export interface IViewListResult {
    rowsCount?: number;
    depthMax?: number;
    visibleList?: IItemBase[];
    startRow: number;
    endRow: number;
    outOfRange?: boolean;
}

/** Structure de retour de findNextMatch. */
export interface IFindItemResult {
    /** Elément trouvé. */
    item: IItemBase;
    /** Index de l'élément dans la liste des éléments visibles. */
    index: number;
}

/** Structure de retour de getParentListInfos. */
export interface IParentListInfoResult {
    /** Elément parent. */
    parent?: IItemTree;
    /** Index de l'élément enfant dans la liste des enfants du parent. */
    index: number;
}

interface IFindItemsResult {
    list: IItemBase[];
    index: number;
}
