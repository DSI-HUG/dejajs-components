/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import { Observable, Subscription } from 'rxjs/Rx';
import { clearTimeout, setTimeout } from 'timers';
import { GroupingService, IGroupInfo } from '../../common/core/grouping';
import { IItemBase, IItemTree, ItemListBase, ItemListService, ViewportMode } from '../../common/core/item-list';
import { KeyCodes } from "../../common/core/keycodes.enum";
import { SortingService } from '../../common/core/sorting';
import { IDejaDragEvent } from '../dragdrop';
import { DejaTreeListComponent, DejaTreeListScrollEvent } from "../tree-list";
import { DejaGridColumnsLayoutInfos, DejaGridRowEvent, DejaGridRowsEvent, IDejaGridColumn, IDejaGridColumnEvent, IDejaGridColumnLayout, IDejaGridColumnLayoutEvent, IDejaGridColumnSizeEvent, IDejaGridGroupsEvent } from "./index";

const noop = () => { };

const DejaGridComponentValueAccessor = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DejaGridComponent),
};

/** The grid */
@Component({
    encapsulation: ViewEncapsulation.None,
    providers: [DejaGridComponentValueAccessor],
    selector: 'deja-grid',
    styleUrls: [
        './data-grid.component.scss',
    ],
    templateUrl: './data-grid.component.html',
})
export class DejaGridComponent {
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
    /** Définit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
    @Input() public pageSize = 0;
    /** Définit un texte de conseil en cas d'erreur de validation ou autre */
    @Input() public hintLabel = '';
    /** Définit la hauteur d'une ligne pour le calcul du viewport en pixels */
    @Input() public viewPortRowHeight = ItemListBase.defaultViewPortRowHeight;
    /** Les trois valeurs acceptés en paramètre se trouvent dans l'enum ViewportMode (NoViewport, ConstantRowheight, VariableRowHeight)
     * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
     * est suceptible de contenir beaucoup d'éléments.
     */
    @Input() public viewportMode = ViewportMode.ConstantRowHeight;
    /** Champ utilisé pour la liste des enfants d'un parent */
    @Input() public childrenField: string;
    /** Définit le champ à utiliser comme valeur d'affichage. */
    @Input() public textField: string;
    /** Définit le champ à utiliser comme valeur de comparaison. */
    @Input() public valueField: string;
    /** Définit le champ à utiliser comme champ de recherche.
     * Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.
     */
    @Input() public searchField: string;
    /** Ligne courant ou ligne active */
    @Input() public currentRow: IItemBase;
    /** Liste des éléments sélectionnés */
    @Input() public selectedItems: IItemBase[];
    /** Definit le service de tri utilisé par ce composant. */
    @Input() public sortingService: SortingService;
    /** Definit le service de regroupement utilisé par ce composant. */
    @Input() public groupingService: GroupingService;
    /** Définit la largeur minimum que peut prendre une colonne en cas de redimensionement. */
    @Input() public columnsMinWidth = 15;
    /** Permet de définir un template de ligne par binding */
    @Input() public rowTemplateExternal;
    /** Permet de définir un template de ligne parente par binding. */
    @Input() public parentRowTemplateExternal;
    /** Permet de définir un template d'entête par binding. */
    @Input() public headerTemplateExternal;
    /** Permet de définir un template d'entête de colonnes par binding. */
    @Input() public columnHeaderTemplateExternal;
    /** Permet de définir un template comme prefixe de la zone de recherche par binding. */
    @Input() public searchPrefixTemplateExternal;
    /** Permet de définir un template comme suffixe de la zone de recherche par binding. */
    @Input() public searchSuffixTemplateExternal;
    /** Set a promise called before an item selection */
    @Input() public selectingRow: (item: any) => Promise<any>;
    /** Set a promise called before an item deselection */
    @Input() public unselectingRow: (item: any) => Promise<any>;
    /** Exécuté lorsque le déplacement d'une ligne est terminée. */
    @Output() public itemDragEnd = new EventEmitter<IDejaDragEvent>();
    /** Exécuté lorsque le déplacement d'une ligne commence. */
    @Output() public itemDragStart = new EventEmitter<IDejaDragEvent>();
    /** Exécuté lorsque l'utilisateur sélectionne ou désélectionne une ligne. */
    @Output() public selectedChange = new EventEmitter<DejaGridRowEvent | DejaGridRowsEvent>();

    // NgModel implementation
    protected onTouchedCallback: () => void = noop;
    protected onChangeCallback: (_: any) => void = noop;

    // Disable text selection during drag and drop
    protected disableUserSelectionTimeOut: NodeJS.Timer;
    @HostBinding('attr.disableselection') protected disableUserSelection;

    @ContentChild('rowTemplate') private rowTemplateInternal;
    @ContentChild('parentRowTemplate') private parentRowTemplateInternal;
    @ContentChild('cellTemplate') private _cellTemplate;
    @ContentChild('parentTitleTemplate') private _parentTitleTemplate;
    @ContentChild('columnHeaderTemplate') private _columnHeaderTemplate;
    @ContentChild('headerTemplate') private headerTemplateInternal;
    @ContentChild('searchPrefixTemplate') private searchPrefixTemplateInternal;
    @ContentChild('searchSuffixTemplate') private searchSuffixTemplateInternal;

    private printColumnLayoutTimeout: NodeJS.Timer;
    private printColumnLayout = false;
    private noHorizontalScroll = false;
    private _currentColumn: IDejaGridColumn;
    private _itemListService: ItemListService;
    private clickedColumn: IDejaGridColumn;
    private clickedTime: number;
    private sizingLayoutInfos: DejaGridColumnsLayoutInfos;
    private columnsLayoutInfos: DejaGridColumnsLayoutInfos;
    private mouseUpObs: Subscription;
    private resizeObs: Subscription;
    private _sortable = false;
    private _searchArea = false;
    private _groupArea = false;
    private _expandButton = false;
    private _rowsDraggable = false;
    private _rowsSortable = false;
    private _columnsDraggable = false;
    private _columnsSortable = false;
    private _columnsSizable = false;
    private _multiSelect = false;

    /** Permet de trier le tableau au clic sur l'entête de la colonne */
    @Input()
    public set sortable(value: boolean) {
        this._sortable = coerceBooleanProperty(value);
    }

    public get sortable() {
        return this._sortable;
    }

    /** Affiche un barre de recherche au dessus du tableau. */
    @Input()
    public set searchArea(value: boolean) {
        this._searchArea = coerceBooleanProperty(value);
    }

    public get searchArea() {
        return this._searchArea;
    }

    /** Affiche une zone de regroupement des colonnes par drag and drop. */
    @Input()
    public set groupArea(value: boolean) {
        this._groupArea = coerceBooleanProperty(value);
    }

    public get groupArea() {
        return this._groupArea;
    }

    /** Affiche un bouton pour réduire ou étendre toutes les lignes parentes du tableau */
    @Input()
    public set expandButton(value: boolean) {
        this._expandButton = coerceBooleanProperty(value);
    }

    public get expandButton() {
        return this._expandButton;
    }

    /** Rend les lignes du tableau draggable vers un autre composant (ne pas confondre avec la propriété `sortable`) */
    @Input()
    public set rowsDraggable(value: boolean) {
        this._rowsDraggable = coerceBooleanProperty(value);
    }

    public get rowsDraggable() {
        return this._rowsDraggable;
    }

    /** Rend les lignes du tableau triables par drag-and-drop */
    @Input()
    public set rowsSortable(value: boolean) {
        this._rowsSortable = coerceBooleanProperty(value);
    }

    public get rowsSortable() {
        return this._rowsSortable;
    }

    /** Définit si toutes les colonnes peuvent être draggable vers un autre composant. */
    @Input()
    public set columnsDraggable(value: boolean) {
        this._columnsDraggable = coerceBooleanProperty(value);
    }

    public get columnsDraggable() {
        return this._columnsDraggable;
    }

    /** Définit si toutes les colonnes peuvent être déplacées parmis les autres colonnes. */
    @Input()
    public set columnsSortable(value: boolean) {
        this._columnsSortable = coerceBooleanProperty(value);
    }

    public get columnsSortable() {
        return this._columnsSortable;
    }

    /** Permet de redimensionner manuellement les colonnes du tableau. */
    @Input()
    public set columnsSizable(value: boolean) {
        this._columnsSizable = coerceBooleanProperty(value);
    }

    public get columnsSizable() {
        return this._columnsSizable;
    }

    /** Permet la sélection multiple des ligne de la grille (avec la touche shift ou ctrl) */
    @Input()
    public set multiSelect(value: boolean) {
        this._multiSelect = coerceBooleanProperty(value);
    }

    public get multiSelect() {
        return this._multiSelect;
    }

    @Input()
    /** Définit la structure des colonnes de la grille. */
    public set columns(columns: IDejaGridColumn[]) {
        this._columns = columns;
        this.calcColumnsLayout();
    }

    /** Retourne la structure des colonnes de la grille. */
    public get columns() {
        return this._columns;
    }

    @Input()
    /** Définit le modèle affiché dans les lignes de la grille. */
    public set rows(rows: IItemBase[] | Promise<IItemBase[]> | Observable<IItemBase[]>) {
        this._rows = rows;
        if (this._rows && !this._columns) {
            if (this._rows instanceof Array) {
                this.calcColumnsLayout(this._rows);
            } else {
                let promise = this._rows as Promise<IItemBase[]>;
                if (promise.then) {
                    promise.then((itms) => {
                        this.calcColumnsLayout(itms);
                    });
                } else {
                    let observable = this._rows as Observable<IItemBase[]>;
                    observable.subscribe((itms) => {
                        this.calcColumnsLayout(itms);
                    });
                }
            }
        }
    }

    /** Retourne le modèle affiché dans les lignes de la grille. */
    public get rows() {
        return this._rows;
    }

    /** Définit la colonne en surbrillance. */
    @Input()
    public set currentColumn(column: IDejaGridColumn) {
        this._currentColumn = column;
        if (column) {
            this.ensureColumnVisible(column);
        }
    }

    /** Retourne la colonne en surbrillance. */
    public get currentColumn() {
        return this._currentColumn;
    }

    /** Definit le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading. */
    @Input()
    public set itemListService(value: ItemListService) {
        this._itemListService = value;
    }

    /** Retourne le service de liste utilisé par ce composant. */
    public get itemListService() {
        return this.treeListComponent.itemListService;
    }

    /** Retourne une valeur indiquant le nombre de niveau hierarchiques affichés par la grille. */
    public get depthMax() {
        return this.treeListComponent.depthMax;
    }

    private get searchPrefixTemplate() {
        return this.searchPrefixTemplateExternal || this.searchPrefixTemplateInternal;
    }

    private get searchSuffixTemplate() {
        return this.searchSuffixTemplateExternal || this.searchSuffixTemplateInternal;
    }

    private get rowTemplate() {
        return this.rowTemplateExternal || this.rowTemplateInternal;
    }

    private get parentRowTemplate() {
        return this.parentRowTemplateExternal || this.parentRowTemplateInternal;
    }

    private get cellTemplate() {
        return this._cellTemplate;
    }

    private get parentTitleTemplate() {
        return this._parentTitleTemplate;
    }

    private get columnsHeaderTemplate() {
        return this.headerTemplateExternal || this.headerTemplateInternal;
    }

    private get columnHeaderTemplate() {
        return this.columnHeaderTemplateExternal || this._columnHeaderTemplate;
    }

    private get columnLayout() {
        return this._columnLayout;
    }

    private _rows: IItemBase[] | Promise<IItemBase[]> | Observable<IItemBase[]>;
    private _columns: IDejaGridColumn[];
    private _columnLayout = {} as IDejaGridColumnLayout;
    private lastScrollLeft = 0;
    @ViewChild(DejaTreeListComponent) private treeListComponent: DejaTreeListComponent;

    constructor(private elementRef: ElementRef) {
        this.clearColumnLayout();
    }

    // ************* ControlValueAccessor Implementation **************
    // get accessor
    get value(): any {
        return this.rows;
    }

    // set accessor including call the onchange callback
    set value(value: any) {
        this.writeValue(value);
        this.onChangeCallback(value);
    }

    // From ControlValueAccessor interface
    public writeValue(value: any) {
        this.rows = value;
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    // ************* End of ControlValueAccessor Implementation **************}

    /** Nettoye les caches et réaffiche le viewport. */
    public refresh() {
        this.treeListComponent && this.treeListComponent.refresh();
    }

    /** Efface le viewport */
    public clearViewPort() {
        this.treeListComponent && this.treeListComponent.clearViewPort();
    }

    /** Calcul la position de la scrollbar horizontale pour que la colonne spéfiée soit dans la zone visible. */
    public ensureColumnVisible(column: IDejaGridColumn) {
        if (column === undefined || !this.columns || this.columns.length === 0 || this.noHorizontalScroll) {
            return;
        }

        let listElement = this.treeListComponent.listcontainer.nativeElement as HTMLElement;
        let scrollPos = listElement.scrollLeft;
        let prevWidth = 0;

        this.columns.find((c) => {
            if (column === c) {
                return true;
            }
            prevWidth += c.w;
        });

        if (prevWidth < scrollPos) {
            listElement.scrollLeft = prevWidth;
        } else if (scrollPos < prevWidth + column.w - listElement.clientWidth) {
            listElement.scrollLeft = prevWidth + column.w - listElement.clientWidth;
        }
    }

    protected scroll(event: DejaTreeListScrollEvent) {
        if (this.lastScrollLeft !== event.scrollLeft) {
            this.lastScrollLeft = event.scrollLeft;
            this.calcColumnsLayout();
        }
    }
    protected onColumnHeaderClicked(event: IDejaGridColumnEvent) {
        if (!this.sortable || event.column.sortable === false) {
            return;
        }

        event.column.sorting = true;
        setTimeout(() => {
            if (this.treeListComponent && event.column.sortable !== false) {
                this.treeListComponent.sort(event.column.name).then(() => {
                    event.column.sorting = false;
                }).catch((error) => {
                    event.column.sorting = false;
                    throw error.toString();
                });
            }
        }, 0);
    }

    protected onColumnLayoutChanged(e: IDejaGridColumnLayoutEvent) {
        let sourceIndex = this.columns.findIndex((og) => og === e.column);
        this.columns.splice(sourceIndex, 1);

        if (e.target) {
            let targetIndex = this.columns.findIndex((og) => og === e.target);
            this.columns.splice(targetIndex, 0, e.column);
        } else {
            this.columns.push(e.column);
        }

        this.calcColumnsLayout();
        this.ensureColumnVisible(e.column);
    }

    protected onColumnSizeChanged(e: IDejaGridColumnSizeEvent) {

        if (!this.columnsLayoutInfos) {
            return;
        }

        if (!this.sizingLayoutInfos) {
            this.sizingLayoutInfos = this.columnsLayoutInfos;
        }

        if (!e.column) {
            // End of sizing process
            delete this.sizingLayoutInfos;
            return;
        }

        let originalWidth = this.sizingLayoutInfos.columnsWidth[e.column.name];
        let minimumWidth = e.column.minWidth || this.columnsMinWidth;
        if (originalWidth.unit === '%') {
            let listElement = this.treeListComponent.listcontainer.nativeElement as HTMLElement;
            let containerWidth = listElement.clientWidth;

            // Calcul de la place restante pour les colonnes en pourcent
            let availableWidth = containerWidth - this.sizingLayoutInfos.totalFixedWidth;

            // Calcul de l'offset en %
            let percentOffsetWidth = e.offsetWidth * this.sizingLayoutInfos.totalPercentWidth / availableWidth;

            let percentMinWidth = minimumWidth * 100 / containerWidth;

            e.column.width = Math.max(percentMinWidth, originalWidth.value + percentOffsetWidth * 2) + '%';
        } else {
            e.column.width = Math.max(minimumWidth, originalWidth.value + e.offsetWidth) + 'px';
        }

        this.calcColumnsLayout();
        this.disableUserSelectionTimeOut && clearTimeout(this.disableUserSelectionTimeOut);
        this.disableUserSelection = true;
        this.disableUserSelectionTimeOut = setTimeout(() => {
            delete this.disableUserSelectionTimeOut;
            this.disableUserSelection = null;
        }, 1000);

        this.ensureSizingVisible(e.column);
    }

    protected onGroupRemoved(e: IDejaGridGroupsEvent) {
        let groupInfo = {
            groupByField: e.column.groupByField || e.column.name,
            groupTextField: e.column.groupTextField || e.column.name,
        } as IGroupInfo;
        this.treeListComponent.ungroup(groupInfo);
    }

    protected onGroupsChanged(e: IDejaGridGroupsEvent) {
        let groupInfos = [] as IGroupInfo[];
        let sortInfos = this.treeListComponent.sortInfos;
        e.columns.forEach((column) => {
            let groupInfo = {} as IGroupInfo;
            if (sortInfos && sortInfos.name === column.name) {
                groupInfo.sortInfos = sortInfos;
            }
            groupInfo.groupByField = column.groupByField || column.name;
            groupInfo.groupTextField = column.groupTextField || column.name;
            groupInfos.push(groupInfo);
        });

        this.treeListComponent.group(groupInfos);
    }

    @HostListener('keydown', ['$event'])
    protected onKeyDown(event: KeyboardEvent) {
        let findPrev = (index: number) => {
            if (index === -1) {
                index = this.columns.length;
            }
            while (--index >= 0) {
                let column = this.columns[index];
                if (column.w > 0) {
                    return column;
                }
            }
            return this.currentColumn;
        };

        let findNext = (index: number) => {
            while (++index < this.columns.length) {
                let column = this.columns[index];
                if (column.w > 0) {
                    return column;
                }
            }
            return this.currentColumn;
        };

        switch (event.keyCode) {
            case KeyCodes.LeftArrow:
                this.currentColumn = this.columns && findPrev(this._currentColumn && this.columns.findIndex((c) => c === this._currentColumn));
                return false;

            case KeyCodes.RightArrow:
                this.currentColumn = this.columns && findNext(this._currentColumn && this.columns.findIndex((c) => c === this._currentColumn));
                return false;

            default:
                return true;
        }
    }

    @HostListener('mousedown', ['$event'])
    protected onMouseDown(event: MouseEvent) {
        if (event.buttons !== 1) {
            return;
        }

        this.clickedColumn = this.getColumnFromHTMLElement(event.target as HTMLElement);
        this.clickedTime = this.clickedColumn && Date.now();
        this.mouseUp = true;
    }

    protected calcColumnsLayout(rows?: IItemBase[]) {
        if (!this._columns || !this._columns.length) {
            this.printColumnLayout = true;
            if (rows && rows.length) {
                let searchFirstLastLevelRow = (items: IItemBase[]) => {
                    return items.find((row: IItemTree) => {
                        if (row.$items) {
                            // IItemTree
                            let srow = searchFirstLastLevelRow(row.$items);
                            if (srow) {
                                return srow;
                            }
                        } else {
                            // IItemBase
                            return row;
                        }
                    });
                };
                let treeRow = searchFirstLastLevelRow(rows);

                if (treeRow) {
                    this._columns = Object.keys(treeRow).map((key) => {
                        return {
                            label: key,
                            name: key,
                            width: '130px',
                        } as IDejaGridColumn;
                    });
                }
            }

            if (!this._columns || !this._columns.length) {
                return;
            }
        }

        this.clearColumnLayout();
        if (this._columns.length === 0 || !this.treeListComponent || !this.treeListComponent.listcontainer) {
            return;
        }

        this._columnLayout.scrollLeft = -this.lastScrollLeft;
        let viewLeft = -this.lastScrollLeft;
        let listElement = this.treeListComponent.listcontainer.nativeElement as HTMLElement;
        let containerWidth = listElement.clientWidth;

        // Calc total fixed width
        this.columnsLayoutInfos = new DejaGridColumnsLayoutInfos(this._columns);

        // Reset width
        this._columns.forEach((column) => delete column.w);

        let calcColumnsWidth = () => {
            // Taille totale des colonnes visibles en pixel
            let totalFixedWidth = 0;

            // Attribution des colonnes en pixels
            this.columnsLayoutInfos.fixedColumns.filter((column) => column.w !== 0).forEach((column) => {
                let width = this.columnsLayoutInfos.columnsWidth[column.name];
                let minimumWidth = column.minWidth || this.columnsMinWidth;
                column.w = Math.max(minimumWidth, width.value);
                totalFixedWidth += column.w;
            });

            // Calcul de la place restante pour les colonnes en pourcent
            this.columnsLayoutInfos.totalFixedWidth = totalFixedWidth;

            // Filtrer les colonnes visibles en pourcent
            let percentColumns = this.columnsLayoutInfos.percentColumns.filter((column) => column.w !== 0);

            // Calcul de la taille retsante pour l'attribution des pourcents une fois les tailles minimum enlevées
            let availableWidthForPercent = containerWidth - totalFixedWidth;
            percentColumns.forEach((column) => availableWidthForPercent -= (column.minWidth || this.columnsMinWidth));
            let availableWidth = availableWidthForPercent;

            // Attribution des colonnes en pourcent
            percentColumns.forEach((column) => {
                let width = this.columnsLayoutInfos.columnsWidth[column.name];
                let minimumWidth = column.minWidth || this.columnsMinWidth;
                let pixelWidth = minimumWidth;
                if (availableWidthForPercent > 0) {
                    let aditionalWidth = Math.floor(availableWidthForPercent * width.value / this.columnsLayoutInfos.totalPercentWidth);
                    availableWidth -= aditionalWidth;
                    pixelWidth += aditionalWidth;
                }
                column.w = pixelWidth;
            });

            return availableWidth;
        };

        let rest = calcColumnsWidth();
        if (rest < 0 && this.columnsLayoutInfos.responsiveColumns.length) {
            // Remove responsive columns
            this.columnsLayoutInfos.responsiveColumns.find((column) => {
                rest += column.w;
                column.w = 0; // Hide column
                return rest >= 0;
            });
            rest = calcColumnsWidth();
        }

        this.noHorizontalScroll = rest >= 0;

        // Register to page resize only if percentage columns are defined
        this.resize = this.columnsLayoutInfos && this.columnsLayoutInfos.percentColumns.length > 0;

        this._columnLayout.vpBeforeWidth = 0;
        this._columnLayout.vpAfterWidth = 0;
        this._columns.filter((column) => column.w > 0).forEach((column) => {
            if (viewLeft > containerWidth) {
                this._columnLayout.vpAfterWidth += column.w;
                viewLeft += column.w;
            } else {
                viewLeft += column.w;
                if (viewLeft < 0) {
                    this._columnLayout.vpBeforeWidth += column.w;
                } else {
                    this._columnLayout.columns.push(column);
                }
            }
        });

        if (this.printColumnLayout) {
            this.printColumnLayoutTimeout && clearTimeout(this.printColumnLayoutTimeout);
            this.printColumnLayoutTimeout = setTimeout(() => {
                delete this.printColumnLayoutTimeout;
                console.log('');
                console.log('Column layout:');
                console.log(JSON.stringify(this._columnLayout.columns, null, 4));
                console.log('');
            }, 1000);
        }
    }

    private set resize(value: boolean) {
        if (value) {
            if (this.resizeObs) {
                return;
            }

            this.resizeObs = Observable.fromEvent(window, 'resize').subscribe(() => {
                this.calcColumnsLayout();
            });
        } else if (this.resizeObs) {
            this.resizeObs.unsubscribe();
            delete this.resizeObs;
        }
    }

    private set mouseUp(value: boolean) {
        if (value) {
            if (this.mouseUpObs) {
                return;
            }

            let element = this.elementRef.nativeElement as HTMLElement;
            this.mouseUpObs = Observable.fromEvent(element, 'mouseup').subscribe((event: MouseEvent) => {
                let time = Date.now();
                if (time - this.clickedTime < 1000) {
                    let columnElement = this.getColumnElementFromHTMLElement(event.target as HTMLElement);
                    if ((columnElement && columnElement.getAttribute('colname')) === this.clickedColumn.name) {
                        this.currentColumn = this.clickedColumn;
                    }
                }

                this.mouseUp = false;
            });
        } else if (this.mouseUpObs) {
            delete this.clickedColumn;
            delete this.clickedTime;
            this.mouseUpObs.unsubscribe();
            delete this.mouseUpObs;
        }
    }

    private ensureSizingVisible(column: IDejaGridColumn) {
        if (column === undefined || !this.columns || this.columns.length === 0 || this.noHorizontalScroll) {
            return;
        }

        let listElement = this.treeListComponent.listcontainer.nativeElement as HTMLElement;
        let scrollPos = listElement.scrollLeft;
        let prevWidth = 0;

        this.columns.find((c) => {
            if (column === c) {
                return true;
            }
            prevWidth += c.w;
        });

        if (prevWidth + column.w < scrollPos) {
            listElement.scrollLeft = prevWidth + column.w;
        } else if (scrollPos < prevWidth + column.w - listElement.clientWidth) {
            listElement.scrollLeft = prevWidth + column.w - listElement.clientWidth;
        }
    }

    private clearColumnLayout() {
        this._columnLayout.scrollLeft = 0;
        this._columnLayout.vpAfterWidth = 0;
        this._columnLayout.vpBeforeWidth = 0;
        this._columnLayout.columns = [];
    }

    private getColumnElementFromHTMLElement(element: HTMLElement): HTMLElement {
        let parentElement = element;

        while (parentElement && !parentElement.hasAttribute('colname')) {
            element = parentElement;
            parentElement = parentElement.parentElement;
        }

        if (!parentElement) {
            return undefined;
        }

        return parentElement;
    }

    private getColumnFromHTMLElement(element: HTMLElement): IDejaGridColumn {
        let columnElement = this.getColumnElementFromHTMLElement(element);
        let colname = columnElement && columnElement.getAttribute('colname');
        return colname && this._columnLayout.columns.find((column) => column.name === colname);
    }
}
