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

import { ChangeDetectorRef, ElementRef, QueryList } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { GroupingService, IGroupInfo } from '../grouping/index';
import { ISortInfos, SortingService, SortOrder } from '../sorting/index';
import { IFindItemResult, IItemBase, IItemTree, IParentListInfoResult, ItemListService, IViewListResult, IViewPort, ViewportMode, ViewPortService } from './index';

const noop = () => { };

/** Classe de base pour tous les composants à listes (deja-treelist, deja-select, deja-grid) */
export class ItemListBase {
    public static defaultViewPortRowHeight = 33;

    protected waiter = true;

    protected _itemList: IItemBase[] = []; // Viewport list
    protected _multiSelect = false;
    protected _searchField: string;
    protected _maxHeight: number;
    protected _textField: string;
    protected _valueField: string;
    protected _currentItemIndex = -1;
    protected _currentItem: IItemBase;
    protected _hintLabel: string;
    protected _nodataLabel: string;
    protected computedMaxHeight = 0;
    protected _hideSelected: boolean;
    protected _childrenField: string;
    protected _minSearchLength = 0;

    // Viewport
    protected vpBeforeHeight = 0;
    protected vpAfterHeight = 0;
    protected vpStartRow = 0;
    protected vpEndRow = 0;
    protected _pageSize = 0;
    protected _depthMax = 0;
    protected rowsCount = 0;

    // Sorting
    protected _sortInfos: ISortInfos;

    // Drag drop
    protected _ddStartIndex: number;
    protected _ddTargetIndex: number;

    private _isBusinessObject: boolean;
    private waiter$sub: Subscription;

    private _itemListService: ItemListService;
    private allCollapsed = false;
    private _viewPortRowHeight = ItemListBase.defaultViewPortRowHeight;
    private viewPort$: Observable<IViewPort>;

    constructor(protected changeDetectorRef: ChangeDetectorRef, protected viewPort: ViewPortService) {
        this.viewPort$ = viewPort.viewPort$.do((viewPortResult: IViewPort) => {
            if (!viewPortResult || !viewPortResult.items || viewPortResult.items.length === 0) {
                this.clearViewPort();
                return;
            }

            delete this._hintLabel;
            this._itemList = viewPortResult.items;
            this.vpStartRow = viewPortResult.startIndex;
            this.vpEndRow = viewPortResult.endIndex;
            this.vpBeforeHeight = viewPortResult.beforeSize;
            this.vpAfterHeight = viewPortResult.afterSize;

            this.changeDetectorRef.markForCheck();
        })
    }

    /** Renvoie le modèle de tri appliqué à la liste.
     * @param {ISortInfos} sortInfos Modèle de tri appliqué.
     */
    public get sortInfos() {
        return this._sortInfos;
    }

    /** Renvoie le modèle de regroupement appliqué à la liste.
     * @param {IGroupInfos} sortInfos Modèle de regroupement appliqué.
     */
    public get groupInfos() {
        return this._itemListService.groupInfos;
    }

    /** Définit une valeur indiquant si les éléments selectionés doivent être masqué. Ce flag est principalement utilisé dans le cas d'un multi-select
     * @param {boolean} value True si les éléments selectionés doivent être masqués
     */
    public setHideSelected(value: boolean) {
        this._hideSelected = value;
        if (this._itemListService) {
            this._itemListService.hideSelected = value;
        }
    }

    /** Définit le champs utilisé comme collection pour les enfants d'un parent.
     * @param {string} value Nom du champ à utiliser comme collection d'enfants
     */
    public setChildrenField(value: string) {
        this._childrenField = value;
        if (this._itemListService) {
            this._itemListService.childrenField = value;
        }
    }

    /** Renvoie l'index de l'élément sur la liste plate corespondant à l'élément HTML spécifié
     * @return {number} Index sur la liste plate corespondant à l'élément HTML
     */
    public getItemIndexFromHTMLElement(element: HTMLElement): number {
        while (element && element.parentElement && !element.hasAttribute('flat') && element.parentElement.id !== 'listcontainer') {
            element = element.parentElement;
        }

        if (!element || !element.hasAttribute('flat')) {
            return undefined;
        }

        return +element.getAttribute('flat');
    }

    public getItemFromHTMLElement(element: HTMLElement): IItemBase {
        const itemIndex = this.getItemIndexFromHTMLElement(element);
        if (itemIndex === undefined) {
            return undefined;
        }

        return this._itemList[itemIndex - this.vpStartRow];
    }

    /** Retourne le service de liste utilisé par ce composant.
     * @return {ItemListService} Service de liste utilisé par ce composant.
     */
    public getItemListService() {
        if (!this._itemListService) {
            this.setItemListService(new ItemListService());
        }
        return this._itemListService;
    }

    /** Retourne true si l'on manipule des objet business, false si on manipule des IItemBase.
     * @return {boolean}.
     */
    public isBusinessObject() {
        return this._isBusinessObject;
    }

    /** Retourne la liste des éléments sélectionés.
     * @return {IItemBase[] Liste des éléments selectionés.
     */
    public getSelectedItems() {
        return this.getItemListService().getSelectedItems();
    }

    /** Définit la liste des éléments sélectionés.
     * @param {IItemBase[]} items Liste des éléments a selectioner.
     */
    public setSelectedItems(value: IItemBase[]) {
        this.getItemListService().setSelectedItems(value, this._multiSelect);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Set a promise called before an item selection
     */
    public setSelectingItem(fn: (item: any) => Promise<any>) {
        this.getItemListService().setSelectingItem(fn);
    }

    /**
     * Set a promise called before an item deselection
     */
    public setUnselectingItem(fn: (item: any) => Promise<any>) {
        this.getItemListService().setUnselectingItem(fn);
    }

    /** Evalue le texte à afficher pour l'élément spécifié.
     * @param {any} value  Model à évaluer.
     * @return {string} Texte à afficher pour le modèle spécifié.
     */
    public getTextValue(value: any) {
        return this.getItemListService().getTextValue(value, this._textField);
    }

    /**
     * Set le viewport mode
     *
     * @param {ViewportMode} mode Mode du viewport (sans viewport, avec un viewport tailles des rows fixes ou dynamiques)
     */
    public setViewportMode(mode: ViewportMode | string) {
        this.viewPort.mode$.next(mode);
    }

    /** Trie la liste par le champs spécifié. */
    public sort(name?: string) {
        this.sort$(name).first().subscribe(noop);
    }

    /** Trie la liste par le champs spécifié. */
    public sort$(name?: string) {
        const sortField = name || this._textField;

        if (!this._sortInfos) {
            this._sortInfos = {
                name: sortField,
                order: SortOrder.ascending,
            };
        } else if (sortField === this._sortInfos.name) {
            this._sortInfos.order = this._sortInfos.order === SortOrder.ascending ? SortOrder.descending : SortOrder.ascending;
        } else {
            this._sortInfos.name = sortField;
            this._sortInfos.order = SortOrder.ascending;
        }
        return this.getItemListService().sort$(this._sortInfos)
            .first()
            .switchMap((si) => this.calcViewPort$().map(() => si));
    }

    /** Groupe les éléments en fonction du modèle de groupe spécifié
     * @param {IGroupInfo} groupInfos Modèle de groupe à appliquer.
     * @return {Observable} Observable résolu par la fonction.
     */
    public group$(groups: IGroupInfo[]) {
        return this.getItemListService().group$(groups)
            .switchMap(() => this.calcViewPort$());
    }

    /** Retire les groupe correspondants au modèle de groupe spécifié
     * @param {IGroupInfo} groupInfos Modèle de groupe à retirer.
     * @return {Observable} Observable résolu par la fonction.
     */
    public ungroup$(groupInfo: IGroupInfo) {
        return this.getItemListService().ungroup$(groupInfo)
            .switchMap(() => this.calcViewPort$());
    }

    /** Change l'état d'expansion de tous les éléments.
     * @return {Observable} Observable résolu par la fonction.
     */
    public toggleAll$() {
        this.allCollapsed = !this.allCollapsed;
        if (this.viewPort.mode === ViewportMode.NoViewport) {
            return Observable.from(this._itemList)
                .filter((item: IItemTree) => item.$items && item.depth === 0 && item.collapsible !== false)
                .switchMap((_item: IItemTree, index: number) => this.toggleCollapse$(index + this.vpStartRow, this.allCollapsed));
        } else {
            return this.getItemListService().toggleAll$(this.allCollapsed);
        }
    }

    /** Change l'état d'expansion de l'élément spécifié par son index sur la liste des éléments visibles.
     * @param {number} index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param {boolean} collapse  Etat de l'élément. True pour réduire l'élément.
     * @return {Observable} Observable résolu par la fonction.
     */
    public toggleCollapse$(index: number, collapsed: boolean): Observable<IItemTree[]> {
        // Get item with relative index
        const item = this._itemList[index - this.vpStartRow];
        if (!item) {
            // Not on the visible part, no transition
            return this.getItemListService().toggleCollapse$(index, collapsed);
        } else {
            const oldlist = [...this._itemList];
            const oldTreeInfo = this.getItemTreeInfo(oldlist, item);

            if (this.viewPort.mode === ViewportMode.NoViewport) {
                if (collapsed) {
                    return Observable.of(oldTreeInfo)
                        .map((oldTree) => {
                            // Hide children for effect
                            const children = (oldTree.children || []) as IItemTree[];
                            children.forEach((child) => child.expanding = true);
                            return children;
                        })
                        .delay(300)
                        .do((children) => children.forEach((child) => child.expanding = false))
                        .switchMap(() => this.getItemListService().toggleCollapse$(index, collapsed))
                        .switchMap((toogleResult) => this.calcViewPort$().map(() => toogleResult));
                } else {
                    return this.getItemListService().toggleCollapse$(index, collapsed)
                        .switchMap(() => this.calcViewPort$())
                        .map((vpresult) => {
                            const newTreeInfo = this.getItemTreeInfo(vpresult.items, item);

                            // Hide children for effect
                            const children = (newTreeInfo.children || []) as IItemTree[];
                            children.forEach((child) => child.collapsing = true);
                            return children;
                        })
                        .delay(1)
                        .do((children) => children.forEach((child) => child.collapsing = false))
                        .delay(300)
                        .switchMap((toogleResult) => this.calcViewPort$().map(() => toogleResult));
                }
            } else {
                const newTreeInfo$ = this.getItemListService().toggleCollapse$(index, collapsed)
                    .switchMap((toogleResult) => {
                        return this.calcViewPort$()
                            .map((vpresult) => {
                                const newlist = vpresult.items;
                                const newTreeInfo = this.getItemTreeInfo(newlist, item);
                                return { newlist, newTreeInfo, toogleResult };
                            });
                    });

                if (!collapsed) {
                    return newTreeInfo$
                        .map(({ newlist, newTreeInfo }) => {
                            // Add elements to the flat list, expand and calc new flatlist, keep children hidden for effect
                            const children = (newTreeInfo.children || []) as IItemTree[];
                            children.forEach((child) => child.expanding = true);

                            // Calc added elements, start index still the same
                            const oldEndRow = Math.min(oldlist.length - 1, this.vpEndRow - this.vpStartRow);
                            const newEndRow = Math.min(newlist.length - 1, newTreeInfo.lastIndex + 1);

                            // Create a temporary list for visual effect
                            this._itemList = [...newlist.slice(0, newEndRow), ...oldlist.slice(oldTreeInfo.startIndex + 1, oldEndRow)];
                            return children;
                        })
                        .delay(1)
                        .do((children) => children.forEach((child) => child.expanding = false))
                        .switchMap((result) => this.calcViewPort$().map(() => result));

                } else {
                    // Remove elements from the flat list, collapse and calc new flatlist
                    // Add same amount of elements to the visible list
                    return newTreeInfo$
                        .map(({ newlist, newTreeInfo, toogleResult }) => {
                            const oldEndRow = Math.min(oldlist.length - 1, oldTreeInfo.lastIndex + 1);
                            this.vpEndRow = Math.min(newlist.length - 1, this.vpEndRow - this.vpStartRow);
                            this._itemList = [...oldlist.slice(0, oldEndRow), ...newlist.slice(newTreeInfo.startIndex + 1)];
                            return toogleResult;
                        })
                        .switchMap((toogleResult) => this.calcViewPort$().map(() => toogleResult));
                }
            }
        }
    }

    /** Déselectionne tous les éléments sélectionés.
     * @return {Observable} Observable résolu par la fonction.
     */
    public unselectAll$() {
        const itemListService = this.getItemListService();
        return itemListService.unselectAll$();
    }

    /** Nettoye les caches et réaffiche le viewport. */
    public refresh() {
        this.getItemListService().invalidateCache();
        this.calcViewPort$().first().subscribe(noop);
    }

    /** Efface le viewport */
    public clearViewPort() {
        this.vpBeforeHeight = 0;
        this.vpAfterHeight = 0;
        this._itemList = [];
        this.changeDetectorRef.markForCheck();
    };

    /** Efface la hauteur calculée des lignes en mode automatique */
    public clearRowsHeight() {
        this.getItemListService().invalidateRowsHeightCache();
    }

    /** Retrouve les informations du parent de l'élément spécifié
     * @param {IItemTree} item Element enfant du parent à retrouver.
     * @return {Observable<IParentListInfoResult>} Observable résolu par la fonction, qui retourne les informations sur le parent de l'élément spécifié
     */
    public getParentListInfos$(item: IItemTree): Observable<IParentListInfoResult> {
        return this.getItemListService().getParentListInfos$(item, this._multiSelect);
    }

    protected getSelectedModels() {
        if (this._isBusinessObject) {
            return this.getItemListService().getSelectedItems().map((itm) => {
                return itm.model;
            });
        } else {
            return this.getItemListService().getSelectedItems();
        }
    }

    protected setSelectedModels(value: any[]) {
        if (value && this._isBusinessObject) {
            value = this.convertToIItemBase(value, true);
        }

        return this.setSelectedItems(value);
    }

    /** Trouve l'élément suivant répondant à la fonction de comparaison spécifiée.
     * @param {Function} compare Function de comparaison pour la recherche de l'élément.
     * @param {number} startIndex Index de départ sur la liste des éléments visibles.
     * @return {Observable} Observable résolu par la fonction.
     */
    protected findNextMatch$(compare?: (item: IItemBase, index: number) => boolean, startIndex?: number): Observable<IFindItemResult> {
        return this.ensureListCaches$()
            .switchMap(() => this.getItemListService().findNextMatch$(compare, startIndex));
    }

    /** Définit la hauteur d'une ligne pour le calcul du viewport. Le Viewport ne fonctionne qu'avec des hauteurs de lignes fixe.
     * Pour désactiver le viewport, mettre la hauteur de ligne à 0.
     * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
     * est suceptible de contenir beaucoup d'éléments.
     * @param {number} value Hauteur de ligne à utiliser pour le calcul du viewport.
     */
    protected setViewPortRowHeight(value: number) {
        this._viewPortRowHeight = value;
    }

    protected getViewPortRowHeight() {
        return this._viewPortRowHeight || ItemListBase.defaultViewPortRowHeight;
    }

    /** Definit le service de liste utilisé par ce composant.
     * @param {ItemListService} value Service de liste utilisé par ce composant.
     */
    protected setItemListService(value: ItemListService) {
        if (this.waiter$sub) {
            this.waiter$sub.unsubscribe();
            this.waiter$sub = undefined;
        }
        this._itemListService = value;
        if (this._itemListService) {
            this._itemListService.hideSelected = this._hideSelected;
            this._itemListService.childrenField = this._childrenField;
            this._itemListService.valueField = this._valueField;
            this.waiter$sub = Observable.from(this._itemListService.waiter$)
                .subscribe((status: boolean) => {
                    this.waiter = status;
                    this.changeDetectorRef.markForCheck();
                });
        }
    }

    /** Definit le service de tri utilisé par ce composant.
     * @param {SortingService} value Service de tri utilisé par ce composant.
     */
    protected setSortingService(value: SortingService) {
        if (!value && !this._itemListService) {
            return;
        }
        this._itemListService.setSortingService(value);
    }

    /** Definit le service de regroupement utilisé par ce composant.
     * @param {GroupingService} value Service de regroupement utilisé par ce composant.
     */
    protected setGroupingService(value: GroupingService) {
        if (!value && !this._itemListService) {
            return;
        }
        this._itemListService.setGroupingService(value);
    }

    /** Définit le texte à afficher dans la zone de conseil.
     * @param {string} value Texte à afficher.
     */
    protected setHintLabel(value: string) {
        this._hintLabel = value;
    }

    /** Définit le texte à afficher si la liste est vide.
     * @param {string} value Texte à afficher.
     */
    protected setNodataLabel(value: string) {
        this._nodataLabel = value;
    }

    protected setCurrentItemIndex(value: number) {
        this._currentItemIndex = value;
        this._currentItem = null;
    }

    protected getCurrentItemIndex() {
        return this._currentItemIndex;
    }

    /** Retourne l'élément courant (actif).
     * @return {IItemBase} Elément courant.
     */
    public getCurrentItem() {
        if (!this._currentItem && this._currentItemIndex >= 0) {
            this._currentItem = this.getItemListService().getItemFromIndex(this._currentItemIndex);
        }
        return this._currentItem;
    }

    /** Définit l'élément courant (actif).
     * @param {IItemBase} item Elément courant.
     */
    protected setCurrentItem(item: IItemBase) {
        this._currentItemIndex = item ? this.getItemListService().getItemIndex(item) : -1;
        this._currentItem = item;
    }

    /** Retourne l'index correspondant à l'élément spéficié dans la liste des éléments visibles
     * @param {IItemBase} item Element à chercher sur la liste des éléments visibles.
     * @return {number} Index correspondant à l'élément recherché.
     */
    protected getItemIndex(item: IItemBase) {
        return item && this.getItemListService() ? this.getItemListService().getItemIndex(item) : -1;
    }

    /** Définit si plusieurs éléments peuvent être sélectionés.
     * @param {boolean} value True si plusieurs éléments peuvent être sélectionés.
     */
    protected setMultiSelect(value: boolean) {
        this._multiSelect = value;
    }

    /** Définit le modèle utilisé par la liste. Il est uniquement de type IItemBase. Ce model peut ètre hierarchique sans limitation de la profondeur ou une chargé en asynchrone par une promise ou un observable.
     * @param {GroupingService}items Provider de la liste des éléments de la liste.
     */
    protected setItems$(items: IItemBase[] | Promise<IItemBase[]> | Observable<IItemBase[]>) {
        if (!(items instanceof Array)) {
            this.clearViewPort();
        }
        return this.getItemListService().setItems$(items);
    }

    /** Définit le modèle utilisé par la liste. Il peut être de tout type d'objet. Ce model peut ètre hierarchique sans limitation de la profondeur ou une chargé en asynchrone par une promise ou un observable.
     * @param {GroupingService}items Provider de la liste des éléments de la liste.
     */
    protected setModels$(models: any[] | Observable<any[]>) {
        this._isBusinessObject = true;
        let models$: Observable<any[]>;

        if (models instanceof Array) {
            models$ = Observable.of(models);
        } else {
            models$ = models as Observable<any[]>;
        }

        const items$ = models$ && models$.map((model) => this.convertToIItemBase(model));
        return this.setItems$(items$);
    }

    // Ne pas utiliser, cette fonction retourne la liste des éléments pour l'implémentation de ngModel.
    protected getItems() {
        return this.getItemListService().getItems();
    }

    /** Usage interne. Termine le drag and drop en cours. */
    protected drop$() {
        this.setCurrentItemIndex(-1);
        return this.getItemListService().drop$();
    }

    /** Usage interne. Retourne la portion de la liste à afficher en fonction des paramètres spécifiés. */
    protected getViewList$(query?: RegExp | string, ignoreCache?: boolean): Observable<IViewListResult> {
        if (typeof query === 'string' && (query + '').length < this._minSearchLength) {
            const emptyListResult = {
                depthMax: 0,
                visibleList: [],
            } as IViewListResult;

            if (!this.getItems()) {
                return this.setItems$([]).map(() => emptyListResult);
            } else {
                return Observable.of(emptyListResult);
            }
        }

        return this.getItemListService()
            .getViewList$(this._searchField || this._textField, query, ignoreCache, this._ddStartIndex, this._ddTargetIndex, this._multiSelect);
    }

    /** Sélectionne une plage d'éléments en fonction de l'index de début et l'index de fin sur la liste des éléments visibles.
     * @param {number} indexFrom index sur la liste des éléments visibles du premier élément à sélectioner.
     * @param {number} indexTo index sur la liste des éléments visibles du dernier élément à sélectioner.
     * @return {Observable} Observable résolu par la fonction.
     */
    protected selectRange$(indexFrom: number, indexTo?: number) {
        const itemListService = this.getItemListService();
        return this.ensureListCaches$()
            .switchMap(() => itemListService.selectRange$(indexFrom, indexTo));
    }

    /** Change l'état de selection de l'élément spécifié.
     * @param {IItemBase[]} items Liste des éléments à modifier.
     * @param {boolean} selected True si les éléments divent être sélectionés, False si ils doivent être déselectionés.
     * @return {Observable} Observable résolu par la fonction.
     */
    protected toggleSelect$(items: IItemBase[], selected: boolean) {
        const itemListService = this.getItemListService();
        return itemListService.toggleSelect$(items, selected);
    }

    /** Définit si l'élément spécifié peut être réduit.
     * @param {IItemTree} item Elément à analyser.
     * @return {boolean} True si l'élément peut être réduit.
     */
    protected isCollapsible(item: IItemTree) {
        return item && item.$items && item.collapsible !== false;
    }

    /** Définit si l'élément spécifié est selectionable.
     * @param {IItemBase} item Elément à analyser.
     * @return {boolean} True si l'élément est selectionable.
     */
    protected isSelectable(item: IItemBase) {
        return item && item.selectable !== false;
    }

    /** Définit le champ à utiliser comme valeur d'affichage.
     * @param {string} value Champ à utiliser comme valeur d'affichage.
     */
    protected setTextField(value: string) {
        this._textField = value;
    }

    /** Définit le champ à utiliser comme valeur de comparaison.
     * @param {string} value Champ à utiliser comme valeur de comparaison.
     */
    protected setValueField(value: string) {
        this._valueField = value;
        if (this._itemListService) {
            this._itemListService.valueField = value;
        }
    }

    /** Définit le champ à utiliser comme champ de recherche.
     * Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.
     * @param {string} value Champ à utiliser comme champ de recherche.
     */
    protected setSearchField(value: string) {
        this._searchField = value;
    }

    /** Définit la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    protected setMaxHeight(value: number | string) {
        this.viewPort.maxSize$.next(this._maxHeight = +value);
    }

    /** Retourne la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    protected getMaxHeight() {
        return this._maxHeight;
    }

    /** Internal usage. Calc the best target when an item is drag and dropped */
    protected calcDragTargetIndex$(index: number, targetIndex: number) {
        return this.ensureListCaches$()
            .switchMap(() => this.getItemListService().calcDragTargetIndex$(index, targetIndex));
    }

    /** Internal usage */
    protected getItemTreeInfo(items: IItemBase[], item: IItemBase): IItemTreeInfo {
        const parentIndex = items.findIndex((itm) => itm === item);
        if (parentIndex < 0) {
            return null;
        }

        const treeItem = item as IItemTree;
        const parentDepth = treeItem.depth;
        let lastIndex = parentIndex;
        const children = [] as IItemBase[];

        if (parentDepth !== undefined) {
            for (let i = parentIndex + 1; i < items.length; i++) {
                const curItem = items[i] as IItemTree;
                if (curItem.depth <= parentDepth) {
                    break;
                }
                children.push(curItem);
                lastIndex = i;
            }
        }

        return {
            children: children,
            item: item,
            lastIndex: lastIndex,
            startIndex: parentIndex,
        } as IItemTreeInfo;
    }

    /** Calcule le viewport pour le conteneur spécifié. */
    protected calcViewPort$(query?: string, containerElement?: HTMLElement): Observable<IViewPort> {
        let calcViewPort$: (items: IItemBase[], maxSize: number, measureContHeight: boolean) => Observable<IViewPort>;

        const calcContainerSize$ = (items: IItemBase[]): Observable<IViewPort> => {
            // Set the viewlist to the maximum height to measure the real max-height defined in the css
            const heightMax = 200000;
            // Use a blank div to do that
            this.vpAfterHeight = heightMax;
            this.computedMaxHeight = containerElement.clientHeight;
            this.changeDetectorRef.markForCheck();
            // Wait next life cycle for the result
            return Observable.timer(1)
                .first()
                .switchMap(() => calcViewPort$(items, this.computedMaxHeight, false));
        };

        const calcConstantHeightViewPort$ = (items: IItemBase[], contHeight: number): Observable<IViewPort> => {
            const scrollPos = (contHeight && containerElement && containerElement.scrollTop) || 0;
            const itemSize = this.getViewPortRowHeight();
            let maxCount = Math.ceil(contHeight / itemSize);
            const startRow = Math.floor(scrollPos / itemSize);

            if (maxCount) {
                maxCount++;
            }

            const rowsCount = Math.min(items.length - startRow, maxCount);
            let startIndex: number;
            let endIndex: number;

            if (rowsCount < 0) {
                endIndex = items.length - 1;
                startIndex = endIndex - Math.min(items.length, maxCount) + 1;
            } else {
                startIndex = startRow;
                endIndex = startIndex + rowsCount - 1;
            }

            return Observable.of({
                beforeSize: startIndex * itemSize,
                afterSize: (items.length - 1 - endIndex) * itemSize,
                items: items.slice(startIndex, 1 + endIndex),
                startIndex: startIndex,
                endIndex: endIndex,
                startOffset: 0,
            } as IViewPort);
        };

        const calcVariableHeightViewPort$ = (items: IItemBase[], contHeight: number): Observable<IViewPort> => {
            const visibleList = [] as IItemBase[];
            const scrollPos = contHeight ? containerElement.scrollTop : 0;
            let startIndex: number;
            let endIndex = 0;
            let beforeSize = 0;
            let visibleListHeight = 0;
            let afterSize = 0;

            items.forEach((item: IItemBase, index: number) => {
                const itemHeight = this.getItemHeight(item);
                if (beforeSize + itemHeight < scrollPos && startIndex === undefined) {
                    beforeSize += itemHeight;
                } else if (visibleListHeight + beforeSize < contHeight + scrollPos) {
                    if (startIndex === undefined) {
                        startIndex = index;
                    }
                    endIndex = index;
                    visibleListHeight += itemHeight;
                    visibleList.push(item);
                } else {
                    afterSize += itemHeight;
                }
            });

            return Observable.of({
                beforeSize: beforeSize,
                afterSize: afterSize,
                items: visibleList,
                startIndex: startIndex || 0,
                endIndex: endIndex,
                startOffset: 0,
            } as IViewPort);
        };

        const calcAutoHeightViewPort$ = (items: IItemBase[], contHeight: number): Observable<IViewPort> => {
            const visibleList = [] as IItemBase[];
            let vpHeight = 0;
            let startIndex = 0;
            let endIndex = 0;
            let overflow = false;
            let averageHeight = 0;
            let averageCount = 0;
            let beforeSize = 0;
            let afterSize = 0;
            let calculationRequired = false;
            const scrollPos = contHeight ? containerElement.scrollTop : 0;
            items.forEach((item, index) => {
                let itemHeight = item.size || 0;
                if (itemHeight > ItemListBase.defaultViewPortRowHeight) {
                    averageHeight += itemHeight;
                    ++averageCount;
                } else if (averageCount > 0) {
                    itemHeight = Math.round(averageHeight / averageCount);
                } else {
                    itemHeight = this.getViewPortRowHeight();
                }

                if (vpHeight === 0 && beforeSize + itemHeight < scrollPos) {
                    beforeSize += itemHeight;
                } else if (!overflow) {
                    if (visibleList.length === 0) {
                        startIndex = index;
                    }
                    if (!item.size) {
                        calculationRequired = true;
                    }
                    endIndex = index;
                    vpHeight += itemHeight;
                    visibleList.push(item);
                    if (beforeSize + vpHeight > scrollPos + contHeight) {
                        overflow = true;
                    }
                } else {
                    afterSize += itemHeight;
                }
            });

            const viewPort = {
                beforeSize: beforeSize,
                afterSize: afterSize,
                items: visibleList,
                startIndex: startIndex,
                endIndex: endIndex,
                startOffset: 0,
            } as IViewPort;


            if (!calculationRequired) {
                return Observable.of(viewPort);
            } else {
                // Measure items height
                this.viewPort.viewPortResult$.next(viewPort);
                return Observable.timer(1)
                    .switchMap(() => {
                        const elements = containerElement.getElementsByClassName('listitem');
                        for (let i = 0; i < elements.length; i++) {
                            const itemElement = elements[i];
                            const index = +itemElement.getAttribute('flat');
                            const item = visibleList[index - startIndex];
                            if (item) {
                                item.size = itemElement.clientHeight;
                            }
                        };
                        return calcAutoHeightViewPort$(items, contHeight);
                    });
            }
        };

        calcViewPort$ = (items: IItemBase[], maxheight: number, measureContHeight: boolean) => {
            let containerHeight = this.computedMaxHeight || maxheight || containerElement.clientHeight;
            if (containerHeight < 2 * ItemListBase.defaultViewPortRowHeight && measureContHeight !== false) {
                return calcContainerSize$(items);

            } else {
                if (containerHeight <= ItemListBase.defaultViewPortRowHeight) {
                    containerHeight = window.innerHeight;
                }

                if (this.viewPort.mode === ViewportMode.NoViewport) {
                    return Observable.of({
                        beforeSize: 0,
                        afterSize: 0,
                        items: items,
                        startIndex: 0,
                        endIndex: items.length,
                        startOffset: 0,
                    } as IViewPort);

                } else {
                    let viewPort$: Observable<IViewPort>;

                    if (this.viewPort.mode === ViewportMode.VariableRowHeight) {
                        viewPort$ = calcVariableHeightViewPort$(items, containerHeight);

                    } else if (this.viewPort.mode === ViewportMode.AutoRowHeight) {
                        viewPort$ = calcAutoHeightViewPort$(items, containerHeight);

                    } else {
                        viewPort$ = calcConstantHeightViewPort$(items, containerHeight);
                    }

                    return viewPort$.switchMap((viewPort: IViewPort) => {
                        if (containerHeight < 2 * ItemListBase.defaultViewPortRowHeight) {
                            return calcContainerSize$(items);
                        } else {
                            return Observable.of(viewPort);
                        }
                    });
                }
            };
        };

        this.getViewList$(query)
            .filter((result: IViewListResult) => {
                if (result.depthMax !== undefined) {
                    this._depthMax = result.depthMax;
                }
                this.rowsCount = result.visibleList.length;
                return this.rowsCount > 0;
            })
            .switchMap((result: IViewListResult) => calcViewPort$(result.visibleList, this._maxHeight, true))
            .first()
            .subscribe((viewPort: IViewPort) => {
                this.viewPort.viewPortResult$.next(viewPort);
            });

        return this.viewPort$;
    }

    protected ensureListCaches$(): Observable<IViewListResult> {
        return this._itemListService.hasCache ? Observable.of(null) : this.calcViewPort$();
    }

    /** Calcul la position de la scrollbar pour que l'élément spécifié soit dans la zone visible. */
    protected ensureItemVisible(query: string, containerElement: HTMLElement, listItemElements: QueryList<ElementRef>, item: IItemBase | number) {
        if (item !== undefined) {
            if (this.viewPort.mode === ViewportMode.NoViewport) {
                let index = item as number;
                if (isNaN(index)) {
                    index = this._itemList.findIndex((itm) => item === itm);
                }

                if (index >= 0) {
                    const element = index >= 0 && listItemElements.toArray()[index];
                    if (element) {
                        element.nativeElement.scrollIntoViewIfNeeded();
                    }
                }
            } else if (this.viewPort.mode === ViewportMode.VariableRowHeight || this.viewPort.mode === ViewportMode.AutoRowHeight) {
                this.getViewList$(query).subscribe((viewListResult: IViewListResult) => {
                    const scrollPos = containerElement.scrollTop;
                    let scrollMax = 0;
                    let lastVisibleItem: IItemBase;
                    const fn = isNaN(+item) ? (itm: IItemBase) => {
                        return item === itm;
                    } : (_itm: IItemBase, index: number) => {
                        return item === index;
                    };
                    lastVisibleItem = viewListResult.visibleList.find((itm: IItemBase, index: number) => {
                        const test = fn(itm, index);
                        if (!test) {
                            scrollMax += this.getItemHeight(itm) || this.getViewPortRowHeight();
                        }
                        return test;
                    });

                    if (scrollPos > scrollMax) {
                        containerElement.scrollTop = scrollMax;
                    } else {
                        const scrollMin = scrollMax - containerElement.clientHeight + (this.getItemHeight(lastVisibleItem) || this.getViewPortRowHeight());
                        if (scrollPos < scrollMin) {
                            containerElement.scrollTop = scrollMin;
                        }
                    }
                });
            } else {
                // View port constant row height
                let index = item as number;
                if (isNaN(index)) {
                    index = this._itemList.findIndex((itm) => item === itm) + this.vpStartRow;
                }

                if (index < 0) {
                    // Outside visible part, ask service
                    index = this.getItemIndex(item as IItemBase);
                }

                if (index >= 0) {
                    const scrollPos = containerElement.scrollTop;
                    const scrollMax = index * this.getViewPortRowHeight();
                    if (scrollPos > scrollMax) {
                        containerElement.scrollTop = scrollMax;
                    } else {
                        const scrollMin = scrollMax - containerElement.clientHeight + this.getViewPortRowHeight();
                        if (scrollPos < scrollMin) {
                            containerElement.scrollTop = scrollMin;
                        }
                    }
                }
            }
        }
    }

    protected convertToIItemBase(modls: any[], selected?: boolean): IItemBase[] {
        if (!this._isBusinessObject) {
            return modls as IItemBase[];
        }

        return modls.map((model) => {
            const itemBase: IItemBase = {};
            itemBase.model = model;

            const displayField = this._textField || 'displayName';
            itemBase[displayField] = this.getTextValue(model);

            if (this._searchField) {
                itemBase[this._searchField] = model[this._searchField];
            }

            if (this._valueField) {
                itemBase[this._valueField] = model[this._valueField];
            }

            const childrenField = this.getItemListService().childrenField;
            if (model[childrenField]) {
                itemBase[childrenField] = this.convertToIItemBase(model[childrenField], selected);
            } else {
                itemBase.selected = selected || false;
            }

            return itemBase;
        });
    };

    protected getItemHeight(item: IItemBase) {
        if (this.viewPort.mode === ViewportMode.NoViewport) {
            return null;
        } else if (this.viewPort.mode === ViewportMode.ConstantRowHeight) {
            return this.getViewPortRowHeight();
        } else if (this.viewPort.mode === ViewportMode.AutoRowHeight) {
            return item.size || null;
        } else {
            return (item.size && item.size > ItemListBase.defaultViewPortRowHeight) ? item.size : this.getViewPortRowHeight();
        }
    }
}

export interface IItemTreeInfo {
    item?: IItemBase;
    children?: IItemBase[];
    startIndex: number;
    lastIndex?: number;
}
