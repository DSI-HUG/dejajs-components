/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, DoCheck, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Optional, Output, Self, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { CanDisable, CanUpdateErrorState, ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { IDejaChipsComponentCloseEvent } from '@deja-js/component/chips';
import { DejaChildValidatorDirective, DejaConnectionPositionPair, DejaItemComponent, DejaItemEvent, DejaItemsEvent, GroupingService, IFindItemResult, IItemBase, IItemTree, ItemListBase, ItemListService, IViewListResult, IViewPort, KeyCodes, MediaService, SortingService, ViewPortService } from '@deja-js/component/core';
import { DejaOverlayComponent } from '@deja-js/component/overlay';
import { BehaviorSubject, combineLatest, fromEvent, merge, Observable, of, Subject, Subscription, timer } from 'rxjs';
import { debounce, debounceTime, delay, delayWhen, filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

export type SelectType = 'autocomplete' | 'multiselect' | 'select';

/** Combo box avec une liste basée sur la treelist */
@Component({
    selector: 'deja-select',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        ViewPortService,
        { provide: MatFormFieldControl, useExisting: DejaSelectComponent }
    ],
    styleUrls: [
        './select.component.scss'
    ],
    templateUrl: './select.component.html'
})
export class DejaSelectComponent extends ItemListBase<unknown> implements CanUpdateErrorState, CanDisable, DoCheck, MatFormFieldControl<unknown>, ControlValueAccessor, OnDestroy, AfterViewInit, AfterContentInit {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static nextId = 0;

    @HostBinding() public id = `deja-select-${DejaSelectComponent.nextId++}`;
    @HostBinding('attr.aria-describedby') public describedBy = '';
    @HostBinding('attr.wait') public _waiter = false;
    @ViewChild('inputElement') public inputElement: ElementRef;
    @HostBinding('attr.disabled') public _disabled: boolean = null;
    @HostBinding('attr.readonly') public _readonly: boolean = null;

    /** Texte à afficher par default dans la zone de recherche */
    /** Texte affiché si aucune donnée n'est présente dans le tableau */
    @Input() public nodataholder: string;
    /** Offset de position horizontal de la zone de dropdown */
    @Input() public overlayOffsetX = 0;
    /** Offset de position vertical de la zone de dropdown */
    @Input() public overlayOffsetY = 0;
    /** Nom de classe du backdrop */
    @Input() public overlayBackdropClass: string;
    /** Nom de classe du container de la liste */
    @Input() public overlayContainerClass: string;
    /** Permet de définir un template de ligne par binding */
    @Input() public itemTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template de ligne parente par binding. */
    @Input() public parentItemTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template pour le loader par binding. */
    @Input() public loaderTemplateExternal: TemplateRef<unknown>;
    /** Exécuté lorsque le calcul du viewPort est terminé. */
    @Output() public readonly viewPortChanged = new EventEmitter<IViewPort>();
    /** Exécuté lorsque l'utilisateur sélectionne ou désélectionne une ligne. */
    @Output() public readonly selectedChange = new EventEmitter<DejaItemsEvent<unknown> | DejaItemEvent<unknown>>();
    /** For test only. */
    @Output() public readonly dropDownVisibleChange = new EventEmitter<boolean>();

    @ContentChild('itemTemplate') public itemTemplateInternal: TemplateRef<unknown>;
    @ContentChild('parentItemTemplate') public parentItemTemplateInternal: TemplateRef<unknown>;
    @ContentChild('selectedTemplate') public selectedTemplate: TemplateRef<unknown>;

    @ViewChild(MatInput) protected input: MatInput;

    /** Overlay pane containing the options. */
    @ViewChild(DejaOverlayComponent, { static: true }) private overlay: DejaOverlayComponent;

    @ContentChild('loaderTemplate') private loaderTemplateInternal: TemplateRef<unknown>;

    @HostBinding('class.floating')
    public get shouldLabelFloat(): boolean {
        return this.focused || !this.empty;
    }

    public controlType = 'deja-select';
    public errorState = false;
    public errorStateMatcher: ErrorStateMatcher;
    // eslint-disable-next-line rxjs/finnish
    public stateChanges = new Subject<void>();

    /** Internal use */
    public overlayOwnerElement: HTMLElement;
    public dropDownMaxHeight: number = null;

    protected _keyboardNavigation = false;
    protected isMobile = false;

    private mouseUp$sub: Subscription;

    private _type: SelectType = 'select';
    private selectingItemIndex: number;
    private dropDownQuery = '';
    private filterExpression = '';
    private _dropdownVisible = false;
    private lastScrollPosition = 0;
    private _selectionClearable = false;
    private _dropDownWidth: number;
    private _query = '';
    private _required = false;
    private _placeholder: string;
    private _focused = false;

    private clearFilterExpression$ = new BehaviorSubject<void>(null);
    private filterListComplete$ = new Subject();
    private storeScrollPosition$ = new Subject<number>();
    private hideDropDown$ = new Subject<number>();
    private showDropDown$ = new Subject();
    private filter$ = new Subject<Event>();
    private query$ = new BehaviorSubject<string>('');
    private writeValue$ = new Subject<unknown>();
    private contentInitialized$ = new Subject();

    private keyboardNavigation$ = new Subject();

    private delaySearchTrigger$ = new BehaviorSubject<number>(250);

    private _modelIsValue: boolean;

    /** Définit une valeur indiquant si en reactive form le model renvoyé doit être un object ou une valeur */
    @Input()
    public set modelIsValue(value: BooleanInput) {
        this._modelIsValue = coerceBooleanProperty(value);
    }

    public get modelIsValue(): BooleanInput {
        return this._modelIsValue;
    }

    private _positions = DejaConnectionPositionPair.default;

    @Input()
    public set positions(value: DejaConnectionPositionPair[] | string) {
        this._positions = typeof value === 'string' ? DejaConnectionPositionPair.parse(value) : value;
    }

    public get positions(): DejaConnectionPositionPair[] | string {
        return this._positions;
    }

    @Input()
    public set dropDownWidth(value: NumberInput) {
        this._dropDownWidth = coerceNumberProperty(value);
    }

    public get dropDownWidth(): NumberInput {
        return this._dropDownWidth || this.elementRef?.nativeElement.clientWidth;
    }

    public get keyboardNavigation(): boolean {
        return this._keyboardNavigation;
    }

    @Input() public get required(): boolean {
        return this._required;
    }

    public set required(req: boolean) {
        this._required = coerceBooleanProperty(req);
        this.stateChanges.next();
    }

    /**
     * Placeholder of the input
     */
    @Input() public get placeholder(): string {
        return this._placeholder;
    }

    public set placeholder(plh: string) {
        this._placeholder = plh;
        this.stateChanges.next();
    }

    public get empty(): boolean {
        return !this.value;
    }

    public get focused(): boolean {
        return this._focused;
    }

    @ContentChildren(DejaItemComponent)
    public set options(options: DejaItemComponent[]) {
        if (!this.items && options?.length) {
            const selectedModels = [] as unknown[];
            this.valueField = 'value';
            this.textField = 'text';
            const models = options.map(option => {
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
                // tslint:disable-next-line:no-debugger
                console.error('Select options with more than 100 items can have performance options. Please bind directly the items in code behind with items or models input.');
            }
        }
    }

    public constructor(changeDetectorRef: ChangeDetectorRef,
        public viewPort: ViewPortService,
        private fm: FocusMonitor,
        private elementRef: ElementRef<HTMLElement>,
        @Self() @Optional() public ngControl: NgControl,
        @Optional() private parentForm: NgForm,
        @Optional() private parentFormGroup: FormGroupDirective,
        mediaService: MediaService,
        private defaultErrorStateMatcher: ErrorStateMatcher) {
        super(changeDetectorRef, viewPort);

        this.overlayOwnerElement = this.elementRef.nativeElement;

        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }

        this.fm.monitor(elementRef.nativeElement, true).pipe(
            takeUntil(this.destroyed$)
        ).subscribe(origin => {
            this._focused = !!origin;
            this.stateChanges.next();
        });

        const setDropDownVisible = (state: boolean): void => {
            if (state !== this._dropdownVisible) {
                this._dropdownVisible = state;
                this.changeDetectorRef.markForCheck();
                this.dropDownVisibleChange.emit(state);
            }
        };

        mediaService.isMobile$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe(value => {
            this.isMobile = value;
            this.changeDetectorRef.markForCheck();
        });

        if (this.parentForm) {
            this.parentForm.ngSubmit.pipe(
                takeUntil(this.destroyed$)
            ).subscribe(() => {
                this.changeDetectorRef.markForCheck();
            });
        }

        if (this.parentFormGroup) {
            this.parentFormGroup.ngSubmit.pipe(
                takeUntil(this.destroyed$)
            ).subscribe(() => {
                this.changeDetectorRef.markForCheck();
            });
        }

        this.clearFilterExpression$.pipe(
            debounceTime(750),
            takeUntil(this.destroyed$)
        ).subscribe(() => this.filterExpression = '');

        combineLatest([this.delaySearchTrigger$, this.filterListComplete$]).pipe(
            debounce(([delaySearchTrigger]) => timer(delaySearchTrigger)),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this._itemList = [];
            this.reshowDropDown();
        });

        this.storeScrollPosition$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe(scrollPos => {
            this.viewPort.scrollPosition$.next(scrollPos);
            this.lastScrollPosition = scrollPos;
        });

        this.hideDropDown$.pipe(
            filter(() => this.dropdownVisible),
            delayWhen(time => timer(time || 0)),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            delete this.selectingItemIndex;
            setDropDownVisible(false);
            this.viewPort.element$.next(null);
            this.changeDetectorRef.markForCheck();
        });

        this.showDropDown$.pipe(
            debounceTime(50),
            filter(() => (this.query || '').length >= this.minSearchlength && !this._readonly),
            tap(() => {
                // Set overlay origin element
                const originElement: HTMLElement = (this.isMobile && document.body) || this.htmlInputElement || this.elementRef.nativeElement;

                // Calc max height
                if (this.isMobile) {
                    this.dropDownMaxHeight = document.body.clientHeight;
                } else if (this.maxHeight) {
                    this.dropDownMaxHeight = this.maxHeight;
                } else {
                    const originRect = originElement.getBoundingClientRect();
                    const maxHeight = document.body.clientHeight;
                    this.dropDownMaxHeight = Math.max(originRect.top, maxHeight - originRect.bottom, 25) - 25;
                }

                // Ensure dropDowsQuery if autocomplete and minSearchLength
                if (!this.dropDownQuery && this.isModeAutocomplete && this.minSearchlength > 0 && this.query && this.query.length > this.minSearchlength) {
                    this.dropDownQuery = this.query;
                }

                // Display overlay
                setDropDownVisible(true);
                this.changeDetectorRef.markForCheck();
            }),
            delay(1),
            filter(() => this.dropdownVisible), // Show canceled by the hide$ observable if !dropdownVisible
            switchMap(() => this.calcViewList$()),
            tap(() => {
                const selectedItems = this.getSelectedItems();
                const firstItem = selectedItems?.[0];
                const index = firstItem ? this.getItemIndex(firstItem) : -1;
                if (index >= 0) {
                    // Ensure selection
                    this.setSelectedItems(selectedItems);
                    this.currentItemIndex = index;
                    this.ensureItemVisible(index);
                } else if (this.listElement) {
                    // Restore scroll Position
                    this.ensureItemVisible(null);
                    this.listElement.scrollTop = this.lastScrollPosition;
                }
            }),
            delay(1),
            filter(() => this.dropdownVisible), // Show canceled by the hide$ observable if !dropdownVisible
            tap(() => {
                this.viewPort.element$.next(this.listElement);
            }),
            delay(1),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            // View port calculated
            this.overlay.updatePosition();
        });

        this.keyboardNavigation$.pipe(
            tap(() => this._keyboardNavigation = true),
            debounceTime(1000),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this._keyboardNavigation = false;
            this.changeDetectorRef.markForCheck();
        });

        this.query$.pipe(
            tap(query => this._query = query),
            filter(() => !!this.input),
            delay(1),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            // **** Force place holder to refresh to escape input angular material issue ****
            this.changeDetectorRef.markForCheck();
        });

        combineLatest([this.writeValue$, this.contentInitialized$]).pipe(
            map(([value]) => value),
            tap(value => {
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
            map(value => this.getVirtualSelectedEntities(value) as unknown[]),
            switchMap(value => {
                if (!value) {
                    if (this.selectedItems?.length) {
                        this.removeSelection();
                    }
                } else if (this._multiSelect) {
                    this.query = '';
                    super.setSelectedModels(value);
                    super.getItemListService().ensureSelection();
                } else {
                    const v = value instanceof Array ? [value[0]] : [value];
                    const item = super.mapToIItemBase(v)[0];
                    return this.unselectAll$().pipe(
                        switchMap(() => item ? this.toggleSelect$([item], true) : []),
                        map(() => super.getItemListService().ensureSelection()),
                        tap(() => this.ensureSelection()),
                        take(1)
                    );
                }

                return of(null);
            }),
            takeUntil(this.destroyed$)
        ).subscribe(() => this.changeDetectorRef.markForCheck());

        this._viewPortChanged = this.viewPortChanged;

        this.maxHeight = 0;
    }

    /** Correspond au model du champ de filtrage ou recherche */
    @Input()
    public set query(value: string) {
        this.query$.next(value);
    }

    public get query(): string {
        return this._query;
    }

    /** Temps d'attente en ms avant que la recherche dans la liste soit lancée lorsque l'utilisateur tape dans le select */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('delay-search-trigger') public set delaySearchTrigger(value: number) {
        this.delaySearchTrigger$.next(value);
    }

    /** Définit la longueur minimale de caractères dans le champ de recherche avant que la recherche ou le filtrage soient effectués */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('min-search-length') public set minSearchlength(value: NumberInput) {
        this._minSearchLength = coerceNumberProperty(value);
    }

    public get minSearchlength(): NumberInput {
        return this._minSearchLength;
    }

    /** Permet de désactiver le select */
    @Input()
    public set disabled(value: boolean) {
        const disabled = coerceBooleanProperty(value);
        this._disabled = disabled || null;
        this.changeDetectorRef.markForCheck();
    }

    public get disabled(): boolean {
        return this.ngControl ? this.ngControl.disabled : this._disabled;
    }

    /** Indique ou détermine si le bouton pour effacer la selection doit être affiché */
    @Input()
    public set selectionClearable(value: BooleanInput) {
        this._selectionClearable = coerceBooleanProperty(value);
    }

    public get selectionClearable(): BooleanInput {
        return this._selectionClearable;
    }

    @Input()
    /** Définit une valeur indiquant si les éléments selectionés doivent être masqué de la liste déroulante. */
    public set hideSelected(value: BooleanInput) {
        this.setHideSelected(coerceBooleanProperty(value));
    }

    /** Renvoie une valeur indiquant si les éléments selectionés doivent être masqué de la liste déroulante. */
    public get hideSelected(): BooleanInput {
        return this._hideSelected;
    }

    /** Définit la ligne courant ou ligne active */
    @Input()
    public set currentItem(item: IItemBase<unknown>) {
        super.setCurrentItem(item);
        if (item) {
            this.ensureItemVisible(item);
        }
    }

    /** Définit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
    @Input()
    public set pageSize(value: NumberInput) {
        this._pageSize = coerceNumberProperty(value);
    }

    /** Retourne le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
    public get pageSize(): NumberInput {
        if (this._pageSize === 0) {
            const vpRowHeight = this.getViewPortRowHeight();
            const containerElement = this.listElement;
            const containerHeight = containerElement?.clientHeight || this.dropDownMaxHeight;
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

    /** Définit la hauteur d'une ligne pour le calcul du viewport en pixels (la valeur par défaut sera utilisée si aucune valeur n'est définie). */
    @Input()
    public set viewPortRowHeight(value: NumberInput) {
        this.setViewPortRowHeight(value);
    }

    /**
     * Les trois valeurs acceptés en paramètre se trouvent dans l'enum ViewportMode (disabled, fixed, variable, auto)
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

    /** Retourne le champ à utiliser comme valeur d'affichage. */
    public get textField(): string {
        return super.getTextField();
    }

    /** Définit le champ à utiliser comme valeur de comparaison. */
    @Input()
    public set valueField(value: string) {
        super.setValueField(value);
    }

    /** Retourne le champ à utiliser comme valeur de comparaison. */
    public get valueField(): string {
        return super.getValueField();
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

    @Input()
    public set type(type: SelectType) {
        if (type !== 'autocomplete' && type !== 'multiselect' && type !== 'select') {
            throw new Error('Invalid type property for DejaSelectComponent. Type can be select, autocomplete or multiselect.');
        }
        this._type = type;
        this.setMultiSelect(this._type === 'multiselect');
        this.changeDetectorRef.markForCheck();
    }

    public get type(): SelectType {
        return this._type;
    }

    /**
     * Set an observable called before the list will be displayed
     */
    @Input()
    public set loadingItems(fn: (query: string | RegExp, selectedItems: IItemBase<unknown>[]) => Observable<IItemBase<unknown>[]>) {
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

    /** Retourne si le select est en mode select, donc en lecture seule. */
    public get isModeSelect(): boolean {
        return this._type === 'select';
    }

    /** Retourne si le select est en mode autocomplete */
    public get isModeAutocomplete(): boolean {
        return this._type === 'autocomplete';
    }

    /** Définit la liste des éléments selectionés en mode multiselect */
    @Input()
    public set selectedItems(value: IItemBase<unknown>[]) {
        this.setSelectedItems(value);
    }

    /** Retourne la liste des éléments selectionés en mode multiselect */
    public get selectedItems(): IItemBase<unknown>[] {
        return super.getSelectedItems();
    }

    /** Définit l'éléments selectioné en mode single select */
    @Input()
    public set selectedItem(value: IItemBase<unknown>) {
        this.setSelectedItems(value !== undefined && value !== null ? [value] : []);
    }

    /** Retourne l'élément selectioné en mode single select */
    public get selectedItem(): IItemBase<unknown> {
        const selectedItem = super.getSelectedItems();
        return selectedItem?.[0];
    }

    /** Définit le model selectioné en mode single select */
    @Input()
    public set selectedModel(value: unknown[] | unknown) {
        this.writeValue(value);
    }

    /** Retourne le model selectioné en mode single select */
    public get selectedModel(): unknown {
        const selectedModel = super.getSelectedModels();
        return selectedModel?.[0] as unknown[];
    }

    /** Définit la liste des models selectionés en mode multiselect */
    @Input()
    public set selectedModels(value: unknown[]) {
        this.writeValue(value);
    }

    /** Retourne la liste des models selectionés en mode multiselect */
    public get selectedModels(): unknown[] {
        return super.getSelectedModels();
    }

    /** Definit le service de liste utilisé par ce composant. Ce service permet de controller dynamiquement la liste, ou de faire du lazyloading. */
    @Input()
    public set itemListService(itemListService: ItemListService<unknown>) {
        this.setItemListService(itemListService);
        if (itemListService?.lastQuery) {
            this.query = itemListService.lastQuery.toString();
        }
    }

    /** Retourne le service de liste utilisé par ce composant. Ce service permet de controller dynamiquement la liste, ou de faire du lazyloading. */
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

    /** Definit si le waiter doit être affiché dans le select. */
    @Input()
    public set waiter(value: boolean) {
        this._waiter = value;
    }

    /** Retourne si le waiter doit être affiché dans le select. */
    public get waiter(): boolean {
        return this._waiter;
    }

    /** Définit la liste des éléments au format IItemBase */
    @Input()
    // eslint-disable-next-line rxjs/finnish
    public set items(items: IItemBase<unknown>[] | Promise<IItemBase<unknown>[]> | Observable<IItemBase<unknown>[]>) {
        super.setItems$(items).pipe(
            take(1),
            tap(() => this.ensureSelection()),
            switchMap(() => this.calcViewList$()),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    /** Définit la liste des éléments (tout type d'objet métier) */
    @Input()
    // eslint-disable-next-line rxjs/finnish
    public set models(items: unknown[] | Observable<unknown[]>) {
        super.setModels$(items).pipe(
            take(1),
            tap(() => this.ensureSelection()),
            switchMap(() => this.calcViewList$()),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    /** Retourne le nombre de niveau pour une liste hierarchique */
    public get depthMax(): number {
        return this._depthMax;
    }

    /** Définit la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    @Input()
    public set maxHeight(value: number) {
        super.setMaxHeight(value);
    }

    /** Retourne la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    public get maxHeight(): number {
        return this.getMaxHeight();
    }

    @Input()
    /** Définit une valeur indiquant si le composant est en lecture seule */
    public set readonly(value: boolean) {
        const readonly = coerceBooleanProperty(value);
        this._readonly = readonly || null;
        this.changeDetectorRef.markForCheck();
    }

    /** Retourne une valeur indiquant si le composant est en lecture seule */
    public get readonly(): boolean {
        return this._readonly;
    }

    @ViewChild(DejaChildValidatorDirective)
    protected set inputValidatorDirective(value: DejaChildValidatorDirective) {
        if (value) {
            value.parentControl = this.ngControl;
        }
    }

    private set currentItemIndex(value: number) {
        super.setCurrentItemIndex(value);
        this.changeDetectorRef.markForCheck();
    }

    private get currentItemIndex(): number {
        return this.getCurrentItemIndex();
    }

    public get itemTemplate(): TemplateRef<unknown> {
        return this.itemTemplateExternal || this.itemTemplateInternal;
    }

    public get parentItemTemplate(): TemplateRef<unknown> {
        return this.parentItemTemplateExternal || this.parentItemTemplateInternal;
    }

    private get htmlInputElement(): HTMLInputElement {
        return this.inputElement?.nativeElement as HTMLInputElement;
    }

    public get loaderTemplate(): TemplateRef<unknown> {
        return this.loaderTemplateExternal || this.loaderTemplateInternal;
    }

    public get dropdownVisible(): boolean {
        return this._dropdownVisible;
    }

    // ************* ControlValueAccessor Implementation **************
    public get value(): IItemBase<unknown> | IItemBase<unknown>[] {
        return this._multiSelect ? this.selectedItems : this.selectedItem;
    }

    public set value(val: IItemBase<unknown> | IItemBase<unknown>[]) {
        this.writeValue(val);
        this.onChangeCallback(val);
        this.onTouchedCallback();
        this.stateChanges.next();
    }

    public writeValue(value: IItemBase<unknown> | IItemBase<unknown>[]): void {
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

    public ngDoCheck(): void {
        if (this.ngControl) {
            this.updateErrorState();
        }
    }

    public ngOnDestroy(): void {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elementRef.nativeElement);
    }

    public ngAfterContentInit(): void {
        this.contentInitialized$.next(true);

        if (this.ngControl) {
            this.ngControl.valueChanges.pipe(
                filter(() => !!this.input),
                takeUntil(this.destroyed$)
            ).subscribe(() => {
                if (this.ngControl.touched) {
                    this.input.ngControl.control.markAsTouched();
                }
                this.input.ngControl.control.updateValueAndValidity();
            });
        }

        this.overlayOwnerElement = this.elementRef.nativeElement;
        if (this.overlayOwnerElement.parentElement.className.includes('mat-form-field-infix')) {
            this.overlayOwnerElement = this.overlayOwnerElement.parentElement;
        }
    }

    public ngAfterViewInit(): void {
        fromEvent(this.htmlInputElement, 'click').pipe(
            filter(() => !this.dropdownVisible && !this.disabled),
            takeUntil(this.destroyed$)
        ).subscribe(event => {
            if (this.isModeSelect) {
                this.showDropDown();
            } else {
                this.htmlInputElement.select();
                this.filter$.next(event);
            }
        });

        fromEvent(this.htmlInputElement, 'focus').pipe(
            filter(() => !this.dropdownVisible && !this.disabled),
            delay(10),
            filter(() => this.htmlInputElement === document.activeElement),
            takeUntil(this.destroyed$)
        ).subscribe(event => {
            if (this.isModeSelect) {
                this.showDropDown();
            } else {
                this.filter$.next(event);
            }
        });

        fromEvent(this.htmlInputElement, 'blur').pipe(
            filter(() => this.selectingItemIndex === undefined),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.onTouchedCallback();
            this.hideDropDown$.next(10);
        });

        merge(fromEvent(this.htmlInputElement, 'keydown'), fromEvent(this.elementRef.nativeElement, 'keydown')).pipe(
            filter((event: KeyboardEvent) => {
                if (event.defaultPrevented) {
                    return false;
                }

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
                    // Set and get current index for keyboard features only
                    const setCurrentIndex = (index: number, item?: IItemBase<unknown>): void => {
                        this.currentItemIndex = index;
                        if (this.dropdownVisible) {
                            this.ensureItemVisible(this.currentItemIndex);
                            this.viewPort.refresh();
                        }

                        if (!this._multiSelect) {
                            item = item || super.getCurrentItem();
                            this.select(item, false);
                        }
                    };

                    switch (event.code) {
                        case KeyCodes.Home:
                            if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                                this.toggleDropDown();
                            } else {
                                setCurrentIndex(0);
                            }
                            return of(false);

                        case KeyCodes.End:
                            if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                                this.toggleDropDown();
                            } else {
                                setCurrentIndex(Math.max(0, this.rowsCount - 1));
                            }
                            return of(false);

                        case KeyCodes.PageUp:
                            if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                                this.toggleDropDown();
                            } else {
                                const index = Math.max(0, this.currentItemIndex - this._pageSize);
                                setCurrentIndex(index);
                            }
                            return of(false);

                        case KeyCodes.PageDown:
                            if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                                this.toggleDropDown();
                            } else {
                                const index = Math.min(this.rowsCount - 1, this.currentItemIndex + this._pageSize);
                                setCurrentIndex(index);
                            }
                            return of(false);

                        case KeyCodes.UpArrow:
                            if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                                this.toggleDropDown();
                            } else {
                                const index = Math.max(0, this.currentItemIndex - 1);
                                setCurrentIndex(index);
                            }
                            return of(false);

                        case KeyCodes.DownArrow:
                            if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                                this.toggleDropDown();
                            } else {
                                const index = Math.min(this.rowsCount - 1, this.currentItemIndex + 1);
                                setCurrentIndex(index);
                            }
                            return of(false);

                        case KeyCodes.Space:
                            if (this.dropdownVisible) {
                                const item = this._itemList[this.currentItemIndex - this.vpStartRow] as IItemTree<unknown>;
                                if (this.isCollapsible(item)) {
                                    this.keyboardNavigation$.next();
                                    return this.toggleCollapse$(this.currentItemIndex, !item.collapsed).pipe(
                                        map(() => false)
                                    );
                                }
                            }
                            return of(!this.isModeSelect);

                        // Do not break or return here
                        // tslint:disable-next-line:no-switch-case-fall-through
                        case KeyCodes.Enter:
                            if (this.dropdownVisible) {
                                const item = this._itemList[this.currentItemIndex - this.vpStartRow];
                                this.select(item);
                            }
                            return of(false);

                        default:
                            return of(true);
                    }
                }),
                filter(continuePropagation => !continuePropagation),
                map(() => {
                    this.keyboardNavigation$.next();
                    this.changeDetectorRef.markForCheck();
                    event.preventDefault();
                    return false;
                })
            )),
            takeUntil(this.destroyed$)
        ).subscribe();

        const keyUp$ = fromEvent(this.htmlInputElement, 'keyup').pipe(
            filter((event: KeyboardEvent) => {
                const keyCode = event.code;
                return keyCode >= KeyCodes.Key0 ||
                    keyCode === KeyCodes.Backspace ||
                    keyCode === KeyCodes.Space ||
                    keyCode === KeyCodes.Delete;
            }));

        merge(keyUp$, this.filter$).pipe(
            tap(() => {
                if ((this.query || '').length < this.minSearchlength) {
                    this._itemList = [];
                    this.hideDropDown();
                    return;
                }
            }),
            switchMap((event: KeyboardEvent) => {
                // console.log('select.component, keycode:' + event.code);
                this.keyboardNavigation$.next();
                if (this.isModeSelect) {
                    // Select, search on the list
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
                            return false;
                        }, this.currentItemIndex).pipe(
                            take(1)
                        );
                    }
                } else {
                    // Autocomplete, filter the list
                    this.filterListComplete$.next();
                }

                return of(null as IFindItemResult<unknown>);
            }),
            filter(result => result?.index >= 0),
            takeUntil(this.destroyed$)
        ).subscribe(result => {
            // Set and get current index for keyboard features only
            this.currentItemIndex = result.index;
            if (this.dropdownVisible) {
                this.ensureItemVisible(this.currentItemIndex);
            }

            if (!this._multiSelect) {
                const item = result.item || super.getCurrentItem();
                this.select(item, false);
            }
        });
    }

    public setDescribedByIds(ids: string[]): void {
        this.describedBy = ids.join(' ');
    }

    public onContainerClick(event: MouseEvent): void {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.elementRef.nativeElement.querySelector('input').focus();
        }
    }

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

    /** Change l'état d'expansion de la ligne spécifiée
     * @param index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param collapsed  Etat de l'élément. True pour réduire l'élément.
     * @return Observable résolu par la fonction.
     */
    public toggleCollapse$(index: number, collapsed: boolean): Observable<IItemTree<unknown>> {
        return super.toggleCollapse$(index, collapsed).pipe(
            tap(() => {
                if (this.dropdownVisible) {
                    this.reshowDropDown();
                }
            }));
    }

    /** Change l'état d'expansion de la ligne spécifiée
     * @param index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param collapsed  Etat de l'élément. True pour réduire l'élément.
     */
    public toggleCollapse(index: number, collapsed: boolean): void {
        this.toggleCollapse$(index, collapsed).pipe(
            take(1),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    public queryChanged(value: string): void {
        this.query = value;
        if (!this.isModeSelect) {
            // Autocomplete or multiselect only
            this.dropDownQuery = this.query;
            if (this.isModeAutocomplete) {
                this.unselectAll$().pipe(
                    take(1),
                    takeUntil(this.destroyed$)
                ).subscribe(() => this.onModelChange());
            }
        }
    }

    public hideDropDown(): void {
        this.hideDropDown$.next(null);
    }

    public scroll(event: Event): void {
        const element = event.target as HTMLElement;
        this.storeScrollPosition$.next(element.scrollTop);
    }

    public mousedown(e: MouseEvent): void {
        if (this.mouseUp$sub) {
            this.mouseUp$sub.unsubscribe();
            this.mouseUp$sub = undefined;
        }

        this.selectingItemIndex = this.getItemIndexFromHTMLElement(e.target as HTMLElement);

        this.mouseUp$sub = fromEvent(this.listElement, 'mouseup').pipe(
            switchMap((upEvent: MouseEvent) => {
                const itemIndex = this.getItemIndexFromHTMLElement(upEvent.target as HTMLElement);
                if (itemIndex === undefined || this.selectingItemIndex === undefined || itemIndex !== this.selectingItemIndex) {
                    return of(null);
                }

                const item = this._itemList[itemIndex - this.vpStartRow] as IItemTree<unknown>;
                if (!item || upEvent.button !== 0) {
                    // Right click menu
                    return of(null);
                }

                const isExpandButton = (target: HTMLElement): boolean => target.id === 'expandbtn' || target.parentElement.id === 'expandbtn';

                if (this.isCollapsible(item) && (isExpandButton(e.target as HTMLElement) || !this.isSelectable(item))) {
                    if (upEvent.button === 0) {
                        return this.toggleCollapse$(itemIndex, !item.collapsed);
                    }
                } else if (!item.selected) {
                    this.select(item);
                }

                return of(null);
            }),
            takeUntil(this.destroyed$)
        ).subscribe();
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

    public updateErrorState(): void {
        const oldState = this.errorState;
        const parent = this.parentFormGroup || this.parentForm;
        const matcher = this.errorStateMatcher || this.defaultErrorStateMatcher;
        const control = this.ngControl ? this.ngControl.control as FormControl : null;
        const newState = matcher.isErrorState(control, parent);

        if (newState !== oldState) {
            this.errorState = newState;
            this.stateChanges.next();
        }
    }

    public clearSelection(): void {
        this.removeSelection();
    }

    public onClearQuery(clickEvent: Event): boolean {
        this.onRemoveSelection();
        clickEvent.stopPropagation();
        return false;
    }

    public onRemoveSelection(closeEvent?: IDejaChipsComponentCloseEvent): void {
        if (this.ngControl) {
            this.ngControl.control.markAsTouched();
        }
        this.removeSelection(closeEvent?.item);
    }

    public onOpenClicked(event: Event): void {
        if (this.dropdownVisible || this.disabled) {
            return;
        }

        if (this.isModeSelect) {
            this.showDropDown();
        } else {
            this.htmlInputElement.select();
            this.filter$.next(event);
        }
    }

    public toggleDropDown(): void {
        if (this.dropdownVisible) {
            this.hideDropDown();
        } else {
            this.showDropDown();
        }
    }

    public showDropDown(): void {
        this.showDropDown$.next();
    }

    // NgModel implementation
    public onTouchedCallback = (): void => undefined;
    public onChangeCallback = (_a?: unknown): void => undefined;
    public onValidatorChangeCallback = (_a?: unknown): void => undefined;

    protected removeSelection(item?: IItemBase<unknown>): void {
        if (!this._multiSelect) {
            this.query = '';
            this.dropDownQuery = '';
            this.setSelectedItems(null);
            this.onModelChange();
            delete this.selectingItemIndex;
        } else if (item) {
            this.toggleSelect$([item], false).pipe(
                take(1),
                takeUntil(this.destroyed$)
            ).subscribe(selectedItems => {
                const selected = [...selectedItems];
                this.setSelectedItems(selected);
                this.onModelChange(selected);
            });
        } else {
            this.unselectAll$().pipe(
                take(1),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.onModelChange());
        }
    }

    protected calcViewList$(): Observable<IViewListResult<unknown>> {
        return super.calcViewList$(this.dropDownQuery).pipe(
            tap(() => void this.changeDetectorRef.markForCheck())
        );
    }

    protected ensureItemVisible(item: IItemBase<unknown> | number): void {
        super.ensureItemVisible(item);
    }

    private onModelChange(items?: IItemBase<unknown>[] | IItemBase<unknown>): void {
        let outputEmitter = null;

        let output = null;

        if (items) {
            if (Array.isArray(items)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                const models = items.map(itm => itm.model !== undefined ? itm.model : itm);
                outputEmitter = {
                    items: items,
                    models: models
                } as DejaItemsEvent<unknown>;

                if (this.modelIsValue) {
                    const valueField = this.getValueField();
                    if (models.find((m: Record<string, unknown>) => !!m[valueField])) {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        output = models.map((m: Record<string, unknown>) => m[valueField] !== undefined ? m[valueField] : m);
                    }
                } else {
                    output = models;
                }
            } else {
                const model = items.model as Record<string, unknown>;
                outputEmitter = {
                    item: items,
                    model: model
                } as DejaItemEvent<unknown>;

                if (this.modelIsValue) {
                    const valueField = this.getValueField();
                    output = model[valueField] !== undefined ? model[valueField] : model;
                } else {
                    output = items.model !== undefined ? items.model : items;
                }
            }
        }

        this.onChangeCallback(output);

        if (outputEmitter) {
            this.selectedChange.emit(outputEmitter);
        }
    }

    private select(item: IItemBase<unknown>, hideDropDown?: boolean): void {
        if (!this.isSelectable(item)) {
            return;
        }

        if (!item) {
            // this.query = '';
            // this.dropDownQuery = '';
            // this.setSelectedItems(null);
            // this.onModelChange();
            return;
        }

        if (this._multiSelect) {
            this.toggleSelect$([item], true).pipe(
                take(1),
                takeUntil(this.destroyed$)
            ).subscribe(selectedItems => {
                const selected = selectedItems ? [...selectedItems] : [];
                this.setSelectedItems(selected);
                this.onModelChange(selected);
                this.query = '';
                this.dropDownQuery = '';
            });
        } else {
            this.query = this.getTextValue(item);
            this.setSelectedItems([item]);
            this.onModelChange(item);
        }

        this.htmlInputElement.focus();
        if (hideDropDown ?? true) {
            this.hideDropDown();
        }
    }

    private reshowDropDown(): void {
        if (!this.dropdownVisible) {
            return this.showDropDown();
        }

        delete this.selectingItemIndex;

        // Restore scroll Position
        const listElement = this.listElement;
        if (listElement) {
            listElement.scrollTop = this.lastScrollPosition;
        }

        this.calcViewList$().pipe(
            tap(() => void this.refreshViewPort()),
            switchMap(() => this.viewPortChanged), // Wait for viewport calculation
            take(1),
            delay(1),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            // View port calculated
            this.overlay.updatePosition();

            // Ensure selection
            const item = this.getSelectedItems()[0];
            const index = item && this.getItemIndex(item);
            if (index >= 0) {
                this.currentItemIndex = index;
                this.ensureItemVisible(index);
            }
        });

        return undefined;
    }

    private ensureSelection(): void {
        if (this._multiSelect) {
            // Do nothing yet
        } else {
            this.query = this.selectedItems.length ? this.getTextValue(this.selectedItems[0]) : '';
        }
    }
}
