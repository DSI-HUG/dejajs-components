/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { IDejaChipsComponentCloseEvent } from '@deja-js/component/chips';
import { IDejaDragEvent } from '@deja-js/component/dragdrop';
import { DejaTreeListComponent, DejaTreeListScrollEvent } from '@deja-js/component/tree-list';
import { DejaClipboardService, GroupingService, IGroupInfo, IItemBase, IItemTree, ISortInfos, ItemListService, IViewListResult, IViewPort, KeyCodes, SortingService, ViewportMode, ViewPortService } from '@deja-js/core';
import { combineLatest as observableCombineLatest, from as observableFrom, fromEvent as observableFromEvent, Observable, ReplaySubject, Subject, timer as observableTimer } from 'rxjs';
import { debounceTime, filter, first, map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { IDejaGridColumn, IDejaGridColumnEvent, IDejaGridColumnLayoutEvent, IDejaGridColumnSizeEvent } from './data-grid-column/data-grid-column';
import { IDejaGridColumnLayout } from './data-grid-column/data-grid-column-layout';
import { DejaGridColumnsLayoutInfos } from './data-grid-column/data-grid-column-layout-infos';
import { IDejaGridGroupsEvent } from './data-grid-grouparea/data-grid-group';
import { DejaGridHeaderComponent } from './data-grid-header/data-grid-header.component';
import { IDejaGridRow } from './data-grid-row/data-grid-row';
import { DejaGridRowEvent } from './data-grid-row/data-grid-row-event';
import { DejaGridRowsEvent } from './data-grid-row/data-grid-rows-event';

const noop = () => { };

/** @deprecated use ag-grid instead */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-grid',
    styleUrls: [
        './data-grid.component.scss',
    ],
    templateUrl: './data-grid.component.html',
})
export class DejaGridComponent implements OnDestroy {
    @Input() public placeholder: string;
    /** Texte à afficher par default dans la zone de recherche */
    /** Texte affiché si aucune donnée n'est présente dans le tableau */
    @Input() public nodataholder: string;
    /** Permet de définir la longueur minimale de caractères dans le champ de recherche avant que la recherche ou le filtrage soient effectués */
    // tslint:disable-next-line:no-input-rename
    @Input('min-search-length') public minSearchLength = 0;
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
    @Input() public hintLabel: string;
    /** Définit la hauteur d'une ligne pour le calcul du viewport en pixels */
    @Input() public viewPortRowHeight = ViewPortService.itemDefaultSize;
    /** Les trois valeurs acceptés en paramètre se trouvent dans l'enum ViewportMode (disabled, fixed, variable ou auto)
     * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
     * est suceptible de contenir beaucoup d'éléments.
     */
    @Input() public viewportMode = ViewportMode.fixed;
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
    /** Liste des éléments sélectionnés en mode multiselect */
    @Input() public selectedItems: IItemBase[];
    /** Elément selectioné en mode single select */
    @Input() public selectedItem: IItemBase | string;
    /** Liste des models selectionés en mode multiselect */
    @Input() public selectedModels: any[];
    /** Model selectioné en mode single select */
    @Input() public selectedModel: any;
    /** Definit le service de tri utilisé par ce composant. */
    @Input() public sortingService: SortingService;
    /** Definit le service de regroupement utilisé par ce composant. */
    @Input() public groupingService: GroupingService;
    /** Définit la largeur minimum que peut prendre une colonne en cas de redimensionement. */
    @Input() public columnsMinWidth = 15;
    /** Permet de définir un template de ligne par binding */
    @Input() public rowTemplateExternal: any;
    /** Permet de définir un template de ligne parente par binding. */
    @Input() public parentRowTemplateExternal: any;
    /** Permet de définir un template d'entête par binding. */
    @Input() public headerTemplateExternal: any;
    /** Permet de définir un template d'entête de colonnes par binding. */
    @Input() public columnHeaderTemplateExternal: any;
    /** Permet de définir un template comme prefixe de la zone de recherche par binding. */
    @Input() public searchPrefixTemplateExternal: any;
    /** Permet de définir un template comme suffixe de la zone de recherche par binding. */
    @Input() public searchSuffixTemplateExternal: any;
    /** Set a observable called before the rows will be displayed */
    @Input() public loadingRows: (query: string | RegExp, selectedRows: IDejaGridRow[]) => Observable<IDejaGridRow[]>;
    /** Set a promise called before a row selection */
    @Input() public selectingRow: (row: IDejaGridRow) => Promise<IDejaGridRow> | Observable<IDejaGridRow>;
    /** Set a promise called before a row deselection */
    @Input() public unselectingRow: (row: IDejaGridRow) => Promise<IDejaGridRow> | Observable<IDejaGridRow>;
    /** Set a promise called before a row expand */
    @Input() public expandingRow: (row: IDejaGridRow) => Promise<IDejaGridRow> | Observable<IDejaGridRow>;
    /** Set a promise called before a row collapse */
    @Input() public collapsingRow: (row: IDejaGridRow) => Promise<IDejaGridRow> | Observable<IDejaGridRow>;
    /** Exécuté lorsque le déplacement d'une ligne est terminée. */
    @Output() public itemDragEnd = new EventEmitter<IDejaDragEvent>();
    /** Exécuté lorsque le déplacement d'une ligne commence. */
    @Output() public itemDragStart = new EventEmitter<IDejaDragEvent>();
    /** Exécuté lorsque l'utilisateur sélectionne ou désélectionne une ligne. */
    @Output() public selectedChange = new EventEmitter<DejaGridRowEvent | DejaGridRowsEvent>();
    /** Cet évenement est levé lorsque la position des colonnes est modifiée */
    @Output() public columnLayoutChanged = new EventEmitter<IDejaGridColumnLayoutEvent>();
    /** Cet évenement est levé lorsque la taille d'une colonne est modifiée */
    @Output() public columnSizeChanged = new EventEmitter<IDejaGridColumnSizeEvent>();
    /** Exécuté lorsque le calcul du viewPort est executé. */
    @Output() public viewPortChanged = new EventEmitter<IViewPort>();
    /** Exécuté lorsque le sorting à changé. */
    @Output() public sortChanged = new EventEmitter<ISortInfos>();
    /** Exécuté lorsque le grouping à changé. */
    @Output() public groupChanged = new EventEmitter<IGroupInfo[]>();
    /** retourne la largeur calculée des lignes */
    public rowsWidth: number = null;

    @ContentChild('rowTemplate') private rowTemplateInternal: any;
    @ContentChild('parentRowTemplate') private parentRowTemplateInternal: any;
    @ContentChild('cellTemplate') private _cellTemplate: any;
    @ContentChild('parentTitleTemplate') private _parentTitleTemplate: any;
    @ContentChild('columnHeaderTemplate') private _columnHeaderTemplate: any;
    @ContentChild('headerTemplate') private headerTemplateInternal: any;
    @ContentChild('searchPrefixTemplate') private searchPrefixTemplateInternal: any;
    @ContentChild('searchSuffixTemplate') private searchSuffixTemplateInternal: any;

    @ViewChild(DejaGridHeaderComponent) private header: DejaGridHeaderComponent;
    @ViewChild(DejaTreeListComponent, { static: true }) private treeListComponent: DejaTreeListComponent;

    private _rows: IItemBase[] | Promise<IItemBase[]> | Observable<IItemBase[]>;
    private _columns: IDejaGridColumn[];
    private _columnLayout = {
        scrollLeft: 0,
        vpBeforeWidth: 0,
        vpAfterWidth: 0,
        columns: [],
        refresh$: new Subject<void>(),
    } as IDejaGridColumnLayout;
    private lastScrollLeft = 0;

    private printColumnLayout$ = new Subject();
    private disableUserSelection$ = new Subject();

    private _noHorizontalScroll = false;
    private _itemListService: ItemListService;
    private sizingLayoutInfos: DejaGridColumnsLayoutInfos;
    private columnsLayoutInfos: DejaGridColumnsLayoutInfos;
    private isAlive = true;
    private hasPercentageColumns = false;
    private _sortable = false;
    private _searchArea = false;
    private _groupArea = false;
    private _rowsDraggable = false;
    private _rowsSortable = false;
    private _columnsDraggable = false;
    private _columnsSortable = false;
    private _columnsSizable = false;
    private _multiSelect = false;
    private noColumnsSpecified = false;

    private columnGroups$ = new Subject<IDejaGridColumn[] | string>();
    private columns$ = new ReplaySubject<IDejaGridColumn[]>(1);
    private _columnGroups = [] as IDejaGridColumn[];
    private _waiter: boolean;

    /** Définit si le waiter doit être affiché dans la grille. */
    @Input()
    public set waiter(value: boolean | string) {
        this._waiter = coerceBooleanProperty(value);
    }

    public get waiter() {
        return this._waiter;
    }

    /** Permet de trier le tableau au clic sur l'entête de la colonne */
    @Input()
    public set sortable(value: boolean | string) {
        this._sortable = coerceBooleanProperty(value);
    }

    public get sortable() {
        return this._sortable;
    }

    public get columnGroups() {
        return this._columnGroups;
    }

    public get noHorizontalScroll() {
        return this._noHorizontalScroll;
    }

    /** Affiche un barre de recherche au dessus du tableau. */
    @Input()
    public set searchArea(value: boolean | string) {
        this._searchArea = coerceBooleanProperty(value);
    }

    public get searchArea() {
        return this._searchArea;
    }

    /** Affiche une zone de regroupement des colonnes par drag and drop. */
    @Input()
    public set groupArea(value: boolean | string) {
        this._groupArea = coerceBooleanProperty(value);
        if (this._columnsSortable && !this.clipboardService) {
            throw new Error('To use the DejaGrid.groupArea feature, please import and provide the DejaClipboardService in your application.');
        }
    }

    public get groupArea() {
        return this._groupArea;
    }

    /** Rend les lignes du tableau draggable vers un autre composant (ne pas confondre avec la propriété `sortable`) */
    @Input()
    public set rowsDraggable(value: boolean | string) {
        this._rowsDraggable = coerceBooleanProperty(value);
    }

    public get rowsDraggable() {
        return this._rowsDraggable;
    }

    /** Rend les lignes du tableau triables par drag-and-drop */
    @Input()
    public set rowsSortable(value: boolean | string) {
        this._rowsSortable = coerceBooleanProperty(value);
    }

    public get rowsSortable() {
        return this._rowsSortable;
    }

    /** Définit si toutes les colonnes peuvent être draggable vers un autre composant. */
    @Input()
    public set columnsDraggable(value: boolean | string) {
        this._columnsDraggable = coerceBooleanProperty(value);
    }

    public get columnsDraggable() {
        return this._columnsDraggable;
    }

    /** Définit si toutes les colonnes peuvent être déplacées parmis les autres colonnes. */
    @Input()
    public set columnsSortable(value: boolean | string) {
        this._columnsSortable = coerceBooleanProperty(value);
        if (this._columnsSortable && !this.clipboardService) {
            throw new Error('To use the DejaGrid.columnsSortable feature, please import and provide the DejaClipboardService in your application.');
        }
    }

    public get columnsSortable() {
        return this._columnsSortable;
    }

    /** Permet de redimensionner manuellement les colonnes du tableau. */
    @Input()
    public set columnsSizable(value: boolean | string) {
        this._columnsSizable = coerceBooleanProperty(value);
    }

    public get columnsSizable() {
        return this._columnsSizable;
    }

    /** Permet la sélection multiple des ligne de la grille (avec la touche shift ou ctrl) */
    @Input()
    public set multiSelect(value: boolean | string) {
        this._multiSelect = coerceBooleanProperty(value);
    }

    public get multiSelect() {
        return this._multiSelect;
    }

    /** Définit la structure des colonnes de la grille. */
    @Input()
    public set columns(columns: IDejaGridColumn[]) {
        this.columns$.next(columns);
    }

    /** Retourne la structure des colonnes de la grille. */
    public get columns() {
        return this._columns;
    }

    /** Définit le modèle affiché dans les lignes de la grille. */
    @Input()
    public set rows(rows: IItemBase[] | Promise<IItemBase[]> | Observable<IItemBase[]>) {
        this._rows = rows;
        if (this._rows && !this._columns) {
            if (this._rows instanceof Array) {
                this.calcColumnsLayout(this._rows);
            } else {
                let observable = this._rows as Observable<IItemBase[]>;
                if (!observable.subscribe) {
                    const promise = this._rows as Promise<IItemBase[]>;
                    observable = observableFrom(promise);
                }

                this.viewPortChanged.pipe(
                    filter((vp) => vp && vp.items && vp.items.length > 0),
                    first())
                    .subscribe((vp) => this.calcColumnsLayout(vp.items));
            }
        }
        this.changeDetectorRef.markForCheck();
    }

    /** Retourne le modèle affiché dans les lignes de la grille. */
    public get rows() {
        return this._rows;
    }

    /** Définit la colonne en surbrillance. */
    @Input()
    public set currentColumn(column: IDejaGridColumn) {
        this.columns.forEach((c) => c.isCurrent = false);
        if (column) {
            column.isCurrent = true;
            this.ensureColumnVisible(column);
        }
        if (this._columnLayout) {
            this._columnLayout.refresh$.next();
        }
    }

    /** Retourne la colonne en surbrillance. */
    public get currentColumn() {
        return this.columns.find((c) => c.isCurrent);
    }

    /** Definit le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading. */
    @Input()
    public set itemListService(value: ItemListService) {
        this._itemListService = value;
    }

    /** Retourne le service de liste utilisé par ce composant. */
    public get itemListService() {
        return this._itemListService || this.treeListComponent.itemListService;
    }

    /** Retourne une valeur indiquant le nombre de niveau hierarchiques affichés par la grille. */
    public get depthMax() {
        return this.treeListComponent.depthMax;
    }

    /** Retourne le service de viewport utilisé pour la grille */
    public get viewPort() {
        return this.treeListComponent.viewPort;
    }

    /** Définit les options de regroupement utilisateur de la grille. Plusieurs champs peuvent etre spécifiés dans le HTML en utilisant la , comme séparateur (Ex: columnGroups="color, name") */
    @Input()
    public set columnGroups(value: IDejaGridColumn[] | string) {
        this.columnGroups$.next(value);
    }

    public get searchPrefixTemplate() {
        return this.searchPrefixTemplateExternal || this.searchPrefixTemplateInternal;
    }

    public get searchSuffixTemplate() {
        return this.searchSuffixTemplateExternal || this.searchSuffixTemplateInternal;
    }

    public get rowTemplate() {
        return this.rowTemplateExternal || this.rowTemplateInternal;
    }

    public get parentRowTemplate() {
        return this.parentRowTemplateExternal || this.parentRowTemplateInternal;
    }

    public get cellTemplate() {
        return this._cellTemplate;
    }

    public get parentTitleTemplate() {
        return this._parentTitleTemplate;
    }

    public get columnsHeaderTemplate() {
        return this.headerTemplateExternal || this.headerTemplateInternal;
    }

    public get columnHeaderTemplate() {
        return this.columnHeaderTemplateExternal || this._columnHeaderTemplate;
    }

    public get columnLayout() {
        return this._columnLayout;
    }

    constructor(private changeDetectorRef: ChangeDetectorRef, private elementRef: ElementRef, @Optional() private clipboardService: DejaClipboardService) {
        const element = this.elementRef.nativeElement as HTMLElement;

        this.clearColumnLayout();

        observableCombineLatest(this.columns$, this.columnGroups$).pipe(
            takeWhile(() => this.isAlive),
            map(([columns, columnGroups]) => {
                if (typeof columnGroups === 'string') {
                    const groups = columnGroups.split(',').map((v) => v.trim());
                    return this._columnGroups = groups.map((group) => columns.find((column) => column.name === group));
                } else {
                    return this._columnGroups = columnGroups;
                }
            }),
            map((columnGroups) => {
                const groupInfos = [] as IGroupInfo[];
                const sortInfos = this.treeListComponent.sortInfos;
                columnGroups.forEach((column) => {
                    const groupInfo = {} as IGroupInfo;
                    if (sortInfos && sortInfos.name === column.name) {
                        groupInfo.sortInfos = sortInfos;
                    }
                    groupInfo.groupByField = column.groupByField || column.name;
                    groupInfo.groupTextField = column.groupTextField || column.name;
                    groupInfos.push(groupInfo);
                });
                return groupInfos;
            }),
            switchMap((groupInfos) => this.treeListComponent.group$(groupInfos).pipe(map(() => groupInfos))))
            .subscribe((groupInfos) => {
                this.groupChanged.emit(groupInfos);
                this.changeDetectorRef.markForCheck();
            });

        observableFrom(this.columns$).pipe(
            takeWhile(() => this.isAlive),
            tap((columns) => this._columns = columns),
            debounceTime(1))
            .subscribe(() => this.calcColumnsLayout());

        observableFrom(this.printColumnLayout$).pipe(
            takeWhile(() => this.isAlive),
            debounceTime(1000))
            .subscribe(() => {
                console.log('');
                console.log('Auto columns layout:');
                console.log(JSON.stringify(this._columns, null, 4));
                console.log('');
            });

        observableFrom(this.disableUserSelection$).pipe(
            takeWhile(() => this.isAlive),
            tap(() => element.setAttribute('disableselection', '')),
            debounceTime(1000))
            .subscribe(() => element.removeAttribute('disableselection'));

        observableFromEvent(window, 'resize').pipe(
            takeWhile(() => this.isAlive),
            filter(() => this.hasPercentageColumns),
            debounceTime(5))
            .subscribe(() => {
                this.calcColumnsLayout();
            });

        observableFromEvent(element, 'keydown').pipe(
            takeWhile(() => this.isAlive))
            .subscribe((event: KeyboardEvent) => {
                const findPrev = (index: number) => {
                    if (index === -1) {
                        index = this.columns.length;
                    }
                    while (--index >= 0) {
                        const column = this.columns[index];
                        if (column.w > 0) {
                            return column;
                        }
                    }
                    return this.currentColumn;
                };

                const findNext = (index: number) => {
                    while (++index < this.columns.length) {
                        const column = this.columns[index];
                        if (column.w > 0) {
                            return column;
                        }
                    }
                    return this.currentColumn;
                };

                const keyCode = event.keyCode || (<any>KeyCodes)[event.code];
                switch (keyCode) {
                    case KeyCodes.LeftArrow:
                        this.currentColumn = this.columns && findPrev(this.columns.findIndex((c) => c.isCurrent));
                        event.preventDefault();
                        return false;

                    case KeyCodes.RightArrow:
                        this.currentColumn = this.columns && findNext(this.columns.findIndex((c) => c.isCurrent));
                        event.preventDefault();
                        return false;

                    default:
                        return true;
                }
            });

        observableFromEvent(element, 'mousedown').pipe(
            takeWhile(() => this.isAlive),
            filter((downEvent: MouseEvent) => downEvent.buttons === 1))
            .subscribe((downEvent: MouseEvent) => {
                const clickedColumn = this.getColumnFromHTMLElement(downEvent.target as HTMLElement);

                observableFromEvent(element, 'mouseup').pipe(
                    first(),
                    filter(() => !!clickedColumn))
                    .subscribe((upEvent: MouseEvent) => {
                        const columnElement = this.getColumnElementFromHTMLElement(upEvent.target as HTMLElement);
                        if ((columnElement && columnElement.getAttribute('colname')) === clickedColumn.name) {
                            this.currentColumn = clickedColumn;
                        }
                    });
            });
    }

    public ngOnDestroy() {
        this.isAlive = false;
    }

    // get accessor
    public get value(): any {
        return this.rows;
    }

    // set accessor including call the onchange callback
    public set value(value: any) {
        this.rows = value;
    }

    /** Nettoye les caches et réaffiche le viewport. */
    public refresh() {
        if (this.treeListComponent) {
            this.treeListComponent.refresh();
        }
        if (this.columnLayout) {
            if (this.hasPercentageColumns) {
                this.calcColumnsLayout();
            } else {
                this.columnLayout.refresh$.next();
            }
        }
        this.changeDetectorRef.markForCheck();
    }

    /** Recalcule le viewport. */
    public refreshViewPort(item?: IItemBase) {
        this.treeListComponent.refreshViewPort(item);
    }

    /** Efface la hauteur calculée des lignes en mode automatique */
    public clearRowsHeight() {
        if (this.treeListComponent) {
            this.treeListComponent.clearRowsHeight();
        }
    }

    /** Efface le viewport */
    public clearViewPort() {
        if (this.treeListComponent) {
            this.treeListComponent.clearViewPort();
        }
    }

    /** Calcul la position de la scrollbar horizontale pour que la colonne spéfiée soit dans la zone visible. */
    public ensureColumnVisible(column: IDejaGridColumn) {
        if (column === undefined || !this.columns || this.columns.length === 0 || this._noHorizontalScroll) {
            return;
        }

        const listElement = this.treeListComponent.listElement;
        const scrollPos = listElement.scrollLeft;
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

    public scroll(event: DejaTreeListScrollEvent) {
        if (this.lastScrollLeft !== event.scrollLeft) {
            this.lastScrollLeft = event.scrollLeft;
            this.calcColumnsLayout();
        }
    }

    /** Trie la liste par le champs spécifié. */
    public sort(name?: string) {
        this.treeListComponent.sort(name);
    }

    /** Trie la liste par le champs spécifié. */
    public sort$(name?: string): Observable<IViewListResult> {
        return this.treeListComponent.sort$(name);
    }

    /** Groupe les éléments en fonction du modèle de groupe spécifié
     * @param groupInfos Modèle de groupe à appliquer.
     * @return Observable résolu par la fonction.
     */
    public group$(groups: IGroupInfo[]): Observable<IViewListResult> {
        return this.treeListComponent.group$(groups);
    }

    /** Retire les groupe correspondants au modèle de groupe spécifié
     * @param groupInfos Modèle de groupe à retirer.
     * @return Observable résolu par la fonction.
     */
    public ungroup$(groupInfo: IGroupInfo): Observable<IViewListResult> {
        return this.treeListComponent.ungroup$(groupInfo);
    }

    public onColumnHeaderClicked(event: IDejaGridColumnEvent) {
        if (this.treeListComponent && !this.sortable || event.column.sortable === false) {
            return;
        }

        const hideSpinner = () => {
            event.column.sorting = false;
            this.changeDetectorRef.markForCheck();
            this.header.refresh();
        };

        event.column.sorting = true;
        this.changeDetectorRef.markForCheck();

        observableTimer(1).pipe(
            first(),
            switchMap(() => this.sort$(event.column.name)))
            .subscribe(() => {
                hideSpinner();
                this.sortChanged.emit(this.treeListComponent.sortInfos);
            }, (error) => {
                hideSpinner();
                throw error.toString();
            });
    }

    public onColumnDragEnd() {
        this.columnLayout.refresh$.next();
    }

    public onColumnLayoutChanged(e: IDejaGridColumnLayoutEvent) {
        this.columns.splice(e.index, 1);

        if (!!e.target) {
            this.columns.splice(e.targetIndex, 0, e.column);
        } else {
            this.columns.push(e.column);
        }

        this.calcColumnsLayout();
        this.ensureColumnVisible(e.column);

        this.columnLayoutChanged.emit(e);

        this.changeDetectorRef.markForCheck();
    }

    public onColumnSizeChanged(e: IDejaGridColumnSizeEvent) {

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

        const originalWidth = this.sizingLayoutInfos.columnsWidth[e.column.name];
        const minimumWidth = e.column.minWidth || this.columnsMinWidth;
        if (originalWidth.unit === '%') {
            const listElement = this.treeListComponent.listElement;
            const containerWidth = listElement.clientWidth;

            // Calcul de la place restante pour les colonnes en pourcent
            const availableWidth = containerWidth - this.sizingLayoutInfos.totalFixedWidth;

            // Calcul de l'offset en %
            const percentOffsetWidth = e.offsetWidth * this.sizingLayoutInfos.totalPercentWidth / availableWidth;

            const percentMinWidth = minimumWidth * 100 / containerWidth;

            e.column.width = `${Math.max(percentMinWidth, originalWidth.value + percentOffsetWidth * 2)}%`;
        } else {
            e.column.width = `${Math.max(minimumWidth, originalWidth.value + e.offsetWidth)}px`;
        }

        this.calcColumnsLayout();

        // Disable text selection during drag and drop
        this.disableUserSelection$.next();

        this.ensureSizingVisible(e.column);

        this.columnSizeChanged.emit(e);
    }

    public onGroupRemoved(event: IDejaChipsComponentCloseEvent) {
        const column = event.item;

        const groupInfo = {
            groupByField: column.groupByField || column.name,
            groupTextField: column.groupTextField || column.name,
        } as IGroupInfo;

        this.treeListComponent.ungroup$(groupInfo).pipe(
            first())
            .subscribe(noop);
    }

    public onGroupsChanged(e: IDejaGridGroupsEvent) {
        this.columnGroups$.next(e.columns);
    }

    public calcColumnsLayout(rows?: IItemBase[]) {
        this.noColumnsSpecified = false;

        if (!this._columns || !this._columns.length) {
            if (rows && rows.length) {
                const searchFirstLastLevelRow = (items: IItemTree[]) => {
                    return items.find((row) => {
                        if (row.$items) {
                            // IItemTree
                            const srow: IItemTree = searchFirstLastLevelRow(row.$items);
                            if (srow) {
                                return !!srow;
                            }
                        } else {
                            // IItemBase
                            return !!row;
                        }
                    });
                };

                const treeRow = searchFirstLastLevelRow(rows);
                if (treeRow) {
                    this.noColumnsSpecified = true;
                    this._columns = Object.keys(treeRow).map((key) => {
                        return {
                            label: key,
                            name: key,
                            width: '130px',
                        } as IDejaGridColumn;
                    });
                }
            }
        }

        if (this.noColumnsSpecified) {
            this.printColumnLayout$.next();
        }

        this.clearColumnLayout();

        if (!this._columns || !this._columns.length) {
            if (this.header) {
                this.header.refresh();
            }
            this._columnLayout.refresh$.next();
            return;
        }

        const listElement = this.treeListComponent && this.treeListComponent.listElement;
        if (!listElement) {
            return;
        }

        this._columnLayout.scrollLeft = -this.lastScrollLeft;
        let viewLeft = -this.lastScrollLeft;
        const containerWidth = listElement.clientWidth;

        // Calc total fixed width
        this.columnsLayoutInfos = new DejaGridColumnsLayoutInfos(this._columns);

        // Reset width
        this._columns.forEach((column) => delete column.w);

        const calcColumnsWidth = () => {
            // Taille totale des colonnes visibles en pixel
            let totalFixedWidth = 0;

            // Attribution des colonnes en pixels
            this.columnsLayoutInfos.fixedColumns.filter((column) => column.w !== 0).forEach((column) => {
                const width = this.columnsLayoutInfos.columnsWidth[column.name];
                const minimumWidth = column.minWidth || this.columnsMinWidth;
                column.w = Math.max(minimumWidth, width.value);
                totalFixedWidth += column.w;
            });

            // Calcul de la place restante pour les colonnes en pourcent
            this.columnsLayoutInfos.totalFixedWidth = totalFixedWidth;

            // Filtrer les colonnes visibles en pourcent
            const percentColumns = this.columnsLayoutInfos.percentColumns.filter((column) => column.w !== 0);

            // Calcul de la taille retsante pour l'attribution des pourcents une fois les tailles minimum enlevées
            let availableWidthForPercent = containerWidth - totalFixedWidth;
            percentColumns.forEach((column) => availableWidthForPercent -= (column.minWidth || this.columnsMinWidth));
            let availableWidth = availableWidthForPercent;

            // Attribution des colonnes en pourcent
            percentColumns.forEach((column) => {
                const width = this.columnsLayoutInfos.columnsWidth[column.name];
                const minimumWidth = column.minWidth || this.columnsMinWidth;
                let pixelWidth = minimumWidth;
                if (availableWidthForPercent > 0) {
                    const aditionalWidth = Math.floor(availableWidthForPercent * width.value / this.columnsLayoutInfos.totalPercentWidth);
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

        this._noHorizontalScroll = rest >= 0;

        // Register to page resize only if percentage columns are defined
        this.hasPercentageColumns = this.columnsLayoutInfos && this.columnsLayoutInfos.percentColumns.length > 0;

        this._columnLayout.vpBeforeWidth = 0;
        this._columnLayout.vpAfterWidth = 0;
        let totalWidth = 0;
        this._columns.filter((column) => column.w > 0).forEach((column) => {
            totalWidth += column.w;
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

        this.rowsWidth = totalWidth > containerWidth ? totalWidth : containerWidth;

        if (this.header) {
            this.header.refresh();
        }

        this._columnLayout.refresh$.next();
    }

    private ensureSizingVisible(column: IDejaGridColumn) {
        if (column === undefined || !this.columns || this.columns.length === 0 || this._noHorizontalScroll) {
            return;
        }

        const listElement = this.treeListComponent.listElement;
        const scrollPos = listElement.scrollLeft;
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
        const columnElement = this.getColumnElementFromHTMLElement(element);
        const colname = columnElement && columnElement.getAttribute('colname');
        return colname && this._columnLayout.columns.find((column) => column.name === colname);
    }
}
