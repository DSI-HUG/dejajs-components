/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Optional, Output, Self, SkipSelf, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DejaChildValidatorDirective, Destroy, KeyCodes } from '@deja-js/component/core';
import { Item, ItemComponent, ItemEvent, ItemService } from '@deja-js/component/v2/item-list';
import { ViewPort, ViewPortComponent, ViewPortItemClassEvent, ViewPortMode } from '@deja-js/component/v2/viewport';
import { BehaviorSubject, combineLatest, fromEvent, merge, Observable, of, ReplaySubject, Subject, timer } from 'rxjs';
import { delay, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

export type NgModelType = 'item' | 'model' | 'value';

export type NgControlType<T> = Item<T> | Item<T>[] | T | T[] | string | string[];

/** Composant de liste évoluée avec gestion de viewport et templating */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        ItemService
    ],
    selector: 'tree-list',
    styleUrls: [
        './tree-list.component.scss'
    ],
    templateUrl: './tree-list.component.html'
})
export class TreeListComponent<T> extends Destroy implements ControlValueAccessor {
    /** Texte à afficher par default dans la zone de recherche */
    @Input() public placeholder: string;
    /**
     * Les valeurs acceptées en paramètre se trouvent dans l'enum ViewPortMode (disabled, constant, variable ou auto)
     * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
     * est suceptible de contenir beaucoup d'éléments.
     */
    @Input() public viewPortMode: ViewPortMode;
    /** Texte affiché si aucune donnée n'est présente dans le tableau */
    @Input() public nodataholder: string;
    /** Permet de définir un template de ligne par binding */
    @Input() public itemTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template de ligne parente par binding. */
    @Input() public parentItemTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template d'entête de colonne par binding. */
    @Input() public headerTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template comme prefixe de la zone de recherche par binding. */
    @Input() public searchPrefixTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template comme suffixe de la zone de recherche par binding. */
    @Input() public searchSuffixTemplateExternal: TemplateRef<unknown>;
    /** Exécuté lorsque l'utilisateur sélectionne ou désélectionne une ligne. */
    @Output() public readonly selectedChange = new EventEmitter<ItemEvent<T>>();
    /** Exécuté lorsque l'utilisateur collapse une ligne. */
    @Output() public readonly itemCollapse = new EventEmitter<ItemEvent<T>>();
    /** Exécuté lorsque l'utilisateur étend une ligne. */
    @Output() public readonly itemExpand = new EventEmitter<ItemEvent<T>>();
    /** Exécuté lorsque l'utilisateur tape enter sur une ligne. */
    @Output() public readonly itemEnter = new EventEmitter<ItemEvent<T>>();
    /** Exécuté lorsque l'utilisateur a modifié le filtrage de la liste. */
    @Output() public readonly queryChange = new EventEmitter<string>();

    // Cancelable pre events
    @Input() public expandingItem: (items: Item<T>) => Observable<Item<T>>;
    @Input() public collapsingItem: (items: Item<T>) => Observable<Item<T>>;

    @Input() public debugMode = false;

    @HostBinding('attr.disabled') public _disabled: boolean = null;

    // Templates
    @ContentChild('itemTemplate') private itemTemplateInternal: TemplateRef<unknown>;
    @ContentChild('parentItemTemplate') private parentItemTemplateInternal: TemplateRef<unknown>;
    @ContentChild('headerTemplate') private headerTemplateInternal: TemplateRef<unknown>;
    @ContentChild('searchPrefixTemplate') private searchPrefixTemplateInternal: TemplateRef<unknown>;
    @ContentChild('searchSuffixTemplate') private searchSuffixTemplateInternal: TemplateRef<unknown>;

    public viewPort$: Observable<ViewPort<T>>;
    public listElementId: string;
    public itemService: ItemService<T>;

    private _selectedItems: Item<T>[];
    private ngModelType$ = new BehaviorSubject<NgModelType>('value');
    private _ngModelType: NgModelType = 'value';
    private writeValue$ = new ReplaySubject<NgControlType<T>>(1);
    private multiSelect$ = new BehaviorSubject<boolean>(false);
    private _multiSelect = false;
    private listElement$ = new ReplaySubject<HTMLElement>(1);
    private inputElement$ = new ReplaySubject<HTMLInputElement>(1);
    private raiseChangeCallback = false;
    private _currentItem: Item<T>;
    private _pageSize = 0;
    private filterExpression = '';
    private _maxHeight: number;
    private viewPortComponent$ = new ReplaySubject<ViewPortComponent<T>>(1);
    private _viewPortComponent: ViewPortComponent<T>;
    private _viewPortRowHeight = 40;
    private keyboardStartIndex = undefined as number;
    private collapseItem$ = new Subject<Item<T>>();
    private _hintLabel: string;
    private _searchArea = false;
    private lastClickedItem: Item<T>; // Double-click detection
    private reloadViewPort$ = new BehaviorSubject<void>(undefined);
    private _query: string;

    @ViewChild(ViewPortComponent)
    public set viewPortComponent(viewPortComponent: ViewPortComponent<T>) {
        this.viewPortComponent$.next(viewPortComponent);
        this._viewPortComponent = viewPortComponent;
    }

    public get viewPortComponent(): ViewPortComponent<T> {
        return this._viewPortComponent;
    }

    @ContentChildren(ItemComponent)
    public set options(value: ItemComponent[]) {
        if (value?.length) {
            this.itemService.options$.next(value);
        }
    }

    /** Définit la hauteur d'une ligne pour le calcul du viewport. Le Viewport ne fonctionne qu'avec des hauteurs de lignes fixe.
     * Pour désactiver le viewport, mettre la hauteur de ligne à 0.
     * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
     * est suceptible de contenir beaucoup d'éléments.
     * @param value Hauteur de ligne à utiliser pour le calcul du viewport.
     */
    @Input()
    public set viewPortRowHeight(value: NumberInput) {
        this._viewPortRowHeight = coerceNumberProperty(value);
    }

    public get viewPortRowHeight(): NumberInput {
        return this._viewPortRowHeight;
    }

    /** Définit la liste des éléments */
    @Input()
    public set items(items: Item<T>[]) {
        delete this.hintLabel;
        this.itemService.items$.next(items);
    }

    /** Définit la liste des éléments (tout type d'objet métier) */
    @Input() public set models(models: T[]) {
        this.itemService.models$.next(models);
    }

    /** Définit la liste des éléments sélectionnés en mode multiselect */
    @Input()
    public set selectedItems(value: Item<T>[]) {
        this.itemService.setSelectedItems(value);
    }

    /** Retourne la liste des éléments sélectionnés en mode multiselect */
    public get selectedItems(): Item<T>[] {
        return this._selectedItems;
    }

    /** Définit l'élément sélectionné en mode single select */
    @Input()
    public set selectedItem(value: Item<T>) {
        this.itemService.setSelectedItems(value && [value]);
    }

    /** Retourne l'éléments sélectionné en mode single select */
    public get selectedItem(): Item<T> {
        return this.selectedItems?.[0];
    }

    /** Définit le model sélectionné en mode single select */
    @Input()
    public set selectedModel(value: T) {
        this.itemService.setSelectedModels(value && [value]);
    }

    /** Retourne le model sélectionné en mode single select */
    public get selectedModel(): T {
        return this.selectedModels?.[0];
    }

    /** Définit la liste des models sélectionnés en mode multiselect */
    @Input()
    public set selectedModels(value: T[]) {
        this.itemService.setSelectedModels(value);
    }

    /** Retourne la liste des models sélectionnés en mode multiselect */
    public get selectedModels(): T[] {
        return this.selectedItems?.map(itm => itm.model);
    }

    /** Définit le model sélectionné en mode single select */
    @Input()
    public set selectedValue(value: string) {
        this.itemService.setSelectedValues(value && [value]);
    }

    /** Retourne le model sélectionné en mode single select */
    public get selectedValue(): string {
        return this.selectedValues?.[0];
    }

    /** Définit la liste des models sélectionnés en mode multiselect */
    @Input()
    public set selectedValues(value: string[]) {
        this.itemService.setSelectedValues(value);
    }

    /** Retourne la liste des models sélectionnés en mode multiselect */
    public get selectedValues(): string[] {
        return this.selectedItems?.map(itm => itm.id);
    }

    /** Définit une valeur indiquant si en reactive form le model renvoyé doit être un obeject oue une valeur */
    @Input()
    public set ngModelType(value: NgModelType) {
        this.ngModelType$.next(value);
    }

    /** Définit une valeur indiquant si plusieurs lignes peuvent être sélectionnées. */
    @Input()
    public set multiSelect(value: BooleanInput) {
        this._multiSelect = coerceBooleanProperty(value);
        this.multiSelect$.next(this._multiSelect);
    }

    public get multiSelect(): BooleanInput {
        return this._multiSelect;
    }

    /** Correspond au ngModel du champ de filtrage ou recherche */
    @Input()
    public set query(value: string) {
        this._query = value;
        this.itemService.query$.next(value);
    }

    public get query(): string {
        return this._query;
    }

    @Input() public set selectingItems(value: (items: Item<T>[]) => Observable<Item<T>[]>) {
        this.itemService.selectingItems = value;
    }

    @Input() public set unSelectingItems(value: (items: Item<T>[]) => Observable<Item<T>[]>) {
        this.itemService.unSelectingItems = value;
    }

    @ViewChild('listElement', { static: true })
    public set listElememtRef(elem: ElementRef) {
        this.listElement$.next(elem?.nativeElement);
    }

    @ViewChild('inputelement', { static: false })
    public set inputElememtRef(elem: ElementRef) {
        this.inputElement$.next(elem?.nativeElement);
    }

    /** Permet de désactiver la liste */
    @Input()
    public set disabled(value: BooleanInput) {
        const disabled = coerceBooleanProperty(value);
        this._disabled = disabled || null;
    }

    public get disabled(): BooleanInput {
        return this._disabled;
    }

    /** Définit le champ utilisé pour la liste des enfants d'un parent */
    @Input()
    public set childrenField(value: string) {
        this.itemService.childrenField$.next(value);
    }

    /** Définit le champ à utiliser comme valeur d'affichage. */
    @Input()
    public set textField(value: string) {
        this.itemService.textField$.next(value);
    }

    /** Définit le champ à utiliser comme valeur de comparaison. */
    @Input()
    public set valueField(value: string) {
        this.itemService.valueField$.next(value);
    }

    /** Définit la ligne courant ou ligne active */
    @Input()
    public set currentItem(item: Item<T>) {
        this._currentItem = item;
    }

    /** Retourne la ligne courant ou ligne active */
    public get currentItem(): Item<T> {
        return this._currentItem;
    }

    @Input()
    /** Définit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
    public set pageSize(value: NumberInput) {
        this._pageSize = coerceNumberProperty(value);
    }

    /** Retourne le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
    public get pageSize(): NumberInput {
        return this._pageSize;
    }

    /** Définit la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    @Input()
    public set maxHeight(value: NumberInput) {
        this._maxHeight = coerceNumberProperty(value);
    }

    /** Retourne la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    public get maxHeight(): NumberInput {
        return this._maxHeight;
    }

    /** Affiche un barre de recherche au dessus de la liste. */
    @Input()
    public set searchArea(value: BooleanInput) {
        this._searchArea = coerceBooleanProperty(value);
    }

    public get searchArea(): BooleanInput {
        return this._searchArea;
    }

    public constructor(
        public elementRef: ElementRef,
        @Self() @Optional() public control: NgControl,
        localItemService: ItemService<T>,
        @SkipSelf() @Optional() extendedItemService: ItemService<T>,
        public changeDetectorRef: ChangeDetectorRef
    ) {
        super();

        this.itemService = extendedItemService || localItemService;

        this.listElementId = `listcontainer_${(1000000000 * Math.random()).toString().substr(10)}`;

        if (this.control) {
            this.control.valueAccessor = this;
        }

        const viewPort$ = this.viewPortComponent$.pipe(
            filter(viewPortComponent => !!viewPortComponent),
            switchMap(viewPortComponent => viewPortComponent.viewPort$)
        );

        this.viewPort$ = combineLatest([viewPort$, this.reloadViewPort$]).pipe(
            map(([viewPort]) => viewPort)
        );

        this.viewPortComponent$.pipe(
            filter(viewPortComponent => !!viewPortComponent),
            switchMap(viewPortComponent => viewPortComponent.itemClass),
            takeUntil(this.destroyed$)
        ).subscribe((itemClassEvent: ViewPortItemClassEvent<T>) => {
            const item = itemClassEvent.item as Item<T>;
            if (item?.selected) {
                itemClassEvent.classes.push('selected');
            }
            if (item === this.currentItem) {
                itemClassEvent.classes.push('current');
            }
            if (item.className) {
                itemClassEvent.classes.push(item.className);
            }
            if (item.collapsing || item.expanding) {
                itemClassEvent.classes.push('hide');
            }
            if (item.items) {
                itemClassEvent.classes.push('parent');
            }
            if (item.collapsed) {
                itemClassEvent.classes.push('collapsed');
            }
            if (!item.isSelectable) {
                itemClassEvent.classes.push('unselectable');
            }
            if (item.odd) {
                itemClassEvent.classes.push('odd');
            }
            if (item.depth) {
                itemClassEvent.classes.push(`depth${item.depth}`);
            }
        });

        this.itemService.selectedItems$.pipe(
            tap(selectedItems => {
                this._selectedItems = selectedItems;

                if (this.raiseChangeCallback) {
                    this.onChangeCallback(this.value);
                    this.onTouchedCallback();
                    this.raiseChangeCallback = false;

                    if (this.selectedChange.observers.length > 0) {
                        const selectedModels = this.selectedModels;
                        this.selectedChange.next({
                            item: selectedItems[0],
                            model: selectedModels[0],
                            items: selectedItems,
                            models: selectedModels
                        } as ItemEvent<T>);
                    }
                }
            }),
            withLatestFrom(this.viewPortComponent$),
            filter(([_, viewPortComponent]) => !!viewPortComponent),
            delay(1),
            takeUntil(this.destroyed$)
        ).subscribe(([_, viewPortComponent]) => {
            viewPortComponent.reloadViewPort();
        });

        this.itemService.query$.pipe(
            filter(query => typeof query === 'string'),
            takeUntil(this.destroyed$)
        ).subscribe(query => {
            if (this._query !== query) {
                this._query = query as string;
                this.queryChange.emit(this._query);
            }
        });

        const modelType$ = this.ngModelType$.pipe(
            tap(modelType => this._ngModelType = modelType)
        );

        combineLatest([this.writeValue$, this.multiSelect$, modelType$]).pipe(
            takeUntil(this.destroyed$)
        ).subscribe(([value, multiSelect, modelType]) => {
            if (!value) {
                this.itemService.unselectAll();
            } else if (multiSelect) {
                switch (modelType) {
                    case 'item':
                        this.selectedItems = value as Item<T>[];
                        break;
                    case 'model':
                        this.selectedModels = value as T[];
                        break;
                    default:
                        this.selectedValues = value as string[];
                }
            } else {
                switch (modelType) {
                    case 'item':
                        this.selectedItem = value as Item<T>;
                        break;
                    case 'model':
                        this.selectedModel = value as T;
                        break;
                    default:
                        this.selectedValue = value as string;
                }
            }
        });

        // Clear text selection on double-click
        this.listElement$.pipe(
            switchMap(element => fromEvent<MouseEvent>(element, 'dblclick')),
            takeUntil(this.destroyed$)
        ).subscribe(() => window.getSelection().empty());

        this.listElement$.pipe(
            switchMap(element => fromEvent<MouseEvent>(element, 'mousedown').pipe(
                withLatestFrom(this.viewPort$, this.itemService.visibleItemList$),
                switchMap(([event, viewPort, visibleItemList]) => {
                    if (this.disabled) {
                        return of(null);
                    }

                    const target = event.target as HTMLElement;
                    const itemIndex = this.itemService.getItemIndexFromHtmlElement(target);
                    if (itemIndex === undefined) {
                        return of(null);
                    }

                    const isExpandButton = (el: HTMLElement) => el.hasAttribute('expandbtn') || el.parentElement.hasAttribute('expandbtn');

                    const clickedItem = viewPort.visibleItems[itemIndex - viewPort.startIndex] as Item<T>;

                    if ((!isExpandButton(target) || !clickedItem.isCollapsible) && clickedItem.isSelectable && (!event.ctrlKey || !this.multiSelect) && (event.button === 0 || !clickedItem.selected)) {
                        if (event.shiftKey && this.multiSelect) {
                            // Select all from current to clicked
                            const startIndex = Math.max(visibleItemList.findIndex(item => this.currentItem === item), 0);
                            const rangeSelection = visibleItemList.slice(Math.min(startIndex, itemIndex), Math.max(startIndex, itemIndex) + 1).filter(item => item.isSelectable);
                            this.raiseChangeCallback = true;
                            this.itemService.setSelectedItems(rangeSelection);
                            this.viewPortComponent.reloadViewPort();
                            return of(null);
                        }
                    }

                    return fromEvent<MouseEvent>(element, 'mouseup').pipe(
                        filter(() => !this.disabled),
                        tap(upevt => {
                            const upTarget = upevt.target as HTMLElement;
                            const upIndex = this.itemService.getItemIndexFromHtmlElement(upTarget);
                            if (upIndex === undefined) {
                                return;
                            }

                            const upItem = viewPort.visibleItems[upIndex - viewPort.startIndex] as Item<T>;
                            if (clickedItem && upItem !== clickedItem) {
                                return;
                            }

                            if (upevt.button !== 0) {
                                // Right click menu
                                return;
                            }

                            if (upItem.isCollapsible && (isExpandButton(upTarget) || !upItem.isSelectable || this.lastClickedItem === upItem)) {
                                this.collapseItem$.next(upItem);
                                this.ensureItemVisible(upItem);

                            } else if (upItem.isSelectable) {
                                this.raiseChangeCallback = true;
                                if (upevt.ctrlKey && this.multiSelect) {
                                    this.itemService.toggleSelect([upItem]);
                                } else if (upevt.ctrlKey) {
                                    if (upItem.selected) {
                                        this.itemService.unselectAll();
                                    } else {
                                        this.itemService.setSelectedItems([upItem]);
                                    }
                                } else {
                                    this.itemService.setSelectedItems([upItem]);
                                }

                                this.keyboardStartIndex = undefined;
                                this.currentItem = upItem;
                                this.ensureItemVisible(upItem);
                                this.viewPortComponent.reloadViewPort();
                                this.lastClickedItem = upItem; // Keep for double-click
                            } else {
                                this.lastClickedItem = upItem; // Keep for double-click
                            }
                        }),
                        delay(300),
                        tap(() => this.lastClickedItem = undefined)
                    );
                })
            )),
            takeUntil(this.destroyed$)
        ).subscribe();

        const inputKeyDownEvents$ = this.inputElement$.pipe(
            switchMap(inputElement => {
                if (inputElement) {
                    return fromEvent<KeyboardEvent>(inputElement, 'keydown');
                }
                return of(null);
            }),
            filter(event => !!event)
        );

        const listKeyDownEvent$ = this.listElement$.pipe(
            switchMap(listElement => fromEvent<KeyboardEvent>(listElement, 'keydown'))
        );

        merge(listKeyDownEvent$, inputKeyDownEvents$).pipe(
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
            withLatestFrom(this.viewPort$, this.itemService.visibleItemList$, this.listElement$),
            takeUntil(this.destroyed$)
        ).subscribe(([event, viewPort, visibleItemList, listElement]) => {
            let stopEvent = false;

            if (listElement?.clientHeight && this.viewPortRowHeight && this.pageSize === 0) {
                this.pageSize = Math.floor(listElement.clientHeight / +this.viewPortRowHeight);
            }

            // Set current item from index for keyboard features only
            const setCurrentIndex = (index: number) => {
                this.currentItem = viewPort.items[index] as Item<T>;
                this.ensureItemVisible(this.currentItem);
                this.viewPortComponent.reloadViewPort();
            };

            const selectRange = (currentIndex: number, target: number) => {
                const rangeSelection = visibleItemList.slice(Math.min(currentIndex, target), Math.max(currentIndex, target) + 1).filter(item => item.isSelectable);
                this.raiseChangeCallback = true;
                this.itemService.setSelectedItems(rangeSelection);
            };

            const navigateToIndex = (nextIndex: number) => {
                if (this.multiSelect && event.shiftKey) {
                    selectRange(currentIndex, nextIndex);
                    this.ensureItemVisible(nextIndex);
                    this.viewPortComponent.reloadViewPort();
                } else if (!event.ctrlKey) {
                    this.raiseChangeCallback = true;
                    this.selectedItem = viewPort.items[nextIndex] as Item<T>;
                    setCurrentIndex(nextIndex);
                } else {
                    setCurrentIndex(nextIndex);
                }
                this.keyboardStartIndex = nextIndex;
                stopEvent = true;
            };

            const currentIndex = visibleItemList.findIndex(item => this.currentItem === item);
            let target: HTMLElement;

            switch (event.code) {
                case KeyCodes.Home:
                    if (this.multiSelect && event.shiftKey) {
                        // Select all from current to first élément
                        selectRange(currentIndex, 0);
                    } else if (!event.ctrlKey) {
                        // Select first element
                        this.raiseChangeCallback = true;
                        this.selectedItem = viewPort.items[0] as Item<T>;
                    }
                    setCurrentIndex(0);
                    this.keyboardStartIndex = 0;
                    stopEvent = true;
                    break;

                case KeyCodes.End:
                    if (this.multiSelect && event.shiftKey) {
                        // Select all from current to last élément
                        selectRange(currentIndex, visibleItemList.length - 1);
                    } else if (!event.ctrlKey) {
                        // Select last element
                        this.raiseChangeCallback = true;
                        this.selectedItem = viewPort.items[viewPort.items.length - 1] as Item<T>;
                    }
                    setCurrentIndex(viewPort.items.length - 1);
                    this.keyboardStartIndex = viewPort.items.length - 1;
                    stopEvent = true;
                    break;

                case KeyCodes.PageUp:
                    // Select previous page
                    navigateToIndex(Math.max(0, (this.keyboardStartIndex ?? currentIndex) - this._pageSize));
                    break;

                case KeyCodes.PageDown:
                    // Select next page
                    navigateToIndex(Math.max(0, (this.keyboardStartIndex ?? currentIndex) + this._pageSize));
                    break;

                case KeyCodes.UpArrow:
                    // Select previous element
                    navigateToIndex(Math.max(0, (this.keyboardStartIndex ?? currentIndex) - 1));
                    break;

                case KeyCodes.DownArrow:
                    // Select next element
                    navigateToIndex(Math.min(viewPort.items.length - 1, (this.keyboardStartIndex ?? currentIndex) + 1));
                    break;

                case KeyCodes.Space:
                    target = event.target as HTMLElement;
                    if (target.tagName === 'INPUT' && !event.ctrlKey && !event.shiftKey) {
                        return;
                    }

                    if (this.currentItem) {
                        if (this.currentItem.isCollapsible) {
                            this.collapseItem$.next(this.currentItem);
                            this.ensureItemVisible(this.currentItem);
                        } else {
                            this.raiseChangeCallback = true;
                            if (this.currentItem.selected || this.multiSelect && event.ctrlKey) {
                                this.itemService.toggleSelect([this.currentItem]);
                            } else {
                                this.selectedItem = this.currentItem;
                            }
                            this.ensureItemVisible(this.currentItem);
                            this.viewPortComponent.reloadViewPort();
                        }
                    }
                    break;

                case KeyCodes.Enter:
                    if (this.currentItem) {
                        if (this.currentItem.isCollapsible) {
                            this.collapseItem$.next(this.currentItem);
                            this.ensureItemVisible(this.currentItem);

                        } else if (this.currentItem.isSelectable) {
                            if (this.itemEnter.observers.length > 0) {
                                this.itemEnter.next({
                                    item: this.currentItem,
                                    items: [this.currentItem],
                                    model: this.currentItem.model,
                                    models: this.currentItem.model && [this.currentItem.model]
                                } as ItemEvent<T>);
                            } else {
                                this.raiseChangeCallback = true;
                                this.selectedItem = this.currentItem;
                                this.ensureItemVisible(this.currentItem);
                                this.viewPortComponent.reloadViewPort();
                            }
                        }
                    }
                    break;

                default:
                    // eslint-disable-next-line no-debugger
                    debugger;
                    this.keyboardStartIndex = undefined;
            }

            if (stopEvent) {
                event.preventDefault();
                event.stopPropagation();
            }
        });

        const inputKeyboardEvents$ = this.inputElement$.pipe(
            switchMap(inputElement => {
                if (inputElement) {
                    const inputKeyup$ = fromEvent<KeyboardEvent>(inputElement, 'keyup');
                    const inputDrop$ = fromEvent<KeyboardEvent>(inputElement, 'drop');
                    return merge(inputKeyup$, inputDrop$);
                }
                return of(null);
            }),
            filter(event => !!event)
        );

        const listKeyboardEvent$ = this.listElement$.pipe(
            switchMap(listElement => fromEvent<KeyboardEvent>(listElement, 'keyup'))
        );

        merge(listKeyboardEvent$, inputKeyboardEvents$).pipe(
            filter(() => !this.disabled),
            filter(event => {
                const keyCode = event.code;
                return keyCode >= KeyCodes.Key0 ||
                    keyCode === KeyCodes.Backspace ||
                    keyCode === KeyCodes.Space ||
                    keyCode === KeyCodes.Delete;
            }),
            withLatestFrom(this.viewPort$),
            filter(([_, viewPort]) => viewPort.items?.length > 0),
            switchMap(([event, viewPort]) => {
                if (!this.searchArea) {
                    if ((/[a-zA-Z0-9]/).test(event.key)) {
                        // Valid char
                        const findNextMatch = () => {
                            const rg = new RegExp(`^${this.filterExpression}`, 'i');
                            const startIndex = Math.max(viewPort.items.findIndex(item => this.currentItem === item), 0);
                            let nextIndex = this.filterExpression.length > 1 ? startIndex : startIndex + 1;
                            // Just turn the number of items max
                            return viewPort.items.some(() => {
                                // That the real index and item in the loop
                                const item = viewPort.items[nextIndex] as Item<T>;
                                if (item?.isSelectable) {
                                    if (rg.test(item.label)) {
                                        // Found, set current item
                                        this.raiseChangeCallback = true;
                                        this.selectedItem = this.currentItem = item;
                                        this.ensureItemVisible(this.currentItem);
                                        this.viewPortComponent.reloadViewPort();
                                        return true; // Find, stop the loop
                                    }
                                }
                                nextIndex++;
                                if (nextIndex >= viewPort.items.length) {
                                    nextIndex = 0;
                                }
                                return false;
                            });
                        };

                        // Search next
                        this.filterExpression += event.key;
                        if (findNextMatch()) {
                            event.preventDefault();
                            event.stopPropagation();
                        } else {
                            this.filterExpression = event.key;
                            if (findNextMatch()) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                } else {
                    // Autocomplete, filter the list
                    // this.keyboardNavigation$.next();
                }

                // clear filterExpression after 1 second
                // Timer is automatically canceled by the switchmap if a second character is typed before 1 second
                return timer(1000);
            }),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.filterExpression = '';
        });

        this.collapseItem$.pipe(
            switchMap(item => {
                if (!item.collapsed && this.collapsingItem) {
                    return this.collapsingItem(item);
                } else if (this.expandingItem) {
                    return this.expandingItem(item);
                } else {
                    return of(item);
                }
            }),
            filter(item => !!item),
            takeUntil(this.destroyed$)
        ).subscribe(item => {
            item.collapsed = !item.collapsed;
            this.itemService.refreshVisibleItemList$.next();
            const itemEvent = {
                item: item,
                model: item.model,
                items: [item],
                models: [item.model]
            } as ItemEvent<T>;
            if (item.collapsed) {
                this.itemCollapse.emit(itemEvent);
            } else {
                this.itemExpand.emit(itemEvent);
            }
        });

        this.maxHeight = 0;
    }

    /** Définit la longueur minimale de caractères dans le champ de recherche avant que la recherche ou le filtrage soient effectués */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('min-search-length')
    public set minSearchlength(value: NumberInput) {
        this.itemService.minSearchLength$.next(coerceNumberProperty(value));
    }

    /** Définit un texte de conseil en cas d'erreur de validation ou autre */
    @Input()
    public set hintLabel(value: string) {
        this._hintLabel = value;
    }

    /** Retourne un texte de conseil en cas d'erreur de validation ou autre */
    public get hintLabel(): string {
        return this._hintLabel;
    }

    /** Définit le champ à utiliser comme champ de recherche.
     * Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.
     */
    @Input()
    public set searchField(value: string) {
        this.itemService.searchField$.next(value);
    }

    @ViewChild(DejaChildValidatorDirective)
    public set inputValidatorDirective(value: DejaChildValidatorDirective) {
        if (value) {
            value.parentControl = this.control;
        }
    }

    public get itemTemplate(): TemplateRef<unknown> {
        return this.itemTemplateExternal || this.itemTemplateInternal;
    }

    public get parentItemTemplate(): TemplateRef<unknown> {
        return this.parentItemTemplateExternal || this.parentItemTemplateInternal;
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
    public get value(): NgControlType<T> {
        if (this._multiSelect) {
            switch (this._ngModelType) {
                case 'item':
                    return this.selectedItems;
                case 'model':
                    return this.selectedModels;
                default:
                    return this.selectedValues;
            }
        } else {
            switch (this._ngModelType) {
                case 'item':
                    return this.selectedItem;
                case 'model':
                    return this.selectedModel;
                default:
                    return this.selectedValue;
            }
        }
    }

    public set value(val: NgControlType<T>) {
        this.writeValue(val);
        this.onChangeCallback(val);
        this.onTouchedCallback();
    }

    public writeValue(value: NgControlType<T>): void {
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

    /** Positionne a scrollbar pour assurer que l'élément spécifié soit visible */
    public ensureItemVisible(item: Item<T> | number): void {
        if (this.viewPortComponent) {
            this.viewPortComponent.ensureVisible(item);
        }
    }

    /** Rebind le viewport */
    public reloadViewPort(): void {
        if (this.viewPortComponent) {
            this.viewPortComponent.reloadViewPort();
        }
    }

    /** Recalcule le viewport. */
    public refreshViewPort(clearMeasuredSize?: boolean): void {
        if (this.viewPortComponent) {
            this.viewPortComponent.refreshViewPort(clearMeasuredSize);
        }
    }

    /** Efface le viewport */
    public clearViewPort(): void {
        if (this.viewPortComponent) {
            this.viewPortComponent.clearViewPort();
        }
    }

    // NgModel implementation
    public onTouchedCallback = (): void => undefined;
    public onChangeCallback = (_a?: unknown): void => undefined;
}
