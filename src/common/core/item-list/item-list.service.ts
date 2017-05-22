/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/if';
import 'rxjs/add/operator/reduce';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Diacritics } from '../diacritics/diacritics';
import { IGroupInfo } from '../grouping/group-infos';
import { GroupingService } from '../grouping/grouping.service';
import { ISortInfos } from '../sorting/sort-infos.model';
import { SortingService } from '../sorting/sorting.service';
import { IItemBase } from './item-base';
import { IItemTree } from './item-tree';

/** Service de gestion des listes (deja-treelist, deja-select et deja-grid).
 * Ce service permet la gestion du viewport et la gestion des caches des listes.
 * Il peut-être surchargé pour faire du lazy loading ou du paging.
 */
export class ItemListService {

    // Waiter
    private _waiter$ = new BehaviorSubject<boolean>(false);

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

    // Cnacelable pre events
    private loadingItems$: (query: string | RegExp, selectedItems: IItemBase[]) => Observable<IItemBase[]>;
    private selectingItem$: (item: IItemBase) => Promise<IItemBase> | Observable<IItemBase>;
    private unselectingItem$: (item: IItemBase) => Promise<IItemBase> | Observable<IItemBase>;
    private expandingItem$: (item: IItemTree) => Promise<IItemTree> | Observable<IItemTree>;
    private collapsingItem$: (item: IItemTree) => Promise<IItemTree> | Observable<IItemTree>;

    // champs à utiliser comme valeur de comparaison
    private _valueField: string;

    /**
     * Set a observable called before the list will be displayed
     */
    public setLoadingItems(fn: (query: string, selectedItems: IItemBase[]) => Observable<IItemBase>) {
        this.loadingItems$ = fn;
    }

    /**
     * Set a promise or an observable called before an item selection
     */
    public setSelectingItem(fn: (item: IItemBase) => Promise<IItemBase> | Observable<IItemBase>) {
        this.selectingItem$ = fn;
    }

    /**
     * Set a promise or an observable called before an item deselection
     */
    public setUnselectingItem(fn: (item: IItemBase) => Promise<IItemBase> | Observable<IItemBase>) {
        this.unselectingItem$ = fn;
    }

    /**
     * Set a promise or an observable called before an item expand
     */
    public setExpandingItem(fn: (item: IItemTree) => Promise<IItemTree> | Observable<IItemTree>) {
        this.expandingItem$ = fn;
    }

    /**
     * Set a promise or an observable called before an item collapse
     */
    public setCollapsingItem(fn: (item: IItemTree) => Promise<IItemTree> | Observable<IItemTree>) {
        this.collapsingItem$ = fn;
    }

    /**
     * Permet de controler l'affichage du waiter
     * @returns {BehaviorSubject<boolean>}
     */
    public get waiter$(): BehaviorSubject<boolean> {
        return this._waiter$;
    }

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

    public get hasCache() {
        return this._cache && !!this._cache.visibleList;
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
    public setItems$(items: any[] | Promise<any[]> | Observable<any[]>) {
        if (!items) {
            this.items = undefined;
            return Observable.of(null);
        } else if (items instanceof Array) {
            this.ensureChildrenProperties(items);
            this.ensureSelectedItems(items);
            this.items = items;
            this._waiter$.next(false);
            return Observable.of(items);
        } else {
            this.items = undefined;
            this._waiter$.next(true);
            let observable = items as Observable<IItemBase[]>;
            if (!observable.subscribe) {
                const promise = items as Promise<IItemBase[]>;
                observable = Observable.fromPromise(promise);
            }

            return observable
                .map((its) => {
                    if (its) {
                        this.ensureChildrenProperties(its);
                        // TODO La déselection ne fonctionne pas pendant le chargement
                        this.ensureSelectedItems(its);
                        this.items = [...this.items || [], ...its];
                        this._waiter$.next(false);
                        return its;
                    } else {
                        this.items = [];
                        this._waiter$.next(false);
                        return [];
                    }
                });
        }
    }

    public setModels$(items: any[] | Promise<any[]> | Observable<any[]>) {
        return this.setItems$(items);
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
        return this._cache.visibleList ? this._cache.visibleList.findIndex((itm) => this.compareItems(item, itm)) : -1;
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
            if (textField && value.model && value.model[textField]) {
                return value.model[textField];
            } else if (textField && value[textField]) {
                return value[textField];
            } else if (value.displayName) {
                return typeof value.displayName === 'string' ? value.displayName : value.displayName();
            } else if (typeof value.toString === 'function') {
                return value.toString();
            }
        }
    }

    /** Usage interne. Termine le drag and drop en cours. */
    public drop$(): Observable<boolean> {
        return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
            if (!this._ddList || !this.items) {
                subscriber.next(false);
                return;
            }

            const listIndex = this._ddCurrentIndex;
            const item = this._ddList[listIndex] as IItemTree;
            if (!item) {
                throw new Error('invalid drag infos stored in cache.');
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
            subscriber.next(true);
        });
    }

    /** Usage interne. Calcul l'élément cible d'un drag and drop en fonction de l'index spécifié. */
    public calcDragTargetIndex$(index: number, targetIndex: number): Observable<number> {
        return new Observable<number>((subscriber: Subscriber<number>) => {
            const currentList = this._ddList || this._cache.visibleList;

            if (!currentList) {
                throw new Error('Empty cache on calcDragTargetIndex');
            }

            const startIndex = this._ddCurrentIndex !== undefined ? this._ddCurrentIndex : index;
            if (startIndex >= currentList.length) {
                subscriber.next(currentList.length - 1);
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
                                subscriber.next(a);
                                return;
                            } else if (targetItem.depth === item.depth - 1) {
                                subscriber.next(a + 1);
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
                                subscriber.next(a);
                                return;
                            } else if (targetItem.depth === item.depth - 1) {
                                subscriber.next(a - 1);
                                return;
                            }
                        }
                        // Not found
                        const targetItem = currentList[afterIndex] as IItemTree;
                        if (targetItem.depth === item.depth) {
                            subscriber.next(afterIndex);
                            return;
                        }
                    }
                }
            }

            subscriber.next(dragDropIndex);
        });
    }

    /** Change l'état d'expansion de tous les éléments.
     * @param {boolean} collapsed  True si les éléments doivent être réduits.
     * @return {Observable} Observable résolu par la fonction.
     */
    public toggleAll$(collapsed: boolean): Observable<IItemBase[]> {
        return Observable.of(this._cache.flatList)
            .map((items: IItemTree[]) => items.filter((item) => item.$items && item.collapsible !== false))
            .do(() => delete this._cache.visibleList) // Invalidate view cache
            .switchMap((items) => collapsed ? this.collapseItems$(items) : this.expandItems$(items));
    }

    /** Change l'état d'expansion de l'élément spécifié par son index sur la liste des éléments visibles.
     * @param {number} index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param {boolean} collapse  Etat de l'élément. True pour réduire l'élément.
     * @return {Observable} Observable résolu par la fonction.
     */
    public toggleCollapse$(index: number, collapse?: boolean): Observable<IItemBase[]> {
        const visibleList = this._cache.visibleList;
        if (!visibleList || !visibleList.length) {
            throw new Error('Empty cache on toggleCollapse');
        }

        const item = visibleList[index] as IItemTree;
        if (!item || item.collapsible === false) {
            return Observable.of([]);
        }

        const collapsed = collapse !== undefined ? collapse : item.collapsed ? false : true;
        return collapsed ? this.collapseItem$(item) : this.expandItem$(item);
    }

    /** Etends les éléments spécifiés.
     * @param {IItemBase[]} items  Liste des éléments à étendre.
     * @return {Observable} Observable résolu par la fonction.
     */
    public expandItems$(items: IItemBase[]): Observable<IItemBase[]> {
        return Observable.from(items || [])
            .switchMap((item) => this.expandItem$(item))
            .reduce((acc: any[], cur) => {
                acc.push(cur);
                return acc;
            }, []);
    }

    /** Reduits les éléments spécifiés.
     * @param {IItemBase[]} items  Liste des éléments à réduire.
     * @return {Observable} Observable résolu par la fonction.
     */
    public collapseItems$(items: IItemBase[]): Observable<IItemBase[]> {
        return Observable.from(items || [])
            .switchMap((item) => this.collapseItem$(item))
            .reduce((acc: any[], cur) => {
                acc.push(cur);
                return acc;
            }, []);
    }

    /** Etends l'élément spécifié.
     * @param {IItemBase[]} items  Eléments à étendre.
     * @return {Observable} Observable résolu par la fonction.
     */
    public expandItem$(item: IItemTree) {
        return Observable.of(item)
            .filter((itm) => !!itm)
            .switchMap((itm) => this.expandingItem$ ? this.expandingItem$(itm) : Observable.of(itm))
            .filter((itm) => !!itm)
            .do((itm) => {
                itm.collapsed = false;
                // Invalidate view cache
                delete this._cache.visibleList;
            });
    }

    /** Réduit l'élément spécifié.
     * @param {IItemBase[]} items  Eléments à réduire.
     * @return {Observable} Observable résolu par la fonction.
     */
    public collapseItem$(item: IItemTree) {
        return Observable.of(item)
            .filter((itm) => !!itm)
            .switchMap((itm) => this.collapsingItem$ ? this.collapsingItem$(itm) : Observable.of(itm))
            .filter((itm) => !!itm)
            .do((itm) => {
                itm.collapsed = true;
                // Invalidate view cache
                delete this._cache.visibleList;
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
     * @return {Observable} Observable résolu par la fonction.
     */
    public unselectAll$(): Observable<IItemBase[]> {
        if (this.hideSelected) {
            delete this._cache.visibleList;
        }

        const selectedList = this.selectedList;
        this.selectedList = [];

        return this.unSelectItems$(selectedList);
    }

    /** Sélectionne une plage d'éléments en fonction de l'index de début et l'index de fin sur la liste des éléments visibles.
     * @param {number} indexFrom index sur la liste des éléments visibles du premier élément à sélectioner.
     * @param {number} indexTo index sur la liste des éléments visibles du dernier élément à sélectioner.
     * @return {Observable} Observable résolu par la fonction.
     */
    public selectRange$(indexFrom: number, indexTo?: number): Observable<number> {
        if (indexTo === undefined) {
            indexTo = indexFrom;
        }

        // Backup current visible list in case of unselectAll clear the cache
        const visibleList = this._cache.visibleList;
        if (!visibleList || !visibleList.length) {
            throw new Error('Empty cache on selection');
        }

        return this.unselectAll$()
            .map(() => visibleList.slice(Math.min(indexFrom, indexTo), 1 + Math.max(indexFrom, indexTo)))
            .map((items) => items.filter((itm) => itm.selectable !== false))
            .do(() => {
                if (this.hideSelected) {
                    delete this._cache.visibleList;
                }
            })
            .switchMap((items) => this.selectItems$(items).map((selected) => selected.length));
    }

    /** Change l'état de selection de l'élément spécifié.
     * @param {IItemBase[]} items Liste des éléments à modifier.
     * @param {boolean} selected True si les éléments divent être sélectionés, False si ils doivent être déselectionés.
     * @return {Observable} Observable résolu par la fonction.
     */
    public toggleSelect$(items: IItemBase[], selected: boolean) {
        items = items || [];
        return Observable.if(() => selected, this.selectItems$(items), this.unSelectItems$(items))
            .map(() => {
                if (this.hideSelected) {
                    delete this._cache.visibleList;
                }
                return this.selectedList;
            });
    }

    /** Sélectionne les éléments spécifiés
     * @param {IItemBase[]} items Liste des éléments à sélectioner.
     * @return {Observable} Observable résolu par la fonction.
     */
    public selectItems$(items: IItemBase[]): Observable<IItemBase[]> {
        return Observable.from(items || [])
            .switchMap((item) => this.selectItem$(item))
            .reduce((acc: any[], cur) => {
                acc.push(cur);
                return acc;
            }, []);
    }

    /** Déselectionne les éléments spécifiés
     * @param {IItemBase[]} items Liste des éléments à déselectioner.
     * @return {Observable} Observable résolu par la fonction.
     */
    public unSelectItems$(items: IItemBase[]): Observable<IItemBase[]> {
        return Observable.from(items || [])
            .filter((item) => item.selected)
            .switchMap((item) => this.unSelectItem$(item))
            .reduce((acc: any[], cur) => {
                acc.push(cur);
                return acc;
            }, []);
    }

    /** Sélectionne l'élément spécifié
     * @param {IItemBase} item Elément à sélectioner.
     * @return {Observable} Observable résolu par la fonction.
     */
    public selectItem$(item: IItemBase) {
        return Observable.of(item)
            .filter((itm) => !!itm)
            .switchMap((itm) => this.selectingItem$ ? this.selectingItem$(itm) : Observable.of(itm))
            .filter((itm) => !!itm)
            .do((itm) => {
                if (!this.selectedList) {
                    this.selectedList = [];
                }

                itm.selected = true;
                this.selectedList.push(itm);
            });
    }

    /** Déselectionne l'élément spécifié
     * @param {IItemBase} item Elément à déselectioner.
     * @return {Observable} Observable résolu par la fonction.
     */
    public unSelectItem$(item: IItemBase) {
        return Observable.of(item)
            .filter((itm) => !!itm)
            .switchMap((itm) => this.unselectingItem$ ? this.unselectingItem$(itm) : Observable.of(itm))
            .filter((itm) => !!itm)
            .do((itm) => {
                itm.selected = false;
                if (this.selectedList && this.selectedList.length) {
                    const index = this.selectedList.findIndex((i) => this.compareItems(i, itm));
                    if (index >= 0) {
                        this.selectedList.splice(index, 1);
                    }
                }
            });
    }

    /** Trouve l'élément suivant répondant à la fonction de comparaison spécifiée.
     * @param {Function} compare Function de comparaison pour la recherche de l'élément.
     * @param {number} startIndex Index de départ sur la liste des éléments visibles.
     * @return {Observable} Observable résolu par la fonction.
     */
    public findNextMatch$(compare?: (item: IItemBase, index: number) => boolean, startIndex?: number): Observable<IFindItemResult> {
        let result = { index: -1 } as IFindItemResult;

        const list = this._cache.visibleList;
        if (!list || !list.length) {
            throw new Error('Empty cache on findNextMatch');
        }

        if (list.length) {
            if (startIndex < 0 || startIndex >= list.length) {
                startIndex = -1;
            }
            let idx = startIndex + 1;
            while (idx !== startIndex) {
                const itm = list[idx];
                if (compare(itm, idx)) {
                    result = {
                        index: idx,
                        item: itm,
                    } as IFindItemResult;
                    break;
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
        return Observable.of(result);
    }

    /** Trie les éléments en fonction du modèle de tri spécifié
     * @param {ISortInfos} sortInfos Modèle de tri à appliquer.
     * @return {Observable} Observable résolu par la fonction.
     */
    public sort$(sortInfos: ISortInfos) {
        if (!this.items) {
            throw new Error('No Items');
        }

        const sortTree$ = this.getSortingService()
            .sortTree$(this._cache.groupedList, sortInfos, '$items')
            .do((sortedList) => {
                this._cache.groupedList = sortedList;
                this.invalidateViewCache();
            });

        if (!this._cache.groupedList || this._cache.groupedList.length === 0) {
            return this.getGroupedList$(this.items)
                .do((groupedList) => this._cache.groupedList = groupedList)
                .switchMap(() => sortTree$);
        } else {
            return sortTree$;
        }
    }

    /** Groupe les éléments en fonction du modèle de groupe spécifié
     * @param {IGroupInfo} groupInfos Modèle de groupe à appliquer.
     * @return {Observable} Observable résolu par la fonction.
     */
    public group$(groupInfos: IGroupInfo[]) {
        this._groupInfos = groupInfos;
        this.invalidateCache();
        this.ensureChildrenProperties(this.items);
        return Observable.of(groupInfos);
    }

    /** Retire les groupe correspondants au modèle de groupe spécifié
     * @param {IGroupInfo} groupInfos Modèle de groupe à retirer.
     * @return {Observable} Observable résolu par la fonction.
     */
    public ungroup$(groupInfo: IGroupInfo) {
        const groupIndex = this._groupInfos ? this._groupInfos.findIndex((gi) => gi.groupByField === groupInfo.groupByField) : -1;
        if (groupIndex >= 0) {
            this._groupInfos.splice(groupIndex, 1);
        }

        this.invalidateCache();
        this.ensureChildrenProperties(this.items);
        return Observable.of(groupInfo);
    }

    /** Retrouve les informations du parent de l'élément spécifié
     * @param {IItemTree} item Element enfant du parent à retrouver.
     * @return {Observable<IParentListInfoResult>} Observable résolu par la fonction, qui retourne les informations sur le parent de l'élément spécifié
     */
    public getParentListInfos$(item: IItemTree, multiSelect: boolean): Observable<IParentListInfoResult> {
        const search$ = (flatList: IItemBase[]) => {
            let flatIndex = flatList.findIndex((itm) => itm === item);
            if (flatIndex < 0) {
                throw new Error('Item not found.');
            }

            let result: IParentListInfoResult;
            if (!item.depth) {
                const rootIndex = this.items.findIndex((itm) => itm === item);
                result = {
                    index: rootIndex,
                } as IParentListInfoResult;
            } else {
                // Search parent and treeindex
                let idx = 0;
                while (--flatIndex >= 0) {
                    const parentItem = flatList[flatIndex] as IItemTree;
                    if (parentItem.depth < item.depth) {
                        result = {
                            index: idx,
                            parent: parentItem,
                        } as IParentListInfoResult;
                    }
                    idx++;
                }
            }

            return Observable.of(result);
        };

        return this.ensureFlatListCache$(true, multiSelect)
            .switchMap((flatList) => search$(flatList));
    };

    /** Supprime tous les caches internes. Ils seront recréés à la première demande de la portion de la liste à afficher. */
    public invalidateCache() {
        this._cache = {};
        this.ensureChildrenProperties(this.items);
    }

    /** Efface la hauteur calculée des lignes en mode automatique */
    public invalidateRowsHeightCache() {
        if (this._items) {
            this._items.forEach((item) => item.size = undefined);
        }
    }

    /** Usage interne. Retourne la portion de la liste à afficher en fonction des paramètres spécifiés. */
    public getViewList$(searchField: string, query?: RegExp | string, ignoreCache?: boolean, ddStartIndex?: number, ddTargetIndex?: number, multiSelect?: boolean): Observable<IViewListResult> {
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
                    query = Diacritics.remove(query);
                    regExp = new RegExp(query, 'i');
                } catch (exc) {
                    throw new Error('Invalid search parameters');
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
                            const curItem = this._ddList[i] as IItemTree;
                            if (curItem.depth <= parentDepth) {
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

            result.depthMax = this._cache.depthMax;
            result.visibleList = viewList;

            return result;
        };

        if (ignoreCache) {
            // console.log('getItemList ' + Date.now());
            this.waiter$.next(true);
            return this.getItemList$(query, this.selectedList)
                .do((items) => {
                    if (!this.items || !this.items.length) {
                        this.ensureSelectedItems(items);
                    }

                    if (items !== this.items) {
                        // New item list, invalidate view cache
                        this.items = items;
                        // Be cause a new array was returned by getItemList, the list is considered as already filtered (Lazy loading)
                        regExp = undefined;
                        this.ensureChildrenProperties(items);
                    }

                    delete this._cache.visibleList;
                    this.waiter$.next(this.items === undefined);
                })
                .switchMap(() => this.ensureVisibleListCache$(searchField, regExp, expandTree, multiSelect))
                .map(() => loadViewList());
        } else {
            return this.ensureVisibleListCache$(searchField, regExp, expandTree, multiSelect)
                .map(() => loadViewList());
        }
    }

    /** Retourne la liste à utilise pour la création des caches. Surcharger cetee méthode pour fournir une liste de façon lazy.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param {string} query Texte ou regular expression par laquelle la liste doit être filtrée.
     * @param {IItemBase[]} selectedItems Liste des éléments selectionés.
     * @return {Observable} Observable résolu par la fonction, qui retourne la liste à utiliser.
     */
    protected getItemList$(query?: RegExp | string, selectedItems?: IItemBase[]): Observable<IItemBase[]> {
        return this.loadingItems$ ? this.loadingItems$(query, selectedItems) : Observable.of(this.items);
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
        value = Diacritics.remove(value);
        return value && regExp.test(value);
    }

    /** Retourne une liste groupée si un modèle de groupe interne est spécifié.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param {IItemBase[]} items Liste des éléments à grouper.
     * @return {Observable} Observable résolu par la fonction, qui retourne la liste groupés.
     */
    protected getGroupedList$(items: IItemBase[]): Observable<IItemTree[]> {
        return items ? this.getGroupingService().group$(this.items, this.groupInfos, '$items') : Observable.of([]);
    }

    /** Retourne la liste des éléments visibles. Si la liste des éléments est hièrarchique, cette fonction retourne une liste plate. Cette liste est utilisé pour calculer la portion de la liste à afficher.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param {IItemBase[]} items Liste des éléments à traiter.
     * @param {string} searchField Nom du champ à utiliser pour la recherche. Le champ représenté peut-être une valeur ou une function.
     * @param {RegExp} regExp Expression de test à appliquer sur le champ de recherche.
     * @param {expandTree} Auto expand parents on search query.
     * @return {Observable} Observable résolu par la fonction, qui retourne la liste visibles.
     */
    protected getVisibleList$(items: IItemBase[], searchField: string, regExp: RegExp, expandTree: boolean, multiSelect: boolean): Observable<IItemBase[]> {
        if (!items) {
            return Observable.of([]);
        }

        let visibleList = [] as IItemTree[];
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
                            if (!hidden && !(itm.visible === false) && !(itm.selected && this.hideSelected)) {
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

        return Observable.of(visibleList)
            .do(() => {
                if (!multiSelect) {
                    this.selectedList = selectedList;
                }
            });
    }

    /** Retourne une liste plate depuis la liste originale sans hierarchie.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param {IItemBase[]} items Liste des éléments hierarchique.
     * @return {Observable} Observable résolu par la fonction, qui retourne la liste hierarchique mise à plat.
     */
    protected getFlatList$(items: IItemBase[], isFiltered: boolean, multiSelect: boolean): Observable<IItemBase[]> {
        if (!items) {
            return Observable.of([]);
        }

        const visibleList = [];
        const selectedList = [];
        let depthMax = 0;
        let isTree = false;
        let odd = false;

        const flatList$ = (itms: IItemTree[], depth: number, hidden: boolean) => {
            return Observable.from(itms || [])
                .do((item) => {
                    if (depth > depthMax) {
                        depthMax = depth;
                    }

                    // Fill system properties
                    item.depth = depth;

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
                })
                .switchMap((item) => {
                    if (item.$items) {
                        isTree = true;
                        odd = false;
                        return Observable.concat(Observable.of(item), flatList$(item.$items, depth + 1, hidden || item.collapsed));
                    } else {
                        return Observable.of(item);
                    }
                });
        };

        return flatList$(items, 0, false)
            .do(() => {
                if (!multiSelect) {
                    this.selectedList = selectedList;
                }

                if (!isFiltered) {
                    this._cache.visibleList = visibleList;
                }
                this._cache.depthMax = isTree ? depthMax : 0;
            })
            .reduce((acc: any[], cur) => {
                acc.push(cur);
                return acc;
            }, []);
    }

    /** Efface une partie des caches  */
    protected invalidateViewCache() {
        delete this._cache.flatList;
        delete this._cache.visibleList;
        delete this._cache.depthMax;
        this._cache.rowsCount = 0;
    }

    private compareItems = (item1: IItemBase, item2: IItemBase) => {
        if (item1.model && !item2.model) {
            return false;
        } else if (!item1.model && item2.model) {
            return false;
        } else if (this._valueField) {
            if (item1.model && item2.model) {
                item1 = item1.model;
                item2 = item2.model;
            }
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
            if (item1.model && item2.model) {
                item1 = item1.model;
                item2 = item2.model;
            }
            return item1 === item2;
        }
    }

    private ensureSelectedItems(items: IItemBase[]) {
        if (!items || !this.selectedList || this.selectedList.length === 0) {
            return;
        }

        // Ensure selected flag
        this.selectedList.forEach((item) => item.selected = true);

        const newSelectedList = [] as IItemBase[];
        const ensureSelectedChildren = (children: IItemTree[]) => {
            children.forEach((item) => {
                const selectedItem = this.selectedList.find((selected) => this.compareItems(selected, item));
                if (selectedItem) {
                    selectedItem.selected = false;
                    newSelectedList.push(item);
                }
                if (item.$items) {
                    ensureSelectedChildren(item.$items);
                }
            });
        };

        ensureSelectedChildren(items);

        // Add not found selected items
        this.selectedList.filter((item) => item.selected).forEach((item) => newSelectedList.push(item));

        this.selectedList = newSelectedList;

        // Ensure selected flag for the new items
        this.selectedList.forEach((item) => item.selected = true);
    }

    private ensureVisibleListCache$(searchField: string, regExp: RegExp, expandTree: boolean, multiSelect: boolean) {
        if (this._cache.visibleList && this._cache.visibleList.length) {
            return Observable.of(this._cache.visibleList);
        } else {
            return this.ensureFlatListCache$(!!regExp, multiSelect)
                .switchMap(() => this.getVisibleList$(this._cache.groupedList, searchField, regExp, expandTree, multiSelect))
                .do((visibleList) => {
                    /* if (this._cache.visibleList && this._cache.visibleList.length && this._cache.visibleList !== visibleList) {
                     // New visible list
                     // Nothing to do yet
                     }*/

                    this._cache.visibleList = visibleList;
                    this._cache.rowsCount = visibleList.length;
                });
        }
    }

    private ensureFlatListCache$(isFiltered: boolean, multiSelect: boolean) {
        if (this._cache.flatList && this._cache.flatList.length) {
            return Observable.of(this._cache.flatList);
        } else {
            return this.ensureGroupedListCache$()
                .switchMap(() => this.getFlatList$(this._cache.groupedList, isFiltered, multiSelect))
                .do((flatList) => {
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
                });
        }
    }

    private ensureGroupedListCache$() {
        if (this._cache.groupedList && this._cache.groupedList.length) {
            return Observable.of(this._cache.groupedList);
        } else if (!this.groupInfos || this.groupInfos.length === 0) {
            return Observable.of(this.items)
                .do((items) => this._cache.groupedList = items);
        } else {
            return this.getGroupedList$(this.items)
                .do((groupedList) => {
                    if (this._cache.groupedList && this._cache.groupedList.length && this._cache.groupedList !== groupedList) {
                        // New grouped list
                        this.invalidateViewCache();
                    }
                    this._cache.groupedList = groupedList;
                });
        }
    }

    private ensureChildrenProperties(items: IItemTree[]) {
        if (!items) {
            return;
        }

        items.forEach((item) => {
            if (item[this.childrenField]) {
                item.$items = item[this.childrenField];
                this.ensureChildrenProperties(item.$items);
            }
        });
    }
}

/** Structure de retour de getViewList. */
export interface IViewListResult {
    depthMax?: number;
    visibleList?: IItemBase[];
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
