/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Optional, Output, Self, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import 'rxjs/add/operator/merge';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { DejaClipboardService } from '../../common/core/clipboard/clipboard.service';
import { Position } from '../../common/core/graphics/position';
import { Rect } from '../../common/core/graphics/rect';
import { GroupingService } from '../../common/core/grouping';
import { DejaItemEvent, DejaItemsEvent, IItemBase, IItemTree, ItemListBase, ItemListService, IViewPort, ViewportMode, ViewPortService } from '../../common/core/item-list';
import { KeyCodes } from '../../common/core/keycodes.enum';
import { SortingService } from '../../common/core/sorting';
import { DejaChildValidatorDirective } from '../../common/core/validation';
import { IDejaDragEvent } from '../dragdrop';
import { DejaTreeListScrollEvent } from './tree-list-scroll-event';

const noop = () => { };

/** Composant de liste évoluée avec gestion de viewport et templating */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ViewPortService],
    selector: 'deja-tree-list',
    styleUrls: [
        './tree-list.component.scss',
    ],
    templateUrl: './tree-list.component.html',
})
export class DejaTreeListComponent extends ItemListBase implements OnDestroy, AfterViewInit, ControlValueAccessor {
    /** Texte à afficher par default dans la zone de recherche */
    @Input() public placeholder: string;
    /** Texte affiché si aucune donnée n'est présente dans le tableau */
    @Input() public nodataholder: string;
    /** Correspond au ngModel du champ de filtrage ou recherche */
    @Input() public query = '';
    /** Permet de définir un template de ligne par binding */
    @Input() public itemTemplateExternal;
    /** Permet de définir un template de ligne parente par binding. */
    @Input() public parentItemTemplateExternal;
    /** Permet de définir un template pour le loader par binding. */
    @Input() public loaderTemplateExternal;
    /** Permet de définir un template d'entête de colonne par binding. */
    @Input() public headerTemplateExternal;
    /** Permet de définir un template comme prefixe de la zone de recherche par binding. */
    @Input() public searchPrefixTemplateExternal;
    /** Permet de définir un template comme suffixe de la zone de recherche par binding. */
    @Input() public searchSuffixTemplateExternal;

    /** Exécuté lorsque le déplacement d'une ligne est terminée. */
    @Output() public itemDragEnd = new EventEmitter<IDejaDragEvent>();
    /** Exécuté lorsque le déplacement d'une ligne commence. */
    @Output() public itemDragStart = new EventEmitter<IDejaDragEvent>();
    /** Exécuté lorsque la scrollbar change de position. */
    @Output() public scroll = new EventEmitter<DejaTreeListScrollEvent>();
    /** Exécuté lorsque l'utilisateur sélectionne ou désélectionne une ligne. */
    @Output() public selectedChange = new EventEmitter<DejaItemsEvent | DejaItemEvent>();
    /** Exécuté lorsque le calcul du viewPort est executé. */
    @Output() public viewPortChanged = new EventEmitter<IViewPort>();

    /** Internal use */
    @ViewChild('listcontainer') public listContainer: ElementRef;
    @ViewChild('inputelement') public input: ElementRef;

    // NgModel implementation
    protected onTouchedCallback: () => void = noop;
    protected onChangeCallback: (_: any) => void = noop;

    protected keyboardNavigation = false;

    // Templates
    @ContentChild('itemTemplate') private itemTemplateInternal;
    @ContentChild('parentItemTemplate') private parentItemTemplateInternal;
    @ContentChild('loaderTemplate') private loaderTemplateInternal;
    @ContentChild('headerTemplate') private headerTemplateInternal;
    @ContentChild('searchPrefixTemplate') private searchPrefixTemplateInternal;
    @ContentChild('searchSuffixTemplate') private searchSuffixTemplateInternal;

    // protected _items: IItemBase[]; In the base class, correspond to the model
    private clickedItem: IItemBase;
    private rangeStartIndex = 0;
    private filterExpression = '';
    private _searchArea = false;
    private _sortable = false;
    private _itemsDraggable = false;
    private hasCustomService = false;
    private hasLoadingEvent = false;
    @HostBinding('attr.disabled') private _disabled = null;

    private keyboardNavigation$ = new Subject();

    private subscriptions: Subscription[] = [];
    private mouseUp$sub: Subscription;

    private clearFilterExpression$ = new BehaviorSubject<void>(null);
    private filterListComplete$ = new Subject();

    constructor(changeDetectorRef: ChangeDetectorRef, public viewPort: ViewPortService, public elementRef: ElementRef, @Self() @Optional() public _control: NgControl, @Optional() private clipboardService: DejaClipboardService) {
        super(changeDetectorRef, viewPort);

        if (this._control) {
            this._control.valueAccessor = this;
        }

        this.subscriptions.push(Observable.from(this.clearFilterExpression$)
            .debounceTime(400)
            .subscribe(() => this.filterExpression = ''));

        this.subscriptions.push(Observable.from(this.filterListComplete$)
            .debounceTime(250)
            .do(() => this.setCurrentItem(undefined))
            .switchMap(() => this.calcViewList$())
            .subscribe(noop));

        this.subscriptions.push(Observable.from(this.keyboardNavigation$)
            .do(() => this.keyboardNavigation = true)
            .debounceTime(1000)
            .subscribe(() => {
                this.keyboardNavigation = false;
                this.changeDetectorRef.markForCheck();
            }));

        this.subscriptions.push(Observable.fromEvent(window, 'resize')
            .debounceTime(5)
            .subscribe(() => {
                this.viewPort.deleteSizeCache();
                this.viewPort.refresh();
                this.changeDetectorRef.markForCheck();
            }));

        this.maxHeight = 0;
        this._viewPortChanged = this.viewPortChanged;
    }

    /** Définit la longueur minimale de caractères dans le champ de recherche avant que la recherche ou le filtrage soient effectués */
    @Input('min-search-length')
    public set minSearchlength(value: number) {
        this._minSearchLength = value;
    }

    public get minSearchlength() {
        return this._minSearchLength;
    }

    /** Affiche un barre de recherche au dessus de la liste. */
    @Input()
    public set searchArea(value: boolean | string) {
        this._searchArea = value != null && `${value}` !== 'false';
    }

    public get searchArea() {
        return this._searchArea || this.minSearchlength > 0;
    }

    /** Permet de trier la liste au clic sur l'entête */
    @Input()
    public set sortable(value: boolean | string) {
        this._sortable = value != null && `${value}` !== 'false';
    }

    public get sortable() {
        return this._sortable;
    }

    /** Rend les lignes de la liste draggable vers un autre composant (ne pas confondre avec la propriété `sortable`) */
    @Input()
    public set itemsDraggable(value: boolean | string) {
        this._itemsDraggable = value != null && `${value}` !== 'false';
    }

    public get itemsDraggable() {
        return this._itemsDraggable;
    }

    @Input()
    /** Définit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
    public set pageSize(value: number) {
        this._pageSize = value;
    }

    /** Retourne le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
    public get pageSize() {
        if (this._pageSize === 0) {
            const vpRowHeight = this.getViewPortRowHeight();
            const containerHeight = this.maxHeight || this.listElement.clientHeight;
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
     * Les valeurs acceptées en paramètre se trouvent dans l'enum ViewportMode (disabled, constant, variable ou auto)
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
        return super.getCurrentItem();
    }

    /** Retourne le nombre de niveau pour une liste hierarchique */
    public get depthMax() {
        return this._depthMax;
    }

    /** Définit une valeur indiquant si plusieurs lignes peuvent être sélectionées. */
    @Input()
    public set multiSelect(value: boolean | string) {
        super.setMultiSelect(value != null && `${value}` !== 'false');
    }

    /** Retourne une valeur indiquant si plusieurs lignes peuvent être sélectionées. */
    public get multiSelect() {
        return this._multiSelect;
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
        this.setSelectedModels([value])
    }

    /** Retourne le model selectioné en mode single select */
    public get selectedModel() {
        const selectedModel = super.getSelectedModels();
        return selectedModel && selectedModel[0];
    }

    /** Définit la liste des models selectionés en mode multiselect */
    @Input()
    public set selectedModels(value: IItemBase[]) {
        this.setSelectedModels(value)
    }

    /** Retourne la liste des models selectionés en mode multiselect */
    public get selectedModels() {
        return super.getSelectedModels();
    }

    /** Definit le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading. */
    @Input()
    public set itemListService(value: ItemListService) {
        this.hasCustomService = true;
        this.setItemListService(value);
    }

    /** Retourne le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading. */
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

    /** Définit la liste des éléments */
    @Input()
    public set items(items: IItemBase[] | Promise<IItemBase[]> | Observable<IItemBase[]>) {
        this.writeValue(items);
    }

    /**
     * Set a observable called before the list will be displayed
     */
    @Input()
    public set loadingItems(fn: (query: string | RegExp, selectedItems: IItemBase[]) => Observable<IItemBase>) {
        this.hasLoadingEvent = !!fn;
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

    /** Définit la liste des éléments (tout type d'objet métier) */
    @Input()
    public set models(items: any[] | Observable<any[]>) {
        super.setModels$(items)
            .switchMap(() => this.calcViewList$())
            .subscribe(noop);
    }

    /** Permet de désactiver le select */
    @Input()
    public set disabled(value: boolean | string) {
        const disabled = value != null && `${value}` !== 'false';
        this._disabled = disabled || null;
    }

    public get disabled() {
        return this._disabled;
    }

    @ViewChild(DejaChildValidatorDirective)
    protected set inputValidatorDirective(value: DejaChildValidatorDirective) {
        if (value) {
            value.parentControl = this._control;
        }
    }

    protected get listElement(): HTMLElement {
        return this.listContainer && this.listContainer.nativeElement;
    }

    private set currentItemIndex(value: number) {
        super.setCurrentItemIndex(value);
        this.changeDetectorRef.markForCheck();
    }

    private get currentItemIndex() {
        return this.getCurrentItemIndex();
    }

    private get itemTemplate() {
        return this.itemTemplateExternal || this.itemTemplateInternal;
    }

    private get parentItemTemplate() {
        return this.parentItemTemplateExternal || this.parentItemTemplateInternal;
    }

    private get loaderTemplate() {
        return this.loaderTemplateExternal || this.loaderTemplateInternal;
    }

    private get headerTemplate() {
        return this.headerTemplateExternal || this.headerTemplateInternal;
    }

    private get searchPrefixTemplate() {
        return this.searchPrefixTemplateExternal || this.searchPrefixTemplateInternal;
    }

    private get searchSuffixTemplate() {
        return this.searchSuffixTemplateExternal || this.searchSuffixTemplateInternal;
    }

    // ************* ControlValueAccessor Implementation **************
    /** Définit la liste des éléments, sans invoquaer ngModelChange */
    /** @deprecated */
    public writeValue(items: any) {
        delete this.hintLabel;
        super.setItems$(items)
            .switchMap((itms) => {
                if (this.minSearchlength > 0 && !this.query) {
                    // Waiting for query
                    this._itemList = [];
                    this.changeDetectorRef.markForCheck();
                    return Observable.of(itms);
                } else {
                    return this.calcViewList$().map(() => itms);
                }
            })
            .subscribe(noop);
    }

    // From ControlValueAccessor interface
    /** @deprecated */
    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    /** @deprecated */
    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    // ************* End of ControlValueAccessor Implementation **************

    /** Change l'état d'expansion de toute les lignes parentes */
    public toggleAll$(): Observable<IItemTree> {
        return super.toggleAll$()
            .switchMap(() => this.calcViewList$().first());
    }

    /** Change l'état d'expansion de toute les lignes parentes */
    public toggleAll() {
        this.toggleAll$().first().subscribe(noop);
    }

    /** Positionne a scrollbar pour assurer que l'élément spécifié soit visible */
    public ensureItemVisible(item: IItemBase | number) {
        super.ensureItemVisible(item);
    }

    /** Efface le contenu de la liste */
    public clearViewPort() {
        super.clearViewPort();
    }

    public ngAfterViewInit() {
        // FIXME Issue angular/issues/6005
        // see http://stackoverflow.com/questions/34364880/expression-has-changed-after-it-was-checked
        if (this._itemList.length === 0 && (this.hasCustomService || this.hasLoadingEvent)) {
            Observable.timer(1)
                .first()
                .switchMap(() => this.calcViewList$())
                .subscribe(noop);
        }

        this.subscriptions.push(Observable
            .fromEvent(this.listElement, 'scroll')
            .map((event: any) => [event, event.target.scrollTop, event.target.scrollLeft])
            .map(([event, scrollTop, scrollLeft]: [Event, number, number]) => {
                const e = {
                    originalEvent: event,
                    scrollLeft: scrollLeft,
                    scrollTop: scrollTop,
                } as DejaTreeListScrollEvent;

                this.scroll.emit(e);
                return scrollTop;
            })
            .subscribe((scrollPos) => this.viewPort.scrollPosition$.next(scrollPos)));

        let keyDown$ = Observable.fromEvent(this.listElement, 'keydown');
        if (this.input) {
            const inputKeyDown$ = Observable.fromEvent(this.input.nativeElement, 'keydown');
            keyDown$ = keyDown$.merge(inputKeyDown$);
        }

        this.subscriptions.push(keyDown$
            .filter(() => !this.disabled)
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
                // Set current item from index for keyboard features only
                const setCurrentIndex = (index: number) => {
                    this.currentItemIndex = index;
                    this.ensureItemVisible(this.currentItemIndex);
                    this.viewPort.refresh();
                };

                const currentIndex = this.rangeStartIndex >= 0 ? this.rangeStartIndex : this.rangeStartIndex = this.currentItemIndex;

                switch (event.keyCode) {
                    case KeyCodes.Home:
                        if (event.shiftKey) {
                            this.selectRange$(currentIndex, 0).first().subscribe(noop);
                        } else if (!event.ctrlKey) {
                            this.rangeStartIndex = 0;
                            this.selectRange$(this.rangeStartIndex).first().subscribe(noop);
                        }
                        setCurrentIndex(0);
                        return false;

                    case KeyCodes.End:
                        if (event.shiftKey) {
                            this.selectRange$(currentIndex, this.rowsCount - 1).first().subscribe(noop);
                        } else if (!event.ctrlKey) {
                            this.rangeStartIndex = this.rowsCount - 1;
                            this.selectRange$(this.rangeStartIndex).first().subscribe(noop);
                        }
                        setCurrentIndex(this.rowsCount - 1);
                        return false;

                    case KeyCodes.PageUp:
                        const upindex = Math.max(0, this.currentItemIndex - this.pageSize);
                        if (event.shiftKey) {
                            this.selectRange$(currentIndex, upindex).first().subscribe(noop);
                        } else if (!event.ctrlKey) {
                            this.rangeStartIndex = upindex;
                            this.selectRange$(this.rangeStartIndex).first().subscribe(noop);
                        }
                        setCurrentIndex(upindex);
                        return false;

                    case KeyCodes.PageDown:
                        const dindex = Math.min(this.rowsCount - 1, this.currentItemIndex + this.pageSize);
                        if (event.shiftKey) {
                            this.selectRange$(currentIndex, dindex).first().subscribe(noop);
                        } else if (!event.ctrlKey) {
                            this.rangeStartIndex = dindex;
                            this.selectRange$(this.rangeStartIndex).first().subscribe(noop);
                        }
                        setCurrentIndex(dindex);
                        return false;

                    case KeyCodes.UpArrow:
                        const uaindex = Math.max(0, this.currentItemIndex - 1);
                        if (uaindex !== -1) {
                            if (event.shiftKey) {
                                this.selectRange$(currentIndex, uaindex).first().subscribe(noop);
                            } else if (!event.ctrlKey) {
                                this.rangeStartIndex = uaindex;
                                this.selectRange$(this.rangeStartIndex).first().subscribe(noop);
                            }
                            setCurrentIndex(uaindex);
                        }
                        return false;

                    case KeyCodes.DownArrow:
                        const daindex = Math.min(this.rowsCount - 1, this.currentItemIndex + 1);
                        if (daindex !== -1) {
                            if (event.shiftKey) {
                                this.selectRange$(currentIndex, daindex).first().subscribe(noop);
                            } else if (!event.ctrlKey) {
                                this.rangeStartIndex = daindex;
                                this.selectRange$(this.rangeStartIndex).first().subscribe(noop);
                            }
                            setCurrentIndex(daindex);
                        }
                        return false;

                    case KeyCodes.Space:
                        const target = event.target as HTMLElement;
                        if (target.tagName === 'INPUT' && !event.ctrlKey && !event.shiftKey) {
                            return true;
                        }

                        const sitem = this.currentItem as IItemTree;
                        if (sitem) {
                            if (this.isCollapsible(sitem)) {
                                this.toggleCollapse$(currentIndex, !sitem.collapsed).first().subscribe(noop);
                            } else if (sitem.selected) {
                                this.toggleSelect$([sitem], false).first().subscribe(noop);
                            } else if (this.multiSelect && event.ctrlKey) {
                                this.toggleSelect$([sitem], !sitem.selected).first().subscribe(noop);
                            } else {
                                this.unselectAll$()
                                    .switchMap(() => this.toggleSelect$([sitem], true))
                                    .first()
                                    .subscribe(noop);
                            }
                        }
                        return false;

                    case KeyCodes.Enter:
                        const eitem = this.currentItem as IItemTree;
                        if (eitem) {
                            if (this.isCollapsible(eitem) || eitem.selected) {
                                this.toggleCollapse$(currentIndex, !eitem.collapsed).first().subscribe(noop);
                            } else if (eitem.selectable) {
                                this.unselectAll$()
                                    .switchMap(() => this.toggleSelect$([eitem], true))
                                    .first()
                                    .subscribe(noop);
                            }
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


        let keyUp$ = Observable.fromEvent(this.listElement, 'keyup');
        if (this.input) {
            const inputKeyup$ = Observable.fromEvent(this.input.nativeElement, 'keyup');
            const inputDrop$ = Observable.fromEvent(this.input.nativeElement, 'drop');
            keyUp$ = keyUp$.merge(inputKeyup$, inputDrop$);
        }

        // Ensure list cache
        this.subscriptions.push(keyUp$
            .filter(() => !this.disabled)
            .do(() => {
                if ((this.query || '').length < this.minSearchlength) {
                    this._itemList = [];
                    return;
                }
            })
            .filter((event: KeyboardEvent) => event.keyCode >= KeyCodes.Key0 ||
                event.keyCode === KeyCodes.Backspace ||
                event.keyCode === KeyCodes.Space ||
                event.keyCode === KeyCodes.Delete)
            .subscribe((event: KeyboardEvent) => {
                // Set current item from index for keyboard features only
                const setCurrentIndex = (index: number) => {
                    this.currentItemIndex = index;
                    this.ensureItemVisible(this.currentItemIndex);
                };

                if (!this.searchArea) {
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
                            event.preventDefault();
                            return false;
                        }, this.currentItemIndex)
                            .first()
                            .subscribe((result) => {
                                if (result.index >= 0) {
                                    setCurrentIndex(result.index);
                                }
                            });
                    }
                } else {
                    // Autocomplete, filter the list
                    this.keyboardNavigation$.next();
                    if (event.keyCode !== KeyCodes.Space) {
                        this.filterListComplete$.next();
                    }
                }
            }));

        this.viewPort.element$.next(this.listElement);
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    protected mousedown(e: MouseEvent) {
        if (this.disabled) {
            return;
        }

        if (this.mouseUp$sub) {
            this.mouseUp$sub.unsubscribe();
            this.mouseUp$sub = undefined;
        }

        const itemIndex = this.getItemIndexFromHTMLElement(e.target as HTMLElement);
        if (itemIndex === undefined) {
            return;
        }

        const item = this._itemList[itemIndex - this.vpStartRow];
        this.clickedItem = item;
        const isExpanButton = (e.target as HTMLElement).id === 'expandbtn';
        if ((!isExpanButton || !this.isCollapsible(item)) && this.isSelectable(item) && (!e.ctrlKey || !this.multiSelect) && (e.button === 0 || !item.selected)) {
            if (e.shiftKey && this.multiSelect) {
                // Select all from current to clicked
                this.selectRange$(itemIndex, this.currentItemIndex)
                    .first()
                    .subscribe(() => this.changeDetectorRef.markForCheck());
                return false;
            } else if (!e.ctrlKey || !this.multiSelect) {
                if (!this.multiSelect && item.selected) {
                    return;
                }

                this.unselectAll$().first().subscribe(() => {
                    this.currentItemIndex = itemIndex;
                    this.toggleSelect$([item], true)
                        .first()
                        .subscribe(() => this.changeDetectorRef.markForCheck());
                });
            }
        }

        const element = this.elementRef.nativeElement as HTMLElement;
        this.mouseUp$sub = Observable.fromEvent(element, 'mouseup')
            .first()
            .filter(() => !this.disabled)
            .subscribe((upevt: MouseEvent) => {
                const upIndex = this.getItemIndexFromHTMLElement(upevt.target as HTMLElement);
                if (upIndex === undefined) {
                    return;
                }

                const upItem = this._itemList[upIndex - this.vpStartRow];
                if (this.clickedItem && upItem !== this.clickedItem) {
                    return;
                }

                if (upevt.shiftKey) {
                    return;
                }

                if (upevt.button !== 0) {
                    // Right click menu
                    return;
                }

                const isExpandButton = (upevt.target as HTMLElement).id === 'expandbtn';
                if (this.isCollapsible(upItem) && (isExpandButton || !this.isSelectable(upItem))) {
                    const treeItem = upItem as IItemTree;
                    this.toggleCollapse$(upIndex, !treeItem.collapsed).first().subscribe(() => {
                        this.currentItemIndex = upIndex;
                    });

                } else if (upevt.ctrlKey && this.multiSelect) {
                    this.currentItemIndex = upIndex;
                    this.toggleSelect$([upItem], !upItem.selected)
                        .first()
                        .subscribe(() => this.changeDetectorRef.markForCheck());
                }

                this.rangeStartIndex = -1;
            });
    }

    protected getDragContext(index: number) {
        if (!this.clipboardService || (!this.sortable && !this.itemsDraggable)) {
            return null;
        }

        return {
            dragendcallback: (event: IDejaDragEvent) => {
                this.itemDragEnd.emit(event);
                delete this._ddStartIndex;
                delete this._ddTargetIndex;
                this.calcViewList$().first().subscribe(noop); // Comment this line to debug dragdrop
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
                index: index,
            },
        };
    }

    protected getDropContext() {
        if (!this.clipboardService || !this.sortable) {
            return null;
        }

        const dragcallback = (event: IDejaDragEvent) => {
            if (this._ddStartIndex === undefined) {
                return;
            }

            const targetIndex = this.getItemIndexFromHTMLElement(event.target as HTMLElement);
            if (targetIndex === undefined) {
                return;
            }

            // Faire calculer le target final en fonction de la hierarchie par le service
            this.calcDragTargetIndex$(this._ddStartIndex, targetIndex)
                .switchMap((finalTarget) => {
                    if (finalTarget !== undefined && finalTarget !== this._ddTargetIndex) {
                        this._ddTargetIndex = finalTarget;
                        return this.calcViewList$()
                            .first()
                            .map(() => finalTarget);
                    } else {
                        return Observable.of(finalTarget);
                    }
                })
                .subscribe(noop);

            event.preventDefault();
            return;
        };

        return {
            dragentercallback: dragcallback,
            dragovercallback: dragcallback,
            dropcallback: (event: IDejaDragEvent) => {
                delete this._ddStartIndex;
                delete this._ddTargetIndex;
                this.drop$()
                    .switchMap(() => this.calcViewList$().first())
                    .subscribe(noop);
                event.preventDefault();
            },
        };
    }

    protected dragLeave(event: DragEvent) {
        const listRect = this.listElement.getBoundingClientRect();

        const listBounds = Rect.fromLTRB(listRect.left,
            listRect.top,
            listRect.right,
            listRect.bottom);

        if (!listBounds.containsPoint(new Position(event.pageX, event.pageY))) {
            this._ddTargetIndex = this._ddStartIndex;
            this.calcViewList$().first().subscribe(noop);
        }
    }

    protected onSelectionChange() {
        const e = this.multiSelect ? {
            items: this.selectedItems,
            models: this.selectedModels,
        } as DejaItemsEvent : {
            item: this.selectedItems[0],
            model: this.selectedItems[0] && this.selectedItems[0].model,
        } as DejaItemEvent;
        this.selectedChange.emit(e);
    }

    protected selectRange$(indexFrom: number, indexTo?: number): Observable<number> {
        return super.selectRange$(indexFrom, indexTo).do((selectedCount) => {
            if (selectedCount) {
                // Raise event
                this.onSelectionChange();
            }
            return selectedCount;
        }).do(() => this.changeDetectorRef.markForCheck());
    }

    protected toggleSelect$(items: IItemBase[], state: boolean): Observable<IItemBase[]> {
        if (!this._multiSelect && !items[0].selected === !state) {
            return Observable.of(items);
        } else {
            return super.toggleSelect$(items, state)
                .do(() => {
                    // Raise event
                    this.onSelectionChange();
                });
        }
    }

    protected calcViewList$(): Observable<IViewPort> {
        return super.calcViewList$(this.query)
            .do(() => this.changeDetectorRef.markForCheck());
    }
}
