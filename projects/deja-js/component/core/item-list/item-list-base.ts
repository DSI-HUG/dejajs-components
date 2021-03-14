/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectorRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { from, Observable, of, Subscription, timer } from 'rxjs';
import { filter, map, reduce, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { Destroy } from '../destroy/destroy';
import { IGroupInfo } from '../grouping/group-infos';
import { GroupingService } from '../grouping/grouping.service';
import { ISortInfos } from '../sorting/sort-infos.model';
import { SortingService } from '../sorting/sorting.service';
import { IItemBase } from './item-base';
import { IFindItemResult, IParentListInfoResult, ItemListService, IViewListResult } from './item-list.service';
import { IItemTree } from './item-tree';
import { IViewPort, IViewPortRefreshParams, ViewportMode, ViewPortService } from './viewport.service';

/** Classe de base pour tous les composants à listes (deja-treelist, deja-select, deja-grid) */
export abstract class ItemListBase<T> extends Destroy {
    protected _waiter = true;

    protected _itemList: IItemBase<T>[] = []; // Viewport list
    protected _multiSelect = false;
    protected _searchField: string;
    protected _maxHeight: number;
    protected _currentItemIndex = -1;
    protected _currentItem: IItemBase<T>;
    protected _hintLabel: string;
    protected _nodataLabel: string;
    protected _hideSelected: boolean;
    protected _childrenField: string;
    protected _minSearchLength = 0;
    protected _listElementId: string;

    // Viewport
    protected _vpBeforeHeight = 0;
    protected _vpAfterHeight = 0;
    protected _vpStartRow = 0;
    protected _vpEndRow = 0;
    protected _pageSize = 0;
    protected _depthMax = 0;
    protected rowsCount = 0;

    // Sorting
    protected _sortInfos: ISortInfos;

    protected _viewPortChanged: EventEmitter<IViewPort>;

    // Drag drop
    protected _ddStartIndex: number;
    protected _ddTargetIndex: number;

    private _textField: string;
    private _valueField: string;

    private waiter$sub: Subscription;

    private _itemListService: ItemListService<T>;
    private allCollapsed = false;
    private _viewPortRowHeight = ViewPortService.itemDefaultSize;

    private _listElement: HTMLElement;

    public constructor(protected changeDetectorRef: ChangeDetectorRef, protected viewPort: ViewPortService) {
        super();

        this._listElementId = `listcontainer_${(1000000000 * Math.random()).toString().substr(10)}`;

        viewPort.viewPort$.pipe(
            switchMap((viewPortResult: IViewPort) => {
                let next$: Observable<number> = of(null);

                delete this._hintLabel;
                if (viewPort.mode === 'disabled') {
                    this._itemList = viewPortResult.items;
                    this._vpStartRow = 0;
                    this._vpEndRow = 0;
                    this._vpBeforeHeight = 0;
                    this._vpAfterHeight = 0;
                } else {
                    this._itemList = viewPortResult.visibleItems;
                    this._vpStartRow = viewPortResult.startIndex;
                    this._vpEndRow = viewPortResult.endIndex;
                    this._vpBeforeHeight = viewPortResult.beforeSize;
                    this._vpAfterHeight = viewPortResult.afterSize;
                }

                if (viewPortResult.scrollPos !== undefined) {
                    if (this.listElement) {
                        const listItems = this.listElement.getElementsByClassName('listitem');
                        const rebind = listItems.length !== viewPortResult.visibleItems.length;
                        if (!rebind) {
                            this.listElement.scrollTop = viewPortResult.scrollPos;
                        } else {
                            next$ = timer(1).pipe(
                                filter(() => !!this.listElement),
                                tap(() => this.listElement.scrollTop = viewPortResult.scrollPos)
                            );
                        }
                    }
                }

                this.changeDetectorRef.markForCheck();
                // console.log(viewPortResult);

                this._viewPortChanged?.next(viewPortResult);

                return next$;
            }),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    public get isMultiSelect(): boolean {
        return this._multiSelect;
    }

    public get itemList(): IItemBase<T>[] {
        return this._itemList;
    }

    public get treeItemList(): IItemTree<T>[] {
        return this._itemList as IItemTree<T>[];
    }

    public get ddStartIndex(): number {
        return this._ddStartIndex;
    }

    public get vpBeforeHeight(): number {
        return this._vpBeforeHeight;
    }

    public get vpAfterHeight(): number {
        return this._vpAfterHeight;
    }

    public get vpStartRow(): number {
        return this._vpStartRow;
    }

    public get vpEndRow(): number {
        return this._vpEndRow;
    }

    /** Renvoie le modèle de tri appliqué à la liste.
     * @param sortInfos Modèle de tri appliqué.
     */
    public get sortInfos(): ISortInfos {
        return this._sortInfos;
    }

    /** Renvoie le modèle de regroupement appliqué à la liste.
     * @param sortInfos Modèle de regroupement appliqué.
     */
    public get groupInfos(): IGroupInfo[] {
        return this._itemListService.groupInfos;
    }

    /** Définit une valeur indiquant si les éléments selectionés doivent être masqué. Ce flag est principalement utilisé dans le cas d'un multi-select
     * @param value True si les éléments selectionés doivent être masqués
     */
    public setHideSelected(value: boolean): void {
        this._hideSelected = value;
        if (this._itemListService) {
            this._itemListService.hideSelected = value;
        }
    }

    /** Définit le champs utilisé comme collection pour les enfants d'un parent.
     * @param value Nom du champ à utiliser comme collection d'enfants
     */
    public setChildrenField(value: string): void {
        this._childrenField = value;
        if (this._itemListService) {
            this._itemListService.childrenField = value;
        }
    }

    /** Renvoie l'index de l'élément sur la liste plate corespondant à l'élément HTML spécifié
     * @return Index sur la liste plate corespondant à l'élément HTML
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public getItemIndexFromHTMLElement(element: HTMLElement): number {
        // eslint-disable-next-line no-loops/no-loops
        while (element?.parentElement && element.hasAttribute && !element.hasAttribute('flat') && element.parentElement.id !== this.listElementId) {
            element = element.parentElement;
        }

        if (!element || !element.hasAttribute('flat')) {
            return undefined;
        }

        return +element.getAttribute('flat');
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public getItemFromHTMLElement(element: HTMLElement): IItemBase<T> {
        const itemIndex = this.getItemIndexFromHTMLElement(element);
        if (itemIndex === undefined) {
            return undefined;
        }

        return this._itemList[itemIndex - this.vpStartRow];
    }

    /** Retourne le service de liste utilisé par ce composant.
     * @return Service de liste utilisé par ce composant.
     */
    public getItemListService(): ItemListService<T> {
        if (!this._itemListService) {
            this.setItemListService(new ItemListService());
        }
        return this._itemListService;
    }

    /** Retourne la liste des éléments sélectionés.
     * @return Liste des éléments selectionés.
     */
    public getSelectedItems(): IItemBase<T>[] {
        return this.getItemListService().getSelectedItems();
    }

    /** Définit la liste des éléments sélectionés.
     * @param items Liste des éléments a selectioner.
     */
    public setSelectedItems(value: IItemBase<T>[]): void {
        this.getItemListService().setSelectedItems(value);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Set a promise or an observable called before an item selection
     */
    public setLoadingItems(fn: (query: string | RegExp, selectedItems: IItemBase<T>[]) => Observable<IItemBase<T>[]>): void {
        this.getItemListService().setLoadingItems(fn);
    }

    /**
     * Set a promise or an observable called before an item deselection
     */
    public setSelectingItem(fn: (item: IItemBase<T>) => Promise<IItemBase<T>> | Observable<IItemBase<T>>): void {
        this.getItemListService().setSelectingItem(fn);
    }

    /**
     * Set a promise or an observable called before an item deselection
     */
    public setUnselectingItem(fn: (item: IItemBase<T>) => Promise<IItemBase<T>> | Observable<IItemBase<T>>): void {
        this.getItemListService().setUnselectingItem(fn);
    }

    /**
     * Set a promise or an observable called before an item selection
     */
    public setExpandingItem(fn: (item: IItemTree<T>) => Promise<IItemTree<T>> | Observable<IItemTree<T>>): void {
        this.getItemListService().setExpandingItem(fn);
    }

    /**
     * Set a promise or an observable called before an item deselection
     */
    public setCollapsingItem(fn: (item: IItemTree<T>) => Promise<IItemTree<T>> | Observable<IItemTree<T>>): void {
        this.getItemListService().setCollapsingItem(fn);
    }

    /** Evalue le texte à afficher pour l'élément spécifié.
     * @param value  Model à évaluer.
     * @return Texte à afficher pour le modèle spécifié.
     */
    public getTextValue(value: unknown): string {
        return this.getItemListService().getTextValue(value, this._textField);
    }

    /**
     * Set le viewport mode
     *
     * @param mode Mode du viewport (sans viewport, avec un viewport tailles des rows fixes ou dynamiques)
     */
    public setViewportMode(mode: ViewportMode): void {
        this.viewPort.mode$.next(mode);
    }

    /** Trie la liste par le champs spécifié. */
    public sort(name?: string): void {
        this.sort$(name).pipe(
            take(1),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    /** Trie la liste par le champs spécifié. */
    public sort$(name?: string): Observable<IViewListResult<T>> {
        const sortField = name || this._textField;

        if (!this._sortInfos) {
            this._sortInfos = {
                name: sortField,
                order: 'ascending'
            };
        } else if (sortField === this._sortInfos.name) {
            this._sortInfos.order = this._sortInfos.order === 'ascending' ? 'descending' : 'ascending';
        } else {
            this._sortInfos.name = sortField;
            this._sortInfos.order = 'ascending';
        }
        return this.getItemListService().sort$(this._sortInfos).pipe(
            take(1),
            switchMap((si: never) => this.calcViewList$().pipe(take(1), map(() => si)))
        );
    }

    /** Groupe les éléments en fonction du modèle de groupe spécifié
     * @param groupInfos Modèle de groupe à appliquer.
     * @return Observable résolu par la fonction.
     */
    public group$(groups: IGroupInfo[]): Observable<IViewListResult<T>> {
        return this.getItemListService().group$(groups).pipe(
            switchMap(() => this.calcViewList$().pipe(take(1)))
        );
    }

    /** Retire les groupe correspondants au modèle de groupe spécifié
     * @param groupInfos Modèle de groupe à retirer.
     * @return Observable résolu par la fonction.
     */
    public ungroup$(groupInfo: IGroupInfo): Observable<IViewListResult<T>> {
        return this.getItemListService().ungroup$(groupInfo).pipe(
            switchMap(() => this.calcViewList$().pipe(
                take(1)
            ))
        );
    }

    /** Change l'état d'expansion de tous les éléments.
     * @return Observable résolu par la fonction.
     */
    public toggleAll$(collapsed?: boolean): Observable<IItemTree<T>[]> {
        this.allCollapsed = (collapsed !== undefined) ? collapsed : !this.allCollapsed;
        if (this.viewPort.mode === 'disabled') {
            return from(this._itemList).pipe(
                filter((item: IItemTree<T>) => item.$items && item.depth === 0 && item.collapsible !== false),
                switchMap((_item: IItemTree<T>, index: number) => this.toggleCollapse$(index + this.vpStartRow, this.allCollapsed)),
                reduce((acc, item) => {
                    acc.push(item);
                    return acc;
                }, [] as IItemTree<T>[]));
        } else {
            return this.getItemListService().toggleAll$(this.allCollapsed);
        }
    }

    /** Change l'état d'expansion de l'élément spécifié par son index sur la liste des éléments visibles.
     * @param index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param collapse  Etat de l'élément. True pour réduire l'élément.
     * @return Observable résolu par la fonction.
     */
    public toggleCollapse$(index: number, collapsed: boolean): Observable<IItemTree<T>> {
        return this.getItemListService().toggleCollapse$(index, collapsed).pipe(
            switchMap(toogleResult => this.calcViewList$().pipe(
                take(1), map(() => toogleResult))
            )
        );
    }

    /** Déselectionne tous les éléments sélectionés.
     * @return Observable résolu par la fonction.
     */
    public unselectAll$(): Observable<IItemBase<T>[]> {
        const itemListService = this.getItemListService();
        return itemListService.unselectAll$();
    }

    /** Nettoye les caches et réaffiche le viewport. */
    public refresh(): void {
        this.getItemListService().invalidateCache();
        this.calcViewList$().pipe(
            take(1),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    /** Recalcule le viewport. */
    public refreshViewPort(item?: IItemBase<T> | IItemBase<T>[], clearMeasuredHeight?: boolean): void {
        const refreshParams = {} as IViewPortRefreshParams;
        if (item) {
            refreshParams.items = item instanceof Array ? item : [item];
        }
        if (clearMeasuredHeight) {
            refreshParams.clearMeasuredSize = clearMeasuredHeight;
        }
        this.viewPort.refresh(refreshParams);
        this.changeDetectorRef.markForCheck();
    }

    /** Efface le viewport */
    public clearViewPort(): void {
        this.viewPort.clear();
    }

    /** Efface la hauteur calculée des lignes en mode automatique */
    public clearRowsHeight(): void {
        this.getItemListService().invalidateRowsHeightCache();
    }

    /** Retrouve les informations du parent de l'élément spécifié
     * @param item Element enfant du parent à retrouver.
     * @return Observable résolu par la fonction, qui retourne les informations sur le parent de l'élément spécifié
     */
    public getParentListInfos$(item: IItemTree<T>): Observable<IParentListInfoResult<T>> {
        return this.getItemListService().getParentListInfos$(item, this._multiSelect);
    }

    public get listElementId(): string {
        return this._listElementId;
    }

    public get listElement(): HTMLElement {
        // Can be an overlay
        return this._listElement || document.getElementById(this.listElementId);
    }

    public set listElement(elem: HTMLElement) {
        this._listElement = elem;
    }

    public getViewPortRowHeight(): number {
        return this._viewPortRowHeight || ViewPortService.itemDefaultSize;
    }

    public getCurrentItemIndex(): number {
        return this._currentItemIndex;
    }

    /** Retourne l'élément courant (actif).
     * @return Elément courant.
     */
    public getCurrentItem(): IItemBase<T> {
        if (!this._currentItem && this._currentItemIndex >= 0) {
            this._currentItem = this.getItemListService().getItemFromIndex(this._currentItemIndex);
        }
        return this._currentItem;
    }

    public getItemHeight(item: IItemBase<T>): number {
        if (this.viewPort.mode === 'disabled') {
            return null;
        } else if (this.viewPort.mode === 'fixed') {
            return this.getViewPortRowHeight();
        } else if (this.viewPort.mode === 'auto') {
            return item.size || null;
        } else {
            return (item.size && item.size > ViewPortService.itemDefaultSize) ? item.size : this.getViewPortRowHeight();
        }
    }

    protected getSelectedModels(): (T | IItemBase<T>)[] {
        return this.getItemListService().getSelectedItems().map(itm => itm.model !== undefined ? itm.model : itm);
    }

    protected setSelectedModels(values: unknown[]): void {
        this.setSelectedItems(values && this.mapToIItemBase(values, true));
    }

    /** Trouve l'élément suivant répondant à la fonction de comparaison spécifiée.
     * @param compare Function de comparaison pour la recherche de l'élément.
     * @param startIndex Index de départ sur la liste des éléments visibles.
     * @return Observable résolu par la fonction.
     */
    protected findNextMatch$(compare?: (item: IItemBase<T>, index: number) => boolean, startIndex?: number): Observable<IFindItemResult<T>> {
        return this.ensureListCaches$().pipe(
            switchMap(() => this.getItemListService().findNextMatch$(compare, startIndex)));
    }

    /** Définit la hauteur d'une ligne pour le calcul du viewport. Le Viewport ne fonctionne qu'avec des hauteurs de lignes fixe.
     * Pour désactiver le viewport, mettre la hauteur de ligne à 0.
     * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
     * est suceptible de contenir beaucoup d'éléments.
     * @param value Hauteur de ligne à utiliser pour le calcul du viewport.
     */
    protected setViewPortRowHeight(value: NumberInput): void {
        this._viewPortRowHeight = coerceNumberProperty(value);
        if (value) {
            this.viewPort.itemsSize$.next(this._viewPortRowHeight);
        }
    }

    /** Definit le service de liste utilisé par ce composant.
     * @param value Service de liste utilisé par ce composant.
     */
    protected setItemListService(value: ItemListService<T>): void {
        if (this.waiter$sub) {
            this.waiter$sub.unsubscribe();
            this.waiter$sub = undefined;
        }
        this._itemListService = value;
        if (this._itemListService) {
            this._itemListService.hideSelected = this._hideSelected;
            this._itemListService.childrenField = this._childrenField;
            this._itemListService.valueField = this._valueField;
            this.waiter$sub = this._itemListService.waiter$.pipe(
                takeUntil(this.destroyed$)
            ).subscribe(status => {
                this._waiter = status;
                this.changeDetectorRef.markForCheck();
            });
        }
    }

    /** Definit le service de tri utilisé par ce composant.
     * @param value Service de tri utilisé par ce composant.
     */
    protected setSortingService(value: SortingService): void {
        if (!value && !this._itemListService) {
            return;
        }
        this._itemListService.setSortingService(value);
    }

    /** Definit le service de regroupement utilisé par ce composant.
     * @param value Service de regroupement utilisé par ce composant.
     */
    protected setGroupingService(value: GroupingService): void {
        if (!value && !this._itemListService) {
            return;
        }
        this._itemListService.setGroupingService(value);
    }

    /** Définit le texte à afficher dans la zone de conseil.
     * @param value Texte à afficher.
     */
    protected setHintLabel(value: string): void {
        this._hintLabel = value;
    }

    /** Définit le texte à afficher si la liste est vide.
     * @param value Texte à afficher.
     */
    protected setNodataLabel(value: string): void {
        this._nodataLabel = value;
    }

    protected setCurrentItemIndex(value: number): void {
        this._currentItemIndex = value;
        this._currentItem = null;
    }

    /** Définit l'élément courant (actif).
     * @param item Elément courant.
     */
    protected setCurrentItem(item: IItemBase<T>): void {
        this._currentItemIndex = item ? this.getItemListService().getItemIndex(item) : -1;
        this._currentItem = item;
    }

    /** Retourne l'index correspondant à l'élément spéficié dans la liste des éléments visibles
     * @param item Element à chercher sur la liste des éléments visibles.
     * @return Index correspondant à l'élément recherché.
     */
    protected getItemIndex(item: IItemBase<T>): number {
        return item && this.getItemListService() ? this.getItemListService().getItemIndex(item) : -1;
    }

    /** Définit si plusieurs éléments peuvent être sélectionés.
     * @param value True si plusieurs éléments peuvent être sélectionés.
     */
    protected setMultiSelect(value: boolean): void {
        this._multiSelect = value;
    }

    /** Définit le modèle utilisé par la liste. Il est uniquement de type IItemBase<T>. Ce model peut ètre hierarchique sans limitation de la profondeur ou une chargé en asynchrone par une promise ou un observable.
     * @param items Provider de la liste des éléments de la liste.
     */
    // eslint-disable-next-line rxjs/finnish
    protected setItems$(items: IItemBase<T>[] | Promise<IItemBase<T>[]> | Observable<IItemBase<T>[]>): Observable<unknown> {
        if (!(items instanceof Array)) {
            this.clearViewPort();
        }
        return this.getItemListService().setItems$(items);
    }

    /** Définit le modèle utilisé par la liste. Il peut être de tout type d'objet. Ce model peut ètre hierarchique sans limitation de la profondeur ou une chargé en asynchrone par une promise ou un observable.
     * @param items Provider de la liste des éléments de la liste.
     */
    // eslint-disable-next-line rxjs/finnish
    protected setModels$(models: unknown[] | Observable<unknown[]>): Observable<unknown> {
        let models$: Observable<unknown[]>;

        if (models instanceof Array) {
            models$ = of(models);
        } else {
            models$ = models;
        }

        const items$ = models$?.pipe(map(model => this.mapToIItemBase(model)));
        return this.setItems$(items$);
    }

    // Ne pas utiliser, cette fonction retourne la liste des éléments pour l'implémentation de ngModel.
    protected getItems(): IItemBase<T>[] {
        return this.getItemListService().getItems();
    }

    /** Usage interne. Termine le drag and drop en cours. */
    protected drop$(): Observable<boolean> {
        this.setCurrentItemIndex(-1);
        return this.getItemListService().drop$();
    }

    /** Usage interne. Retourne la portion de la liste à afficher en fonction des paramètres spécifiés. */
    protected getViewList$(query?: RegExp | string, ignoreCache?: boolean): Observable<IViewListResult<T>> {
        if (typeof query === 'string' && (query || '').length < this._minSearchLength) {
            const emptyListResult = {
                depthMax: 0,
                visibleList: []
            } as IViewListResult<T>;

            if (!this.getItems()) {
                return this.setItems$([]).pipe(map(() => emptyListResult));
            } else {
                return of(emptyListResult);
            }
        }

        return this.getItemListService()
            .getViewList$(this._searchField || this._textField, query, ignoreCache, this._ddStartIndex, this._ddTargetIndex, this._multiSelect);
    }

    /** Sélectionne une plage d'éléments en fonction de l'index de début et l'index de fin sur la liste des éléments visibles.
     * @param indexFrom index sur la liste des éléments visibles du premier élément à sélectioner.
     * @param indexTo index sur la liste des éléments visibles du dernier élément à sélectioner.
     * @return Observable résolu par la fonction.
     */
    protected selectRange$(indexFrom: number, indexTo?: number): Observable<number> {
        const itemListService = this.getItemListService();
        return this.ensureListCaches$().pipe(
            switchMap(() => itemListService.selectRange$(indexFrom, indexTo)));
    }

    /** Change l'état de selection de l'élément spécifié.
     * @param items Liste des éléments à modifier.
     * @param selected True si les éléments divent être sélectionés, False si ils doivent être déselectionés.
     * @return Observable résolu par la fonction.
     */
    protected toggleSelect$(items: IItemBase<T>[], selected: boolean): Observable<IItemBase<T>[]> {
        const itemListService = this.getItemListService();
        return itemListService.toggleSelect$(items, selected);
    }

    /** Définit si l'élément spécifié peut être réduit.
     * @param item Elément à analyser.
     * @return True si l'élément peut être réduit.
     */
    protected isCollapsible(item: IItemTree<T>): boolean {
        return item?.$items && item.collapsible !== false;
    }

    /** Définit si l'élément spécifié est selectionable.
     * @param item Elément à analyser.
     * @return True si l'élément est selectionable.
     */
    protected isSelectable(item: IItemBase<T>): boolean {
        return item && item.selectable !== false;
    }

    /** Définit le champ à utiliser comme valeur d'affichage.
     * @param value Champ à utiliser comme valeur d'affichage.
     */
    protected setTextField(value: string): void {
        this._textField = value;
    }

    /** Retourne le champ utilisé comme valeur d'affichage.*/
    protected getTextField(): string {
        return this._textField || ItemListService.defaultTextField;
    }

    /** Définit le champ à utiliser comme valeur de comparaison.
     * @param value Champ à utiliser comme valeur de comparaison.
     */
    protected setValueField(value: string): void {
        this._valueField = value;
        if (this._itemListService) {
            this._itemListService.valueField = value;
        }
    }

    /** Retourne le champ utilisé comme valeur de comparaison.*/
    protected getValueField(): string {
        return this._valueField || ItemListService.defaultValueField;
    }

    /** Définit le champ à utiliser comme champ de recherche.
     * Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.
     * @param value Champ à utiliser comme champ de recherche.
     */
    protected setSearchField(value: string): void {
        this._searchField = value;
    }

    /** Définit la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    protected setMaxHeight(value: NumberInput): void {
        this._maxHeight = value === 'auto' ? null : +value || null;
        this.viewPort.maxSize$.next(value);
    }

    /** Retourne la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    protected getMaxHeight(): number {
        return this._maxHeight;
    }

    /** Internal usage. Calc the best target when an item is drag and dropped */
    protected calcDragTargetIndex$(index: number, targetIndex: number): Observable<number> {
        return this.ensureListCaches$().pipe(
            switchMap(() => this.getItemListService().calcDragTargetIndex$(index, targetIndex)));
    }

    /** Internal usage */
    protected getItemTreeInfo(items: IItemBase<T>[], item: IItemBase<T>): IItemTreeInfo<T> {
        const parentIndex = items.findIndex(itm => itm === item);
        if (parentIndex < 0) {
            return null;
        }

        const treeItem = item as IItemTree<T>;
        const parentDepth = treeItem.depth;
        let lastIndex = parentIndex;
        const children = [] as IItemBase<T>[];

        if (parentDepth !== undefined) {
            // eslint-disable-next-line no-loops/no-loops
            for (let i = parentIndex + 1; i < items.length; i++) {
                const curItem = items[i] as IItemTree<T>;
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
            startIndex: parentIndex
        } as IItemTreeInfo<T>;
    }

    /** Calcule le viewport pour le conteneur spécifié. */
    protected calcViewList$(query?: string): Observable<IViewListResult<T>> {
        return this.getViewList$(query).pipe(
            tap((result: IViewListResult<T>) => {
                if (result.depthMax !== undefined) {
                    this._depthMax = result.depthMax;
                }
                this.rowsCount = result.visibleList.length;
                this.viewPort.items$.next(result.visibleList);
            }));
    }

    protected ensureListCaches$(): Observable<IViewListResult<T>> {
        return this._itemListService.hasCache ? of(null) : this.getViewList$();
    }

    /** Calcul la position de la scrollbar pour que l'élément spécifié soit dans la zone visible. */
    protected ensureItemVisible(item: IItemBase<T> | number): void {
        this.viewPort.ensureItem$.next(item);
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    protected mapToIItemBase(modls: any[], selected?: boolean): IItemBase<T>[] {
        const m = modls || [];
        return m.map(model => {
            const itemBase: IItemBase<T> = {};

            itemBase.model = model;

            const displayField = this.getTextField();
            const valueField = this.getValueField();

            if (typeof model === 'string') {
                (<any>itemBase)[displayField] = model;
                (<any>itemBase)[valueField] = model;

                if (this._searchField) {
                    (<any>itemBase)[this._searchField] = model;
                }

            } else {
                (<any>itemBase)[displayField] = this.getTextValue(model);
                (<any>itemBase)[valueField] = model[valueField];

                if (this._searchField) {
                    (<any>itemBase)[this._searchField] = model[this._searchField];
                }
            }

            const childrenField = this.getItemListService().childrenField;
            if (model[childrenField]) {
                (<any>itemBase)[childrenField] = this.mapToIItemBase(model[childrenField], selected);
            } else {
                itemBase.selected = selected || undefined;
            }

            return itemBase;
        });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    protected getVirtualSelectedEntities(value: any): unknown | unknown[] {
        const dic = (v: any) => {
            if (typeof v === 'string') {
                v = v.trim();
            }
            const model = {};
            const textField = this.getTextField();
            const valueField = this.getValueField();
            (<any>model)[textField] = v.toString();
            (<any>model)[valueField] = v;
            return model;
        };

        if (value) {
            const modelType = typeof value;
            if (modelType === 'string' || modelType === 'number') {
                value = this._multiSelect ? value.split(',').map(dic) : dic(value);
            } else if (value instanceof Array && value.length) {
                const type = typeof value[0];
                if (type === 'string' || type === 'number') {
                    value = this._multiSelect ? value.map(dic) : dic(value[0]);
                }
            } else if (value instanceof Array && !this._multiSelect) {
                value = null;
            }
        }

        return value;
    }
}

export interface IItemTreeInfo<T> {
    item?: IItemBase<T>;
    children?: IItemBase<T>[];
    startIndex: number;
    lastIndex?: number;
}
