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

import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, forwardRef, Input, OnDestroy, QueryList, ViewChild, ViewChildren, ViewEncapsulation, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs/Rx';
import { IItemBase, IItemTree, ItemListBase, ItemListService, IViewPort, ViewportMode, ViewPortService } from '../../common/core/item-list';
import { KeyCodes } from '../../common/core/keycodes.enum';
import { DejaDropDownComponent } from '../dropdown';

const noop = () => { };

const SelectComponentValueAccessor = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DejaSelectComponent),
};

/** Combo box avec une liste basée sur la treelist */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [SelectComponentValueAccessor, ViewPortService],
    selector: 'deja-select',
    styleUrls: [
        './select.component.scss',
    ],
    templateUrl: './select.component.html',
})
export class DejaSelectComponent extends ItemListBase implements ControlValueAccessor, OnDestroy, AfterViewInit {
    /** Texte à afficher par default dans la zone de recherche */
    @Input() public placeholder: string;
    /** Correspond au ngModel du champ de filtrage ou recherche */
    @Input() public query = '';
    /** Hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    @Input() public maxHeight = 500;
    /** ID de l'élement dans lequel la liste déroulante doit s'afficher (la liste déroulante ne peut dépasser de l'élement spécifié ici) */
    @Input() public dropdownContainerId: string;
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

    // NgModel implementation
    protected onTouchedCallback: () => void = noop;
    protected onChangeCallback: (_: any) => void = noop;

    protected keyboardNavigation = false;

    private subscriptions: Subscription[] = [];
    private mouseUp$sub: Subscription;

    @ContentChild('hintTemplate') protected hintTemplateInternal;
    @ContentChild('placeHolderTemplate') protected placeHolderTemplateInternal;
    @ContentChild('itemTemplate') protected itemTemplateInternal;
    @ContentChild('parentItemTemplate') protected parentItemTemplateInternal;
    @ContentChild('selectedTemplate') protected selectedTemplate;
    @ContentChild('suffixTemplate') protected mdSuffix;
    @ViewChild('inputElement') private input: ElementRef;
    @ViewChildren('listitem') private listItemElements: QueryList<ElementRef>;
    @ViewChild('listcontainer') private listcontainer;
    @ViewChild(DejaDropDownComponent) private dropDownComponent: DejaDropDownComponent;

    private _type = 'select';
    private ignoreNextScrollEvents = false;  // TODO unused
    private selectingItemIndex: number;
    private keepExistingViewPort = false;
    private dropDownQuery = '';
    private filterExpression = '';
    private dropdownVisible = false;
    private lastScrollPosition = 0;
    private _selectionClearable = false;
    private _waiter = false;
    public _dropdownAlignment = 'left';
    public _ownerAlignment = 'left right bottom';

    private clearFilterExpression$ = new BehaviorSubject<void>(null);
    private filterListComplete$ = new Subject();
    private storeScrollPosition$ = new Subject();
    private hideDropDown$ = new Subject<number>();
    private showDropDown$ = new Subject();
    private filter$ = new Subject<Event>();

    private keyboardNavigation$ = new Subject();

    constructor(changeDetectorRef: ChangeDetectorRef, viewPort: ViewPortService, private elementRef: ElementRef) {
        super(changeDetectorRef, viewPort);

        this.subscriptions.push(Observable.from(this.clearFilterExpression$)
            .debounceTime(750)
            .subscribe(() => this.filterExpression = ''));

        this.subscriptions.push(Observable.from(this.filterListComplete$)
            .debounceTime(this.delaySearchTrigger)
            .subscribe(() => {
                this._itemList = [];
                this.showDropDown();
            }));

        this.subscriptions.push(Observable.from(this.storeScrollPosition$)
            .debounceTime(30)
            .switchMap(() => this.calcViewPort$())
            .subscribe(() => {
                this.keepExistingViewPort = false;
                const listElement = this.listElement as HTMLElement;
                this.lastScrollPosition = listElement.scrollTop;
            }));

        this.subscriptions.push(Observable.from(this.hideDropDown$)
            .filter(() => this.dropdownVisible)
            .delayWhen((time) => Observable.timer(time || 0))
            .subscribe(() => {
                delete this.selectingItemIndex;
                this.dropdownVisible = false;
                this.changeDetectorRef.markForCheck();
            }));

        this.subscriptions.push(this.showDropDown$
            .debounceTime(50)
            .do(() => this.dropdownVisible = true) // Ensure that dropdown container exists
            .do(() => this.changeDetectorRef.markForCheck())
            .delay(1)
            .filter(() => !!this.dropDownComponent) // Show canceled by the hide$ observable if !dropdownVisible
            .do(() => {
                // Restore scroll Position
                const listElement = this.listElement;
                if (listElement) {
                    this.listElement.scrollTop = this.lastScrollPosition;
                }
            })
            .switchMap(() => this.calcViewPort$())
            .delay(1)
            .filter(() => !!this.dropDownComponent) // Show canceled by the hide$ observable if !dropdownVisible
            .do(() => this.dropDownComponent.show())
            .subscribe(() => {
                // Ensure selection
                const item = this.getSelectedItems()[0];
                const index = item && this.getItemIndex(item);
                if (index >= 0) {
                    this.currentItemIndex = index;
                    this.ensureItemVisible(index);
                }
            }));

        this.subscriptions.push(Observable.from(this.keyboardNavigation$)
            .do(() => this.keyboardNavigation = true)
            .debounceTime(1000)
            .subscribe(() => {
                this.keyboardNavigation = false;
                this.changeDetectorRef.markForCheck();
            }));
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

    /** Indique ou détermine si le bouton pour effacer la selection doit être affiché */
    @Input()
    public set selectionClearable(value: boolean) {
        this._selectionClearable = coerceBooleanProperty(value);
    }

    public get selectionClearable() {
        return this._selectionClearable;
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
            const containerElement = this.listElement as HTMLElement;
            const containerHeight = this.maxHeight || containerElement.clientHeight;
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
     * Les trois valeurs acceptés en paramètre se trouvent dans l'enum ViewportMode (NoViewport, ConstantRowheight, VariableRowHeight)
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
     * Set a promise called before an item selection
     */
    @Input()
    public set selectingItem(fn: (item: any) => Promise<any>) {
        super.setSelectingItem(fn);
    }

    /**
     * Set a promise called before an item deselection
     */
    @Input()
    public set unselectingItem(fn: (item: any) => Promise<any>) {
        super.setUnselectingItem(fn);
    }

    /** Retourne si le select est en mode select, donc en lecture seule. */
    public get isReadOnly() {
        return this._type === 'select';
    }

    /** Retourne si le select est en mode autocomplete */
    public get isAutocomplete() {
        return this._type === 'autocomplete';
    }

    /** Retourne la liste des éléments selectionés en mode multiselect */
    public get selectedItems() {
        return super.getSelectedItems();
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
    public get waiter() {
        return this._waiter;
    }

    /** Définit la liste des éléments au format IItemBase */
    @Input()
    public set items(items: IItemBase[] | Promise<IItemBase[]> | Observable<IItemBase[]>) {
        super.setItems$(items).subscribe(() => {
        }, (error: any) => {
            this._hintLabel = error.toString();
        });
    }

    /** Définit la liste des éléments (tout type d'objet métier) */
    @Input()
    public set models(items: any[] | Observable<any[]>) {
        super.setModels$(items)
            .first()
            .switchMap(() => this.calcViewPort$())
            .subscribe(() => {
            }, (error: any) => {
                this._hintLabel = error.toString();
            });
    }

    /** Retourne le nombre de niveau pour une liste hierarchique */
    public get depthMax() {
        return this._depthMax;
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

    private get containerElement() {
        return this.dropdownContainerId && this.elementRef.nativeElement.ownerDocument.getElementById(this.dropdownContainerId);
    }

    private get listElement() {
        return this.listcontainer && this.listcontainer.elementRef.nativeElement as HTMLElement;
    }

    private get inputElement() {
        return this.input && this.input.nativeElement as HTMLInputElement;
    }

    // From ControlValueAccessor interface
    public writeValue(value: any) {
        if (!value) {
            return;
        }

        if (this._multiSelect) {
            super.setSelectedModels(value);
        } else {
            const item = super.convertToIItemBase([value])[0];
            if (item !== this.selectedItems[0]) {
                this.unselectAll$()
                    .switchMap(() => {
                        if (item) {
                            return this.toggleSelect$([item], true).map(() => this.getTextValue(value));
                        } else {
                            return Observable.of('');
                        }
                    })
                    .subscribe((query) => this.query = query);
            }
        }

        this.changeDetectorRef.markForCheck();
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    // ************* End of ControlValueAccessor Implementation **************

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    public ngAfterViewInit() {
        this.subscriptions.push(Observable.fromEvent(this.inputElement, 'click')
            .filter(() => !this.dropdownVisible)
            .subscribe(() => {
                if (!this.isReadOnly) {
                    this.inputElement.select();
                    this.filter$.next(event);
                } else {
                    this.showDropDown();
                }
            }));

        this.subscriptions.push(Observable.fromEvent(this.inputElement, 'focus')
            .filter(() => !this.dropdownVisible)
            .subscribe(() => {
                if (this.isReadOnly) {
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
            .filter((event: KeyboardEvent) => event.keyCode === KeyCodes.Home ||
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

                        if (!this.isReadOnly) {
                            return;
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

        const keyUp$ = Observable.fromEvent(this.inputElement, 'keyup')
            .filter((event: KeyboardEvent) => event.keyCode >= KeyCodes.Key0 ||
                event.keyCode === KeyCodes.Backspace ||
                event.keyCode === KeyCodes.Space ||
                event.keyCode === KeyCodes.Delete);

        this.subscriptions.push(Observable.merge(keyUp$, this.filter$)
            .do(() => {
                if ((this.query || '').length < this.minSearchlength) {
                    this._itemList = [];
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
                if (this.isReadOnly) {
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
            .switchMap(() => this.calcViewPort$());
    }

    /** Change l'état d'expansion de la ligne spécifiée
     * @param {number} index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param {boolean} collapse  Etat de l'élément. True pour réduire l'élément.
     * @return {Observable} Observable résolu par la fonction.
     */
    public toggleCollapse$(index: number, collapsed: boolean): Observable<IItemTree[]> {
        this.keepExistingViewPort = false;
        return super.toggleCollapse$(index, collapsed)
            .do(() => {
                if (this.dropdownVisible) {
                    this.reshowDropDown();
                }
            });
    }

    protected scroll() {
        if (this.viewPort.mode === ViewportMode.NoViewport || this.ignoreNextScrollEvents) {
            this.ignoreNextScrollEvents = false;
            return;
        }

        this.keepExistingViewPort = true;
        this.calcViewPort$()
            .first()
            .subscribe(() => this.storeScrollPosition$.next());
    }

    protected mousedown(e: MouseEvent) {
        if (this.mouseUp$sub) {
            this.mouseUp$sub.unsubscribe();
            this.mouseUp$sub = undefined;
        }

        this.selectingItemIndex = this.getItemIndexFromHTMLElement(e.target as HTMLElement);

        const element = this.elementRef.nativeElement as HTMLElement;
        this.mouseUp$sub = Observable.fromEvent(element, 'mouseup').subscribe((e: MouseEvent) => {
            const itemIndex = this.getItemIndexFromHTMLElement(e.target as HTMLElement);
            if (itemIndex === undefined || this.selectingItemIndex === undefined || itemIndex !== this.selectingItemIndex) {
                return;
            }

            const item = this._itemList[itemIndex] as IItemTree;
            if (!item || e.button !== 0) {
                // Right click menu
                return;
            }

            if (this.isCollapsible(item)) {
                if (e.button === 0) {
                    this.toggleCollapse$(itemIndex + this.vpStartRow, !item.collapsed).first().subscribe(noop);
                }
            } else if (!item.selected) {
                this.select(item);
            }
        });
    }

    protected queryChanged(event: Event) {
        const target = event.target as HTMLInputElement;
        this.query = target.value;
        if (!this.isReadOnly) {
            // Autocomplete or multiselect only
            this.dropDownQuery = this.query;
            if (this.isAutocomplete) {
                this.unselectAll$().first().subscribe(noop);
            }
        }
    }

    protected removeSelection(event: Event, item: IItemBase) {
        if (!this._multiSelect) {
            this.query = '';
            this.dropDownQuery = '';
            this.setSelectedItems(undefined);
            this.onModelChange();
            delete this.selectingItemIndex;
            this.inputElement.focus();
            this.hideDropDown();
        } else {
            this.toggleSelect$([item], false)
                .first()
                .subscribe((selectedItems) => {
                    const selected = [...selectedItems];
                    this.setSelectedItems(selected);
                    this.onModelChange(selected);
                });
        }

        event.stopPropagation();
        return false;
    }

    protected calcViewPort$() {
        return super.calcViewPort$(this.dropDownQuery, this.maxHeight, this.listElement)
            .do((res: IViewPort) => {
                // Prevent that the adaptation of the scroll raise a new view port calculation
                // this.ignoreNextScrollEvents = res.outOfRange;
                if (!this.keepExistingViewPort) {
                    this._itemList = res.items;
                }
                this.changeDetectorRef.markForCheck();
            });
    }

    protected ensureItemVisible(item: IItemBase | number) {
        super.ensureItemVisible(this.query, this.listElement, this.listItemElements, item);
    }

    private onModelChange(items?: IItemBase[] | IItemBase) {
        let output = items;

        if (super.isBusinessObject() && items) {
            if (items instanceof Array) {
                output = items.map((item) => item.model);
            } else {
                output = items.model;
            }
        }

        this.onChangeCallback(output);
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

        this.calcViewPort$()
            .first()
            .subscribe(() => {
                this.dropDownComponent.show();

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
