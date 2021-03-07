/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { GroupingService, IGroupInfo, ISortInfos, SortingService } from '@deja-js/component/core';
import { BehaviorSubject, combineLatest, merge, Observable, of, ReplaySubject, Subscriber } from 'rxjs';
import { debounceTime, map, shareReplay } from 'rxjs/operators';

import { Item } from './item';
import { ItemComponent } from './item.component';


/** Service de gestion des listes (treelist et select).
 * Ce service permet la gestion du viewport et la gestion des caches des listes.
 * Il peut-être surchargé pour faire du lazy loading ou du paging.
 */
@Injectable()
export class ItemService<T> {
    // Working item array (can be recursive)
    public items$ = new ReplaySubject<Item<T>[]>(1);
    public models$ = new ReplaySubject<T[]>(1);
    public options$ = new ReplaySubject<ItemComponent[]>(1);

    public childrenField$ = new BehaviorSubject<string>('items');
    public textField$ = new BehaviorSubject<string>('label');
    public valueField$ = new BehaviorSubject<string>('value');
    public searchField$ = new BehaviorSubject<string>(null);

    public itemList$: Observable<Item<T>[]>;
    public flatItemList$: Observable<Item<T>[]>;
    public selectedItems$: Observable<Item<T>[]>;

    private refreshSelection$ = new BehaviorSubject<RefreshSelectionParams<T>>({});

    // Cache for lists (flat lists only, not recursive)
    private _cache = {} as {
        rowsCount?: number;
        depthMax?: number;
        groupedList?: Item<T>[];
        flatList?: Item<T>[];
        visibleList?: Item<T>[];
    };

    // Cache for last query. Flat list will be regenerated only if the query change
    private _lastQuery: RegExp | string;
    // private internalQuery: RegExp;

    // Sorting
    private _sortingService: SortingService;

    // grouping
    private _groupInfos: IGroupInfo[];
    private _groupingService: GroupingService;

    // Cache for drag and drop (flat list modified by the current drag).
    private _ddList: Item<T>[];
    private _ddCurrentIndex: number;
    // private _ddChildCount: number;

    public constructor() {

        const itemsFromOptions$ = this.options$.pipe(
            debounceTime(1),
            map(options => {
                const items = options.map(option => {
                    const item = new Item<T>(option.value, option.text);
                    item.selected = option.selected === true || option.selected === '';
                    return item;
                });
                if (items.length > 100) {
                    // eslint-disable-next-line no-debugger
                    debugger;
                    console.error('Select options with more than 100 items can have performance options. Please bind directly the items in code behind with items or models input.');
                }
                return items;
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        const itemsFromModels$ = combineLatest([this.models$, this.valueField$, this.textField$, this.childrenField$]).pipe(
            debounceTime(1),
            map(([models, valueField, textField, childrenField]) => (models && models instanceof Array && this.mapToItem(models, valueField, textField, childrenField)) || []),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.itemList$ = merge(this.items$, itemsFromModels$, itemsFromOptions$).pipe(
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.flatItemList$ = this.itemList$.pipe(
            map(items => {
                const list = new Array<Item<T>>();
                const addItems = (itms: Item<T>[], depth: number) => {
                    itms.forEach(item => {
                        item.depth = depth;
                        list.push(item);
                        if (item.items) {
                            addItems(item.items, depth + 1);
                        }
                    });
                };
                addItems(items, 0);
                return list;
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.selectedItems$ = combineLatest([this.flatItemList$, this.valueField$, this.refreshSelection$]).pipe(
            map(([items, valueField, refreshSelection]) => {
                const select = refreshSelection.selectItems;
                const unselect = refreshSelection.unselectItems;
                const toggle = refreshSelection.toggle;
                const checkSelectable = refreshSelection.checkSelectable;
                const selectParents = refreshSelection.selectParents;
                const selectModels = refreshSelection.selectModels;
                const selectValues = refreshSelection.selectValues;
                delete refreshSelection.selectItems;
                delete refreshSelection.unselectItems;
                delete refreshSelection.toggle;
                delete refreshSelection.checkSelectable;
                delete refreshSelection.selectParents;
                delete refreshSelection.selectModels;
                delete refreshSelection.selectValues;

                if (unselect) {
                    if (unselect === 'all') {
                        items.forEach(item => item.selected = false);
                        if (!select && !selectModels && !selectValues) {
                            return [];
                        }
                    } else {
                        unselect.forEach(item => item.selected = false);
                    }
                }

                if (select) {
                    if (select === 'all') {
                        return items.filter(item => item.selected = (selectParents || !item.items) && (!checkSelectable || item.selectable !== false));
                    } else if (select?.length) {
                        select.forEach(item => item.selected = !checkSelectable || item.selectable !== false);
                    }
                }

                if (selectModels) {
                    items.forEach(item => item.selected = (!checkSelectable || item.selectable !== false) && selectModels.some(model => this.compareModels(model, item.model, valueField)));
                }

                if (selectValues) {
                    items.forEach(item => item.selected = (!checkSelectable || item.selectable !== false) && selectValues.some(value => value === item.id));
                }

                if (toggle) {
                    toggle.forEach(item => item.selected = !item.selected);
                }

                return items.filter(item => item.selected);
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );
    }

    /** Map une structure de modèles en items
     * @param mods  Modèles à évaluer.
     * @param valueField (optional) Champs à traiter comme valeur.
     * @param textField (optional) Champs à traiter comme text.
     * @param childrenField (optional) Champs à traiter comme enfants.
     * @return Structure mapée
     */
    public mapToItem(mods: T[], valueField: string, textField: string, childrenField?: string): Item<T>[] {
        return mods.map(model => {
            const item = new Item<T>();
            item.model = model;

            if (typeof model === 'string') {
                item.id = model;
                item.label = model;
            } else {
                item.label = this.extractValueField(model, textField) as string;
                item.id = this.extractValueField(model, valueField) as string;

                if (childrenField) {
                    const children = this.extractValueField(model, childrenField) as T[];
                    if (children && children instanceof Array) {
                        item.items = this.mapToItem(children, valueField, textField, childrenField);
                    }
                }
            }

            return item;
        });
    }

    /** Désélectionne tous les éléments sélectionnés */
    public unselectAll(): void {
        this.refreshSelection$.next({ unselectItems: 'all' });
    }

    /** Sélectionne tous les éléments */
    public selectAll(checkSelectable?: boolean): void {
        this.refreshSelection$.next({ selectItems: 'all', checkSelectable: checkSelectable !== false });
    }

    /** Déselectionne l'élément spécifié
     * @param item Elément à déselectionner.
     */
    public unSelectItem(item: Item<T>): void {
        this.refreshSelection$.next({ unselectItems: [item] });
    }

    /** Sélectionne l'élément spécifié
     * @param item Elément à sélectionner.
     */
    public selectItem(item: Item<T>): void {
        this.refreshSelection$.next({ selectItems: [item] });
    }

    /** Déselectionne les éléments spécifiés
     * @param items Liste des éléments à désélectionner.
     */
    public unSelectItems(items: Item<T>[]): void {
        this.refreshSelection$.next({ unselectItems: items });
    }

    /** Sélectionne les éléments spécifiés
     * @param items Liste des éléments à sélectionner.
     */
    public selectItems(items: Item<T>[]): void {
        this.refreshSelection$.next({ selectItems: items });
    }

    /** Set la selection sur les éléments spécifiés
     * @param items Liste des éléments à sélectionner.
     */
    public setSelectedItems(items: Item<T>[]): void {
        this.refreshSelection$.next({ unselectItems: 'all', selectItems: items });
    }

    /** Set la selection sur les éléments spécifiés
     * @param items Liste des modèles des éléments à sélectionner.
     */
    public setSelectedModels(models: T[]): void {
        this.refreshSelection$.next({ unselectItems: 'all', selectModels: models });
    }

    /** Set la selection sur les ids des éléments spécifiés
     * @param values Liste des ids des éléments à sélectionner.
     */
    public setSelectedValues(values: string[]): void {
        this.refreshSelection$.next({ unselectItems: 'all', selectValues: values });
    }

    /** Change l'état de sélection de l'élément spécifié.
     * @param items Liste des éléments à modifier.
     */
    public toggleSelect$(items: Item<T>[]): void {
        this.refreshSelection$.next({ toggle: items });
    }

    /** Renvoie l'index de l'élément sur la liste plate corespondant à l'élément HTML spécifié
     * @return Index sur la liste plate corespondant à l'élément HTML
     */
    public getItemIndexFromHtmlElement(element: HTMLElement): number {
        // eslint-disable-next-line no-loops/no-loops
        while (element?.parentElement && element.hasAttribute && !element.hasAttribute('flat') && element.parentElement.tagName !== 'BODY') {
            element = element.parentElement;
        }

        if (!element || !element.hasAttribute('flat')) {
            return undefined;
        }

        return +element.getAttribute('flat');
    }

    public get lastQuery(): RegExp | string {
        return this._lastQuery;
    }

    public get hasCache(): boolean {
        return this._cache && !!this._cache.visibleList;
    }

    /** Renvoie le modèle de grouping ajouté à la liste de base par le service. Ce modèle ne modifie pas la donée, mais est jsute ajouté à l'affichage
     * @return value Modèle de grouping d'affichage de la liste.
     */
    public get groupInfos(): IGroupInfo[] {
        return this._groupInfos;
    }

    /** Retourne l'élément corresondant à l'index spéficié dans la liste des éléments visibles.
     * @param index Index de l'élément à chercher sur la liste des éléments visibles.
     * @return Element correspondant à l'index recherché.
     */
    public getItemFromIndex(index: number): Item<T> {
        return this._cache.visibleList ? this._cache.visibleList[index] : null;
    }

    /** Retourne l'index correspondant à l'élément spéficié dans la liste des éléments visibles
     * @param item Element à chercher sur la liste des éléments visibles.
     * @return Index correspondant à l'élément recherché.
     */
    public getItemIndex(_item: Item<T>): number {
        return 0;
        // return this._cache.visibleList ? this._cache.visibleList.findIndex(itm => this.compareItems(item, itm)) : -1;
    }

    /** Renvoie le service utilisé pour le tri de la liste
     * @return Service utilisé pour le tri.
     */
    public getSortingService(): SortingService {
        if (!this._sortingService) {
            this._sortingService = new SortingService();
        }
        return this._sortingService;
    }

    /** Définit le service utilisé pour le tri de la liste
     * @param value  Service à utiliser pour le tri.
     */
    public setSortingService(value: SortingService): void {
        this._sortingService = value;
    }

    /** Renvoie le service utilisé pour le regroupement de la liste
     * @return Service utilisé pour le regroupement.
     */
    public getGroupingService(): GroupingService {
        if (!this._groupingService) {
            this._groupingService = new GroupingService();
        }
        return this._groupingService;
    }

    /** Définit le service utilisé pour le regroupement de la liste
     * @param value Service à utiliser pour le regroupement.
     */
    public setGroupingService(value: GroupingService): void {
        this._groupingService = value;
    }

    /** Usage interne. Termine le drag and drop en cours. */
    public drop$(): Observable<boolean> {
        return new Observable<boolean>((_subscriber: Subscriber<boolean>) => {
            // if (!this._ddList || !this.items) {
            //     subscriber.next(false);
            //     return undefined;
            // }

            // const listIndex = this._ddCurrentIndex;
            // const item = this._ddList[listIndex];
            // if (!item) {
            //     throw new Error('invalid drag infos stored in cache.');
            // }

            // // La drag and drop liste est incomplète, en cas de filtrage, retrouver l'élément juste en dessus dans la liste complète
            // const targetItem = this._ddList[listIndex - 1];
            // let targetParent: Item<T>;

            // // Find target in the flat list to calculate the correct index
            // let flatListIndex = this._cache.flatList.findIndex(itm => itm === targetItem);
            // let targetIndex = 0;
            // // eslint-disable-next-line no-loops/no-loops
            // while (flatListIndex >= 0) {
            //     const parentItem = this._cache.flatList[flatListIndex];
            //     if (parentItem.depth === undefined) {
            //         // Flat list
            //         targetIndex = flatListIndex;
            //         break;
            //     } else if (parentItem.depth === item.depth - 1) {
            //         targetParent = parentItem;
            //         break;
            //     } else if (parentItem.depth === item.depth) {
            //         ++targetIndex;
            //     }
            //     --flatListIndex;
            // }

            // const findItem = (itemToFind: Item<T>, treeList: Item<T>[]): FindItemsResult<T> => {
            //     // eslint-disable-next-line no-loops/no-loops
            //     for (let i = 0; i < treeList.length; i++) {
            //         const itm = treeList[i];
            //         if (itm === itemToFind) {
            //             return {
            //                 index: i,
            //                 list: treeList
            //             };
            //         } else if (itm.items !== undefined) {
            //             const result = findItem(itemToFind, itm.items);
            //             if (result) {
            //                 return result;
            //             }
            //         }
            //     }

            //     return undefined;
            // };

            // const originResult = findItem(item, this.items);

            // // Remove item from the origin
            // originResult.list.splice(originResult.index, 1);

            // // Add in the new location
            // const targetList = targetParent ? targetParent.items : this.items;

            // if (targetIndex > originResult.index && originResult.list === targetList) {
            //     --targetIndex;
            // }

            // targetList.splice(targetIndex, 0, item);

            // // Invalidate view cache
            // this.invalidateCache();
            // subscriber.next(true);
            // return undefined;
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

            const item = currentList[startIndex];
            const dragDropIndex = startIndex;

            if (item.depth !== undefined && targetIndex !== startIndex) {
                if (targetIndex < startIndex) {
                    // Remonte jusqu'au premier élément avec une profondeur plus grande
                    let beforeIndex = 0;
                    // eslint-disable-next-line no-loops/no-loops
                    for (let b = startIndex - 1; b >= 0; b--) {
                        const targetItem = currentList[b];
                        if (targetItem.depth <= item.depth) {
                            beforeIndex = b;
                            break;
                        }
                    }
                    if (targetIndex <= beforeIndex) {
                        // Descend jusqu'au premier élément avec la même profondeur
                        // eslint-disable-next-line no-loops/no-loops
                        for (let a = targetIndex; a <= beforeIndex; a++) {
                            const targetItem = currentList[a];
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
                    // eslint-disable-next-line no-loops/no-loops
                    for (let a = startIndex + 1; a < currentList.length; a++) {
                        const targetItem = currentList[a];
                        if (targetItem.depth <= item.depth) {
                            afterIndex = a;
                            break;
                        }
                    }
                    if (targetIndex >= afterIndex) {
                        // Descend jusqu'au premier élément avec la même profondeur
                        // eslint-disable-next-line no-loops/no-loops
                        for (let a = targetIndex + 1; a < currentList.length; a++) {
                            const itm = currentList[a];
                            if (itm.depth === item.depth) {
                                subscriber.next(a);
                                return;
                            } else if (itm.depth === item.depth - 1) {
                                subscriber.next(a - 1);
                                return;
                            }
                        }
                        // Not found
                        const targetItem = currentList[afterIndex];
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

    // /** Change l'état d'expansion de tous les éléments.
    //  * @param collapsed True si les éléments doivent être réduits.
    //  * @return Observable résolu par la fonction.
    //  */
    // public toggleAll$(collapsed: boolean): Observable<Item<T>[]> {
    //     return of(this._cache.flatList).pipe(
    //         map((items: Item<T>[]) => items.filter(item => item.items && item.collapsible !== false)),
    //         tap(() => delete this._cache.visibleList), // Invalidate view cache
    //         switchMap(items => collapsed ? this.collapseItems$(items) : this.expandItems$(items)));
    // }

    // /** Change l'état d'expansion de l'élément spécifié par son index sur la liste des éléments visibles.
    //  * @param index Index sur la liste des éléments visibles de l'élément à changer.
    //  * @param collapse Etat de l'élément. True pour réduire l'élément.
    //  * @return Observable résolu par la fonction.
    //  */
    // public toggleCollapse$(index: number, collapse?: boolean): Observable<Item<T>> {
    //     const visibleList = this._cache.visibleList;
    //     if (!visibleList || !visibleList.length) {
    //         throw new Error('Empty cache on toggleCollapse');
    //     }

    //     const item = visibleList[index];
    //     if (!item || item.collapsible === false) {
    //         return of([] as Item<T>);
    //     }

    //     const collapsed = collapse !== undefined ? collapse : !item.collapsed;
    //     return collapsed ? this.collapseItem$(item) : this.expandItem$(item);
    // }

    // /** Etends les éléments spécifiés.
    //  * @param items Liste des éléments à étendre.
    //  * @return Observable résolu par la fonction.
    //  */
    // public expandItems$(items: Item<T>[]): Observable<Item<T>[]> {
    //     return from(items || []).pipe(
    //         switchMap(item => this.expandItem$(item)),
    //         reduce((acc, cur) => [...acc, cur], []));
    // }

    // /** Reduits les éléments spécifiés.
    //  * @param items Liste des éléments à réduire.
    //  * @return Observable résolu par la fonction.
    //  */
    // public collapseItems(items: Item<T>[]): Item<T>[] {
    //     return from(items || []).pipe(
    //         reduce((acc, cur) => [...acc, cur], []));
    // }

    // /** Etends l'élément spécifié.
    //  * @param items Eléments à étendre.
    //  * @return Observable résolu par la fonction.
    //  */
    // public expandItem(item: Item<T>): Observable<Item<T>> {
    //     return of(item).pipe(
    //         filter(itm => !!itm),
    //         switchMap(itm => this.expandingItem$ ? this.expandingItem$(itm) : of(itm)),
    //         filter(itm => !!itm),
    //         tap(itm => {
    //             itm.collapsed = false;
    //             // Invalidate view cache
    //             delete this._cache.visibleList;
    //         }));
    // }

    // /** Réduit l'élément spécifié.
    //  * @param items Eléments à réduire.
    //  * @return Observable résolu par la fonction.
    //  */
    // public collapseItem(item: Item<T>): Observable<Item<T>> {
    //     return of(item).pipe(
    //         filter(itm => !!itm),
    //         switchMap(itm => this.collapsingItem$ ? this.collapsingItem$(itm) : of(itm)),
    //         filter(itm => !!itm),
    //         tap(itm => {
    //             itm.collapsed = true;
    //             // Invalidate view cache
    //             delete this._cache.visibleList;
    //         }));
    // }

    /** Trouve l'élément suivant répondant à la fonction de comparaison spécifiée.
     * @param compare Function de comparaison pour la recherche de l'élément.
     * @param startIndex Index de départ sur la liste des éléments visibles.
     * @return Observable résolu par la fonction.
     */
    public findNextMatch$(compare?: (item: Item<T>, index: number) => boolean, startIndex?: number): Observable<FindItemResult<T>> {
        let result = { index: -1 } as FindItemResult<T>;

        const list = this._cache.visibleList;
        if (!list || !list.length) {
            throw new Error('Empty cache on findNextMatch');
        }

        if (list.length) {
            if (startIndex < 0 || startIndex >= list.length) {
                startIndex = -1;
            }
            let idx = startIndex + 1;
            // eslint-disable-next-line no-loops/no-loops
            while (idx !== startIndex) {
                const itm = list[idx];
                if (compare(itm, idx)) {
                    result = {
                        index: idx,
                        item: itm
                    } as FindItemResult<T>;
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
        return of(result);
    }

    /** Trie les éléments en fonction du modèle de tri spécifié
     * @param sortInfos Modèle de tri à appliquer.
     * @return Observable résolu par la fonction.
     */
    public sort$(_sortInfos: ISortInfos): void {
        // TODO
        // if (!this.items) {
        //     throw new Error('No Items');
        // }

        // const sortTree$ = this.getSortingService()
        //     .sortTree$(this._cache.groupedList, sortInfos, '$items').pipe(
        //         tap((sortedList: Item<T>[]) => {
        //             this._cache.groupedList = sortedList;
        //             this.invalidateViewCache();
        //         }));

        // if (!this._cache.groupedList || this._cache.groupedList.length === 0) {
        //     return this.getGroupedList$(this.items).pipe(
        //         tap(groupedList => this._cache.groupedList = groupedList),
        //         switchMap(() => sortTree$));
        // } else {
        //     return sortTree$;
        // }
    }

    /** Groupe les éléments en fonction du modèle de groupe spécifié
     * @param groupInfos Modèle de groupe à appliquer.
     * @return Observable résolu par la fonction.
     */
    public group$(_groupInfos: IGroupInfo[]): void {
        // this._groupInfos = groupInfos;
        // this.invalidateCache();
        // this.ensureChildrenProperties(this.items);
        // return of(groupInfos);
    }

    /** Retire les groupe correspondants au modèle de groupe spécifié
     * @param groupInfos Modèle de groupe à retirer.
     * @return Observable résolu par la fonction.
     */
    public ungroup$(_groupInfo: IGroupInfo): void {
        // const groupIndex = this._groupInfos ? this._groupInfos.findIndex(gi => gi.groupByField === groupInfo.groupByField) : -1;
        // if (groupIndex >= 0) {
        //     this._groupInfos.splice(groupIndex, 1);
        // }

        // this.invalidateCache();
        // this.ensureChildrenProperties(this.items);
        // return of(groupInfo);
    }

    /** Retrouve les informations du parent de l'élément spécifié
     * @param item Element enfant du parent à retrouver.
     * @return Observable résolu par la fonction, qui retourne les informations sur le parent de l'élément spécifié
     */
    public getParentListInfos$(_item: Item<T>, _multiSelect: boolean): void {
        // const search$ = (flatList: Item<T>[]) => {
        //     let flatIndex = flatList.findIndex(itm => itm === item);
        //     if (flatIndex < 0) {
        //         throw new Error('Item not found.');
        //     }

        //     let result: ParentListInfoResult<T>;
        //     if (!item.depth) {
        //         const rootIndex = this.items.findIndex(itm => itm === item);
        //         result = {
        //             index: rootIndex
        //         } as ParentListInfoResult<T>;
        //     } else {
        //         // Search parent and treeindex
        //         let idx = 0;
        //         // eslint-disable-next-line no-loops/no-loops
        //         while (--flatIndex >= 0) {
        //             const parentItem = flatList[flatIndex];
        //             if (parentItem.depth < item.depth) {
        //                 result = {
        //                     index: idx,
        //                     parent: parentItem
        //                 } as ParentListInfoResult<T>;
        //             }
        //             idx++;
        //         }
        //     }

        //     return of(result);
        // };

        // return this.ensureFlatListCache$(true, multiSelect).pipe(
        //     switchMap(search$));
    }

    /** Supprime tous les caches internes. Ils seront recréés à la première demande de la portion de la liste à afficher. */
    public invalidateCache(): void {
        // this._cache = {};
        // this.ensureChildrenProperties(this.items);
    }

    /** Efface la hauteur calculée des lignes en mode automatique */
    public invalidateRowsHeightCache(): void {
        // if (this._items) {
        //     this._items.forEach(item => item.size = undefined);
        // }
    }

    /** Usage interne. Retourne la portion de la liste à afficher en fonction des paramètres spécifiés. */
    // public getViewList$(searchField: string, query?: RegExp | string, ignoreCache?: boolean, ddStartIndex?: number, ddTargetIndex?: number, multiSelect?: boolean): Observable<ViewListResult<T>> {
    //     const result = {} as ViewListResult<T>;

    //     const queryChanged = (query?.toString()) !== (this._lastQuery?.toString());
    //     ignoreCache = ignoreCache || queryChanged || !this.items || !this.items.length;
    //     this._lastQuery = query;

    //     const escapeChars = (text: string) => {
    //         const specialChars = ['\\', '/', '|', '&', ';', '$', '%', '@', '"', '<', '>', '(', ')', '+'];
    //         specialChars.forEach(c => text = text.replace(c, `\\${c}`));
    //         return text;
    //     };

    //     // Check regexp validity
    //     // regExp.test(this.getTextValue(item));
    //     let regExp: RegExp;
    //     if (query) {
    //         if (typeof query === 'string') {
    //             try {
    //                 query = Diacritics.remove(query);
    //                 const escapedQuery = escapeChars(query);
    //                 regExp = new RegExp(escapedQuery, 'i');
    //             } catch (exc) {
    //                 console.log('Invalid search parameters');
    //             }
    //         } else {
    //             regExp = query;
    //             if (regExp.test === undefined) {
    //                 regExp = undefined;
    //             }
    //         }
    //     }

    //     const loadViewList = () => {
    //         let viewList: Item<T>[];
    //         if (ddStartIndex !== undefined && ddTargetIndex !== undefined && ddStartIndex !== ddTargetIndex) {
    //             if (!this._ddList) {
    //                 // Generate a modified flat list for drag and drop Only
    //                 this._ddList = [...this._cache.visibleList];

    //                 // Calc child count to be dragged
    //                 const draggedItem = this._ddList[ddStartIndex];
    //                 const parentDepth = draggedItem.depth;
    //                 let lastIndex = ddStartIndex;
    //                 if (parentDepth !== undefined) {
    //                     // eslint-disable-next-line no-loops/no-loops
    //                     for (let i = ddStartIndex + 1; i < this._ddList.length; i++) {
    //                         const curItem = this._ddList[i];
    //                         if (curItem.depth <= parentDepth) {
    //                             break;
    //                         }
    //                         lastIndex = i;
    //                     }
    //                 }
    //                 this._ddChildCount = lastIndex - ddStartIndex + 1;
    //                 this._ddCurrentIndex = ddStartIndex;
    //             }

    //             const removed = this._ddList.splice(this._ddCurrentIndex, this._ddChildCount);
    //             if (ddTargetIndex > this._ddCurrentIndex) {
    //                 ddTargetIndex -= this._ddChildCount;
    //                 ++ddTargetIndex;
    //             }
    //             this._ddCurrentIndex = ddTargetIndex;
    //             removed.forEach(itm => this._ddList.splice(ddTargetIndex++, 0, itm));
    //             viewList = this._ddList;

    //         } else {
    //             delete this._ddList;
    //             delete this._ddCurrentIndex;
    //             delete this._ddChildCount;
    //             viewList = this._cache.visibleList || [];
    //         }

    //         result.depthMax = this._cache.depthMax;
    //         result.visibleList = viewList;

    //         return result;
    //     };

    //     if (ignoreCache) {
    //         if (queryChanged || !this.items || !this.items.length) {
    //             this.internalQuery = regExp;
    //         }

    //         return this.getItemList$(query, this.selectedList).pipe(
    //             tap(items => {
    //                 if (!this.items || !this.items.length) {
    //                     this.ensureSelectedItems(items);
    //                 }

    //                 if (items !== this.items) {
    //                     // New item list, invalidate view cache
    //                     this.items = items;
    //                     // Be cause a new array was returned by getItemList, the list is considered as already filtered (Lazy loading)
    //                     this.internalQuery = undefined;
    //                     this.ensureChildrenProperties(items);
    //                 }

    //                 delete this._cache.visibleList;
    //             }),
    //             switchMap(() => this.ensureVisibleListCache$(searchField, this.internalQuery, queryChanged, multiSelect)),
    //             map(loadViewList));
    //     } else {
    //         return this.ensureVisibleListCache$(searchField, this.internalQuery, queryChanged, multiSelect).pipe(
    //             map(loadViewList));
    //     }
    // }

    /** Retourne la liste à utilise pour la création des caches. Surcharger cetee méthode pour fournir une liste de façon lazy.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param query Texte ou regular expression par laquelle la liste doit être filtrée.
     * @param selectedItems Liste des éléments sélectionnés.
     * @return Observable résolu par la fonction, qui retourne la liste à utiliser.
     */
    // protected getItemList$(query?: RegExp | string, selectedItems?: Item<T>[]): Observable<Item<T>[]> {
    //     return this.loadingItems$ ? this.loadingItems$(query, selectedItems) : of(this.items);
    // }

    /** Retourne une valeur indiquant si l'élément spécifié correspond aux critères de recherche spécifiés
     * @param item Elément à analyser.
     * @param searchField Nom du champ à utiliser pour la recherche. Le champ représenté peut-être une valeur ou une function.
     * @param regExp Expression de test sur le champs spécifié.
     * @return True si l'élément correspond aux critères de recherche.
     */
    // protected itemMatch(item: Item<T>, searchField: string, regExp: RegExp): boolean {
    //     const itmTree = item;
    //     if (itmTree.items) {
    //         return true;
    //     }
    //     const field = (<any>item)[searchField];
    //     const value = typeof field === 'function' ? field() : field || this.getTextValue(item, searchField);
    //     return value && regExp.test(Diacritics.remove(value));
    // }

    /** Retourne une liste groupée si un modèle de groupe interne est spécifié.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param items Liste des éléments à grouper.
     * @return Observable résolu par la fonction, qui retourne la liste groupés.
     */
    protected getGroupedList$(_items: Item<T>[]): void {
        // return items ? this.getGroupingService().group$(this.items, this.groupInfos, '$items') : of([]);
    }

    /** Retourne la liste des éléments visibles. Si la liste des éléments est hièrarchique, cette fonction retourne une liste plate. Cette liste est utilisé pour calculer la portion de la liste à afficher.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param items Liste des éléments à traiter.
     * @param searchField Nom du champ à utiliser pour la recherche. Le champ représenté peut-être une valeur ou une function.
     * @param regExp Expression de test à appliquer sur le champ de recherche.
     * @param Auto expand parents on search query.
     * @return Observable résolu par la fonction, qui retourne la liste visibles.
     */
    // protected getVisibleList$(items: Item<T>[], searchField: string, regExp: RegExp, expandTree: boolean, multiSelect: boolean): Observable<Item<T>[]> {
    //     if (!items) {
    //         return of([]);
    //     }

    //     let visibleList = [] as Item<T>[];
    //     const selectedList = [] as Item<T>[];
    //     let odd = false;

    //     if (regExp) {
    //         // Recalc visible list and select list from the filter
    //         const getFilteredList = (treeList: Item<T>[], depth: number, hidden: boolean) => {
    //             let filteredItems: Item<T>[];
    //             if (treeList) {
    //                 treeList.forEach(itm => {
    //                     const itmTree = itm;
    //                     if (itmTree.items) {
    //                         if (this.isVisible(itmTree) && this.itemMatch(itmTree, searchField, regExp)) {
    //                             odd = false;
    //                             const filteredChildren = getFilteredList(itmTree.items, depth + 1, hidden);
    //                             if (filteredChildren) {
    //                                 if (itmTree.collapsed && expandTree) {
    //                                     itmTree.collapsed = false;
    //                                 }
    //                                 filteredItems = !filteredItems ? ((itmTree.collapsed && [itmTree]) || [itmTree, ...filteredChildren]) : ((itmTree.collapsed && [...filteredItems, itmTree]) || [...filteredItems, itmTree, ...filteredChildren]);
    //                                 if (itmTree.selected) {
    //                                     selectedList.push(itmTree);
    //                                 }
    //                             }
    //                         }

    //                         // compare fn can be something like re.test(this.getTextValue(itm)
    //                     } else if (this.itemMatch(itm, searchField, regExp)) {
    //                         itmTree.depth = depth;
    //                         if (!filteredItems) {
    //                             filteredItems = [];
    //                         }
    //                         if (!hidden && this.isVisible(itm) && !(itm.selected && this.hideSelected)) {
    //                             // For style
    //                             itmTree.odd = odd;
    //                             odd = !odd;

    //                             filteredItems.push(itmTree);
    //                         }
    //                         if (itmTree.selected) {
    //                             selectedList.push(itmTree);
    //                         }
    //                     } else if (itmTree.selected) {
    //                         selectedList.push(itmTree);
    //                     }
    //                 });
    //             }

    //             return filteredItems;
    //         };

    //         visibleList = getFilteredList(items || [], 0, false) || [];

    //     } else {
    //         // Get visible items list without filter
    //         const getVisibleListInternal = (treeList: Item<T>[], depth: number, hidden: boolean) => {
    //             if (treeList) {
    //                 treeList.forEach(item => {
    //                     if (!hidden && this.isVisible(item) && !(item.selected && this.hideSelected)) {
    //                         // For style
    //                         item.odd = odd;
    //                         odd = !odd;

    //                         // Add to visible list only the visible items (uncollapsed)
    //                         visibleList.push(item);
    //                     }

    //                     // Add to selected list only the visible items (uncollapsed) and selected
    //                     if (item.selected) {
    //                         selectedList.push(item);
    //                     }

    //                     // Recursive call
    //                     if (item.items) {
    //                         odd = false;
    //                         getVisibleListInternal(item.items, depth + 1, hidden || item.collapsed || !this.isVisible(item));
    //                     }
    //                 });
    //             }
    //         };

    //         getVisibleListInternal(items, 0, false);
    //     }

    //     return of(visibleList).pipe(
    //         tap(() => {
    //             if (!multiSelect) {
    //                 this.selectedList = selectedList;
    //             }
    //         }));
    // }

    /** Retourne une liste plate depuis la liste originale sans hierarchie.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param items Liste des éléments hierarchique.
     * @return Observable résolu par la fonction, qui retourne la liste hierarchique mise à plat.
     */
    // protected getFlatList$(items: Item<T>[], isFiltered: boolean, multiSelect: boolean): Observable<Item<T>[]> {
    //     if (!items) {
    //         return of([]);
    //     }

    //     const visibleList = [] as Item<T>[];
    //     const selectedList = [] as Item<T>[];
    //     let depthMax = 0;
    //     let isTree = false;
    //     let odd = false;

    //     const flatList$: any = (itms: Item<T>[], depth: number, hidden: boolean) => from(itms || []).pipe(
    //         tap(item => {
    //             if (depth > depthMax) {
    //                 depthMax = depth;
    //             }

    //             // Fill system properties
    //             item.depth = depth;

    //             if (!hidden && this.isVisible(item) && !(item.selected && this.hideSelected)) {
    //                 // For style
    //                 item.odd = odd;
    //                 odd = !odd;

    //                 // Add to visible list only the visible items (uncollapsed)
    //                 visibleList.push(item);
    //             }

    //             // Add to selected list only the visible items (uncollapsed) and selected
    //             if (item.selected) {
    //                 selectedList.push(item);
    //             }
    //         }),
    //         switchMap(item => {
    //             if (item.items) {
    //                 isTree = true;
    //                 odd = false;
    //                 return concat(of(item), flatList$(item.items, depth + 1, hidden || item.collapsed));
    //             } else {
    //                 return of(item);
    //             }
    //         }));

    //     return flatList$(items, 0, false).pipe(
    //         tap(() => {

    //             if (!isFiltered) {
    //                 this._cache.visibleList = visibleList;
    //             }
    //             this._cache.depthMax = isTree ? depthMax : 0;
    //         }),
    //         reduce((acc: any[], cur: Item<T>) => {
    //             acc.push(cur);
    //             return acc;
    //         }, []));
    // }

    // private ensureVisibleListCache$(_searchField: string, _regExp: RegExp, _expandTree: boolean, _multiSelect: boolean) {
    // if (this._cache.visibleList?.length) {
    //     return of(this._cache.visibleList);
    // } else {
    //     return this.ensureFlatListCache$(!!regExp, multiSelect).pipe(
    //         switchMap(() => this.getVisibleList$(this._cache.groupedList, searchField, regExp, expandTree, multiSelect)),
    //         tap(visibleList => {
    //             /* if (this._cache.visibleList && this._cache.visibleList.length && this._cache.visibleList !== visibleList) {
    //              // New visible list
    //              // Nothing to do yet
    //              }*/

    //             this._cache.visibleList = visibleList;
    //             this._cache.rowsCount = visibleList.length;
    //         }));
    // }
    // }

    // private ensureFlatListCache$(_isFiltered: boolean, _multiSelect: boolean) {
    // if (this._cache.flatList?.length) {
    //     return of(this._cache.flatList);
    // } else {
    //     return this.ensureGroupedListCache$().pipe(
    //         switchMap(() => this.getFlatList$(this._cache.groupedList, isFiltered, multiSelect)),
    //         tap(flatList => {
    //             if (this._cache.flatList?.length && this._cache.flatList !== flatList) {
    //                 // New flat list
    //                 delete this._cache.visibleList;
    //                 this._cache.rowsCount = 0;

    //                 // Ensure depth max
    //                 this._cache.depthMax = 0;
    //                 if (flatList) {
    //                     flatList.forEach((item: Item<T>) => {
    //                         if (item.depth && item.depth > this._cache.depthMax) {
    //                             this._cache.depthMax = item.depth;
    //                         }
    //                     });
    //                 }
    //             }
    //             this._cache.flatList = flatList;
    //         }));
    // }
    // }

    // private ensureGroupedListCache$() {
    // if (this._cache.groupedList?.length) {
    //     return of(this._cache.groupedList);
    // } else if (!this.groupInfos || this.groupInfos.length === 0) {
    //     return of(this.items).pipe(
    //         tap(items => this._cache.groupedList = items));
    // } else if (this.items) {
    //     return this.getGroupedList$(this.items).pipe(
    //         tap(groupedList => {
    //             if (this._cache.groupedList?.length && this._cache.groupedList !== groupedList) {
    //                 // New grouped list
    //                 this.invalidateViewCache();
    //             }
    //             this._cache.groupedList = groupedList;
    //         }));
    // } else {
    //     return of([]);
    // }
    // }

    // private ensureChildrenProperties(items: Item<T>[]) {
    //     if (!items) {
    //         return;
    //     }

    //     items.forEach(item => {
    //         const field = (<any>item)[this.childrenField];
    //         if (field) {
    //             item.items = field;
    //             this.ensureChildrenProperties(item.items);
    //         }
    //     });
    // }

    protected compareItems = (item1: Item<T>, item2: Item<T>): boolean => {
        const isDefined = (value: any) => value !== undefined && value !== null;

        if (!isDefined(item1) || !isDefined(item2)) {
            return false;
        } else {
            const model1 = item1.model as unknown as Comparable<T>;
            const model2 = item1.model as unknown as Comparable<T>;
            if (model1?.equals) {
                return model1.equals(item2.model);
            } else if (model2?.equals) {
                return model2.equals(item1.model);
            } else if (item1.id && item2.id) {
                return item1.id === item2.id;
            } else {
                return item1.model === item2.model;
            }
        }
    };

    protected compareModels = (model1: T, model2: T, valueField: string): boolean => {
        const isDefined = (value: any) => value !== undefined && value !== null;

        if (!isDefined(model1) || !isDefined(model2)) {
            return false;
        } else if (model1 === model2) {
            return true;
        } else {
            const cmp1 = model1 as unknown as Comparable<T>;
            const cmp2 = model2 as unknown as Comparable<T>;
            if (cmp1?.equals) {
                return cmp1.equals(model2);
            } else if (cmp2?.equals) {
                return cmp2.equals(model1);
            } else if (valueField) {
                return this.extractValueField(model1, valueField) === this.extractValueField(model2, valueField);
            } else {
                return false;
            }
        }
    };

    protected extractValueField(model: T, field: string): unknown {
        const indexedModel = model as unknown as Record<string, unknown>;
        const fields = field.split('.');
        return fields.reduce((mdl, fld) => mdl[fld], indexedModel);
    }

    protected isVisible(item: Item<T>): boolean {
        return item.visible !== false;
    }
}

/** Structure de retour de getViewList. */
export interface ViewListResult<T> {
    depthMax?: number;
    visibleList?: Item<T>[];
}

/** Structure de retour de findNextMatch. */
export interface FindItemResult<T> {
    /** Elément trouvé. */
    item: Item<T>;
    /** Index de l'élément dans la liste des éléments visibles. */
    index: number;
}

/** Structure de retour de getParentListInfos. */
export interface ParentListInfoResult<T> {
    /** Elément parent. */
    parent?: Item<T>;
    /** Index de l'élément enfant dans la liste des enfants du parent. */
    index: number;
}

// interface FindItemsResult<T> {
//     list: Item<T>[];
//     index: number;
// }

interface Comparable<T> {
    equals(model: T): boolean;
}

interface RefreshSelectionParams<T> {
    toggle?: Item<T>[];
    selectItems?: Item<T>[] | 'all';
    checkSelectable?: boolean;
    selectParents?: boolean;
    unselectItems?: Item<T>[] | 'all';
    selectModels?: T[];
    selectValues?: string[];
}

export interface IndexedItem<T> extends Item<T>, Record<string, unknown> {
}
