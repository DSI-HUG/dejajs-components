/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Optional, Output, Self, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { MatInput } from '@angular/material';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/delayWhen';
import 'rxjs/add/operator/takeWhile';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { GroupingService } from '../../common/core/grouping/grouping.service';
import { IViewListResult } from '../../common/core/item-list/item-list.service';
import { KeyCodes } from '../../common/core/keycodes.enum';
import { MediaService } from '../../common/core/media/media.service';
import { DejaConnectionPositionPair } from '../../common/core/overlay/connection-position-pair';
import { SortingService } from '../../common/core/sorting/sorting.service';
import { DejaChildValidatorDirective } from '../../common/core/validation/child-validator.directive';
import { DejaChipsCloseEvent } from '../chips/chips.component';
import { DejaOverlayComponent } from '../overlay/overlay.component';
import { IItemBase } from './../../common/core/item-list/item-base';
import { DejaItemEvent } from './../../common/core/item-list/item-event';
import { ItemListBase } from './../../common/core/item-list/item-list-base';
import { ItemListService } from './../../common/core/item-list/item-list.service';
import { IItemTree } from './../../common/core/item-list/item-tree';
import { DejaItemComponent } from './../../common/core/item-list/item.component';
import { DejaItemsEvent } from './../../common/core/item-list/items-event';
import { IViewPort, ViewportMode, ViewPortService } from './../../common/core/item-list/viewport.service';

const noop = () => { };

export enum DejaSelectSelectionPosition {
    above = 0, // value in HTML
    below = 1, // value in HTML
}

/** Combo box avec une liste basée sur la treelist */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ViewPortService, MediaService],
    selector: 'deja-select',
    styleUrls: [
        './select.component.scss',
    ],
    templateUrl: './select.component.html',
})
export class DejaSelectComponent extends ItemListBase implements ControlValueAccessor, AfterViewInit, AfterContentInit {
    /** Texte à afficher par default dans la zone de recherche */
    @Input() public placeholder: string;
    /** Offset de position horizontal de la zone de dropdown */
    @Input() public overlayOffsetX = 0;
    /** Permet de définir un template de ligne par binding */
    @Input() public itemTemplateExternal;
    /** Permet de définir un template de ligne parente par binding. */
    @Input() public parentItemTemplateExternal;
    /** Permet de définir un template pour la zone de texte d'information. */
    @Input() public placeHolderTemplateExternal;
    /** Permet de définir un template pour l'élément de conseil ou d'affichage d'erreur. */
    @Input() public hintTemplateExternal;
    /** Permet de définir un template pour le MatError à l'intérieur du mat-input-container. */
    @Input() public errorTemplateExternal;
    /** Définit une valeur indiquant si en reactive form le model renvoyé doit être un obeject oue une valeur */
    @Input() public modelIsValue: boolean;
    /** Exécuté lorsque le calcul du viewPort est terminé. */
    @Output() public viewPortChanged = new EventEmitter<IViewPort>();
    /** Exécuté lorsque l'utilisateur sélectionne ou désélectionne une ligne. */
    @Output() public selectedChange = new EventEmitter<DejaItemsEvent | DejaItemEvent>();
    /** For test only. */
    @Output() public dropDownVisibleChange = new EventEmitter<boolean>();

    @ContentChild('hintTemplate') public hintTemplateInternal;
    @ContentChild('placeHolderTemplate') public placeHolderTemplateInternal;
    @ContentChild('itemTemplate') public itemTemplateInternal;
    @ContentChild('parentItemTemplate') public parentItemTemplateInternal;
    @ContentChild('selectedTemplate') public selectedTemplate;
    @ContentChild('suffixTemplate') public _matSuffix;
    /** Template for MatError inside mat-input-container */
    @ContentChild('errorTemplate') public errorTemplateInternal;

    /** Internal use */
    public overlayOwnerElement: HTMLElement;
    public dropDownMaxHeight: number = null;
    public overlayOffsetY = 0;

    // NgModel implementation
    protected onTouchedCallback: () => void = noop;
    protected onChangeCallback: (_: any) => void = noop;
    protected onValidatorChangeCallback: () => void = noop;

    protected _keyboardNavigation = false;
    protected _waiter = false;
    protected isMobile = false;

    private mouseUp$sub: Subscription;

    private _inputElement: ElementRef;

    @ViewChild('inputElement') private set inputElement(element: ElementRef) {
        if (element) {
            this._inputElement = element;
            if (this._inputElement) {
                this.overlayOwnerElement = this._inputElement.nativeElement;
            } else {
                this.overlayOwnerElement = this.elementRef.nativeElement;
            }
        } else {
            this._inputElement = null;
            this.overlayOwnerElement = this.elementRef.nativeElement;
        }
    }

    @ViewChild(MatInput) protected input: MatInput;

    @HostBinding('attr.disabled') private _disabled = null;
    private _type = 'select';
    private selectingItemIndex: number;
    private dropDownQuery = '';
    private filterExpression = '';
    private _dropdownVisible = false;
    private lastScrollPosition = 0;
    private _selectionClearable = false;
    private _dropDownWidth: string;
    private _query = '';
    @HostBinding('attr.readonly') private _readonly = null;

    /** Overlay pane containing the options. */
    @ViewChild(DejaOverlayComponent) private overlay: DejaOverlayComponent;

    private clearFilterExpression$ = new BehaviorSubject<void>(null);
    private filterListComplete$ = new Subject();
    private storeScrollPosition$ = new Subject<number>();
    private hideDropDown$ = new Subject<number>();
    private showDropDown$ = new Subject();
    private filter$ = new Subject<Event>();
    private query$ = new BehaviorSubject<string>('');
    private writeValue$ = new Subject<any>();
    private contentInitialized$ = new Subject();

    private keyboardNavigation$ = new Subject();

    private delaySearchTrigger$ = new BehaviorSubject<number>(250);

    private _selectedItemsPosition = DejaSelectSelectionPosition.above;

    private _positions = DejaConnectionPositionPair.default;

    @Input()
    public set positions(value: DejaConnectionPositionPair[] | string) {
        this._positions = typeof value === 'string' ? DejaConnectionPositionPair.parse(value) : value;
    }

    public get positions() {
        return this._positions;
    }

    @Input()
    public set dropDownWidth(value: number | string) {
        this._dropDownWidth = value && (typeof value === 'string' ? value : `${value}px`);
    }

    public get dropDownWidth() {
        const element = this.elementRef && this.elementRef.nativeElement as HTMLElement;
        return this._dropDownWidth || element.clientWidth;
    }

    public get matSuffix() {
        return this._matSuffix;
    }

    public get keyboardNavigation() {
        return this._keyboardNavigation;
    }

    @ContentChildren(DejaItemComponent)
    public set options(options: DejaItemComponent[]) {
        if (!this.items && options && options.length) {
            this.valueField = 'value';
            this.textField = 'text';
            const models = options.map((option) => ({
                text: option.text,
                value: option.value,
            }));
            this.models = models;
            if (models.length > 100) {
                // tslint:disable-next-line:no-debugger
                debugger;
                console.error('Select options with more than 100 items can have performance options. Please bind directly the items in code behind with items or models input.');
            }
        }
    }

    constructor(changeDetectorRef: ChangeDetectorRef, public viewPort: ViewPortService, private elementRef: ElementRef, @Self() @Optional() public _control: NgControl, @Optional() private _parentForm: NgForm, @Optional() private _parentFormGroup: FormGroupDirective, mediaService: MediaService) {
        super(changeDetectorRef, viewPort);

        this.overlayOwnerElement = this.elementRef.nativeElement;

        if (this._control) {
            this._control.valueAccessor = this;
        }

        const setDropDownVisible = (state: boolean) => {
            if (state !== this._dropdownVisible) {
                this._dropdownVisible = state;
                this.dropDownVisibleChange.emit(state);
            }
        };

        mediaService.isMobile$
            .takeWhile(() => this._isAlive)
            .subscribe((value) => {
                this.isMobile = value;
                this.changeDetectorRef.markForCheck();
            });

        if (this._parentForm) {
            this._parentForm.ngSubmit.subscribe(() => {
                this.changeDetectorRef.markForCheck();
            });
        }

        if (this._parentFormGroup) {
            this._parentFormGroup.ngSubmit.subscribe(() => {
                this.changeDetectorRef.markForCheck();
            });
        }

        Observable.from(this.clearFilterExpression$)
            .takeWhile(() => this._isAlive)
            .debounceTime(750).subscribe(() => this.filterExpression = '');

        Observable.combineLatest(this.delaySearchTrigger$, this.filterListComplete$)
            .takeWhile(() => this._isAlive)
            .debounce(([delaySearchTrigger]) => Observable.timer(delaySearchTrigger))
            .subscribe(() => {
                this._itemList = [];
                this.reshowDropDown();
            });

        Observable.from(this.storeScrollPosition$)
            .takeWhile(() => this._isAlive)
            .subscribe((scrollPos) => {
                this.viewPort.scrollPosition$.next(scrollPos);
                this.lastScrollPosition = scrollPos;
            });

        Observable.from(this.hideDropDown$)
            .takeWhile(() => this._isAlive)
            .filter(() => this.dropdownVisible)
            .delayWhen((time) => Observable.timer(time || 0))
            .subscribe(() => {
                delete this.selectingItemIndex;
                setDropDownVisible(false);
                this.viewPort.element$.next(null);
            });

        Observable.from(this.showDropDown$)
            .takeWhile(() => this._isAlive)
            .debounceTime(50)
            .filter(() => (this.query || '').length >= this.minSearchlength && !this._readonly)
            .do(() => {
                // Set overlay origin element
                const originElement: HTMLElement = (this.isMobile && document.body) || this.htmlInputElement || this.elementRef.nativeElement;
                this.overlayOffsetY = this.isMobile ? 0 : 6;

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

                // Display overlay
                setDropDownVisible(true);
                this.changeDetectorRef.markForCheck();
            })
            .delay(1)
            .filter(() => this.dropdownVisible)  // Show canceled by the hide$ observable if !dropdownVisible
            .switchMap(() => this.calcViewList$().first())
            .do(() => {
                const selectedItems = this.getSelectedItems();
                const first = selectedItems && selectedItems[0];
                const index = first ? this.getItemIndex(first) : -1;
                if (index >= 0) {
                    // Ensure selection
                    this.setSelectedItems(selectedItems);
                    this.currentItemIndex = index;
                    this.ensureItemVisible(index);
                } else {
                    // Restore scroll Position
                    this.ensureItemVisible(null);
                    this.listElement.scrollTop = this.lastScrollPosition;
                }
            })
            .delay(1)
            .filter(() => this.dropdownVisible)  // Show canceled by the hide$ observable if !dropdownVisible
            .do(() => this.viewPort.element$.next(this.listElement))
            .delay(1)
            .do(() => {
                // View port calculated
                this.overlay.updatePosition();
            })
            .subscribe(() => {
                if (!this.isMobile) {
                    const listRect = this.listElement.getBoundingClientRect();
                    const originElement: HTMLElement = this.htmlInputElement || this.elementRef.nativeElement;
                    const originRect = originElement.getBoundingClientRect();
                    if (listRect.top < originRect.top) {
                        this.overlayOffsetY = -20;
                        this.changeDetectorRef.markForCheck();
                        Observable.timer(1)
                            .first()
                            .subscribe(() => {
                                this.overlay.updatePosition();
                            });
                    }
                }
            });

        Observable.from(this.keyboardNavigation$)
            .takeWhile(() => this._isAlive)
            .do(() => this._keyboardNavigation = true)
            .debounceTime(1000)
            .subscribe(() => {
                this._keyboardNavigation = false;
                this.changeDetectorRef.markForCheck();
            });

        Observable.from(this.query$)
            .takeWhile(() => this._isAlive)
            .do((query) => this._query = query)
            .filter(() => !!this.input)
            .delay(1)
            .subscribe(() => {
                // **** Force place holder to refresh to escape input angular material issue ****
                this.changeDetectorRef.markForCheck();
            });

        Observable.combineLatest(this.writeValue$, this.contentInitialized$)
            .takeWhile(() => this._isAlive)
            .map(([value]) => value)
            .do((value) => {
                if (this.modelIsValue === undefined) {
                    if (value instanceof Array) {
                        const av = value || [];
                        const modelType = av.length && typeof av[0];
                        this.modelIsValue = modelType && modelType === 'string' || modelType === 'number';
                    } else {
                        const modelType = typeof value;
                        this.modelIsValue = value === '' || modelType === 'string' || modelType === 'number';
                    }
                }
                if (this.modelIsValue) {
                    this.query = '';
                }
                return value;
            })
            .map((value) => this.getVirtualSelectedEntities(value))
            .subscribe((value) => {
                if (!value) {
                    if (this.selectedItems && this.selectedItems.length) {
                        this.removeSelection();
                    }
                    return;
                }

                if (this._multiSelect) {
                    this.query = '';
                    super.setSelectedModels(value);
                    super.getItemListService().ensureSelection();
                    this.changeDetectorRef.markForCheck();

                } else {
                    const item = super.mapToIItemBase([value])[0];
                    this.unselectAll$()
                        .switchMap(() => item ? this.toggleSelect$([item], true) : [])
                        .map(() => super.getItemListService().ensureSelection())
                        .do(() => this.ensureSelection())
                        .first()
                        .subscribe(() => this.changeDetectorRef.markForCheck());
                }
            });

        this._viewPortChanged = this.viewPortChanged;

        this.maxHeight = 0;
    }

    /** Correspond au model du champ de filtrage ou recherche */
    @Input()
    public set query(value: string) {
        this.query$.next(value);
    }

    public get query() {
        return this._query;
    }

    /** Temps d'attente en ms avant que la recherche dans la liste soit lancée lorsque l'utilisateur tape dans le select */
    @Input('delay-search-trigger')
    public set delaySearchTrigger(value: number) {
        this.delaySearchTrigger$.next(value);
    }

    /** Définit la longueur minimale de caractères dans le champ de recherche avant que la recherche ou le filtrage soient effectués */
    @Input('min-search-length')
    public set minSearchlength(value: number) {
        this._minSearchLength = value;
    }

    public get minSearchlength() {
        return this._minSearchLength;
    }

    /** Permet de désactiver le select */
    @Input()
    public set disabled(value: boolean | string) {
        const disabled = coerceBooleanProperty(value);
        this._disabled = disabled || null;
        this.changeDetectorRef.markForCheck();
    }

    public get disabled() {
        return this._control ? this._control.disabled : this._disabled;
    }

    /** Indique ou détermine si le bouton pour effacer la selection doit être affiché */
    @Input()
    public set selectionClearable(value: boolean | string) {
        this._selectionClearable = coerceBooleanProperty(value);
    }

    public get selectionClearable() {
        return this._selectionClearable;
    }

    @Input()
    public set selectedItemsPosition(value: string | DejaSelectSelectionPosition) {
        this._selectedItemsPosition = typeof value === 'string' ? DejaSelectSelectionPosition[value] : value;
    }

    public get selectedItemsPosition() {
        return this._selectedItemsPosition;
    }

    @Input()
    /** Définit une valeur indiquant si les éléments selectionés doivent être masqué de la liste déroulante. */
    public set hideSelected(value: any) {
        this.setHideSelected(coerceBooleanProperty(value));
    }

    /** Renvoie une valeur indiquant si les éléments selectionés doivent être masqué de la liste déroulante. */
    public get hideSelected() {
        return this._hideSelected;
    }

    /** Définit la ligne courant ou ligne active */
    @Input()
    public set currentItem(item: IItemBase) {
        super.setCurrentItem(item);
        if (item) {
            this.ensureItemVisible(item);
        }
    }

    /** Définit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
    @Input()
    public set pageSize(value: number | string) {
        this._pageSize = coerceNumberProperty(value);
    }

    /** Retourne le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
    public get pageSize() {
        if (this._pageSize === 0) {
            const vpRowHeight = this.getViewPortRowHeight();
            const containerElement = this.listElement;
            const containerHeight = containerElement && containerElement.clientHeight || this.dropDownMaxHeight;
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
    public set viewPortRowHeight(value: number | string) {
        this.setViewPortRowHeight(value);
    }

    /**
     * Les trois valeurs acceptés en paramètre se trouvent dans l'enum ViewportMode (disabled, fixed, variable, auto)
     * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
     * est suceptible de contenir beaucoup d'éléments.
     */
    @Input()
    public set viewportMode(mode: ViewportMode | string) {
        this.setViewportMode(mode);
    }

    /** Retourne le champ utilisé pour la liste des enfants d'un parent */
    @Input()
    public set childrenField(value: string) {
        super.setChildrenField(value);
    }

    /** Définit le champ utilisé pour la liste des enfants d'un parent */
    public get childrenField() {
        return this._childrenField;
    }

    /** Définit le champ à utiliser comme valeur d'affichage. */
    @Input()
    public set textField(value: string) {
        super.setTextField(value);
    }

    /** Retourne le champ à utiliser comme valeur d'affichage. */
    public get textField() {
        return super.getTextField();
    }

    /** Définit le champ à utiliser comme valeur de comparaison. */
    @Input()
    public set valueField(value: string) {
        super.setValueField(value);
    }

    /** Retourne le champ à utiliser comme valeur de comparaison. */
    public get valueField() {
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
    public get searchField() {
        return this._searchField;
    }

    @Input()
    public set type(type: any) {
        if (type !== 'autocomplete' && type !== 'multiselect' && type !== 'select') {
            throw new Error('Invalid type property for DejaSelectComponent. Type can be select, autocomplete or multiselect.');
        }
        this._type = type;
        this.setMultiSelect(this._type === 'multiselect');
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Set an observable called before the list will be displayed
     */
    @Input()
    public set loadingItems(fn: (query: string | RegExp, selectedItems: IItemBase[]) => Observable<IItemBase[]>) {
        super.setLoadingItems(fn);
    }

    /**
     * Set a promise or an observable called before an item selection
     */
    @Input()
    public set selectingItem(fn: (item: IItemBase) => Promise<IItemBase> | Observable<IItemBase>) {
        super.setSelectingItem(fn);
    }

    /**
     * Set a promise or an observable called before an item deselection
     */
    @Input()
    public set unselectingItem(fn: (item: IItemBase) => Promise<IItemBase> | Observable<IItemBase>) {
        super.setUnselectingItem(fn);
    }

    /**
     * Set a promise or an observable called before an item expand
     */
    @Input()
    public set expandingItem(fn: (item: IItemTree) => Promise<IItemTree> | Observable<IItemTree>) {
        super.setExpandingItem(fn);
    }

    /**
     * Set a promise or an observable called before an item collapse
     */
    @Input()
    public set collapsingItem(fn: (item: IItemTree) => Promise<IItemTree> | Observable<IItemTree>) {
        super.setCollapsingItem(fn);
    }

    /** Retourne si le select est en mode select, donc en lecture seule. */
    public get isModeSelect() {
        return this._type === 'select';
    }

    /** Retourne si le select est en mode autocomplete */
    public get isModeAutocomplete() {
        return this._type === 'autocomplete';
    }

    /** Définit la liste des éléments selectionés en mode multiselect */
    @Input()
    public set selectedItems(value: IItemBase[]) {
        this.setSelectedItems(value);
    }

    /** Retourne la liste des éléments selectionés en mode multiselect */
    public get selectedItems() {
        return super.getSelectedItems();
    }

    /** Définit l'éléments selectioné en mode single select */
    @Input()
    public set selectedItem(value: IItemBase) {
        this.setSelectedItems(value !== undefined && value !== null ? [value] : []);
    }

    /** Retourne l'élément selectioné en mode single select */
    public get selectedItem() {
        const selectedItem = super.getSelectedItems();
        return selectedItem && selectedItem[0];
    }

    /** Définit le model selectioné en mode single select */
    @Input()
    public set selectedModel(value: any) {
        this.writeValue(value);
    }

    /** Retourne le model selectioné en mode single select */
    public get selectedModel() {
        const selectedModel = super.getSelectedModels();
        return selectedModel && selectedModel[0];
    }

    /** Définit la liste des models selectionés en mode multiselect */
    @Input()
    public set selectedModels(value: any[]) {
        this.writeValue(value);
    }

    /** Retourne la liste des models selectionés en mode multiselect */
    public get selectedModels() {
        return super.getSelectedModels();
    }

    /** Definit le service de liste utilisé par ce composant. Ce service permet de controller dynamiquement la liste, ou de faire du lazyloading. */
    @Input()
    public set itemListService(value: ItemListService) {
        this.setItemListService(value);
    }

    /** Retourne le service de liste utilisé par ce composant. Ce service permet de controller dynamiquement la liste, ou de faire du lazyloading. */
    public get itemListService() {
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
    public get waiter() { return this._waiter; }

    /** Définit la liste des éléments au format IItemBase */
    @Input()
    public set items(items: IItemBase[] | Promise<IItemBase[]> | Observable<IItemBase[]>) {
        super.setItems$(items)
            .first()
            .do(() => this.ensureSelection())
            .switchMap(() => this.calcViewList$())
            .subscribe(noop);
    }

    /** Définit la liste des éléments (tout type d'objet métier) */
    @Input()
    public set models(items: any[] | Observable<any[]>) {
        super.setModels$(items)
            .first()
            .do(() => this.ensureSelection())
            .switchMap(() => this.calcViewList$())
            .subscribe(noop);
    }

    /** Retourne le nombre de niveau pour une liste hierarchique */
    public get depthMax() { return this._depthMax; }

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
    public get maxHeight() {
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
    public get readonly() {
        return this._readonly;
    }

    @ViewChild(DejaChildValidatorDirective)
    protected set inputValidatorDirective(value: DejaChildValidatorDirective) {
        if (value) {
            value.parentControl = this._control;
        }
    }

    private set currentItemIndex(value: number) {
        super.setCurrentItemIndex(value);
        this.changeDetectorRef.markForCheck();
    }

    private get currentItemIndex() {
        return this.getCurrentItemIndex();
    }

    public get placeHolderTemplate() {
        return this.placeHolderTemplateExternal || this.placeHolderTemplateInternal;
    }

    private get itemTemplate() {
        return this.itemTemplateExternal || this.itemTemplateInternal;
    }

    public get hintTemplate() {
        return this.hintTemplateExternal || this.hintTemplateInternal;
    }

    public get errorTemplate() {
        return this.errorTemplateExternal || this.errorTemplateInternal;
    }

    private get parentItemTemplate() {
        return this.parentItemTemplateExternal || this.parentItemTemplateInternal;
    }

    private get htmlInputElement() {
        return this._inputElement && this._inputElement.nativeElement as HTMLInputElement;
    }

    public get dropdownVisible() {
        return this._dropdownVisible;
    }

    // ************* ControlValueAccessor Implementation **************
    public get value() {
        return this._multiSelect ? this.selectedItems : this.selectedItem;
    }

    public set value(val) {
        this.writeValue(val);
        this.onChangeCallback(val);
        this.onTouchedCallback();
    }

    public writeValue(value: any) {
        this.writeValue$.next(value);
    }

    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    public setDisabledState?(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
    // ************* End of ControlValueAccessor Implementation **************

    public ngAfterContentInit() {
        this.contentInitialized$.next(true);

        if (this._control) {
            this._control.valueChanges
                .filter(() => !!this.input)
                .subscribe(() => {
                    if (this._control.touched) {
                        this.input.ngControl.control.markAsTouched();
                    }
                    this.input.ngControl.control.updateValueAndValidity();
                });
        }
    }

    public ngAfterViewInit() {
        Observable.fromEvent(this.htmlInputElement, 'click')
            .takeWhile(() => this._isAlive)
            .filter(() => !this.dropdownVisible && !this.disabled)
            .subscribe((event: Event) => {
                if (this.isModeSelect) {
                    this.showDropDown();
                } else {
                    this.htmlInputElement.select();
                    this.filter$.next(event);
                }
            });

        Observable.fromEvent(this.htmlInputElement, 'focus')
            .takeWhile(() => this._isAlive)
            .filter(() => !this.dropdownVisible && !this.disabled)
            .delay(10)
            .filter(() => this.htmlInputElement === document.activeElement)
            .subscribe((event: Event) => {
                if (this.isModeSelect) {
                    this.showDropDown();
                } else {
                    // Autocomplete
                    this.filter$.next(event);
                }
            });

        Observable.fromEvent(this.htmlInputElement, 'blur')
            .takeWhile(() => this._isAlive)
            .filter(() => this.selectingItemIndex === undefined)
            .subscribe(() => {
                this.onTouchedCallback();
                this.hideDropDown$.next(10);
            });

        Observable.fromEvent(this.htmlInputElement, 'keydown')
            .takeWhile(() => this._isAlive)
            .filter((event: KeyboardEvent) => {
                const keyCode = event.keyCode || KeyCodes[event.code];
                return keyCode === KeyCodes.Home ||
                    keyCode === KeyCodes.End ||
                    keyCode === KeyCodes.PageUp ||
                    keyCode === KeyCodes.PageDown ||
                    keyCode === KeyCodes.UpArrow ||
                    keyCode === KeyCodes.DownArrow ||
                    keyCode === KeyCodes.Space ||
                    keyCode === KeyCodes.Enter;
            })
            .switchMap((event) => this.ensureListCaches$().map(() => event))
            .map((event: KeyboardEvent) => {
                // Set and get current index for keyboard features only
                const setCurrentIndex = (index: number, item?: IItemBase) => {
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

                const keyCode = event.keyCode || KeyCodes[event.code];
                switch (keyCode) {
                    case KeyCodes.Home:
                        if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                            this.toggleDropDown();
                        } else {
                            setCurrentIndex(0);
                        }
                        return false;

                    case KeyCodes.End:
                        if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                            this.toggleDropDown();
                        } else {
                            setCurrentIndex(Math.max(0, this.rowsCount - 1));
                        }
                        return false;

                    case KeyCodes.PageUp:
                        if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                            this.toggleDropDown();
                        } else {
                            const index = Math.max(0, this.currentItemIndex - this._pageSize);
                            setCurrentIndex(index);
                        }
                        return false;

                    case KeyCodes.PageDown:
                        if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                            this.toggleDropDown();
                        } else {
                            const index = Math.min(this.rowsCount - 1, this.currentItemIndex + this._pageSize);
                            setCurrentIndex(index);
                        }
                        return false;

                    case KeyCodes.UpArrow:
                        if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                            this.toggleDropDown();
                        } else {
                            const index = Math.max(0, this.currentItemIndex - 1);
                            setCurrentIndex(index);
                        }
                        return false;

                    case KeyCodes.DownArrow:
                        if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                            this.toggleDropDown();
                        } else {
                            const index = Math.min(this.rowsCount - 1, this.currentItemIndex + 1);
                            setCurrentIndex(index);
                        }
                        return false;

                    case KeyCodes.Space:
                        if (this.dropdownVisible) {
                            const item = this._itemList[this.currentItemIndex - this.vpStartRow] as IItemTree;
                            if (this.isCollapsible(item)) {
                                this.keyboardNavigation$.next();
                                this.toggleCollapse$(this.currentItemIndex, !item.collapsed).first().subscribe(noop);
                                return false;
                            }
                        }

                        if (!this.isModeSelect) {
                            return true;
                        }

                    // Do not break or return here
                    // tslint:disable-next-line:no-switch-case-fall-through
                    case KeyCodes.Enter:
                        if (this.dropdownVisible) {
                            const item = this._itemList[this.currentItemIndex - this.vpStartRow];
                            this.select(item);
                        }
                        return false;

                    default:
                        return true;
                }
            })
            .subscribe((continuePropagation) => {
                if (!continuePropagation) {
                    this.keyboardNavigation$.next();
                    this.changeDetectorRef.markForCheck();
                    event.preventDefault();
                    return false;
                }
            });

        const keyUp$ = Observable
            .fromEvent(this.htmlInputElement, 'keyup')
            .filter((event: KeyboardEvent) => {
                const keyCode = event.keyCode || KeyCodes[event.code];
                return keyCode >= KeyCodes.Key0 ||
                    keyCode === KeyCodes.Backspace ||
                    keyCode === KeyCodes.Space ||
                    keyCode === KeyCodes.Delete;
            });

        Observable.merge(keyUp$, this.filter$)
            .takeWhile(() => this._isAlive)
            .do(() => {
                if ((this.query || '').length < this.minSearchlength) {
                    this._itemList = [];
                    this.hideDropDown();
                    return;
                }
            })
            .subscribe((event: KeyboardEvent) => {
                // Set and get current index for keyboard features only
                const setCurrentIndex = (index: number, item?: IItemBase) => {
                    this.currentItemIndex = index;
                    if (this.dropdownVisible) {
                        this.ensureItemVisible(this.currentItemIndex);
                    }

                    if (!this._multiSelect) {
                        item = item || super.getCurrentItem();
                        this.select(item, false);
                    }
                };

                // console.log('select.component, keycode:' + event.keyCode);
                this.keyboardNavigation$.next();
                if (this.isModeSelect) {
                    // Select, search on the list
                    if ((/[a-zA-Z0-9]/).test(event.key)) {
                        // Valid char
                        this.clearFilterExpression$.next(null);

                        // Search next
                        this.filterExpression += event.key;
                        const rg = new RegExp(`^${this.filterExpression}`, 'i');
                        this.findNextMatch$((item) => {
                            if (item && this.isSelectable(item)) {
                                const label = this.getTextValue(item);
                                if (rg.test(label)) {
                                    return true;
                                }
                            }
                            return false;
                        }, this.currentItemIndex)
                            .first()
                            .subscribe((result) => {
                                if (result.index >= 0) {
                                    setCurrentIndex(result.index, result.item);
                                }
                            });
                    }
                } else {
                    // Autocomplete, filter the list
                    this.filterListComplete$.next();
                }
            });
    }

    /** Change l'état d'expansion de toute les lignes parentes */
    public toggleAll$(collapsed?: boolean): Observable<IItemTree[]> {
        return super.toggleAll$(collapsed)
            .switchMap((items) => this.calcViewList$().first().map(() => items));
    }

    /** Change l'état d'expansion de toute les lignes parentes */
    public toggleAll(collapsed?: boolean) {
        this.toggleAll$(collapsed).first().subscribe(noop);
    }

    /** Change l'état d'expansion de la ligne spécifiée
     * @param index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param collapse  Etat de l'élément. True pour réduire l'élément.
     * @return Observable résolu par la fonction.
     */
    public toggleCollapse$(index: number, collapsed: boolean): Observable<IItemTree> {
        return super.toggleCollapse$(index, collapsed)
            .do(() => {
                if (this.dropdownVisible) {
                    this.reshowDropDown();
                }
            });
    }

    /** Change l'état d'expansion de la ligne spécifiée
     * @param index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param collapse  Etat de l'élément. True pour réduire l'élément.
     */
    public toggleCollapse(index: number, collapsed: boolean) {
        this.toggleCollapse$(index, collapsed).first().subscribe(noop);
    }

    public queryChanged(value: string) {
        this.query = value;
        if (!this.isModeSelect) {
            // Autocomplete or multiselect only
            this.dropDownQuery = this.query;
            if (this.isModeAutocomplete) {
                this.unselectAll$()
                    .first()
                    .subscribe(() => this.onModelChange());
            }
        }
    }

    public hideDropDown() {
        this.hideDropDown$.next();
    }

    public scroll(event: Event) {
        const element = event.target as HTMLElement;
        this.storeScrollPosition$.next(element.scrollTop);
    }
    public mousedown(e: MouseEvent) {
        if (this.mouseUp$sub) {
            this.mouseUp$sub.unsubscribe();
            this.mouseUp$sub = undefined;
        }

        this.selectingItemIndex = this.getItemIndexFromHTMLElement(e.target as HTMLElement);

        this.mouseUp$sub = Observable.fromEvent(this.listElement, 'mouseup')
            .subscribe((upEvent: MouseEvent) => {
                const itemIndex = this.getItemIndexFromHTMLElement(upEvent.target as HTMLElement);
                if (itemIndex === undefined || this.selectingItemIndex === undefined || itemIndex !== this.selectingItemIndex) {
                    return;
                }

                const item = this._itemList[itemIndex - this.vpStartRow] as IItemTree;
                if (!item || upEvent.button !== 0) {
                    // Right click menu
                    return;
                }

                const isExpandButton = (target: HTMLElement) => {
                    return target.id === 'expandbtn' || target.parentElement.id === 'expandbtn';
                };

                if (this.isCollapsible(item) && (isExpandButton(e.target as HTMLElement) || !this.isSelectable(item))) {
                    if (upEvent.button === 0) {
                        this.toggleCollapse$(itemIndex, !item.collapsed).first().subscribe(noop);
                    }
                } else if (!item.selected) {
                    this.select(item);
                }
            });
    }

    protected onCloseClicked(event?: DejaChipsCloseEvent) {
        if (this._control) {
            this._control.control.markAsTouched();
        }
        this.removeSelection(event && event.item);
    }
    protected removeSelection(item?: IItemBase) {
        if (!this._multiSelect) {
            this.query = '';
            this.dropDownQuery = '';
            this.setSelectedItems(undefined);
            this.onModelChange();
            delete this.selectingItemIndex;
        } else if (item) {
            this.toggleSelect$([item], false)
                .first()
                .subscribe((selectedItems) => {
                    const selected = [...selectedItems];
                    this.setSelectedItems(selected);
                    this.onModelChange(selected);
                });
        } else {
            this.unselectAll$()
                .first()
                .subscribe(() => this.onModelChange());
        }

        if (event) {
            event.stopPropagation();
            return false;
        }
    }

    protected calcViewList$(): Observable<IViewListResult> {
        return super.calcViewList$(this.dropDownQuery)
            .do(() => this.changeDetectorRef.markForCheck());
    }

    protected ensureItemVisible(item: IItemBase | number) {
        super.ensureItemVisible(item);
    }

    private onModelChange(items?: IItemBase[] | IItemBase) {
        let outputEmitter = null;

        let output = null;

        if (items) {
            if (Array.isArray(items)) {
                const models = items.map((itm) => itm.model !== undefined ? itm.model : itm);
                outputEmitter = {
                    items: items,
                    models: models,
                } as DejaItemsEvent;

                if (this.modelIsValue) {
                    const valueField = this.getValueField();
                    if (models.find((m) => !!m[valueField])) {
                        output = models.map((m) => m[valueField] || m);
                    }
                } else {
                    output = models;
                }
            } else {
                const model = items.model;
                outputEmitter = {
                    item: items,
                    model: model,
                } as DejaItemEvent;

                if (this.modelIsValue) {
                    const valueField = this.getValueField();
                    output = model[valueField] || model;
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

    private select(item: IItemBase, hideDropDown?: boolean) {
        if (!this.isSelectable(item)) {
            return;
        }

        if (!item) {
            // this.query = '';
            // this.dropDownQuery = '';
            // this.setSelectedItems(undefined);
            // this.onModelChange();
            return;
        }

        if (this._multiSelect) {
            this.toggleSelect$([item], true)
                .first()
                .subscribe((selectedItems) => {
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
        if (hideDropDown !== false) {
            this.hideDropDown();
        }
    }

    private toggleDropDown() {
        if (this.dropdownVisible) {
            this.hideDropDown();
        } else {
            this.showDropDown();
        }
    }

    private showDropDown() {
        this.showDropDown$.next();
    }

    private reshowDropDown() {
        if (!this.dropdownVisible) {
            return this.showDropDown();
        }

        delete this.selectingItemIndex;

        // Restore scroll Position
        const listElement = this.listElement;
        if (listElement) {
            listElement.scrollTop = this.lastScrollPosition;
        }

        this.calcViewList$()
            .do(() => this.refreshViewPort())
            .combineLatest(this.viewPortChanged) // Wait for viewport calculation
            .first()
            .delay(1) // Ensure viewport binding
            .subscribe(() => {
                this.overlay.updatePosition();

                // Ensure selection
                const item = this.getSelectedItems()[0];
                const index = item && this.getItemIndex(item);
                if (index >= 0) {
                    this.currentItemIndex = index;
                    this.ensureItemVisible(index);
                }
            });
    }

    private ensureSelection() {
        if (this._multiSelect) {
            // Do nothing yet
        } else {
            this.query = this.selectedItems.length ? this.getTextValue(this.selectedItems[0]) : '';
        }
    }
}
