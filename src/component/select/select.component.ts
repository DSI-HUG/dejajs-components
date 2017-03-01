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

import {
    Component,
    ContentChild,
    ElementRef,
    forwardRef,
    Input,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {coerceBooleanProperty} from '@angular/material/core/coercion/boolean-property';
import {Observable, Subscription} from 'rxjs/Rx';
import {clearTimeout, setTimeout} from 'timers';
import {Position} from '../../common/core/graphics';
import {
    IItemBase,
    IItemTree,
    ItemListBase,
    ItemListService,
    IViewListResult,
    ViewportMode,
} from '../../common/core/item-list';
import {KeyCodes} from '../../common/core/keycodes.enum';
import {DejaDropDownComponent} from '../dropdown';

const noop = () => {
};

const SelectComponentValueAccessor = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DejaSelectComponent),
};

/** Combo box avec une liste basée sur la treelist */
@Component({
    encapsulation: ViewEncapsulation.None,
    providers: [SelectComponentValueAccessor],
    selector: 'deja-select',
    styleUrls: [
        './select.component.scss',
    ],
    templateUrl: './select.component.html',
})
export class DejaSelectComponent extends ItemListBase implements ControlValueAccessor {
    /** Texte à afficher par default dans la zone de recherche */
    @Input() public placeholder: string;
    /** Permet de définir la longueur minimale de caractères dans le champ de recherche avant que la recherche ou le filtrage soient effectués */
    @Input('min-search-length') public minlength = 0;
    /** Correspond au ngModel du champ de filtrage ou recherche */
    @Input() public query = '';
    /** Hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    @Input() public maxHeight = 500;
    /** ID de l'élement dans lequel la liste déroulante doit s'afficher (la liste déroulante ne peut dépasser de l'élement spécifié ici) */
    @Input() public dropdownContainerId: string;
    /** Ancre d'alignement de la liste déroulante. Valeurs possible: top, bottom, right, left. Une combinaison des ces valeurs peut également être utilisée, par exemple 'top left'. */
    @Input() public dropdownAlignment = 'left right bottom';
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

    @ContentChild('hintTemplate') protected hintTemplateInternal;
    @ContentChild('placeHolderTemplate') protected placeHolderTemplateInternal;
    @ContentChild('itemTemplate') protected itemTemplateInternal;
    @ContentChild('parentItemTemplate') protected parentItemTemplateInternal;
    @ContentChild('selectedTemplate') protected selectedTemplate;
    @ContentChild('suffixTemplate') protected mdSuffix;
    @ViewChild('inputelement') private inputElementRef: ElementRef;
    @ViewChildren('dropdownitem') private dropdownItemElements: QueryList<ElementRef>;
    @ViewChild('listcontainer') private listcontainer;
    @ViewChild(DejaDropDownComponent) private dropDownComponent: DejaDropDownComponent;

    private _type = 'select';
    private ignoreNextScrollEvents = false;
    private selectingItemIndex: number;
    private _keyboardNavigation = false;
    private keyboardNavigationPos = new Position();
    private keepExistingViewPort = false;
    private dropDownQuery = '';
    private filterExpression = '';
    private clearFilterTimer: NodeJS.Timer;
    private completeTimer: NodeJS.Timer;
    private showTimer: NodeJS.Timer;
    private scrollTimeout: NodeJS.Timer;
    private dropdownVisible = false;
    private lastScrollPosition = 0;
    private _selectionClearable = false;
    private _waiter = false;

    private mouseMoveObs: Subscription;
    private mouseUpObs: Subscription;

    constructor(private elementRef: ElementRef) {
        super();
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
        this.setHideSelected(value !== "false");
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

    /** Retourne la ligne courant ou ligne active */
    public get currentItem() {
        return this.getCurrentItem();
    }

    /** Définit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
    @Input()
    public set pageSize(value: number) {
        this._pageSize = value;
    }

    /** Retourne le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
    public get pageSize() {
        if (this._pageSize === 0) {
            let vpRowHeight = this.getViewPortRowHeight();
            let containerElement = this.listElement as HTMLElement;
            let containerHeight = this.maxHeight || containerElement.clientHeight;
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
            throw 'Invalid type property for DejaSelectComponent. Type can be select, autocomplete or multiselect.';
        }
        this._type = type;
        this.setMultiSelect(this._type === "multiselect");
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
        return this._type === "select";
    }

    /** Retourne si le select est en mode autocomplete */
    public get isAutocomplete() {
        return this._type === "autocomplete";
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
        super.setItems(items).subscribe(() => {
        }, (error: any) => {
            this._hintLabel = error.toString();
        });
    }

    /** Définit la liste des éléments (tout type d'objet métier) */
    @Input()
    public set models(items: any[] | Observable<any[]>) {
        super.setModels(items).subscribe(() => {
        }, (error: any) => {
            this._hintLabel = error.toString();
        });
    }

    /** Retourne le nombre de niveau pour une liste hierarchique */
    public get depthMax() {
        return this._depthMax;
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
        return this.listcontainer.elementRef.nativeElement as HTMLElement;
    }

    private get inputElement() {
        return this.inputElementRef && this.inputElementRef.nativeElement as HTMLInputElement;
    }

    private set keyboardNavigation(value: boolean) {
        this._keyboardNavigation = value && this.dropdownVisible;
        if (this._keyboardNavigation) {
            if (this.mouseMoveObs) {
                return;
            }

            this.mouseMoveObs = Observable.fromEvent(this.listElement, 'mousemove').subscribe((event: MouseEvent) => {
                if (!this.keyboardNavigationPos) {
                    this.keyboardNavigationPos = new Position(event.x, event.y);
                } else if (Math.abs(event.x - this.keyboardNavigationPos.left) > 5 || Math.abs(event.y - this.keyboardNavigationPos.top) > 5) {
                    this.keyboardNavigation = false;
                    delete this.keyboardNavigationPos;
                }
            });
        } else if (this.mouseMoveObs) {
            this.mouseMoveObs.unsubscribe();
            delete this.mouseMoveObs;
        }
    }

    private get keyboardNavigation() {
        return this._keyboardNavigation;
    }

    // ************* ControlValueAccessor Implementation **************
    // // set accessor including call the onchange callback
    // set value(value: any) {
    //     let selectedItems = this.getSelectedItems() || [];
    //     if (this._multiSelect || value !== selectedItems[0]) {
    //         this.writeValue(value);

    //         // The event is synchrone, but not the selection.
    //         // If there is any problems with that, just create a setSelectedItems methode and return a promise.
    //         // No way to change the value implementation, because this is part of the control value accessor
    //         this.onChangeCallback(super.isBusinessObject ? value.model : value);
    //     }
    // }

    // // get accessor
    // get value(): any {
    //     // Special binding on selected item here. Value never can be null or undefined otherwise,
    //     // the ng2 binding don't work when no selected items.
    //     let selectedItems = super.getSelectedItems();
    //     return selectedItems.length ? (this._multiSelect ? selectedItems : selectedItems[0]) : undefined;
    // }

    // From ControlValueAccessor interface
    public writeValue(value: any) {
        if (!value) {
            return;
        }

        if (this._multiSelect) {
            super.setSelectedModels(value);
        } else {
            let item = super.convertToIItemBase([value])[0];
            if (item !== this.selectedItems[0]) {
                this.unselectAll().then(() => {
                    if (item) {
                        this.toggleSelect([item], true).then(() => {
                            this.query = this.getTextValue(value);
                        });
                    } else {
                        this.query = '';
                    }
                });
            }
        }
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

    /** Change l'état d'expansion de toute les lignes parentes */
    public toggleAll() {
        return new Promise<void>((resolved?: () => void, rejected?: (reason: any) => void) => {
            super.toggleAll().then(() => {
                this.calcViewPort().then(resolved).catch(rejected);
            }).catch((reason) => {
                rejected(reason);
            });
        });
    }

    /** Change l'état d'expansion de la ligne spécifiée
     * @param {number} index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param {boolean} collapse  Etat de l'élément. True pour réduire l'élément.
     * @return {Promise} Promesse résolue par la fonction.
     */
    public toggleCollapse(index: number, collapsed: boolean): Promise<boolean> {
        return new Promise<boolean>((resolved?: (value: boolean) => void, rejected?: (reason: any) => void) => {
            this.keepExistingViewPort = true;
            super.toggleCollapse(index, collapsed).then((result) => {
                resolved(result);
                this.keepExistingViewPort = false;
                if (this.dropdownVisible) {
                    this.reshowDropDown();
                }
            }).catch((reason) => {
                rejected(reason);
                this.keepExistingViewPort = false;
            });
        });
    }

    protected filter(event: KeyboardEvent) {
        if (!this.isReadOnly && (this.query || '').length < this.minlength) {
            this.hideDropDown();
            return;
        }

        // Set and get current index for keyboard features only
        let setCurrentIndex = (index: number, item?: IItemBase) => {
            this._currentItemIndex = index;
            if (this.dropdownVisible) {
                this.ensureItemVisible(this._currentItemIndex);
            }

            if (!this._multiSelect) {
                item = item || this.getCurrentItem();
                this.select(item, false);
            }
        };

        if (event.type === 'keydown') {
            switch (event.keyCode) {
                case KeyCodes.Home:
                    if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                        this.toggleDropDown();
                    } else {
                        setCurrentIndex(0);
                    }
                    this.keyboardNavigation = true;
                    return false;

                case KeyCodes.End:
                    if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                        this.toggleDropDown();
                    } else {
                        setCurrentIndex(Math.max(0, this.rowsCount - 1));
                    }
                    this.keyboardNavigation = true;
                    return false;

                case KeyCodes.PageUp:
                    if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                        this.toggleDropDown();
                    } else {
                        let index = Math.max(0, this._currentItemIndex - this.pageSize);
                        setCurrentIndex(index);
                    }
                    return false;

                case KeyCodes.PageDown:
                    if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                        this.toggleDropDown();
                    } else {
                        let index = Math.min(this.rowsCount - 1, this._currentItemIndex + this.pageSize);
                        setCurrentIndex(index);
                    }
                    this.keyboardNavigation = true;
                    return false;

                case KeyCodes.UpArrow:
                    if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                        this.toggleDropDown();
                    } else {
                        let index = Math.max(0, this._currentItemIndex - 1);
                        setCurrentIndex(index);
                    }
                    this.keyboardNavigation = true;
                    return false;

                case KeyCodes.DownArrow:
                    if (event.altKey || this._multiSelect && !this.dropdownVisible) {
                        this.toggleDropDown();
                    } else {
                        let index = Math.min(this.rowsCount - 1, this._currentItemIndex + 1);
                        setCurrentIndex(index);
                    }
                    this.keyboardNavigation = true;
                    return false;

                case KeyCodes.Space:
                    if (this.dropdownVisible) {
                        let item = this._itemList[this._currentItemIndex - this.vpStartRow] as IItemTree;
                        if (this.isCollapsible(item)) {
                            this.keyboardNavigation = true;
                            this.toggleCollapse(this._currentItemIndex, !item.collapsed);
                            return false;
                        }
                    }

                    if (!this.isReadOnly) {
                        return;
                    }

                // Do not break or return here

                case KeyCodes.Enter:
                    if (this.dropdownVisible) {
                        let item = this._itemList[this._currentItemIndex - this.vpStartRow];
                        this.select(item);
                    }
                    this.keyboardNavigation = true;
                    return false;

                default:
                    return true;
            }
        } else {
            if (event.keyCode < KeyCodes.Key0 && event.keyCode !== KeyCodes.Backspace && event.keyCode !== KeyCodes.Delete) {
                // Forward
                return true;
            }

            // console.log('select.component, keycode:' + event.keyCode);
            this.keyboardNavigation = true;
            if (this.isReadOnly) {
                // Select, search on the list
                if ((/[a-zA-Z0-9]/).test(event.key)) {
                    // Valid char
                    if (this.clearFilterTimer) {
                        clearTimeout(this.clearFilterTimer);
                    }
                    this.clearFilterTimer = setTimeout(() => {
                        this.clearFilterTimer = undefined;
                        this.filterExpression = '';
                    }, 750);

                    // Search next
                    this.filterExpression += event.key;
                    let rg = new RegExp('^' + this.filterExpression, 'i');
                    this.findNextMatch((item) => {
                        if (item && this.isSelectable(item)) {
                            let label = this.getTextValue(item);
                            if (rg.test(label)) {
                                return true;
                            }
                        }
                        return false;
                    }, this._currentItemIndex).then((result) => {
                        if (result) {
                            setCurrentIndex(result.index, result.item);
                        }
                    });
                }
            } else {
                // Autocomplete, filter the list
                if (this.completeTimer) {
                    clearTimeout(this.completeTimer);
                }
                this.completeTimer = setTimeout(() => {
                    this.completeTimer = undefined;
                    this._itemList = [];
                    this.showDropDown();
                }, this.delaySearchTrigger);
            }
        }
    }

    protected scroll() {
        if (this._viewportMode === ViewportMode.NoViewport || this.ignoreNextScrollEvents) {
            this.ignoreNextScrollEvents = false;
            return;
        }

        this.keepExistingViewPort = true;
        this.calcViewPort();

        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
            delete this.scrollTimeout;
        }

        this.scrollTimeout = setTimeout(() => {
            delete this.scrollTimeout;
            this.calcViewPort().then(() => {
                this.keepExistingViewPort = false;
                let listElement = this.listElement as HTMLElement;
                this.lastScrollPosition = listElement.scrollTop;
            });
        }, 30);
    }

    protected click(event) {
        if (this.dropdownVisible) {
            return;
        }

        if (!this.isReadOnly) {
            this.inputElement.select();
            this.filter(event);
        } else {
            this.showDropDown();
        }
    }

    protected mousedown(e: MouseEvent) {
        this.selectingItemIndex = this.getItemIndexFromHTMLElement(e.target as HTMLElement);
        this.mouseUp = true;
    }

    protected focus(event) {
        if (this.dropdownVisible) {
            return;
        }

        if (this.isReadOnly) {
            this.showDropDown();
        } else {
            // Autocomplete
            this.filter(event);
        }
    }

    protected blur() {
        if (this.selectingItemIndex !== undefined) {
            return;
        }

        this.onTouchedCallback();

        setTimeout(() => {
            if (this.showTimer) {
                clearTimeout(this.showTimer);
                this.showTimer = undefined;
            }
            this.hideDropDown();
        }, 10);
    }

    protected queryChanged(value) {
        // Autocomplete or multiselect only
        this.dropDownQuery = value;
        if (this.isAutocomplete) {
            this.unselectAll();
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
            this.toggleSelect([item], false).then((selectedItems) => {
                const selected = [...selectedItems];
                this.setSelectedItems(selected);
                this.onModelChange(selected);
            });
        }

        event.stopPropagation();
        return false;
    }

    protected calcViewPort() {
        return new Promise<IViewListResult>((resolved?: (value: IViewListResult) => void, rejected?: (reason: any) => void) => {
            super.calcViewPort(this.dropDownQuery, this.maxHeight, this.listElement).then((res: IViewListResult) => {
                // Prevent that the adaptation of the scroll raise a new view port calculation
                this.ignoreNextScrollEvents = res.outOfRange;
                if (!this.keepExistingViewPort) {
                    this._itemList = res.visibleList;
                }
                resolved(res);
            }).catch((reason) => {
                rejected(reason);
            });
        });
    }

    protected ensureItemVisible(item: IItemBase | number) {
        super.ensureItemVisible(this.query, this.listElement, this.dropdownItemElements, item);
    }

    private onModelChange(items?: IItemBase[] | IItemBase) {
        let output = items;

        if (super.isBusinessObject && items) {
            if (items instanceof Array) {
                output = items.map((item) => item.model);
            } else {
                output = items.model;
            }
        }
        
        this.onChangeCallback(output);
    }

    private set mouseUp(value: boolean) {
        if (value) {
            if (this.mouseUpObs) {
                return;
            }

            let element = this.elementRef.nativeElement as HTMLElement;
            this.mouseUpObs = Observable.fromEvent(element, 'mouseup').subscribe((e: MouseEvent) => {
                this.mouseUp = false;

                let itemIndex = this.getItemIndexFromHTMLElement(e.target as HTMLElement);
                if (itemIndex === undefined || this.selectingItemIndex === undefined || itemIndex !== this.selectingItemIndex) {
                    return;
                }

                let item = this._itemList[itemIndex] as IItemTree;
                if (!item || e.button !== 0) {
                    // Right click menu
                    return;
                }

                if (this.isCollapsible(item)) {
                    if (e.button === 0) {
                        this.toggleCollapse(itemIndex + this.vpStartRow, !item.collapsed);
                    }
                } else if (!item.selected) {
                    this.select(item);
                }
            });
        } else if (this.mouseUpObs) {
            this.mouseUpObs.unsubscribe();
            delete this.mouseUpObs;
        }
    }

    private select(item: IItemBase, hideDropDown?: boolean) {
        if (!item || !this.isSelectable(item)) {
            return;
        }

        if (item) {
            if (this._multiSelect) {
                this.toggleSelect([item], true).then((selectedItems) => {
                    const selected = [...selectedItems];
                    this.setSelectedItems(selected);
                    this.onModelChange(selected);
                    this.query = '';
                    this.dropDownQuery = '';
                });
            } else {
                this.query = this.getTextValue(item);
                this.dropDownQuery = '';
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
        if (this.showTimer) {
            clearTimeout(this.showTimer);
            this.showTimer = undefined;
        }
        if (this.completeTimer) {
            clearTimeout(this.completeTimer);
            this.completeTimer = undefined;
        }

        delete this.selectingItemIndex;
        this.dropdownVisible = false;
    }

    private showDropDown() {
        if (this.showTimer) {
            clearTimeout(this.showTimer);
        }

        // Ensure that dropdown container exists
        this.dropdownVisible = true;
        this.showTimer = setTimeout(() => {
            this.showTimer = undefined;

            // Restore scroll Position            
            this.listElement.scrollTop = this.lastScrollPosition;

            this.calcViewPort().then(() => {
                if (this.dropDownComponent) {
                    this.dropDownComponent.show();

                    // Ensure selection
                    let item = this.getSelectedItems()[0];
                    let index = item && this.getItemIndex(item);
                    if (index >= 0) {
                        this._currentItemIndex = index;
                        this.ensureItemVisible(index);
                    }
                }
            });
        }, 50);
    }

    private reshowDropDown() {
        if (!this.dropdownVisible) {
            return this.showDropDown();
        }

        if (this.showTimer) {
            clearTimeout(this.showTimer);
            this.showTimer = undefined;
        }

        if (this.completeTimer) {
            clearTimeout(this.completeTimer);
            this.completeTimer = undefined;
        }

        delete this.selectingItemIndex;

        // Restore scroll Position            
        this.listElement.scrollTop = this.lastScrollPosition;

        this.calcViewPort().then(() => {
            this.dropDownComponent.show();

            // Ensure selection
            let item = this.getSelectedItems()[0];
            let index = item && this.getItemIndex(item);
            if (index >= 0) {
                this._currentItemIndex = index;
                this.ensureItemVisible(index);
            }
        });
    }
}
