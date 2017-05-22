/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Optional, Output, Self, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { MdInputContainer, MdInputDirective } from '@angular/material';
import 'rxjs/add/operator/delayWhen';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { KeyCodes } from '../../common/core/keycodes.enum';
import { DejaChildValidatorDirective } from '../../common/core/validation/child-validator.directive';
import { DejaDropDownComponent, IDropDownResetParams } from '../dropdown/dropdown.component';
import { IItemBase } from './../../common/core/item-list/item-base';
import { DejaItemEvent } from './../../common/core/item-list/item-event';
import { ItemListBase } from './../../common/core/item-list/item-list-base';
import { ItemListService } from './../../common/core/item-list/item-list.service';
import { IItemTree } from './../../common/core/item-list/item-tree';
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
    providers: [ViewPortService],
    selector: 'deja-select',
    styleUrls: [
        './select.component.scss',
    ],
    templateUrl: './select.component.html',
})
export class DejaSelectComponent extends ItemListBase implements ControlValueAccessor, OnDestroy, AfterViewInit, AfterContentInit {
    /** Texte à afficher par default dans la zone de recherche */
    @Input() public placeholder: string;
    /** ID de l'élement dans lequel la liste déroulante doit s'afficher (la liste déroulante ne peut dépasser de l'élement spécifié ici) */
    @Input() public dropdownContainerId: string;
    @Input() public dropdownContainerElement: ElementRef | HTMLElement;
    /** Permet de définir un template de ligne par binding */
    @Input() public itemTemplateExternal;
    /** Permet de définir un template de ligne parente par binding. */
    @Input() public parentItemTemplateExternal;
    /** Permet de définir un template pour la zone de texte d'information. */
    @Input() public placeHolderTemplateExternal;
    /** Permet de définir un template pour l'élément de conseil ou d'affichage d'erreur. */
    @Input() public hintTemplateExternal;
    /** Temps d'attente avant que la recherche dans la liste soit lancée */
    @Input('delay-search-trigger') public delaySearchTrigger = 250;
    /** Exécuté lorsque le calcul du viewPort est executé. */
    @Output() public viewPortChanged = new EventEmitter<IViewPort>();
    /** Exécuté lorsque l'utilisateur sélectionne ou désélectionne une ligne. */
    @Output() public selectedChange = new EventEmitter<DejaItemsEvent | DejaItemEvent>();

    // NgModel implementation
    protected onTouchedCallback: () => void = noop;
    protected onChangeCallback: (_: any) => void = noop;
    protected onValidatorChangeCallback: () => void = noop;

    protected keyboardNavigation = false;

    private subscriptions: Subscription[] = [];
    private mouseUp$sub: Subscription;

    @ContentChild('hintTemplate') protected hintTemplateInternal;
    @ContentChild('placeHolderTemplate') protected placeHolderTemplateInternal;
    @ContentChild('itemTemplate') protected itemTemplateInternal;
    @ContentChild('parentItemTemplate') protected parentItemTemplateInternal;
    @ContentChild('selectedTemplate') protected selectedTemplate;
    @ContentChild('suffixTemplate') protected mdSuffix;

    @ViewChild('inputElement') private _inputElement: ElementRef;
    @ViewChild(MdInputContainer) private inputContainer: MdInputContainer;
    @ViewChild(MdInputDirective) protected input: MdInputDirective;
    @ViewChild('listcontainer') private listContainer: any;
    @ViewChild(DejaDropDownComponent) private dropDownComponent: DejaDropDownComponent;

    @HostBinding('attr.disabled') private _disabled = null;
    private _type = 'select';
    private selectingItemIndex: number;
    private dropDownQuery = '';
    private filterExpression = '';
    private _dropdownVisible = false;
    private lastScrollPosition = 0;
    private _selectionClearable = false;
    private _waiter = false;
    private _dropdownAlignment = 'left';
    private _ownerAlignment = 'left right bottom';
    private _query = '';
    private _readonly = false;

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

    private _selectedItemsPosition = DejaSelectSelectionPosition.above;

    constructor(changeDetectorRef: ChangeDetectorRef, public viewPort: ViewPortService, private elementRef: ElementRef, @Self() @Optional() public _control: NgControl, @Optional() private _parentForm: NgForm, @Optional() private _parentFormGroup: FormGroupDirective) {
        super(changeDetectorRef, viewPort);

        if (this._control) {
            this._control.valueAccessor = this;
        }

        if (this._parentForm) {
            this._parentForm.ngSubmit.subscribe(() => {
                this.changeDetectorRef.markForCheck();
            })
        }

        if (this._parentFormGroup) {
            this._parentFormGroup.ngSubmit.subscribe(() => {
                this.changeDetectorRef.markForCheck();
            })
        }

        this.subscriptions.push(Observable.from(this.clearFilterExpression$)
            .debounceTime(750).subscribe(() => this.filterExpression = ''));

        this.subscriptions.push(Observable.from(this.filterListComplete$)
            .debounceTime(this.delaySearchTrigger)
            .subscribe(() => {
                this._itemList = [];
                this.reshowDropDown();
            }));

        this.subscriptions.push(Observable.from(this.storeScrollPosition$)
            .subscribe((scrollPos) => {
                this.viewPort.scrollPosition$.next(scrollPos);
                this.lastScrollPosition = scrollPos; // TODO ItemListBase scrollPos defined
            }));

        this.subscriptions.push(Observable.from(this.hideDropDown$)
            .filter(() => this.dropdownVisible)
            .delayWhen((time) => Observable.timer(time || 0))
            .subscribe(() => {
                delete this.selectingItemIndex;
                this.dropdownVisible = false;
                this.viewPort.element$.next(null);
            }));

        this.subscriptions.push(this.showDropDown$
            .debounceTime(50)
            .filter(() => (this.query || '').length >= this.minSearchlength && !this._readonly)
            .do(() => this.dropdownVisible = true)  // Ensure that dropdown container exists
            .delay(1)
            .filter(() => !!this.dropDownComponent)  // Show canceled by the hide$ observable if !dropdownVisible
            .do(() => {
                const selectedItems = this.getSelectedItems();
                const first = selectedItems && selectedItems[0];
                const index = first && this.getItemIndex(first);
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
            .switchMap(() => this.calcViewList$().first())
            .filter(() => !!this.dropDownComponent)  // Show canceled by the hide$ observable if !dropdownVisible
            .delay(1)
            .filter(() => !!this.dropDownComponent)  // Show canceled by the hide$ observable if !dropdownVisible
            .switchMap(() => {
                if (this.viewPort.mode === ViewportMode.auto) {
                    // reset the height to the  maxsize in auto mode to avoid measurment
                    this.dropDownComponent.show({ height: this.maxHeight });
                    return this.dropDownComponent.showed;
                } else {
                    this.dropDownComponent.show();
                    return Observable.timer(1);
                }
            })
            .subscribe(() => {
                this.viewPort.element$.next(this.listElement);
            }));

        this._viewPortChanged = this.viewPortChanged;

        this.subscriptions.push(Observable.from(this.keyboardNavigation$)
            .do(() => this.keyboardNavigation = true)
            .debounceTime(1000)
            .subscribe(() => {
                this.keyboardNavigation = false;
                this.changeDetectorRef.markForCheck();
            }));

        this.subscriptions.push(Observable.from(this.query$)
            .do((query) => this._query = query)
            .filter(() => !!this.inputContainer)
            .delay(1)
            .subscribe(() => {
                // **** Force place holder to refresh to escape input angular material issue ****
                this.changeDetectorRef.markForCheck();
            }));

        this.subscriptions.push(Observable.combineLatest(this.writeValue$, this.contentInitialized$)
            .subscribe(([value]) => {
                if (!value) {
                    if (this.selectedItems && this.selectedItems.length) {
                        this.removeSelection();
                    }
                    return;
                }

                if (this._multiSelect) {
                    this.query = '';
                    super.setSelectedModels(value);
                } else {
                    const item = super.mapToIItemBase([value])[0];
                    this.unselectAll$()
                        .switchMap(() => {
                            if (item) {
                                return this.toggleSelect$([item], true).map(() => this.getTextValue(value));
                            } else {
                                return Observable.of('');
                            }
                        })
                        .first()
                        .subscribe((query) => this.query = query);
                }

                this.changeDetectorRef.markForCheck();
            })
        );

        this.maxHeight = 500;

    }

    /** Correspond au ngModel du champ de filtrage ou recherche */
    @Input()
    public set query(value: string) {
        this.query$.next(value);
    }

    public get query() {
        return this._query;
    }

    /** Ancre d'alignement de la liste déroulante. Valeurs possible: top, bottom, right, left. Une combinaison des ces valeurs peut également être utilisée, par exemple 'top left'. */
    @Input()
    public set dropdownAlignment(value: string) {
        const alignents = {
            bottom: false,
            left: false,
            right: false,
            top: false,
        };

        if (value) {
            value.split(/\s+/).map((align) => alignents[align] = true);
        }

        if (!alignents.left && alignents.right) {
            this._dropdownAlignment = 'right';
        } else {
            this._dropdownAlignment = 'left';
        }

        this._ownerAlignment = value;
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
        const disabled = value != null && `${value}` !== 'false';
        this._disabled = disabled || null;
        this.changeDetectorRef.markForCheck();
    }

    public get disabled() {
        return this._control ? this._control.disabled : this._disabled;
    }

    /** Indique ou détermine si le bouton pour effacer la selection doit être affiché */
    @Input()
    public set selectionClearable(value: boolean | string) {
        this._selectionClearable = value != null && `${value}` !== 'false';
    }

    public get selectionClearable() {
        return this._selectionClearable;
    }

    /** Définit la position des éléments selectionées en multiselect */
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
        this.setHideSelected(value !== 'false');
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
    public set pageSize(value: number) {
        this._pageSize = value;
    }

    /** Retourne le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
    public get pageSize() {
        if (this._pageSize === 0) {
            const vpRowHeight = this.getViewPortRowHeight();
            const containerElement = this.listElement;
            const containerHeight = this.maxHeight || containerElement && containerElement.clientHeight;
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
    public set viewPortRowHeight(value: number) {
        this.setViewPortRowHeight(value);
    }

    /**
     * Les trois valeurs acceptés en paramètre se trouvent dans l'enum ViewportMode (disabled, fixed, variable, auto)
     * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
     * est suceptible de contenir beaucoup d'éléments.
     */
    @Input()
    public set viewportMode(mode: ViewportMode) {
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
    }

    /**
     * Set a observable called before the list will be displayed
     */
    @Input()
    public set loadingItems(fn: (query: string | RegExp, selectedItems: IItemBase[]) => Observable<IItemBase>) {
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
        this.setSelectedItems(value)
    }

    /** Retourne la liste des éléments selectionés en mode multiselect */
    public get selectedItems() {
        return super.getSelectedItems();
    }

    /** Définit l'éléments selectioné en mode single select */
    @Input()
    public set selectedItem(value: IItemBase) {
        this.setSelectedItems([value])
    }

    /** Retourne l'éléments selectioné en mode single select */
    public get selectedItem() {
        const selectedItem = super.getSelectedItems();
        return selectedItem && selectedItem[0];
    }

    /** Définit le model selectioné en mode single select */
    @Input()
    public set selectedModel(value: IItemBase) {
        this.writeValue(value)
    }

    /** Retourne le model selectioné en mode single select */
    public get selectedModel() {
        const selectedModel = super.getSelectedModels();
        return selectedModel && selectedModel[0];
    }

    /** Définit la liste des models selectionés en mode multiselect */
    @Input()
    public set selectedModels(value: IItemBase[]) {
        this.writeValue(value)
    }

    /** Retourne la liste des models selectionés en mode multiselect */
    public get selectedModels() {
        return super.getSelectedModels();
    }

    /** Definit le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading. */
    @Input()
    public set itemListService(value: ItemListService) {
        this.setItemListService(value);
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
            .switchMap(() => this.calcViewList$())
            .subscribe(noop);
    }

    /** Définit la liste des éléments (tout type d'objet métier) */
    @Input()
    public set models(items: any[] | Observable<any[]>) {
        super.setModels$(items)
            .first()
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
    public set readonly(value: boolean) {
        this._readonly = value;
        this.changeDetectorRef.markForCheck();
    }

    public get readonly() {
        return this._readonly;
    }

    @ViewChild(DejaChildValidatorDirective)
    protected set inputValidatorDirective(value: DejaChildValidatorDirective) {
        if (value) {
            value.parentControl = this._control;
        }
    }

    protected get listElement() {
        return this.listContainer && this.listContainer.elementRef.nativeElement as HTMLElement;
    }

    private get containerElement(): HTMLElement {
        return this.dropdownContainerElement || this.dropdownContainerId && this.elementRef.nativeElement.ownerDocument.getElementById(this.dropdownContainerId);
    }

    private set currentItemIndex(value: number) {
        super.setCurrentItemIndex(value);
        this.changeDetectorRef.markForCheck();
    }

    private get currentItemIndex() {
        return this.getCurrentItemIndex();
    }

    private get placeHolderTemplate() {
        return this.placeHolderTemplateExternal || this.placeHolderTemplateInternal;
    }

    private get itemTemplate() {
        return this.itemTemplateExternal || this.itemTemplateInternal;
    }

    private get hintTemplate() {
        return this.hintTemplateExternal || this.hintTemplateInternal;
    }

    private get parentItemTemplate() {
        return this.parentItemTemplateExternal || this.parentItemTemplateInternal;
    }

    private get inputElement() {
        return this._inputElement && this._inputElement.nativeElement as HTMLInputElement;
    }

    private set dropdownVisible(value: boolean) {
        this._dropdownVisible = value;
        this.changeDetectorRef.markForCheck();
    }

    private get dropdownVisible() {
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

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    public ngAfterContentInit() {
        this.contentInitialized$.next();

        if (this._control) {
            this._control.valueChanges
                .filter(() => !!this.input)
                .subscribe(() => {
                    if (this._control.touched) {
                        this.input._ngControl.control.markAsTouched();
                    }
                    this.input._ngControl.control.updateValueAndValidity();
                });
        }
    }

    public ngAfterViewInit() {
        this.subscriptions.push(Observable.fromEvent(this.inputElement, 'click')
            .filter(() => !this.dropdownVisible && !this.disabled)
            .subscribe((event: Event) => {
                if (this.isModeSelect) {
                    this.showDropDown();
                } else {
                    this.inputElement.select();
                    this.filter$.next(event);
                }
            }));

        this.subscriptions.push(Observable.fromEvent(this.inputElement, 'focus')
            .filter(() => !this.dropdownVisible && !this.disabled)
            .delay(10)
            .filter(() => this.inputElement === document.activeElement)
            .subscribe((event: Event) => {
                if (this.isModeSelect) {
                    this.showDropDown();
                } else {
                    // Autocomplete
                    this.filter$.next(event);
                }
            }));

        this.subscriptions.push(Observable.fromEvent(this.inputElement, 'blur')
            .filter(() => this.selectingItemIndex === undefined)
            .subscribe(() => {
                this.onTouchedCallback();
                this.hideDropDown$.next(10);
            }));

        this.subscriptions.push(Observable.fromEvent(this.inputElement, 'keydown')
            .filter((event: KeyboardEvent) =>
                event.keyCode === KeyCodes.Home ||
                event.keyCode === KeyCodes.End ||
                event.keyCode === KeyCodes.PageUp ||
                event.keyCode === KeyCodes.PageDown ||
                event.keyCode === KeyCodes.UpArrow ||
                event.keyCode === KeyCodes.DownArrow ||
                event.keyCode === KeyCodes.Space ||
                event.keyCode === KeyCodes.Enter)
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

                switch (event.keyCode) {
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
                            const index = Math.max(0, this.currentItemIndex - this.pageSize);
                            setCurrentIndex(index);
                        }
                        return false;

                    case KeyCodes.PageDown:
                        if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                            this.toggleDropDown();
                        } else {
                            const index = Math.min(this.rowsCount - 1, this.currentItemIndex + this.pageSize);
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
            }));

        const keyUp$ = Observable
            .fromEvent(this.inputElement, 'keyup')
            .filter((event: KeyboardEvent) => event.keyCode >= KeyCodes.Key0 ||
                event.keyCode === KeyCodes.Backspace ||
                event.keyCode === KeyCodes.Space ||
                event.keyCode === KeyCodes.Delete);

        this.subscriptions.push(Observable.merge(keyUp$, this.filter$)
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
                        const rg = new RegExp('^' + this.filterExpression, 'i');
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
            }));
    }

    /** Change l'état d'expansion de toute les lignes parentes */
    public toggleAll$(): Observable<IItemTree> {
        return super.toggleAll$()
            .switchMap(() => this.calcViewList$().first());
    }

    /** Change l'état d'expansion de la ligne spécifiée
     * @param {number} index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param {boolean} collapse  Etat de l'élément. True pour réduire l'élément.
     * @return {Observable} Observable résolu par la fonction.
     */
    public toggleCollapse$(index: number, collapsed: boolean): Observable<IItemTree[]> {
        return super.toggleCollapse$(index, collapsed)
            .do(() => {
                if (this.dropdownVisible) {
                    this.reshowDropDown();
                }
            });
    }

    protected scroll(event: Event) {
        const element = event.target as HTMLElement;
        this.storeScrollPosition$.next(element.scrollTop);
    }
    protected mousedown(e: MouseEvent) {
        if (this.mouseUp$sub) {
            this.mouseUp$sub.unsubscribe();
            this.mouseUp$sub = undefined;
        }

        this.selectingItemIndex = this.getItemIndexFromHTMLElement(e.target as HTMLElement);

        const element = this.elementRef.nativeElement as HTMLElement;
        this.mouseUp$sub = Observable.fromEvent(element, 'mouseup')
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

                if (this.isCollapsible(item)) {
                    if (upEvent.button === 0) {
                        this.toggleCollapse$(itemIndex, !item.collapsed).first().subscribe(noop);
                    }
                } else if (!item.selected) {
                    this.select(item);
                }
            });
    }

    protected queryChanged(value: string) {
        this.query = value;
        if (!this.isModeSelect) {
            // Autocomplete or multiselect only
            this.dropDownQuery = this.query;
            if (this.isModeAutocomplete) {
                this.unselectAll$().first().subscribe(noop);
            }
        }
    }

    protected onCloseClicked(item?: IItemBase) {
        if (this._control) {
            this._control.control.markAsTouched();
        }
        this.removeSelection(item);
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

    protected calcViewList$(): Observable<IViewPort> {
        return super.calcViewList$(this.dropDownQuery)
            .do(() => {
                this.changeDetectorRef.markForCheck();
            });
    }

    protected ensureItemVisible(item: IItemBase | number) {
        super.ensureItemVisible(item);
    }

    private onModelChange(items?: IItemBase[] | IItemBase) {
        let outputEmitter = null;

        let output = null;

        if (items) {
            if (Array.isArray(items)) {
                const models = items.map((itm) => itm.model !== undefined ? itm.model : itm)
                outputEmitter = {
                    items: items,
                    models: models,
                } as DejaItemsEvent;
                output = models;
            } else {
                outputEmitter = {
                    item: items,
                    model: items.model,
                } as DejaItemEvent;
                output = items.model !== undefined ? items.model : items;
            }
        }

        this.onChangeCallback(output);

        if (outputEmitter) {
            this.selectedChange.emit(outputEmitter);
        }
    }

    private select(item: IItemBase, hideDropDown?: boolean) {
        if (!item || !this.isSelectable(item)) {
            return;
        }

        if (item) {
            if (this._multiSelect) {
                this.toggleSelect$([item], true)
                    .first()
                    .subscribe((selectedItems) => {
                        const selected = [...selectedItems];
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
        } else {
            this.query = '';
            this.dropDownQuery = '';
            this.setSelectedItems(undefined);
            this.onModelChange();
        }

        this.inputElement.focus();
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

    private hideDropDown() {
        this.hideDropDown$.next();
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
        this.listElement.scrollTop = this.lastScrollPosition;

        this.calcViewList$()
            .first()
            .subscribe(() => {
                this.dropDownComponent.show({
                    height: true,
                } as IDropDownResetParams);

                // Ensure selection
                const item = this.getSelectedItems()[0];
                const index = item && this.getItemIndex(item);
                if (index >= 0) {
                    this.currentItemIndex = index;
                    this.ensureItemVisible(index);
                }
            });
    }
}
