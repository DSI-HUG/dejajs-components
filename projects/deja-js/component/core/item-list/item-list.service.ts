/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DiacriticService } from '@deja-js/component/core';
import { BehaviorSubject, concat, filter, from, iif, map, Observable, of, reduce, Subscriber, switchMap, tap } from 'rxjs';

import { IGroupInfo } from './grouping/group-infos';
import { GroupingService } from './grouping/grouping.service';
import { IItemBase } from './item-base';
import { IItemTree } from './item-tree';
import { ISortInfos } from './sorting/sort-infos.model';
import { SortingService } from './sorting/sorting.service';


/** Service de gestion des listes (deja-treelist, deja-select et deja-grid).
 * Ce service permet la gestion du viewport et la gestion des caches des listes.
 * Il peut-être surchargé pour faire du lazy loading ou du paging.
 */
export class ItemListService<T> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static defaultChildrenField = 'items';
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static defaultTextField = 'displayName';
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static defaultValueField = 'value';

    // Waiter
    private _waiter$ = new BehaviorSubject<boolean>(false);

    // Working item array (can be recursive)
    private _items: IItemBase<T>[];

    // Cache for lists (flat lists only, not recursive)
    private _cache = {} as {
        rowsCount?: number;
        depthMax?: number;
        groupedList?: IItemTree<T>[];
        flatList?: IItemBase<T>[];
        visibleList?: IItemBase<T>[];
    };

    // Selected items cache
    private selectedList: IItemBase<T>[];
    private _hideSelected: boolean;

    // Cache for last query. Flat list will be regenerated only if the query change
    private _lastQuery: RegExp | string;
    private internalQuery: RegExp;

    // Sorting
    private _sortingService: SortingService;

    // grouping
    private _groupInfos: IGroupInfo[];
    private _groupingService: GroupingService;

    // Cache for drag and drop (flat list modified by the current drag).
    private _ddList: IItemBase<T>[];
    private _ddCurrentIndex: number;
    private _ddChildCount: number;

    private _childrenField = ItemListService.defaultChildrenField;

    // Cnacelable pre events
    private loadingItems$: (query: string | RegExp, selectedItems: IItemBase<T>[]) => Observable<IItemBase<T>[]>;
    private selectingItem$: (item: IItemBase<T>) => Promise<IItemBase<T>> | Observable<IItemBase<T>>;
    private unselectingItem$: (item: IItemBase<T>) => Promise<IItemBase<T>> | Observable<IItemBase<T>>;
    private expandingItem$: (item: IItemTree<T>) => Promise<IItemTree<T>> | Observable<IItemTree<T>>;
    private collapsingItem$: (item: IItemTree<T>) => Promise<IItemTree<T>> | Observable<IItemTree<T>>;

    // champs à utiliser comme valeur de comparaison
    private _valueField: string;

    /** Evalue la valeur à comparer pour l'élément spécifié.
     * @param value  Model à évaluer.
     * @param valueField (optional) Champs à traiter comme valeur.
     * @return Valeur à comparer pour le modèle spécifié.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public static getItemValue(item: any, valueField?: string): unknown {
        // eslint-disable-next-line eqeqeq
        const isDefined = (value: any): boolean => value != undefined;

        if (valueField) {
            const fields = valueField.split('.');
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            let model = item.model?.[fields[0]] !== undefined ? item.model : item;
            fields.forEach(fieldName => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                model = model?.[fieldName];
            });
            if (isDefined(model)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                return typeof model === 'function' ? model() : model;
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return isDefined(item.value) ? item.value : (isDefined(item.model) && item.model) || item;
    }

    /** Evalue le texte à afficher pour l'élément spécifié.
     * @param value  Model à évaluer.
     * @param textField (optional) Champs à traiter comme source du texte.
     * @return Texte à afficher pour le modèle spécifié.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public static getItemText(value: any, textField?: string): string {
        if (value) {
            if (textField) {
                const fields = textField.split('.');
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                let model = value.model?.[fields[0]] !== undefined ? value.model : value;
                fields.forEach(fieldName => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                    model = model?.[fieldName];
                });
                if (model !== undefined) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    return typeof model === 'function' ? model() : model;
                }
                return '';
            }

            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (value.displayName) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                return typeof value.displayName === 'string' ? value.displayName : value.displayName();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            } else if (typeof value.toString === 'function') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                return value.toString();
            }
        }
        return '';
    }

    public get lastQuery(): RegExp | string {
        return this._lastQuery;
    }

    /**
     * Set a observable called before the list will be displayed
     */
    public setLoadingItems(fn: (query: string | RegExp, selectedItems: IItemBase<T>[]) => Observable<IItemBase<T>[]>): void {
        this.loadingItems$ = fn;
    }

    /**
     * Set a promise or an observable called before an item selection
     */
    public setSelectingItem(fn: (item: IItemBase<T>) => Promise<IItemBase<T>> | Observable<IItemBase<T>>): void {
        this.selectingItem$ = fn;
    }

    /**
     * Set a promise or an observable called before an item deselection
     */
    public setUnselectingItem(fn: (item: IItemBase<T>) => Promise<IItemBase<T>> | Observable<IItemBase<T>>): void {
        this.unselectingItem$ = fn;
    }

    /**
     * Set a promise or an observable called before an item expand
     */
    public setExpandingItem(fn: (item: IItemTree<T>) => Promise<IItemTree<T>> | Observable<IItemTree<T>>): void {
        this.expandingItem$ = fn;
    }

    /**
     * Set a promise or an observable called before an item collapse
     */
    public setCollapsingItem(fn: (item: IItemTree<T>) => Promise<IItemTree<T>> | Observable<IItemTree<T>>): void {
        this.collapsingItem$ = fn;
    }

    /**
     * Permet de controler l'affichage du waiter
     * @return un sujet contenant la valeur du waiter
     */
    public get waiter$(): BehaviorSubject<boolean> {
        return this._waiter$;
    }

    /** Définit le champs utilisé comme collection pour les enfants d'un parent.
     * @param value Nom du champ à utiliser comme collection d'enfants
     */
    public set childrenField(value: string) {
        this._childrenField = value || ItemListService.defaultChildrenField;
        this.invalidateCache();
    }

    /** Renvoie le champs utilisé comme collection pour les enfants d'un parent
     * @return value Nom du champ à utilisé comme collection d'enfants.
     */
    public get childrenField(): string {
        return this._childrenField;
    }

    /** Définit une valeur indiquant si les éléments selectionés doivent être masqué. Ce flag est principalement utilisé dans le cas d'un multi-select
     * @param value True si les éléments selectionés doivent être masqués
     */
    public set hideSelected(value: boolean) {
        this._hideSelected = value;
    }

    /** Renvoie une valeur indiquant si les éléments selectionés doivent être masqué.
     * @return value True si les éléments selectionés sont masqués
     */
    public get hideSelected(): boolean {
        return this._hideSelected;
    }

    /** Définit le champs à utiliser comme valeur de comparaison */
    public set valueField(valueField: string) {
        this._valueField = valueField;
    }

    /** Renvoie le champs à utiliser comme valeur de comparaison */
    public get valueField(): string {
        return this._valueField;
    }

    public get hasCache(): boolean {
        return this._cache && !!this._cache.visibleList;
    }

    private set items(items: IItemBase<T>[]) {
        this._items = items;
        this.invalidateCache();
    }

    private get items(): IItemBase<T>[] {
        return this._items;
    }

    /** Définit le modèle utilisé par la liste. Ce model peut ètre hierarchique sans limitation de la profondeur ou une chargé en asynchrone par une promise ou un observable.
     * @param items Provider de la liste des éléments de la liste.
     */
    // eslint-disable-next-line rxjs/finnish
    public setItems$(items: IItemBase<T>[] | Promise<IItemBase<T>[]> | Observable<IItemBase<T>[]>): Observable<unknown> {
        if (!items) {
            this.items = undefined;
            return of(null);
        } else if (items instanceof Array) {
            this.ensureChildrenProperties(items);
            this.ensureSelectedItems(items);
            this.items = items;
            this._waiter$.next(false);
            return of(items);
        } else {
            this.items = undefined;
            this._waiter$.next(true);
            let observable$ = items as Observable<IItemBase<T>[]>;
            if (observable$.subscribe === undefined) {
                const promise = items as Promise<IItemBase<T>[]>;
                observable$ = from(promise);
            }

            return observable$.pipe(
                map(its => {
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
                })
            );
        }
    }

    // eslint-disable-next-line rxjs/finnish
    public setModels$(items: any[] | Promise<any[]> | Observable<any[]>): Observable<unknown> {
        return this.setItems$(items);
    }

    /** Renvoie le modèle de grouping ajouté à la liste de base par le service. Ce modèle ne modifie pas la donée, mais est jsute ajouté à l'affichage
     * @return value Modèle de grouping d'affichage de la liste.
     */
    public get groupInfos(): IGroupInfo[] {
        return this._groupInfos;
    }

    // Ne pas utiliser, cette fonction retourne la liste des éléments pour l'implémentation de ngModel.
    public getItems(): IItemBase<T>[] {
        return this.items;
    }

    /** Retourne l'élément corresondant à l'index spéficié dans la liste des éléments visibles.
     * @param index Index de l'élément à chercher sur la liste des éléments visibles.
     * @return Element correspondant à l'index recherché.
     */
    public getItemFromIndex(index: number): IItemBase<T> {
        return this._cache.visibleList ? this._cache.visibleList[index] : null;
    }

    /** Retourne l'index correspondant à l'élément spéficié dans la liste des éléments visibles
     * @param item Element à chercher sur la liste des éléments visibles.
     * @return Index correspondant à l'élément recherché.
     */
    public getItemIndex(item: IItemBase<T>): number {
        return this._cache.visibleList ? this._cache.visibleList.findIndex(itm => this.compareItems(item, itm)) : -1;
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

    /** Evalue le texte à afficher pour l'élément spécifié.
     * @param value  Model à évaluer.
     * @param textField (optional) Champs à traiter comme source du texte.
     * @return Texte à afficher pour le modèle spécifié.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public getTextValue(value: any, textField?: string): string {
        return ItemListService.getItemText(value, textField);
    }

    /** Evalue la valeur à comparer pour l'élément spécifié.
     * @param value  Model à évaluer.
     * @param valueField (optional) Champs à traiter comme valeur.
     * @return Valeur à comparer pour le modèle spécifié.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public getValue(item: any, valueField?: string): unknown {
        return ItemListService.getItemValue(item, valueField);
    }

    /** Usage interne. Termine le drag and drop en cours. */
    public drop$(): Observable<boolean> {
        return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
            if (!this._ddList || !this.items) {
                subscriber.next(false);
                return undefined;
            }

            const listIndex = this._ddCurrentIndex;
            const item = this._ddList[listIndex] as IItemTree<T>;
            if (!item) {
                throw new Error('invalid drag infos stored in cache.');
            }

            // La drag and drop liste est incomplète, en cas de filtrage, retrouver l'élément juste en dessus dans la liste complète
            const targetItem = this._ddList[listIndex - 1];
            let targetParent: IItemTree<T>;

            // Find target in the flat list to calculate the correct index
            let flatListIndex = this._cache.flatList.findIndex(itm => itm === targetItem);
            let targetIndex = 0;
            // eslint-disable-next-line no-loops/no-loops
            while (flatListIndex >= 0) {
                const parentItem = this._cache.flatList[flatListIndex] as IItemTree<T>;
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

            const findItem = (itemToFind: IItemTree<T>, treeList: IItemTree<T>[]): IFindItemsResult<T> => {
                // eslint-disable-next-line no-loops/no-loops
                for (let i = 0; i < treeList.length; i++) {
                    const itm = treeList[i];
                    if (itm === itemToFind) {
                        return {
                            index: i,
                            list: treeList
                        };
                    } else if (itm.$items !== undefined) {
                        const result = findItem(itemToFind, itm.$items);
                        if (result) {
                            return result;
                        }
                    }
                }

                return undefined;
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
            return undefined;
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

            const item = currentList[startIndex] as IItemTree<T>;
            const dragDropIndex = startIndex;

            if (item.depth !== undefined && targetIndex !== startIndex) {
                if (targetIndex < startIndex) {
                    // Remonte jusqu'au premier élément avec une profondeur plus grande
                    let beforeIndex = 0;
                    // eslint-disable-next-line no-loops/no-loops
                    for (let b = startIndex - 1; b >= 0; b--) {
                        const targetItem = currentList[b] as IItemTree<T>;
                        if (targetItem.depth <= item.depth) {
                            beforeIndex = b;
                            break;
                        }
                    }
                    if (targetIndex <= beforeIndex) {
                        // Descend jusqu'au premier élément avec la même profondeur
                        // eslint-disable-next-line no-loops/no-loops
                        for (let a = targetIndex; a <= beforeIndex; a++) {
                            const targetItem = currentList[a] as IItemTree<T>;
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
                        const targetItem = currentList[a] as IItemTree<T>;
                        if (targetItem.depth <= item.depth) {
                            afterIndex = a;
                            break;
                        }
                    }
                    if (targetIndex >= afterIndex) {
                        // Descend jusqu'au premier élément avec la même profondeur
                        // eslint-disable-next-line no-loops/no-loops
                        for (let a = targetIndex + 1; a < currentList.length; a++) {
                            const itm = currentList[a] as IItemTree<T>;
                            if (itm.depth === item.depth) {
                                subscriber.next(a);
                                return;
                            } else if (itm.depth === item.depth - 1) {
                                subscriber.next(a - 1);
                                return;
                            }
                        }
                        // Not found
                        const targetItem = currentList[afterIndex] as IItemTree<T>;
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
     * @param collapsed True si les éléments doivent être réduits.
     * @return Observable résolu par la fonction.
     */
    public toggleAll$(collapsed: boolean): Observable<IItemTree<T>[]> {
        return of(this._cache.flatList).pipe(
            map((items: IItemTree<T>[]) => items.filter(item => item.$items && (item.collapsible ?? true))),
            tap(() => delete this._cache.visibleList), // Invalidate view cache
            switchMap(items => collapsed ? this.collapseItems$(items) : this.expandItems$(items)));
    }

    /** Change l'état d'expansion de l'élément spécifié par son index sur la liste des éléments visibles.
     * @param index Index sur la liste des éléments visibles de l'élément à changer.
     * @param collapse Etat de l'élément. True pour réduire l'élément.
     * @return Observable résolu par la fonction.
     */
    public toggleCollapse$(index: number, collapse?: boolean): Observable<IItemTree<T>> {
        const visibleList = this._cache.visibleList;
        if (!visibleList || !visibleList.length) {
            throw new Error('Empty cache on toggleCollapse');
        }

        const item = visibleList[index] as IItemTree<T>;
        if (!item || !(item.collapsible ?? true)) {
            return of([]);
        }

        const collapsed = collapse !== undefined ? collapse : !item.collapsed;
        return collapsed ? this.collapseItem$(item) : this.expandItem$(item);
    }

    /** Etends les éléments spécifiés.
     * @param items Liste des éléments à étendre.
     * @return Observable résolu par la fonction.
     */
    public expandItems$(items: IItemBase<T>[]): Observable<IItemBase<T>[]> {
        return from(items || []).pipe(
            switchMap(item => this.expandItem$(item)),
            reduce((acc, cur) => [...acc, cur], [] as IItemBase<T>[]));
    }

    /** Reduits les éléments spécifiés.
     * @param items Liste des éléments à réduire.
     * @return Observable résolu par la fonction.
     */
    public collapseItems$(items: IItemBase<T>[]): Observable<IItemBase<T>[]> {
        return from(items || []).pipe(
            switchMap(item => this.collapseItem$(item)),
            reduce((acc, cur) => [...acc, cur], [] as IItemBase<T>[]));
    }

    /** Etends l'élément spécifié.
     * @param items Eléments à étendre.
     * @return Observable résolu par la fonction.
     */
    public expandItem$(item: IItemTree<T>): Observable<IItemTree<T>> {
        return of(item).pipe(
            filter(itm => !!itm),
            switchMap(itm => this.expandingItem$ ? this.expandingItem$(itm) : of(itm)),
            filter(itm => !!itm),
            tap(itm => {
                itm.collapsed = false;
                // Invalidate view cache
                delete this._cache.visibleList;
            }));
    }

    /** Réduit l'élément spécifié.
     * @param items Eléments à réduire.
     * @return Observable résolu par la fonction.
     */
    public collapseItem$(item: IItemTree<T>): Observable<IItemTree<T>> {
        return of(item).pipe(
            filter(itm => !!itm),
            switchMap(itm => this.collapsingItem$ ? this.collapsingItem$(itm) : of(itm)),
            filter(itm => !!itm),
            tap(itm => {
                itm.collapsed = true;
                // Invalidate view cache
                delete this._cache.visibleList;
            }));
    }

    /** Retourne la liste des éléments sélectionés.
     * @return Liste des éléments selectionés.
     */
    public getSelectedItems(): IItemBase<T>[] {
        return this.selectedList || [];
    }

    /** Définit la liste des éléments sélectionés.
     * @param items Liste des éléments a selectioner.
     */
    public setSelectedItems(items: IItemBase<T>[]): void {
        if (this.selectedList) {
            this.selectedList.forEach(item => {
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
     * @return Observable résolu par la fonction.
     */
    public unselectAll$(): Observable<IItemBase<T>[]> {
        if (this.hideSelected) {
            delete this._cache.visibleList;
        }

        const selectedList = this.selectedList;
        this.selectedList = [];

        return this.unSelectItems$(selectedList);
    }

    /** Sélectionne une plage d'éléments en fonction de l'index de début et l'index de fin sur la liste des éléments visibles.
     * @param indexFrom index sur la liste des éléments visibles du premier élément à sélectioner.
     * @param indexTo index sur la liste des éléments visibles du dernier élément à sélectioner.
     * @return Observable résolu par la fonction.
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

        return this.unselectAll$().pipe(
            map(() => visibleList.slice(Math.min(indexFrom, indexTo), 1 + Math.max(indexFrom, indexTo))),
            map(items => items.filter(itm => itm.selectable ?? true)),
            tap(() => {
                if (this.hideSelected) {
                    delete this._cache.visibleList;
                }
            }),
            switchMap(items => this.selectItems$(items).pipe(map(selected => selected.length))));
    }

    /** Change l'état de selection de l'élément spécifié.
     * @param items Liste des éléments à modifier.
     * @param selected True si les éléments divent être sélectionés, False si ils doivent être déselectionés.
     * @return Observable résolu par la fonction.
     */
    public toggleSelect$(items: IItemBase<T>[], selected: boolean): Observable<IItemBase<T>[]> {
        items = items || [];
        return iif(() => selected, this.selectItems$(items), this.unSelectItems$(items)).pipe(
            map(() => {
                if (this.hideSelected) {
                    delete this._cache.visibleList;
                }
                return this.selectedList;
            }));
    }

    /** Sélectionne les éléments spécifiés
     * @param items Liste des éléments à sélectioner.
     * @return Observable résolu par la fonction.
     */
    public selectItems$(items: IItemBase<T>[]): Observable<IItemBase<T>[]> {
        return from(items || []).pipe(
            switchMap(item => this.selectItem$(item)),
            reduce((acc: IItemBase<T>[], cur: IItemBase<T>) => [...acc, cur], []));
    }

    /** Déselectionne les éléments spécifiés
     * @param items Liste des éléments à déselectioner.
     * @return Observable résolu par la fonction.
     */
    public unSelectItems$(items: IItemBase<T>[]): Observable<IItemBase<T>[]> {
        return from(items || []).pipe(
            filter(item => item.selected),
            switchMap(item => this.unSelectItem$(item)),
            reduce((acc: IItemBase<T>[], cur: IItemBase<T>) => [...acc, cur], []));
    }

    /** Sélectionne l'élément spécifié
     * @param item Elément à sélectioner.
     * @return Observable résolu par la fonction.
     */
    public selectItem$(item: IItemBase<T>): Observable<IItemBase<T>> {
        return of(item).pipe(
            filter(itm => !!itm),
            switchMap(itm => this.selectingItem$ ? this.selectingItem$(itm) : of(itm)),
            filter(itm => !!itm),
            tap(itm => {
                if (!this.selectedList) {
                    this.selectedList = [];
                }

                itm.selected = true;
                this.selectedList.push(itm);
            }));
    }

    /** Déselectionne l'élément spécifié
     * @param item Elément à déselectioner.
     * @return Observable résolu par la fonction.
     */
    public unSelectItem$(item: IItemBase<T>): Observable<IItemBase<T>> {
        return of(item).pipe(
            filter(itm => !!itm),
            switchMap(itm => this.unselectingItem$ ? this.unselectingItem$(itm) : of(itm)),
            filter(itm => !!itm),
            tap(itm => {
                itm.selected = false;
                if (this.selectedList?.length) {
                    const index = this.selectedList.findIndex(i => this.compareItems(i, itm));
                    if (index >= 0) {
                        this.selectedList.splice(index, 1);
                    }
                }
            }));
    }

    /** Trouve l'élément suivant répondant à la fonction de comparaison spécifiée.
     * @param compare Function de comparaison pour la recherche de l'élément.
     * @param startIndex Index de départ sur la liste des éléments visibles.
     * @return Observable résolu par la fonction.
     */
    public findNextMatch$(compare?: (item: IItemBase<T>, index: number) => boolean, startIndex?: number): Observable<IFindItemResult<T>> {
        let result = { index: -1 } as IFindItemResult<T>;

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
                    } as IFindItemResult<T>;
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
    public sort$(sortInfos: ISortInfos): Observable<IItemTree<T>[]> {
        if (!this.items) {
            throw new Error('No Items');
        }

        const sortTree$ = this.getSortingService()
            .sortTree$(this._cache.groupedList, sortInfos, '$items').pipe(
                tap((sortedList: IItemTree<T>[]) => {
                    this._cache.groupedList = sortedList;
                    this.invalidateViewCache();
                }));

        if (!this._cache.groupedList || this._cache.groupedList.length === 0) {
            return this.getGroupedList$(this.items).pipe(
                tap(groupedList => this._cache.groupedList = groupedList),
                switchMap(() => sortTree$));
        } else {
            return sortTree$;
        }
    }

    /** Groupe les éléments en fonction du modèle de groupe spécifié
     * @param groupInfos Modèle de groupe à appliquer.
     * @return Observable résolu par la fonction.
     */
    public group$(groupInfos: IGroupInfo[]): Observable<IGroupInfo[]> {
        this._groupInfos = groupInfos;
        this.invalidateCache();
        this.ensureChildrenProperties(this.items);
        return of(groupInfos);
    }

    /** Retire les groupe correspondants au modèle de groupe spécifié
     * @param groupInfos Modèle de groupe à retirer.
     * @return Observable résolu par la fonction.
     */
    public ungroup$(groupInfo: IGroupInfo): Observable<IGroupInfo> {
        const groupIndex = this._groupInfos ? this._groupInfos.findIndex(gi => gi.groupByField === groupInfo.groupByField) : -1;
        if (groupIndex >= 0) {
            this._groupInfos.splice(groupIndex, 1);
        }

        this.invalidateCache();
        this.ensureChildrenProperties(this.items);
        return of(groupInfo);
    }

    /** Retrouve les informations du parent de l'élément spécifié
     * @param item Element enfant du parent à retrouver.
     * @return Observable résolu par la fonction, qui retourne les informations sur le parent de l'élément spécifié
     */
    public getParentListInfos$(item: IItemTree<T>, multiSelect: boolean): Observable<IParentListInfoResult<T>> {
        const search$ = (flatList: IItemBase<T>[]): Observable<IParentListInfoResult<T>> => {
            let flatIndex = flatList.findIndex(itm => itm === item);
            if (flatIndex < 0) {
                throw new Error('Item not found.');
            }

            let result: IParentListInfoResult<T>;
            if (!item.depth) {
                const rootIndex = this.items.findIndex(itm => itm === item);
                result = {
                    index: rootIndex
                } as IParentListInfoResult<T>;
            } else {
                // Search parent and treeindex
                let idx = 0;
                // eslint-disable-next-line no-loops/no-loops
                while (--flatIndex >= 0) {
                    const parentItem = flatList[flatIndex] as IItemTree<T>;
                    if (parentItem.depth < item.depth) {
                        result = {
                            index: idx,
                            parent: parentItem
                        } as IParentListInfoResult<T>;
                    }
                    idx++;
                }
            }

            return of(result);
        };

        return this.ensureFlatListCache$(true, multiSelect).pipe(
            switchMap(search$));
    }

    /** Supprime tous les caches internes. Ils seront recréés à la première demande de la portion de la liste à afficher. */
    public invalidateCache(): void {
        this._cache = {};
        this.ensureChildrenProperties(this.items);
    }

    /** Efface la hauteur calculée des lignes en mode automatique */
    public invalidateRowsHeightCache(): void {
        if (this._items) {
            this._items.forEach(item => item.size = undefined);
        }
    }

    /** Usage interne. Retourne la portion de la liste à afficher en fonction des paramètres spécifiés. */
    public getViewList$(searchField: string, query?: RegExp | string, ignoreCache?: boolean, ddStartIndex?: number, ddTargetIndex?: number, multiSelect?: boolean): Observable<IViewListResult<T>> {
        const result = {} as IViewListResult<T>;

        const queryChanged = (query?.toString()) !== (this._lastQuery?.toString());
        ignoreCache = ignoreCache || queryChanged || !this.items || !this.items.length;
        this._lastQuery = query;

        const escapeChars = (text: string): string => {
            const specialChars = ['\\', '/', '|', '&', ';', '$', '%', '@', '"', '<', '>', '(', ')', '+'];
            specialChars.forEach(c => text = text.replace(c, `\\${c}`));
            return text;
        };

        // Check regexp validity
        // regExp.test(this.getTextValue(item));
        let regExp: RegExp;
        if (query) {
            if (typeof query === 'string') {
                try {
                    query = (new DiacriticService).remove(query);
                    const escapedQuery = escapeChars(query);
                    regExp = new RegExp(escapedQuery, 'i');
                } catch (exc) {
                    console.log('Invalid search parameters');
                }
            } else {
                regExp = query;
                if (regExp.test === undefined) {
                    regExp = undefined;
                }
            }
        }

        const loadViewList = (): IViewListResult<T> => {
            let viewList: IItemBase<T>[];
            if (ddStartIndex !== undefined && ddTargetIndex !== undefined && ddStartIndex !== ddTargetIndex) {
                if (!this._ddList) {
                    // Generate a modified flat list for drag and drop Only
                    this._ddList = [...this._cache.visibleList];

                    // Calc child count to be dragged
                    const draggedItem = this._ddList[ddStartIndex] as IItemTree<T>;
                    const parentDepth = draggedItem.depth;
                    let lastIndex = ddStartIndex;
                    if (parentDepth !== undefined) {
                        // eslint-disable-next-line no-loops/no-loops
                        for (let i = ddStartIndex + 1; i < this._ddList.length; i++) {
                            const curItem = this._ddList[i] as IItemTree<T>;
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
                removed.forEach(itm => this._ddList.splice(ddTargetIndex++, 0, itm));
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

            if (queryChanged || !this.items || !this.items.length) {
                this.internalQuery = regExp;
            }

            return this.getItemList$(query, this.selectedList).pipe(
                tap(items => {
                    if (!this.items || !this.items.length) {
                        this.ensureSelectedItems(items);
                    }

                    if (items !== this.items) {
                        // New item list, invalidate view cache
                        this.items = items;
                        // Be cause a new array was returned by getItemList, the list is considered as already filtered (Lazy loading)
                        this.internalQuery = undefined;
                        this.ensureChildrenProperties(items);
                    }

                    delete this._cache.visibleList;
                    this.waiter$.next(this.items === undefined);
                }),
                switchMap(() => this.ensureVisibleListCache$(searchField, this.internalQuery, queryChanged, multiSelect)),
                map(loadViewList));
        } else {
            return this.ensureVisibleListCache$(searchField, this.internalQuery, queryChanged, multiSelect).pipe(
                map(loadViewList));
        }
    }

    public ensureSelection(): IItemBase<T> {
        return this.ensureSelectedItems(this.items);
    }

    /** Retourne la liste à utilise pour la création des caches. Surcharger cetee méthode pour fournir une liste de façon lazy.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param query Texte ou regular expression par laquelle la liste doit être filtrée.
     * @param selectedItems Liste des éléments selectionés.
     * @return Observable résolu par la fonction, qui retourne la liste à utiliser.
     */
    protected getItemList$(query?: RegExp | string, selectedItems?: IItemBase<T>[]): Observable<IItemBase<T>[]> {
        return this.loadingItems$ ? this.loadingItems$(query, selectedItems) : of(this.items);
    }

    /** Retourne une valeur indiquant si l'élément spécifié correspond aux critères de recherche spécifiés
     * @param item Elément à analyser.
     * @param searchField Nom du champ à utiliser pour la recherche. Le champ représenté peut-être une valeur ou une function.
     * @param regExp Expression de test sur le champs spécifié.
     * @return True si l'élément correspond aux critères de recherche.
     */
    protected itemMatch(item: IItemBase<T>, searchField: string, regExp: RegExp): boolean {
        const itmTree = item as IItemTree<T>;
        if (itmTree.$items) {
            return true;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const field = (<any>item)[searchField];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const value = typeof field === 'function' ? field() : field || this.getTextValue(item, searchField);
        return value && regExp.test((new DiacriticService).remove(value as string));
    }

    /** Retourne une liste groupée si un modèle de groupe interne est spécifié.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param items Liste des éléments à grouper.
     * @return Observable résolu par la fonction, qui retourne la liste groupés.
     */
    protected getGroupedList$(items: IItemBase<T>[]): Observable<IItemTree<T>[]> {
        return items ? this.getGroupingService().group$(this.items, this.groupInfos, '$items') : of([]);
    }

    /** Retourne la liste des éléments visibles. Si la liste des éléments est hièrarchique, cette fonction retourne une liste plate. Cette liste est utilisé pour calculer la portion de la liste à afficher.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param items Liste des éléments à traiter.
     * @param searchField Nom du champ à utiliser pour la recherche. Le champ représenté peut-être une valeur ou une function.
     * @param regExp Expression de test à appliquer sur le champ de recherche.
     * @param Auto expand parents on search query.
     * @return Observable résolu par la fonction, qui retourne la liste visibles.
     */
    protected getVisibleList$(items: IItemBase<T>[], searchField: string, regExp: RegExp, expandTree: boolean, multiSelect: boolean): Observable<IItemBase<T>[]> {
        if (!items) {
            return of([]);
        }

        let visibleList = [] as IItemTree<T>[];
        const selectedList = [] as IItemBase<T>[];
        let odd = false;

        if (regExp) {
            // Recalc visible list and select list from the filter
            const getFilteredList = (treeList: IItemBase<T>[], depth: number, hidden: boolean): IItemTree<T>[] => {
                let filteredItems: IItemBase<T>[];
                if (treeList) {
                    treeList.forEach(itm => {
                        const itmTree = itm as IItemTree<T>;
                        if (itmTree.$items) {
                            if (this.isVisible(itmTree) && this.itemMatch(itmTree, searchField, regExp)) {
                                odd = false;
                                const filteredChildren = getFilteredList(itmTree.$items, depth + 1, hidden);
                                if (filteredChildren) {
                                    if (itmTree.collapsed && expandTree) {
                                        itmTree.collapsed = false;
                                    }
                                    filteredItems = !filteredItems ? ((itmTree.collapsed && [itmTree]) || [itmTree, ...filteredChildren]) : ((itmTree.collapsed && [...filteredItems, itmTree]) || [...filteredItems, itmTree, ...filteredChildren]);
                                    if (itmTree.selected) {
                                        selectedList.push(itmTree);
                                    }
                                }
                            }

                            // compare fn can be something like re.test(this.getTextValue(itm)
                        } else if (this.itemMatch(itm, searchField, regExp)) {
                            itmTree.depth = depth;
                            if (!filteredItems) {
                                filteredItems = [];
                            }
                            if (!hidden && this.isVisible(itm) && !(itm.selected && this.hideSelected)) {
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
            const getVisibleListInternal = (treeList: IItemTree<T>[], depth: number, hidden: boolean): void => {
                if (treeList) {
                    treeList.forEach(item => {
                        if (!hidden && this.isVisible(item) && !(item.selected && this.hideSelected)) {
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
                            getVisibleListInternal(item.$items, depth + 1, hidden || item.collapsed || !this.isVisible(item));
                        }
                    });
                }
            };

            getVisibleListInternal(items, 0, false);
        }

        return of(visibleList).pipe(
            tap(() => {
                if (!multiSelect) {
                    this.selectedList = selectedList;
                }
            }));
    }

    /** Retourne une liste plate depuis la liste originale sans hierarchie.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param items Liste des éléments hierarchique.
     * @return Observable résolu par la fonction, qui retourne la liste hierarchique mise à plat.
     */
    protected getFlatList$(items: IItemBase<T>[], isFiltered: boolean, multiSelect: boolean): Observable<IItemBase<T>[]> {
        if (!items) {
            return of([]);
        }

        const visibleList = [] as IItemBase<T>[];
        const selectedList = [] as IItemBase<T>[];
        let depthMax = 0;
        let isTree = false;
        let odd = false;

        const flatList$ = (itms: IItemTree<T>[], depth: number, hidden: boolean): Observable<IItemBase<T>> => from(itms || []).pipe(
            tap(item => {
                if (depth > depthMax) {
                    depthMax = depth;
                }

                // Fill system properties
                item.depth = depth;

                if (!hidden && this.isVisible(item) && !(item.selected && this.hideSelected)) {
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
            }),
            switchMap(item => {
                if (item.$items) {
                    isTree = true;
                    odd = false;
                    return concat(of(item), flatList$(item.$items, depth + 1, hidden || item.collapsed));
                } else {
                    return of(item);
                }
            }));

        return flatList$(items, 0, false).pipe(
            tap(() => {
                if (!multiSelect) {
                    this.selectedList = selectedList;
                }

                if (!isFiltered) {
                    this._cache.visibleList = visibleList;
                }
                this._cache.depthMax = isTree ? depthMax : 0;
            }),
            reduce((acc: any[], cur: IItemBase<T>) => {
                acc.push(cur);
                return acc;
            }, []));
    }

    /** Efface une partie des caches  */
    protected invalidateViewCache(): void {
        delete this._cache.flatList;
        delete this._cache.visibleList;
        delete this._cache.depthMax;
        this._cache.rowsCount = 0;
    }

    private ensureSelectedItems(items: IItemBase<T>[]): IItemBase<T>[] {
        if (this.selectedList && this.selectedList.length > 0) {
            // Ensure selected flag
            this.selectedList.forEach(item => item.selected = true);

            if (!items) {
                return this.selectedList;
            }

            const newSelectedList = [] as IItemBase<T>[];
            const ensureSelectedChildren = (children: IItemTree<T>[]): void => {
                children.forEach(item => {
                    const selectedItem = this.selectedList.find(selected => this.compareItems(selected, item));
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
            this.selectedList.filter(item => item.selected).forEach(item => newSelectedList.push(item));

            this.selectedList = newSelectedList;

            // Ensure selected flag for the new items
            this.selectedList.forEach(item => item.selected = true);

        } else {
            this.selectedList = [];

            if (!items) {
                return this.selectedList;
            }

            const ensureSelectedChildren = (children: IItemTree<T>[]): void => {
                children.forEach(item => {
                    if (item.selected) {
                        this.selectedList.push(item);
                    }
                    if (item.$items) {
                        ensureSelectedChildren(item.$items);
                    }
                });
            };

            ensureSelectedChildren(items);
        }

        return this.selectedList;
    }

    private compareItems = (item1: IItemBase<T>, item2: IItemBase<T>): boolean => {
        // eslint-disable-next-line eqeqeq
        const isDefined = (value: IItemBase<T>): boolean => value != undefined;

        if (!isDefined(item1) || !isDefined(item2)) {
            return false;
        } else if (item1.equals) {
            return item1.equals(item2);
        } else if (item2.equals) {
            return item2.equals(item1);
        } else {
            const model1 = item1.model as IItemBase<unknown>;
            const model2 = item1.model as IItemBase<unknown>;
            if (model1?.equals) {
                return model1.equals(item2.model);
            } else if (model2?.equals) {
                return model2.equals(item1.model);
            } else {
                return this.getValue(item1, this._valueField) === this.getValue(item2, this._valueField);
            }
        }
    };

    private ensureVisibleListCache$(searchField: string, regExp: RegExp, expandTree: boolean, multiSelect: boolean): Observable<IItemBase<T>[]> {
        if (this._cache.visibleList?.length) {
            return of(this._cache.visibleList);
        } else {
            return this.ensureFlatListCache$(!!regExp, multiSelect).pipe(
                switchMap(() => this.getVisibleList$(this._cache.groupedList, searchField, regExp, expandTree, multiSelect)),
                tap(visibleList => {
                    /* if (this._cache.visibleList && this._cache.visibleList.length && this._cache.visibleList !== visibleList) {
                     // New visible list
                     // Nothing to do yet
                     }*/

                    this._cache.visibleList = visibleList;
                    this._cache.rowsCount = visibleList.length;
                }));
        }
    }

    private ensureFlatListCache$(isFiltered: boolean, multiSelect: boolean): Observable<IItemBase<T>[]> {
        if (this._cache.flatList?.length) {
            return of(this._cache.flatList);
        } else {
            return this.ensureGroupedListCache$().pipe(
                switchMap(() => this.getFlatList$(this._cache.groupedList, isFiltered, multiSelect)),
                tap(flatList => {
                    if (this._cache.flatList?.length && this._cache.flatList !== flatList) {
                        // New flat list
                        delete this._cache.visibleList;
                        this._cache.rowsCount = 0;

                        // Ensure depth max
                        this._cache.depthMax = 0;
                        if (flatList) {
                            flatList.forEach((item: IItemTree<T>) => {
                                if (item.depth && item.depth > this._cache.depthMax) {
                                    this._cache.depthMax = item.depth;
                                }
                            });
                        }
                    }
                    this._cache.flatList = flatList;
                }));
        }
    }

    private ensureGroupedListCache$(): Observable<IItemBase<T>[]> {
        if (this._cache.groupedList?.length) {
            return of(this._cache.groupedList);
        } else if (!this.groupInfos || this.groupInfos.length === 0) {
            return of(this.items).pipe(
                tap(items => this._cache.groupedList = items));
        } else if (this.items) {
            return this.getGroupedList$(this.items).pipe(
                tap(groupedList => {
                    if (this._cache.groupedList?.length && this._cache.groupedList !== groupedList) {
                        // New grouped list
                        this.invalidateViewCache();
                    }
                    this._cache.groupedList = groupedList;
                }));
        } else {
            return of([] as IItemBase<T>[]);
        }
    }

    private ensureChildrenProperties(items: IItemTree<T>[]): void {
        if (!items) {
            return;
        }

        items.forEach(item => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            const field = (<any>item)[this.childrenField];
            if (field) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                item.$items = field;
                this.ensureChildrenProperties(item.$items);
            }
        });
    }

    private isVisible(item: IItemBase<T>): boolean {
        return item.visible ?? true;
    }
}

/** Structure de retour de getViewList. */
export interface IViewListResult<T> {
    depthMax?: number;
    visibleList?: IItemBase<T>[];
}

/** Structure de retour de findNextMatch. */
export interface IFindItemResult<T> {
    /** Elément trouvé. */
    item: IItemBase<T>;
    /** Index de l'élément dans la liste des éléments visibles. */
    index: number;
}

/** Structure de retour de getParentListInfos. */
export interface IParentListInfoResult<T> {
    /** Elément parent. */
    parent?: IItemTree<T>;
    /** Index de l'élément enfant dans la liste des enfants du parent. */
    index: number;
}

interface IFindItemsResult<T> {
    list: IItemBase<T>[];
    index: number;
}
