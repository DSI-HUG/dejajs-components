/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Optional, Output, Self, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DejaChildValidatorDirective, DejaClipboardService, DejaItemComponent, DejaItemEvent, DejaItemsEvent, GroupingService, IFindItemResult, IItemBase, IItemTree, ItemListBase, ItemListService, IViewListResult, IViewPort, KeyCodes, Position, Rect, SortingService, ViewPortService } from '@deja-js/component/core';
import { IDejaDragContext, IDejaDragEvent, IDejaDropContext } from '@deja-js/component/dragdrop';
import { BehaviorSubject, combineLatestWith, debounceTime, filter, fromEvent, map, mergeWith, Observable, of, Subject, Subscription, switchMap, take, takeUntil, tap, timer } from 'rxjs';

import { DejaTreeListScrollEvent } from './tree-list-scroll-event';

/** Composant de liste évoluée avec gestion de viewport et templating */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ViewPortService],
    selector: 'deja-tree-list',
    styleUrls: [
        './tree-list.component.scss'
    ],
    templateUrl: './tree-list.component.html'
})
export class DejaTreeListComponent extends ItemListBase<unknown> implements AfterViewInit, AfterContentInit, ControlValueAccessor {
    @ContentChildren(DejaItemComponent) public options: DejaItemComponent[];

    /** Exécuté lorsque la scrollbar change de position. */
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() public readonly scroll = new EventEmitter<DejaTreeListScrollEvent>();
    /** Texte à afficher par default dans la zone de recherche */
    @Input() public placeholder: string;
    /** Texte affiché si aucune donnée n'est présente dans le tableau */
    @Input() public nodataholder: string;
    /** Correspond au ngModel du champ de filtrage ou recherche */
    @Input() public query = '';
    /** Permet de définir un template de ligne par binding */
    @Input() public itemTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template de ligne parente par binding. */
    @Input() public parentItemTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template pour le loader par binding. */
    @Input() public loaderTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template d'entête de colonne par binding. */
    @Input() public headerTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template comme prefixe de la zone de recherche par binding. */
    @Input() public searchPrefixTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template comme suffixe de la zone de recherche par binding. */
    @Input() public searchSuffixTemplateExternal: TemplateRef<unknown>;
    /** Largeur des éléments par defaut si différent de 100% */
    @Input() public itemsWidth: number = null;
    /** Exécuté lorsque le déplacement d'une ligne est terminée. */
    @Output() public readonly itemDragEnd = new EventEmitter<IDejaDragEvent>();
    /** Exécuté lorsque le déplacement d'une ligne commence. */
    @Output() public readonly itemDragStart = new EventEmitter<IDejaDragEvent>();
    /** Exécuté lorsque l'utilisateur sélectionne ou désélectionne une ligne. */
    @Output() public readonly selectedChange = new EventEmitter<DejaItemsEvent<unknown> | DejaItemEvent<unknown>>();
    /** Exécuté lorsque le calcul du viewPort est executé. */
    @Output() public readonly viewPortChanged = new EventEmitter<IViewPort>();

    /** Internal use */
    @ViewChild('inputelement') public input: ElementRef;

    @HostBinding('attr.disabled') public _disabled: boolean = null;

    // Templates
    @ContentChild('itemTemplate') private itemTemplateInternal: TemplateRef<unknown>;
    @ContentChild('parentItemTemplate') private parentItemTemplateInternal: TemplateRef<unknown>;
    @ContentChild('loaderTemplate') private loaderTemplateInternal: TemplateRef<unknown>;
    @ContentChild('headerTemplate') private headerTemplateInternal: TemplateRef<unknown>;
    @ContentChild('searchPrefixTemplate') private searchPrefixTemplateInternal: TemplateRef<unknown>;
    @ContentChild('searchSuffixTemplate') private searchSuffixTemplateInternal: TemplateRef<unknown>;

    public setQuery$ = new Subject<string>();

    private _keyboardNavigation = false;

    // protected _items: IItemBase[]; In the base class, correspond to the model
    private clickedItem: IItemBase<unknown>;
    private rangeStartIndex = 0;
    private filterExpression = '';
    private _searchArea = false;
    private _sortable = false;
    private _itemsDraggable = false;
    private hasCustomService = false;
    private hasLoadingEvent = false;
    private _modelIsValue = false;

    private keyboardNavigation$ = new Subject<void>();

    private mouseUp$sub: Subscription;

    private clearFilterExpression$ = new BehaviorSubject<void>(null);
    private writeValue$ = new Subject<unknown[] | unknown>();
    private selectItems$ = new Subject<unknown[] | unknown>();
    private contentInitialized$ = new Subject<boolean>();

    /** Définit la longueur minimale de caractères dans le champ de recherche avant que la recherche ou le filtrage soient effectués */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('min-search-length')
    public set minSearchlength(value: NumberInput) {
        this._minSearchLength = coerceNumberProperty(value);
    }

    public get minSearchlength(): NumberInput {
        return this._minSearchLength;
    }

    public constructor(changeDetectorRef: ChangeDetectorRef, public viewPort: ViewPortService, public elementRef: ElementRef, @Self() @Optional() public control: NgControl, @Optional() private clipboardService: DejaClipboardService) {
        super(changeDetectorRef, viewPort);

        console.warn('@deja-js/component/deja-tree-list is deprecated, and will be removed in a further version. Please use @deja-js/component/v2/tree-list instead.');

        if (this.control) {
            this.control.valueAccessor = this;
        }

        this.clearFilterExpression$.pipe(
            debounceTime(400),
            takeUntil(this.destroyed$)
        ).subscribe(() => this.filterExpression = '');

        this.keyboardNavigation$.pipe(
            tap(() => this._keyboardNavigation = true),
            debounceTime(1000),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this._keyboardNavigation = false;
            this.changeDetectorRef.markForCheck();
        });

        fromEvent<Event>(window, 'resize').pipe(
            debounceTime(5),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.viewPort.deleteSizeCache();
            this.viewPort.refresh();
            this.changeDetectorRef.markForCheck();
        });

        this.setQuery$.pipe(
            debounceTime(250),
            switchMap(query => {
                this.query = query;
                this.setCurrentItem(undefined);
                return this.calcViewList$();
            }),
            takeUntil(this.destroyed$)
        ).subscribe();

        const selectItems$ = this.selectItems$.pipe(
            combineLatestWith(this.contentInitialized$),
            map(([value]) => value),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            map(value => this.getVirtualSelectedEntities(value)),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            map(value => (value instanceof Array && value) || (value && [value]) || [] as unknown[]),
            tap(values => super.setSelectedItems(values)));

        const selectModels$ = this.writeValue$.pipe(
            combineLatestWith(this.contentInitialized$),
            map(([value]) => {
                if (this.modelIsValue === undefined) {
                    if (value instanceof Array) {
                        const av = value || [];
                        const modelType = av.length && typeof av[0];
                        this.modelIsValue = modelType === 'string' || modelType === 'number';
                    } else {
                        const modelType = typeof value;
                        this.modelIsValue = value === '' || modelType === 'string' || modelType === 'number';
                    }
                }
                if (this.modelIsValue) {
                    this.query = '';
                }
                return value;
            }),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            map(value => this.getVirtualSelectedEntities(value)),
            tap(value => super.setSelectedModels(!value || this._multiSelect || value instanceof Array ? value as unknown[] : [value])));

        selectModels$.pipe(
            mergeWith(selectItems$),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            super.getItemListService().ensureSelection();
            this.changeDetectorRef.markForCheck();
        });

        this._viewPortChanged = this.viewPortChanged;

        this.maxHeight = 0;
    }

    @ViewChild('listElement', { static: true })
    public set listElememtRef(elem: ElementRef<HTMLElement>) {
        this.listElement = elem.nativeElement;
    }

    public keyboardNavigation(): boolean {
        return this._keyboardNavigation;
    }

    /** Affiche un barre de recherche au dessus de la liste. */
    @Input()
    public set searchArea(value: BooleanInput) {
        this._searchArea = coerceBooleanProperty(value);
    }

    public get searchArea(): BooleanInput {
        return this._searchArea || this.minSearchlength > 0;
    }

    /** Définit une valeur indiquant si en reactive form le model renvoyé doit être un obeject oue une valeur */
    @Input()
    public set modelIsValue(value: BooleanInput) {
        this._modelIsValue = coerceBooleanProperty(value);
    }

    public get modelIsValue(): BooleanInput {
        return this._modelIsValue;
    }

    /** Retourne ou définit une valeur indiquant si les lignes de la liste peuvent être déplacées manuelement par l'utilisateur */
    @Input()
    public set sortable(value: BooleanInput) {
        this._sortable = coerceBooleanProperty(value);
    }

    public get sortable(): BooleanInput {
        return this._sortable;
    }

    /** Retourne ou définit une valeur indiquant si les lignes peuvent être déplacées vers un autre composant */
    @Input()
    public set itemsDraggable(value: BooleanInput) {
        this._itemsDraggable = coerceBooleanProperty(value);
    }

    public get itemsDraggable(): BooleanInput {
        return this._itemsDraggable;
    }

    @Input()
    /** Définit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
    public set pageSize(value: NumberInput) {
        this._pageSize = coerceNumberProperty(value);
    }

    /** Retourne le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
    public get pageSize(): NumberInput {
        if (this._pageSize === 0) {
            const vpRowHeight = this.getViewPortRowHeight();
            const containerHeight = this.getMaxHeight() || this.listElement.clientHeight;
            return Math.floor(containerHeight / vpRowHeight);
        }

        return this._pageSize;
    }

    /** Définit un texte de conseil en cas d'erreur de validation ou autre */
    @Input()
    public set hintLabel(value: string) {
        this.setHintLabel(value);
    }

    /** Retourne un texte de conseil en cas d'erreur de validation ou autre */
    public get hintLabel(): string {
        return this._hintLabel;
    }

    /** Définit la hauteur d'une ligne pour le calcul du viewport en pixels (la valeur par défaut sera utilisée si aucune valeur n'est setté). */
    @Input()
    public set viewPortRowHeight(value: NumberInput) {
        this.setViewPortRowHeight(value);
    }

    /**
     * Les valeurs acceptées en paramètre se trouvent dans l'enum ViewportMode (disabled, constant, variable ou auto)
     * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
     * est suceptible de contenir beaucoup d'éléments.
     */
    @Input()
    public set viewportMode(mode: string) {
        this.setViewportMode(mode);
    }

    /** Retourne le champ utilisé pour la liste des enfants d'un parent */
    @Input()
    public set childrenField(value: string) {
        super.setChildrenField(value);
    }

    /** Définit le champ utilisé pour la liste des enfants d'un parent */
    public get childrenField(): string {
        return this._childrenField;
    }

    /** Définit le champ à utiliser comme valeur d'affichage. */
    @Input()
    public set textField(value: string) {
        super.setTextField(value);
    }

    /** Définit le champ à utiliser comme valeur de comparaison. */
    @Input()
    public set valueField(value: string) {
        super.setValueField(value);
    }

    /** Définit le champ à utiliser comme champ de recherche.
     * Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.
     */
    @Input()
    public set searchField(value: string) {
        super.setSearchField(value);
    }

    /** Retourne le champ à utiliser comme champ de recherche.
     * Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.
     */
    public get searchField(): string {
        return this._searchField;
    }

    /** Définit la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    @Input()
    public set maxHeight(value: NumberInput) {
        super.setMaxHeight(value);
    }

    /** Retourne la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    public get maxHeight(): NumberInput {
        return this.getMaxHeight();
    }

    /** Définit la ligne courant ou ligne active */
    @Input()
    public set currentItem(item: IItemBase<unknown>) {
        super.setCurrentItem(item);
        if (item) {
            this.ensureItemVisible(item);
        }
    }

    /** Retourne la ligne courant ou ligne active */
    public get currentItem(): IItemBase<unknown> {
        return super.getCurrentItem();
    }

    /** Retourne le nombre de niveau pour une liste hierarchique */
    public get depthMax(): number {
        return this._depthMax;
    }

    /** Définit une valeur indiquant si plusieurs lignes peuvent être sélectionées. */
    @Input()
    public set multiSelect(value: BooleanInput) {
        super.setMultiSelect(coerceBooleanProperty(value));
    }

    /** Retourne une valeur indiquant si plusieurs lignes peuvent être sélectionées. */
    public get multiSelect(): BooleanInput {
        return this._multiSelect;
    }

    /** Définit la liste des éléments selectionés en mode multiselect */
    @Input()
    public set selectedItems(value: IItemBase<unknown>[]) {
        if (value !== undefined) {
            this.selectItems$.next(value);
        }
    }

    /** Retourne la liste des éléments selectionés en mode multiselect */
    public get selectedItems(): IItemBase<unknown>[] {
        return super.getSelectedItems();
    }

    /** Définit l'élément selectioné en mode single select */
    @Input()
    public set selectedItem(value: unknown) {
        if (value !== undefined) {
            this.selectItems$.next(value);
        }
    }

    /** Retourne l'éléments selectioné en mode single select */
    public get selectedItem(): unknown {
        const selectedItem = super.getSelectedItems();
        return selectedItem?.[0];
    }

    /** Définit le model selectioné en mode single select */
    @Input()
    public set selectedModel(value: unknown) {
        if (value !== undefined) {
            this.writeValue(value);
        }
    }

    /** Retourne le model selectioné en mode single select */
    public get selectedModel(): unknown {
        const selectedModel = super.getSelectedModels();
        return selectedModel?.[0];
    }

    /** Définit la liste des models selectionés en mode multiselect */
    @Input()
    public set selectedModels(value: unknown[]) {
        if (value !== undefined) {
            this.writeValue(value);
        }
    }

    /** Retourne la liste des models selectionés en mode multiselect */
    public get selectedModels(): unknown[] {
        return super.getSelectedModels();
    }

    /** Definit le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading. */
    @Input()
    public set itemListService(itemListService: ItemListService<unknown>) {
        if (itemListService !== undefined) {
            this.hasCustomService = true;
            this.setItemListService(itemListService);
            if (itemListService?.lastQuery) {
                this.query = itemListService.lastQuery.toString();
            }
        }
    }

    /** Retourne le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading. */
    public get itemListService(): ItemListService<unknown> {
        return this.getItemListService();
    }

    /** Definit le service utilisé pour le tri de la liste */
    @Input()
    public set sortingService(value: SortingService) {
        this.setSortingService(value);
    }

    /** Definit le service utilisé pour le regroupement de la liste */
    @Input()
    public set groupingService(value: GroupingService) {
        this.setGroupingService(value);
    }

    /** Définit la liste des éléments */
    // eslint-disable-next-line rxjs/finnish
    @Input() public set items(items: IItemBase<unknown>[] | Promise<IItemBase<unknown>[]> | Observable<IItemBase<unknown>[]>) {
        delete this.hintLabel;
        super.setItems$(items).pipe(
            switchMap(itms => {
                if (this.minSearchlength > 0 && !this.query) {
                    // Waiting for query
                    this._itemList = [];
                    this.changeDetectorRef.markForCheck();
                    return of(itms);
                } else {
                    return this.calcViewList$().pipe(map(() => itms));
                }
            }),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    /**
     * Set a observable called before the list will be displayed
     */
    @Input()
    public set loadingItems(fn: (query: string | RegExp, selectedItems: IItemBase<unknown>[]) => Observable<IItemBase<unknown>[]>) {
        this.hasLoadingEvent = !!fn;
        super.setLoadingItems(fn);
    }

    /**
     * Set a promise or an observable called before an item selection
     */
    @Input()
    public set selectingItem(fn: (item: IItemBase<unknown>) => Promise<IItemBase<unknown>> | Observable<IItemBase<unknown>>) {
        super.setSelectingItem(fn);
    }

    /**
     * Set a promise or an observable called before an item deselection
     */
    @Input()
    public set unselectingItem(fn: (item: IItemBase<unknown>) => Promise<IItemBase<unknown>> | Observable<IItemBase<unknown>>) {
        super.setUnselectingItem(fn);
    }

    /**
     * Set a promise or an observable called before an item expand
     */
    @Input()
    public set expandingItem(fn: (item: IItemTree<unknown>) => Promise<IItemTree<unknown>> | Observable<IItemTree<unknown>>) {
        super.setExpandingItem(fn);
    }

    /**
     * Set a promise or an observable called before an item collapse
     */
    @Input()
    public set collapsingItem(fn: (item: IItemTree<unknown>) => Promise<IItemTree<unknown>> | Observable<IItemTree<unknown>>) {
        super.setCollapsingItem(fn);
    }

    /** Définit la liste des éléments (tout type d'objet métier) */
    // eslint-disable-next-line rxjs/finnish
    @Input() public set models(items: unknown[] | Observable<unknown[]>) {
        super.setModels$(items).pipe(
            take(1),
            switchMap(() => this.calcViewList$()),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    /** Permet de désactiver la liste */
    @Input()
    public set disabled(value: BooleanInput) {
        const disabled = coerceBooleanProperty(value);
        this._disabled = disabled || null;
        this.changeDetectorRef.markForCheck();
    }

    public get disabled(): BooleanInput {
        return this._disabled;
    }

    /** Definit si le waiter doit être affiché dans la liste. */
    @Input()
    public set waiter(value: BooleanInput) {
        this._waiter = coerceBooleanProperty(value);
    }

    /** Retourne si le waiter doit être affiché dans la liste. */
    public get waiter(): BooleanInput {
        return this._waiter;
    }

    @ViewChild(DejaChildValidatorDirective)
    public set inputValidatorDirective(value: DejaChildValidatorDirective) {
        if (value) {
            value.parentControl = this.control;
        }
    }

    public set currentItemIndex(value: number) {
        super.setCurrentItemIndex(value);
        this.changeDetectorRef.markForCheck();
    }

    public get currentItemIndex(): number {
        return this.getCurrentItemIndex();
    }

    public get itemTemplate(): TemplateRef<unknown> {
        return this.itemTemplateExternal || this.itemTemplateInternal;
    }

    public get parentItemTemplate(): TemplateRef<unknown> {
        return this.parentItemTemplateExternal || this.parentItemTemplateInternal;
    }

    public get loaderTemplate(): TemplateRef<unknown> {
        return this.loaderTemplateExternal || this.loaderTemplateInternal;
    }

    public get headerTemplate(): TemplateRef<unknown> {
        return this.headerTemplateExternal || this.headerTemplateInternal;
    }

    public get searchPrefixTemplate(): TemplateRef<unknown> {
        return this.searchPrefixTemplateExternal || this.searchPrefixTemplateInternal;
    }

    public get searchSuffixTemplate(): TemplateRef<unknown> {
        return this.searchSuffixTemplateExternal || this.searchSuffixTemplateInternal;
    }

    // ************* ControlValueAccessor Implementation **************
    public get value(): unknown {
        return this._multiSelect ? this.selectedItems : this.selectedItem;
    }

    public set value(val: unknown) {
        this.writeValue(val);
        this.onChangeCallback(val);
        this.onTouchedCallback();
    }

    public writeValue(value: IItemBase<unknown>[] | IItemBase<unknown>): void {
        this.writeValue$.next(value);
    }

    public registerOnChange(fn: (_a: unknown) => void): void {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    // ************* End of ControlValueAccessor Implementation **************

    /** Change l'état d'expansion de toute les lignes parentes */
    public toggleAll$(collapsed?: boolean): Observable<IItemTree<unknown>[]> {
        return super.toggleAll$(collapsed).pipe(
            switchMap(items => this.calcViewList$().pipe(take(1), map(() => items))));
    }

    /** Change l'état d'expansion de toute les lignes parentes */
    public toggleAll(collapsed?: boolean): void {
        this.toggleAll$(collapsed).pipe(
            take(1),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    /** Positionne a scrollbar pour assurer que l'élément spécifié soit visible */
    public ensureItemVisible(item: IItemBase<unknown> | number): void {
        super.ensureItemVisible(item);
    }

    /** Efface le contenu de la liste */
    public clearViewPort(): void {
        super.clearViewPort();
    }

    public ngAfterContentInit(): void {
        if (!this.items && this.options?.length) {
            const selectedModels = [] as unknown[];
            this.valueField = 'value';
            this.textField = 'text';
            const models = this.options.map(option => {
                const model = {
                    text: option.text,
                    value: option.value
                };
                if (option.selected) {
                    selectedModels.push(model);
                }
                return model;
            });
            this.models = models;
            if (selectedModels.length) {
                this.selectedModels = selectedModels;
            }
            if (models.length > 100) {
                // eslint-disable-next-line no-debugger
                debugger;
                console.error('Select options with more than 100 items can have performance options. Please bind directly the items in code behind with items or models input.');
            }
        }

        this.contentInitialized$.next(true);
    }

    public ngAfterViewInit(): void {
        // FIXME Issue angular/issues/6005
        // see http://stackoverflow.com/questions/34364880/expression-has-changed-after-it-was-checked
        if (this._itemList.length === 0 && (this.hasCustomService || this.hasLoadingEvent)) {
            timer(1).pipe(
                take(1),
                switchMap(() => this.calcViewList$()),
                takeUntil(this.destroyed$)
            ).subscribe();
        }

        fromEvent<Event>(this.listElement, 'scroll').pipe(
            map(event => {
                const target = event.target as HTMLElement;
                const e = {
                    originalEvent: event,
                    scrollLeft: target.scrollLeft,
                    scrollTop: target.scrollTop
                } as DejaTreeListScrollEvent;

                this.scroll.emit(e);
                return target.scrollTop;
            }),
            takeUntil(this.destroyed$)
        ).subscribe(scrollPos => this.viewPort.scrollPosition$.next(scrollPos));

        let keyDown$ = fromEvent<KeyboardEvent>(this.listElement, 'keydown');
        if (this.input) {
            const inputKeyDown$ = fromEvent<KeyboardEvent>(this.input.nativeElement, 'keydown');
            keyDown$ = keyDown$.pipe(
                mergeWith(inputKeyDown$)
            );
        }

        keyDown$.pipe(
            filter(() => !this.disabled),
            filter(event => {
                const keyCode = event.code;
                return keyCode === KeyCodes.Home ||
                    keyCode === KeyCodes.End ||
                    keyCode === KeyCodes.PageUp ||
                    keyCode === KeyCodes.PageDown ||
                    keyCode === KeyCodes.UpArrow ||
                    keyCode === KeyCodes.DownArrow ||
                    keyCode === KeyCodes.Space ||
                    keyCode === KeyCodes.Enter;
            }),
            switchMap(event => this.ensureListCaches$().pipe(
                switchMap(() => {
                    if (!this.rowsCount) {
                        return of(null);
                    }

                    // Set current item from index for keyboard features only
                    const setCurrentIndex = (index: number): void => {
                        this.currentItemIndex = index;
                        this.ensureItemVisible(this.currentItemIndex);
                        this.viewPort.refresh();
                    };

                    const currentIndex = this.rangeStartIndex >= 0 ? this.rangeStartIndex : this.rangeStartIndex = this.currentItemIndex;
                    let upindex: number;
                    let dindex: number;
                    let uaindex: number;
                    let daindex: number;
                    let target: HTMLElement;
                    let eitem: IItemTree<unknown>;
                    let sitem: IItemTree<unknown>;

                    switch (event.code) {
                        case KeyCodes.Home:
                            setCurrentIndex(0);
                            if (event.shiftKey) {
                                return this.selectRange$(currentIndex, 0);
                            } else if (!event.ctrlKey) {
                                this.rangeStartIndex = 0;
                                return this.selectRange$(this.rangeStartIndex);
                            } else {
                                return of(-1);
                            }

                        case KeyCodes.End:
                            setCurrentIndex(this.rowsCount - 1);
                            if (event.shiftKey) {
                                return this.selectRange$(currentIndex, this.rowsCount - 1);
                            } else if (!event.ctrlKey) {
                                this.rangeStartIndex = this.rowsCount - 1;
                                return this.selectRange$(this.rangeStartIndex);
                            } else {
                                return of(-1);
                            }

                        case KeyCodes.PageUp:
                            upindex = Math.max(0, this.currentItemIndex - this._pageSize);
                            setCurrentIndex(upindex);
                            if (event.shiftKey) {
                                return this.selectRange$(currentIndex, upindex);
                            } else if (!event.ctrlKey) {
                                this.rangeStartIndex = upindex;
                                return this.selectRange$(this.rangeStartIndex);
                            } else {
                                return of(-1);
                            }

                        case KeyCodes.PageDown:
                            dindex = Math.min(this.rowsCount - 1, this.currentItemIndex + this._pageSize);
                            setCurrentIndex(dindex);
                            if (event.shiftKey) {
                                return this.selectRange$(currentIndex, dindex);
                            } else if (!event.ctrlKey) {
                                this.rangeStartIndex = dindex;
                                return this.selectRange$(this.rangeStartIndex);
                            } else {
                                return of(-1);
                            }

                        case KeyCodes.UpArrow:
                            uaindex = Math.max(0, this.currentItemIndex - 1);
                            if (uaindex !== -1) {
                                setCurrentIndex(uaindex);
                                if (event.shiftKey) {
                                    return this.selectRange$(currentIndex, uaindex);
                                } else if (!event.ctrlKey) {
                                    this.rangeStartIndex = uaindex;
                                    return this.selectRange$(this.rangeStartIndex);
                                }
                            }
                            return of(-1);

                        case KeyCodes.DownArrow:
                            daindex = Math.min(this.rowsCount - 1, this.currentItemIndex + 1);
                            if (daindex !== -1) {
                                setCurrentIndex(daindex);
                                if (event.shiftKey) {
                                    return this.selectRange$(currentIndex, daindex);
                                } else if (!event.ctrlKey) {
                                    this.rangeStartIndex = daindex;
                                    return this.selectRange$(this.rangeStartIndex);
                                }
                            }
                            return of(-1);

                        case KeyCodes.Space:
                            target = event.target as HTMLElement;
                            if (target.tagName === 'INPUT' && !event.ctrlKey && !event.shiftKey) {
                                return of(null);
                            }

                            sitem = this.currentItem;
                            if (sitem) {
                                if (this.isCollapsible(sitem)) {
                                    return this.toggleCollapse$(currentIndex, !sitem.collapsed);
                                } else if (sitem.selected) {
                                    return this.toggleSelect$([sitem], false);
                                } else if (this.multiSelect && event.ctrlKey) {
                                    return this.toggleSelect$([sitem], !sitem.selected);
                                } else {
                                    return this.unselectAll$().pipe(
                                        switchMap(() => this.toggleSelect$([sitem], true))
                                    );
                                }
                            }
                            return of(-1);

                        case KeyCodes.Enter:
                            eitem = this.currentItem;
                            if (eitem) {
                                if (this.isCollapsible(eitem)) {
                                    return this.toggleCollapse$(currentIndex, !eitem.collapsed);
                                } else if (this.isSelectable(eitem)) {
                                    return this.unselectAll$().pipe(
                                        switchMap(() => this.toggleSelect$([eitem], true))
                                    );
                                }
                            }
                            return of(-1);

                        default:
                            return of(null);
                    }
                }),
                map(continuePropagation => {
                    if (continuePropagation !== null) {
                        this.keyboardNavigation$.next();
                        this.changeDetectorRef.markForCheck();
                        event.preventDefault();
                        return false;
                    }
                    return undefined;
                })
            )),
            takeUntil(this.destroyed$)
        ).subscribe();

        let keyUp$ = fromEvent<KeyboardEvent>(this.listElement, 'keyup');
        if (this.input) {
            const inputKeyup$ = fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup');
            const inputDrop$ = fromEvent<KeyboardEvent>(this.input.nativeElement, 'drop');
            keyUp$ = keyUp$.pipe(
                mergeWith(inputKeyup$, inputDrop$)
            );
        }

        // Ensure list cache
        keyUp$.pipe(
            filter(() => !this.disabled),
            tap(() => {
                if ((this.query || '').length < this.minSearchlength) {
                    this._itemList = [];
                    return;
                }
            }),
            filter(event => {
                const keyCode = event.code;
                return keyCode >= KeyCodes.Key0 ||
                    keyCode === KeyCodes.Backspace ||
                    keyCode === KeyCodes.Space ||
                    keyCode === KeyCodes.Delete;
            }),
            switchMap(event => {
                if (!this.searchArea) {
                    if ((/[a-zA-Z0-9]/).test(event.key)) {
                        // Valid char
                        this.clearFilterExpression$.next(null);

                        // Search next
                        this.filterExpression += event.key;
                        const rg = new RegExp(`^${this.filterExpression}`, 'i');
                        return this.findNextMatch$(item => {
                            if (item && this.isSelectable(item)) {
                                const label = this.getTextValue(item);
                                if (rg.test(label)) {
                                    return true;
                                }
                            }
                            event.preventDefault();
                            return false;
                        }, this.currentItemIndex);
                    }
                } else {
                    // Autocomplete, filter the list
                    this.keyboardNavigation$.next();
                }

                return of(null as IFindItemResult<unknown>);
            }),
            filter(result => result?.index >= 0),
            takeUntil(this.destroyed$)
        ).subscribe(result => {
            // Set current item from index for keyboard features only
            this.currentItemIndex = result.index;
            this.ensureItemVisible(this.currentItemIndex);
        });

        this.viewPort.element$.next(this.listElement);
    }

    public mousedown(e: MouseEvent): boolean {
        if (this.mouseUp$sub) {
            this.mouseUp$sub.unsubscribe();
            this.mouseUp$sub = undefined;
        }

        if (this.disabled) {
            return undefined;
        }

        const target = e.target as HTMLElement;
        const itemIndex = this.getItemIndexFromHTMLElement(target);
        if (itemIndex === undefined) {
            return undefined;
        }

        const isExpandButton = (el: HTMLElement): boolean => el.id === 'expandbtn' || el.parentElement.id === 'expandbtn';

        const item = this._itemList[itemIndex - this.vpStartRow];
        this.clickedItem = item;

        if ((!isExpandButton(target) || !this.isCollapsible(item)) && this.isSelectable(item) && (!e.ctrlKey || !this.multiSelect) && (e.button === 0 || !item.selected)) {
            if (e.shiftKey && this.multiSelect) {
                // Select all from current to clicked
                this.selectRange$(itemIndex, this.currentItemIndex).pipe(
                    take(1),
                    takeUntil(this.destroyed$)
                ).subscribe(() => this.changeDetectorRef.markForCheck());
                return false;
            } else if (!e.ctrlKey) {
                if (!this.multiSelect && item.selected) {
                    return undefined;
                }

                this.unselectAll$().pipe(
                    take(1),
                    switchMap(() => {
                        this.currentItemIndex = itemIndex;
                        return this.toggleSelect$([item], true);
                    }),
                    take(1),
                    takeUntil(this.destroyed$)
                ).subscribe(() => this.changeDetectorRef.markForCheck());
            }
        }

        this.mouseUp$sub = fromEvent<MouseEvent>(this.listElement, 'mouseup').pipe(
            take(1),
            filter(() => !this.disabled),
            switchMap(upevt => {
                // Because .take(1)
                this.mouseUp$sub = undefined;

                const upTarget = upevt.target as HTMLElement;
                const upIndex = this.getItemIndexFromHTMLElement(upTarget);
                if (upIndex === undefined) {
                    return of(null as number);
                }

                const upItem = this._itemList[upIndex - this.vpStartRow];
                if (this.clickedItem && upItem !== this.clickedItem) {
                    return of(null as number);
                }

                if (upevt.shiftKey) {
                    return of(null as number);
                }

                if (upevt.button !== 0) {
                    // Right click menu
                    return of(null as number);
                }

                if (this.isCollapsible(upItem) && (isExpandButton(upTarget) || !this.isSelectable(upItem))) {
                    const treeItem = upItem as IItemTree<unknown>;
                    return this.toggleCollapse$(upIndex, !treeItem.collapsed).pipe(
                        map(() => upIndex)
                    );

                } else if (upevt.ctrlKey) {
                    if (this.multiSelect) {
                        return this.toggleSelect$([upItem], !upItem.selected).pipe(
                            map(() => upIndex)
                        );
                    } else {
                        const o$ = this.selectedItem && this.selectedItem !== upItem ? this.toggleSelect$([this.selectedItem], false).pipe(switchMap(() => this.toggleSelect$([upItem], true))) : this.toggleSelect$([upItem], !upItem.selected);
                        return o$.pipe(
                            map(() => upIndex)
                        );
                    }
                }

                this.rangeStartIndex = -1;
                return of(null as number);
            }),
            filter(currentIndex => currentIndex !== null),
            takeUntil(this.destroyed$)
        ).subscribe(currentIndex => {
            this.currentItemIndex = currentIndex;
            this.changeDetectorRef.markForCheck();
        });

        return undefined;
    }

    public getDragContext(index: number): IDejaDragContext {
        if (!this.clipboardService || (!this.sortable && !this.itemsDraggable)) {
            return null;
        }

        return {
            dragendcallback: (event: IDejaDragEvent) => {
                this.itemDragEnd.emit(event);
                delete this._ddStartIndex;
                delete this._ddTargetIndex;
                this.calcViewList$().pipe(
                    take(1),
                    takeUntil(this.destroyed$)
                ).subscribe(); // Comment this line to debug dragdrop
            },
            dragstartcallback: (event: IDejaDragEvent) => {
                const targetIndex = this.getItemIndexFromHTMLElement(event.target as HTMLElement);
                if (targetIndex === undefined) {
                    return;
                }
                this._ddStartIndex = index;
                event.dragObject = this._itemList[targetIndex - this.vpStartRow];
                this.itemDragStart.emit(event);
            },
            object: {
                index: index
            }
        } as IDejaDragContext;
    }

    public getDropContext(): IDejaDropContext {
        if (!this.clipboardService || !this.sortable) {
            return null;
        }

        const dragcallback = (event: IDejaDragEvent): void => {
            if (this._ddStartIndex === undefined) {
                return;
            }

            const targetIndex = this.getItemIndexFromHTMLElement(event.target as HTMLElement);
            if (targetIndex === undefined) {
                return;
            }

            // Faire calculer le target final en fonction de la hierarchie par le service
            this.calcDragTargetIndex$(this._ddStartIndex, targetIndex).pipe(
                switchMap(finalTarget => {
                    if (finalTarget !== undefined && finalTarget !== this._ddTargetIndex) {
                        this._ddTargetIndex = finalTarget;
                        return this.calcViewList$().pipe(
                            take(1),
                            map(() => finalTarget));
                    } else {
                        return of(finalTarget);
                    }
                }),
                takeUntil(this.destroyed$)
            ).subscribe();

            event.preventDefault();
            return;
        };

        return {
            dragentercallback: dragcallback,
            dragovercallback: dragcallback,
            dropcallback: (event: IDejaDragEvent) => {
                delete this._ddStartIndex;
                delete this._ddTargetIndex;
                this.drop$().pipe(
                    switchMap(() => this.calcViewList$().pipe(take(1))),
                    takeUntil(this.destroyed$)
                ).subscribe();
                event.preventDefault();
            }
        } as IDejaDropContext;
    }

    public dragLeave(event: DragEvent): void {
        const listRect = this.listElement.getBoundingClientRect();

        const listBounds = Rect.fromLTRB(listRect.left,
            listRect.top,
            listRect.right,
            listRect.bottom);

        if (!listBounds.containsPoint(new Position(event.pageX, event.pageY))) {
            this._ddTargetIndex = this._ddStartIndex;
            this.calcViewList$().pipe(
                take(1),
                takeUntil(this.destroyed$)
            ).subscribe();
        }
    }

    public onSelectionChange(): void {
        let outputEmitter = null;

        let output = null;

        if (this.multiSelect) {
            const models = this.selectedModels as Record<string, unknown>[];

            outputEmitter = {
                items: this.selectedItems,
                models: models
            } as DejaItemsEvent<Record<string, unknown>>;

            if (this.modelIsValue) {
                const valueField = this.getValueField();
                if (models.find(m => !!m[valueField])) {
                    output = models.map(m => m[valueField] !== undefined ? m[valueField] : m);
                }
            } else {
                output = models;
            }
        } else {
            const model = this.selectedModel as Record<string, unknown>;

            outputEmitter = {
                item: this.selectedItems[0],
                model: model
            } as DejaItemEvent<Record<string, unknown>>;

            if (this.modelIsValue) {
                const valueField = this.getValueField();
                output = model[valueField] !== undefined ? model[valueField] : model;
            } else {
                output = model;
            }
        }

        this.onChangeCallback(output);
        this.selectedChange.emit(outputEmitter);
    }

    public selectRange$(indexFrom: number, indexTo?: number): Observable<number> {
        return super.selectRange$(indexFrom, indexTo).pipe(tap(selectedCount => {
            if (selectedCount) {
                // Raise event
                this.onSelectionChange();
            }
            return selectedCount;
        }), tap(() => this.changeDetectorRef.markForCheck()));
    }

    public toggleSelect$(items: IItemBase<unknown>[], state: boolean): Observable<IItemBase<unknown>[]> {
        if (!this._multiSelect && !items[0].selected === !state) {
            return of(items);
        } else {
            return super.toggleSelect$(items, state).pipe(
                tap(() => {
                    // Raise event
                    this.onSelectionChange();
                }));
        }
    }

    public calcViewList$(): Observable<IViewListResult<unknown>> {
        return super.calcViewList$(this.query).pipe(
            tap(() => this.changeDetectorRef.markForCheck()));
    }

    public getItemClass(item: IItemTree<unknown>): string {
        const classNames = ['listitem'] as string[];
        if (item.className) {
            classNames.push(item.className);
        }
        if (item.collapsing || item.expanding) {
            classNames.push('hide');
        }
        if (item.depth < this.depthMax) {
            classNames.push('parent');
        }
        if (item.collapsed) {
            classNames.push('collapsed');
        }
        if (item.selected) {
            classNames.push('selected');
        }
        if (!(item.selectable ?? true)) {
            classNames.push('unselectable');
        }
        if (item.depth === this._depthMax && item.odd) {
            classNames.push('odd');
        }
        return classNames.join(' ');
    }

    // NgModel implementation
    public onTouchedCallback = (): void => undefined;
    public onChangeCallback = (_a?: unknown): void => undefined;
}
