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

import { Component, ContentChild, ElementRef, EventEmitter, forwardRef, Input, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import { Observable, Subscription } from 'rxjs/Rx';
import { clearTimeout, setTimeout } from 'timers';
import { Position, Rect } from '../../common/core/graphics';
import { GroupingService } from '../../common/core/grouping';
import { IItemBase, IItemTree, ItemListBase, ItemListService, IViewListResult, ViewportMode } from '../../common/core/item-list';
import { KeyCodes } from '../../common/core/keycodes.enum';
import { SortingService } from '../../common/core/sorting';
import { IDejaDragEvent } from '../dragdrop';
import { DejaTreeListItemEvent, DejaTreeListItemsEvent, DejaTreeListScrollEvent } from './index';

const noop = () => { };

const TreeListComponentValueAccessor = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DejaTreeListComponent),
};

/** Composant de liste évoluée avec gestion de viewport et templating */
@Component({
    encapsulation: ViewEncapsulation.None,
    providers: [TreeListComponentValueAccessor],
    selector: 'deja-tree-list',
    styleUrls: [
        './tree-list.component.scss',
    ],
    templateUrl: './tree-list.component.html',
})
export class DejaTreeListComponent extends ItemListBase {
    /** Texte à afficher par default dans la zone de recherche */
    @Input() public placeholder: string;
    /** Texte affiché si aucune donnée n'est présente dans le tableau */
    @Input() public nodataholder: string;
    /** Permet de définir la longueur minimale de caractères dans le champ de recherche avant que la recherche ou le filtrage soient effectués */
    @Input('min-search-length') public minlength = 0;
    /** Correspond au ngModel du champ de filtrage ou recherche */
    @Input() public query = '';
    /** Hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    @Input() public maxHeight = 0;
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
    @Output() public selectedChange = new EventEmitter<DejaTreeListItemsEvent | DejaTreeListItemEvent>();
    /** Exécuté lorsque le calcul di viewPort est executé à l'initialisation. */
    @Output() public afterViewInit = new EventEmitter();

    /** Internal use */
    @ViewChild('listcontainer') public listcontainer: ElementRef;

    // NgModel implementation
    protected onTouchedCallback: () => void = noop;
    protected onChangeCallback: (_: any) => void = noop;

    @ViewChildren('listitem') private listItemElements: QueryList<ElementRef>;

    @ContentChild('itemTemplate') private itemTemplateInternal;
    @ContentChild('parentItemTemplate') private parentItemTemplateInternal;
    @ContentChild('loaderTemplate') private loaderTemplateInternal;
    @ContentChild('headerTemplate') private headerTemplateInternal;
    @ContentChild('searchPrefixTemplate') private searchPrefixTemplateInternal;
    @ContentChild('searchSuffixTemplate') private searchSuffixTemplateInternal;

    // protected _items: IItemBase[]; In the base class, correspond to the model
    private clickedItem: IItemBase;
    private rangeStartIndex = 0;
    private _keyboardNavigation = false;
    private keyboardNavigationPos: Position;
    private ignoreNextScrollEvents = false;
    private filterExpression = '';
    private clearFilterTimer: NodeJS.Timer;
    private completeTimer: NodeJS.Timer;
    private lastScrollTop = 0;
    private _searchArea = false;
    private _expandButton = false;
    private _sortable = false;
    private _itemsDraggable = false;

    private subscriptions: Subscription[] = [];

    private mouseMoveObs: Subscription;
    private mouseUpObs: Subscription;

    constructor(public elementRef: ElementRef) {
        super();
    }

    /** Affiche un barre de recherche au dessus de la liste. */
    @Input()
    public set searchArea(value: boolean) {
        this._searchArea = coerceBooleanProperty(value);
    }

    public get searchArea() {
        return this._searchArea;
    }

    /** Affiche un bouton pour réduire ou étendre toutes les lignes parentes du tableau */
    @Input()
    public set expandButton(value: boolean) {
        this._expandButton = coerceBooleanProperty(value);
    }

    public get expandButton() {
        return this._expandButton;
    }

    /** Permet de trier la liste au clic sur l'entête */
    @Input()
    public set sortable(value: boolean) {
        this._sortable = coerceBooleanProperty(value);
    }

    public get sortable() {
        return this._sortable;
    }

    /** Rend les lignes de la liste draggable vers un autre composant (ne pas confondre avec la propriété `sortable`) */
    @Input()
    public set itemsDraggable(value: boolean) {
        this._itemsDraggable = coerceBooleanProperty(value);
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
            const containerElement = this.listcontainer.nativeElement as HTMLElement;
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

    /** Retourne le nombre de niveau pour une liste hierarchique */
    public get depthMax() {
        return this._depthMax;
    }

    /** Définit une valeur indiquant si plusieurs lignes peuvent être sélectionées. */
    @Input()
    public set multiSelect(value: boolean) {
        super.setMultiSelect(coerceBooleanProperty(value) !== false);
    }

    /** Retourne une valeur indiquant si plusieurs lignes peuvent être sélectionées. */
    public get multiSelect() {
        return this._multiSelect;
    }

    /** Définit la liste des éléments selectionés en mode multiselect */
    @Input()
    public set selectedItems(items: IItemBase[]) {
        this.setSelectedModels(items);
    }

    /** Retourne la liste des éléments selectionés en mode multiselect */
    public get selectedItems(): IItemBase[] {
        return this.getSelectedModels() || [];
    }

    /** Définit la liste des éléments selectionés en mode single select */
    @Input()
    public set selectedItem(item: IItemBase) {
        if (this.multiSelect) {
            throw new Error('selectedItem binding is for single selection only, use selectedItems for multi selection');
        }

        this.selectedItems = item && [item];
    }

    /** Retourne la liste des éléments selectionés en mode single select */
    public get selectedItem() {
        if (this.multiSelect) {
            throw new Error('selectedItem is for single selection only, use selectedItems for multi selection');
        }

        return this.selectedItems[0];
    }

    /** Definit le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading. */
    @Input()
    public set itemListService(value: ItemListService) {
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

    /** Définit la liste des éléments (tout type d'objet métier) */
    @Input()
    public set models(items: any[] | Observable<any[]>) {
        super.setModels(items).subscribe(() => {
        }, (error: any) => {
            this._hintLabel = error.toString();
        });
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
    public writeValue(items: any) {
        delete this.hintLabel;
        super.setItems(items).subscribe(() => {
            if (this.minlength > 0 && !this.query) {
                // Waiting for query
                this._itemList = [];
            } else if (!!items || (this._itemList && this._itemList.length)) {
                this.calcViewPort();
            }
        }, (error: any) => {
            this.hintLabel = error.toString();
            this._itemList = [];
        });
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

    /** Positionne a scrollbar pour assurer que l'élément spécifié soit visible */
    public ensureItemVisible(item: IItemBase | number) {
        super.ensureItemVisible(this.query, this.listcontainer.nativeElement, this.listItemElements, item);
    }

    protected filter(event: KeyboardEvent) {
        if ((this.query || '').length < this.minlength) {
            this._itemList = [];
            return;
        }

        // Set current item from index for keyboard features only
        const setCurrentIndex = (index: number) => {
            this._currentItemIndex = index;
            this.ensureItemVisible(this._currentItemIndex);
        };

        if (event.type === 'keydown') {
            const currentIndex = this.rangeStartIndex >= 0 ? this.rangeStartIndex : this.rangeStartIndex = this._currentItemIndex;

            switch (event.keyCode) {
                case KeyCodes.Home:
                    if (event.shiftKey) {
                        this.selectRange(currentIndex, 0);
                    } else if (!event.ctrlKey) {
                        this.unselectAll().then(() => {
                            this.rangeStartIndex = 0;
                            this.selectRange(this.rangeStartIndex);
                        });
                    }
                    setCurrentIndex(0);
                    this.keyboardNavigation = true;
                    return false;

                case KeyCodes.End:
                    if (event.shiftKey) {
                        this.selectRange(currentIndex, this.rowsCount - 1);
                    } else if (!event.ctrlKey) {
                        this.unselectAll().then(() => {
                            this.rangeStartIndex = this.rowsCount - 1;
                            this.selectRange(this.rangeStartIndex);
                        });
                    }
                    setCurrentIndex(this.rowsCount - 1);
                    this.keyboardNavigation = true;
                    return false;

                case KeyCodes.PageUp:
                    const upindex = Math.max(0, this._currentItemIndex - this.pageSize);
                    if (event.shiftKey) {
                        this.selectRange(currentIndex, upindex);
                    } else if (!event.ctrlKey) {
                        this.unselectAll().then(() => {
                            this.rangeStartIndex = upindex;
                            this.selectRange(this.rangeStartIndex);
                        });
                    }
                    setCurrentIndex(upindex);
                    this.keyboardNavigation = true;
                    return false;

                case KeyCodes.PageDown:
                    const dindex = Math.min(this.rowsCount - 1, this._currentItemIndex + this.pageSize);
                    if (event.shiftKey) {
                        this.selectRange(currentIndex, dindex);
                    } else if (!event.ctrlKey) {
                        this.unselectAll().then(() => {
                            this.rangeStartIndex = dindex;
                            this.selectRange(this.rangeStartIndex);
                        });
                    }
                    setCurrentIndex(dindex);
                    this.keyboardNavigation = true;
                    return false;

                case KeyCodes.UpArrow:
                    const uaindex = Math.max(0, this._currentItemIndex - 1);
                    if (uaindex !== -1) {
                        if (event.shiftKey) {
                            this.selectRange(currentIndex, uaindex);
                        } else if (!event.ctrlKey) {
                            this.unselectAll().then(() => {
                                this.rangeStartIndex = uaindex;
                                this.selectRange(this.rangeStartIndex);
                            });
                        }
                        setCurrentIndex(uaindex);
                    }
                    this.keyboardNavigation = true;
                    return false;

                case KeyCodes.DownArrow:
                    const daindex = Math.min(this.rowsCount - 1, this._currentItemIndex + 1);
                    if (daindex !== -1) {
                        if (event.shiftKey) {
                            this.selectRange(currentIndex, daindex);
                        } else if (!event.ctrlKey) {
                            this.unselectAll().then(() => {
                                this.rangeStartIndex = daindex;
                                this.selectRange(this.rangeStartIndex);
                            });
                        }
                        setCurrentIndex(daindex);
                    }
                    this.keyboardNavigation = true;
                    return false;

                case KeyCodes.Space:
                    const sitem = this.currentItem as IItemTree;
                    if (sitem) {
                        if (this.isCollapsible(sitem)) {
                            this.toggleCollapse(currentIndex, !sitem.collapsed);
                        } else if (sitem.selected) {
                            this.toggleSelect([sitem], false);
                        } else if (this.multiSelect && event.ctrlKey) {
                            this.toggleSelect([sitem], !sitem.selected);
                        } else {
                            this.unselectAll().then(() => {
                                this.toggleSelect([sitem], true);
                            });
                        }
                    }
                    this.keyboardNavigation = true;
                    return false;

                case KeyCodes.Enter:
                    const eitem = this.currentItem as IItemTree;
                    if (eitem) {
                        if (this.isCollapsible(eitem) || eitem.selected) {
                            this.toggleCollapse(currentIndex, !eitem.collapsed);
                        } else if (eitem.selectable) {
                            this.unselectAll().then(() => {
                                this.toggleSelect([eitem], true);
                            });
                        }
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

            if (!this.searchArea) {
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
                    const rg = new RegExp('^' + this.filterExpression, 'i');
                    this.findNextMatch((item) => {
                        if (item && this.isSelectable(item)) {
                            const label = this.getTextValue(item);
                            if (rg.test(label)) {
                                return true;
                            }
                        }
                        return false;
                    }, this._currentItemIndex).then((result) => {
                        if (result) {
                            setCurrentIndex(result.index);
                        }
                    });
                }
            } else {
                // Autocomplete, filter the list
                this.keyboardNavigation = true;
                if (this.completeTimer) {
                    clearTimeout(this.completeTimer);
                }
                this.completeTimer = setTimeout(() => {
                    this.completeTimer = undefined;
                    this.setCurrentItem(undefined);
                    this.calcViewPort();
                }, 250);
            }
        }
    }

    protected ngAfterViewInit() {
        // FIXME Issue angular/issues/6005
        // see http://stackoverflow.com/questions/34364880/expression-has-changed-after-it-was-checked
        // Bug with waiter - 2017.03.06 uncomment this if you see some regression
        // if (this._itemList.length === 0) {
        //     setTimeout(() => {
        //         this.calcViewPort();
        //     }, 0);
        // }

        const resizeSub = Observable
            .fromEvent(window, 'resize')
            .subscribe(() => {
                if (this._viewportMode !== ViewportMode.NoViewport && this.maxHeight === 0) {
                    this.computedMaxHeight = 0;
                    this.calcViewPort();
                }
            });

        const scrollSub = Observable
            .fromEvent(this.listcontainer.nativeElement, 'scroll')
            .map((event: any) => [event, event.target.scrollTop, event.target.scrollLeft])
            .do(([event, scrollTop, scrollLeft]: [Event, number, number]) => {
                const e = {
                    originalEvent: event,
                    scrollLeft: scrollLeft,
                    scrollTop: scrollTop,
                } as DejaTreeListScrollEvent;

                this.scroll.emit(e);
            })
            .filter(([scrollTop]: [number]) => this.lastScrollTop !== scrollTop)
            .do(([scrollTop]: [number]) => {
                if (this._viewportMode === ViewportMode.NoViewport && this.ignoreNextScrollEvents) {
                    this.ignoreNextScrollEvents = false;
                } else {
                    this.lastScrollTop = scrollTop;
                    this.calcViewPort();
                }
            })
            .debounceTime(30)
            .subscribe(() => {
                this.calcViewPort();
            });
        this.subscriptions.push(scrollSub, resizeSub);
    }

    protected ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    protected mousedown(e: MouseEvent) {
        const itemIndex = this.getItemIndexFromHTMLElement(e.target as HTMLElement);
        if (itemIndex === undefined) {
            return;
        }

        const item = this._itemList[itemIndex - this.vpStartRow];
        this.clickedItem = item;
        if (!this.isCollapsible(item) && this.isSelectable(item) && (!e.ctrlKey || !this.multiSelect) && (e.button === 0 || !item.selected)) {
            if (e.shiftKey && this.multiSelect) {
                // Select all from current to clicked
                this.selectRange(itemIndex, this._currentItemIndex);
                return false;
            } else if (!e.ctrlKey || !this.multiSelect) {
                if (!this.multiSelect && item.selected) {
                    return;
                }

                this.unselectAll().then(() => {
                    this._currentItemIndex = itemIndex;
                    this.toggleSelect([item], true);
                });
            }
        }

        this.mouseUp = true;
    }

    protected getDragContext(index: number) {
        if (!this.sortable && !this.itemsDraggable) {
            return null;
        }

        return {
            dragendcallback: (event: IDejaDragEvent) => {
                this.itemDragEnd.emit(event);
                delete this._ddStartIndex;
                delete this._ddTargetIndex;
                this.calcViewPort(); // Comment this line to debug dragdrop
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
        if (!this.sortable) {
            return null;
        }

        return {
            dragovercallback: (event: IDejaDragEvent) => {
                if (this._ddStartIndex === undefined) {
                    return;
                }

                const targetIndex = this.getItemIndexFromHTMLElement(event.target as HTMLElement);
                if (targetIndex === undefined) {
                    return;
                }

                // Faire calculer le target final en fonction de la hierarchie par le service
                this.calcDragTargetIndex(this._ddStartIndex, targetIndex).then((finalTarget) => {
                    if (finalTarget !== undefined && finalTarget !== this._ddTargetIndex) {
                        this._ddTargetIndex = finalTarget;
                        this.calcViewPort();
                    }
                });

                event.preventDefault();
                return;
            },
            dropcallback: (event: IDejaDragEvent) => {
                delete this._ddStartIndex;
                delete this._ddTargetIndex;
                this.drop().then(() => {
                    this.calcViewPort(); // Comment this line to debug dragdrop
                });
                event.preventDefault();
            },
        };
    }

    protected dragLeave(event: DragEvent) {
        const listRect = this.listcontainer.nativeElement.getBoundingClientRect();

        const listBounds = Rect.fromLTRB(listRect.left,
            listRect.top,
            listRect.right,
            listRect.bottom);

        if (!listBounds.containsPoint(new Position(event.pageX, event.pageY))) {
            this._ddTargetIndex = this._ddStartIndex;
            this.calcViewPort();
        }
    }

    protected onSelectionChange() {
        const e = this.multiSelect ? { items: this.selectedItems } as DejaTreeListItemsEvent : { item: this.selectedItems[0] } as DejaTreeListItemEvent;
        this.selectedChange.emit(e);
    }

    protected selectRange(indexFrom: number, indexTo?: number): Promise<number> {
        return super.selectRange(indexFrom, indexTo).then((selectedCount) => {
            if (selectedCount) {
                // Raise event
                this.onSelectionChange();
            }
            return selectedCount;
        });
    }

    protected toggleSelect(items: IItemBase[], state: boolean): Promise<IItemBase[]> {
        return new Promise<IItemBase[]>((resolved?: (selected: IItemBase[]) => void, rejected?: (reason: any) => void) => {
            if (!this._multiSelect && items[0].selected === state) {
                resolved(items);
            } else {
                super.toggleSelect(items, state).then((selected) => {
                    // Raise event
                    this.onSelectionChange();
                    resolved(selected);
                }, (error) => {
                    rejected(error);
                });
            }
        });
    }

    protected calcViewPort() {
        return new Promise<IViewListResult>((resolved?: (value: IViewListResult) => void, rejected?: (reason: any) => void) => {
            super.calcViewPort(this.query, this.maxHeight, this.listcontainer.nativeElement).then((res: IViewListResult) => {
                // Prevent that the adaptation of the scroll raise a new view port calculation
                this.ignoreNextScrollEvents = res.outOfRange;
                if (res.rowsCount > 0 && this.afterViewInit) {
                    this.afterViewInit.emit();
                    this.afterViewInit = null;
                }
                resolved(res);
            }).catch((reason) => {
                rejected(reason);
            });
        });
    }

    private set keyboardNavigation(value: boolean) {
        this._keyboardNavigation = value;
        if (value) {
            if (this.mouseMoveObs) {
                return;
            }

            this.mouseMoveObs = Observable.fromEvent(this.listcontainer.nativeElement, 'mousemove').subscribe((event: MouseEvent) => {
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

    private set mouseUp(value: boolean) {
        if (value) {
            if (this.mouseUpObs) {
                return;
            }

            const element = this.elementRef.nativeElement as HTMLElement;
            this.mouseUpObs = Observable.fromEvent(element, 'mouseup').subscribe((e: MouseEvent) => {
                this.mouseUp = false;

                const itemIndex = this.getItemIndexFromHTMLElement(e.target as HTMLElement);
                if (itemIndex === undefined) {
                    return;
                }

                const item = this._itemList[itemIndex - this.vpStartRow];
                if (this.clickedItem && item !== this.clickedItem) {
                    return;
                }

                if (e.shiftKey) {
                    return;
                }

                if (e.button !== 0) {
                    // Right click menu
                    return;
                }

                if (this.isCollapsible(item) || (e.target as HTMLElement).id === 'expandbtn') {
                    const treeItem = item as IItemTree;
                    this.toggleCollapse(itemIndex, !treeItem.collapsed);
                    this._currentItemIndex = itemIndex;

                } else if (e.ctrlKey && this.multiSelect) {
                    this._currentItemIndex = itemIndex;
                    this.toggleSelect([item], !item.selected);
                }

                this.rangeStartIndex = -1;
            });
        } else if (this.mouseUpObs) {
            this.mouseUpObs.unsubscribe();
            delete this.mouseUpObs;
        }
    }
}
