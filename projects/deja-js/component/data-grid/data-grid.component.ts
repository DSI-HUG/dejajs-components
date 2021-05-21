/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, Optional, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DejaClipboardService, Destroy, GroupingService, IGroupInfo, IItemBase, IItemTree, ISortInfos, ItemListService, IViewListResult, IViewPort, KeyCodes, SortingService, ViewPortService } from '@deja-js/component/core';
import { IDejaDragEvent } from '@deja-js/component/dragdrop';
import { DejaTreeListComponent, DejaTreeListScrollEvent } from '@deja-js/component/tree-list';
import { combineLatest, fromEvent, Observable, ReplaySubject, Subject, timer } from 'rxjs';
import { debounceTime, filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { IDejaChipsComponentCloseEvent } from '../chips';
import { IDejaGridColumn, IDejaGridColumnEvent, IDejaGridColumnLayoutEvent, IDejaGridColumnSizeEvent } from './data-grid-column/data-grid-column';
import { IDejaGridColumnLayout } from './data-grid-column/data-grid-column-layout';
import { DejaGridColumnsLayoutInfos } from './data-grid-column/data-grid-column-layout-infos';
import { IDejaGridGroupsEvent } from './data-grid-grouparea/data-grid-group';
import { DejaGridHeaderComponent } from './data-grid-header/data-grid-header.component';
import { IDejaGridRow } from './data-grid-row/data-grid-row';
import { DejaGridRowEvent } from './data-grid-row/data-grid-row-event';
import { DejaGridRowsEvent } from './data-grid-row/data-grid-rows-event';

/** @deprecated use ag-grid instead */
@Component({
    selector: 'deja-grid',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './data-grid.component.scss'
    ],
    templateUrl: './data-grid.component.html'
})
export class DejaGridComponent extends Destroy {
    @Input() public placeholder: string;
    /** Texte à afficher par default dans la zone de recherche */
    /** Texte affiché si aucune donnée n'est présente dans le tableau */
    @Input() public nodataholder: string;
    /** Correspond au ngModel du champ de filtrage ou recherche */
    @Input() public query = '';
    /** Définit un texte de conseil en cas d'erreur de validation ou autre */
    @Input() public hintLabel: string;
    /** Les trois valeurs acceptés en paramètre se trouvent dans l'enum ViewportMode (disabled, fixed, variable ou auto)
     * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
     * est suceptible de contenir beaucoup d'éléments.
     */
    @Input() public viewportMode = 'fixed';
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
    @Input() public currentRow: unknown;
    /** Liste des éléments sélectionnés en mode multiselect */
    @Input() public selectedItems: unknown[];
    /** Elément selectioné en mode single select */
    @Input() public selectedItem: unknown;
    /** Liste des models selectionés en mode multiselect */
    @Input() public selectedModels: unknown[];
    /** Model selectioné en mode single select */
    @Input() public selectedModel: unknown;
    /** Definit le service de tri utilisé par ce composant. */
    @Input() public sortingService: SortingService;
    /** Definit le service de regroupement utilisé par ce composant. */
    @Input() public groupingService: GroupingService;
    /** Définit la largeur minimum que peut prendre une colonne en cas de redimensionement. */
    @Input() public columnsMinWidth = 15;
    /** Permet de définir un template de ligne par binding */
    @Input() public rowTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template de ligne parente par binding. */
    @Input() public parentRowTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template d'entête par binding. */
    @Input() public headerTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template d'entête de colonnes par binding. */
    @Input() public columnHeaderTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template comme prefixe de la zone de recherche par binding. */
    @Input() public searchPrefixTemplateExternal: TemplateRef<unknown>;
    /** Permet de définir un template comme suffixe de la zone de recherche par binding. */
    @Input() public searchSuffixTemplateExternal: TemplateRef<unknown>;
    /** Set a observable called before the rows will be displayed */
    @Input() public loadingRows: (query: string | RegExp, selectedRows: IDejaGridRow<unknown>[]) => Observable<unknown[]>;
    /** Set a promise called before a row selection */
    @Input() public selectingRow: (row: IDejaGridRow<unknown>) => Promise<IDejaGridRow<unknown>> | Observable<IDejaGridRow<unknown>>;
    /** Set a promise called before a row deselection */
    @Input() public unselectingRow: (row: IDejaGridRow<unknown>) => Promise<IDejaGridRow<unknown>> | Observable<IDejaGridRow<unknown>>;
    /** Set a promise called before a row expand */
    @Input() public expandingRow: (row: IDejaGridRow<unknown>) => Promise<IDejaGridRow<unknown>> | Observable<IDejaGridRow<unknown>>;
    /** Set a promise called before a row collapse */
    @Input() public collapsingRow: (row: IDejaGridRow<unknown>) => Promise<IDejaGridRow<unknown>> | Observable<IDejaGridRow<unknown>>;
    /** Exécuté lorsque le déplacement d'une ligne est terminée. */
    @Output() public readonly itemDragEnd = new EventEmitter<IDejaDragEvent>();
    /** Exécuté lorsque le déplacement d'une ligne commence. */
    @Output() public readonly itemDragStart = new EventEmitter<IDejaDragEvent>();
    /** Exécuté lorsque l'utilisateur sélectionne ou désélectionne une ligne. */
    @Output() public readonly selectedChange = new EventEmitter<DejaGridRowEvent<unknown> | DejaGridRowsEvent<unknown>>();
    /** Cet évenement est levé lorsque la position des colonnes est modifiée */
    @Output() public readonly columnLayoutChanged = new EventEmitter<IDejaGridColumnLayoutEvent>();
    /** Cet évenement est levé lorsque la taille d'une colonne est modifiée */
    @Output() public readonly columnSizeChanged = new EventEmitter<IDejaGridColumnSizeEvent>();
    /** Exécuté lorsque le calcul du viewPort est executé. */
    @Output() public readonly viewPortChanged = new EventEmitter<IViewPort>();
    /** Exécuté lorsque le sorting à changé. */
    @Output() public readonly sortChanged = new EventEmitter<ISortInfos>();
    /** Exécuté lorsque le grouping à changé. */
    @Output() public readonly groupChanged = new EventEmitter<IGroupInfo[]>();

    @ContentChild('rowTemplate')
    private rowTemplateInternal: TemplateRef<unknown>;

    @ContentChild('parentRowTemplate')
    private parentRowTemplateInternal: TemplateRef<unknown>;

    @ContentChild('cellTemplate')
    private _cellTemplate: TemplateRef<unknown>;

    @ContentChild('parentTitleTemplate')
    private _parentTitleTemplate: TemplateRef<unknown>;

    @ContentChild('columnHeaderTemplate')
    private _columnHeaderTemplate: TemplateRef<unknown>;

    @ContentChild('headerTemplate')
    private headerTemplateInternal: TemplateRef<unknown>;

    @ContentChild('searchPrefixTemplate')
    private searchPrefixTemplateInternal: TemplateRef<unknown>;

    @ContentChild('searchSuffixTemplate')
    private searchSuffixTemplateInternal: TemplateRef<unknown>;

    @ViewChild(DejaGridHeaderComponent) private header: DejaGridHeaderComponent;
    @ViewChild(DejaTreeListComponent, { static: true }) private treeListComponent: DejaTreeListComponent;

    /** retourne la largeur calculée des lignes */
    public rowsWidth: number = null;

    // eslint-disable-next-line rxjs/finnish
    private _rows: unknown[] | Promise<unknown[]> | Observable<unknown[]>;
    private _columns: IDejaGridColumn[];
    private _columnLayout = {
        scrollLeft: 0,
        vpBeforeWidth: 0,
        vpAfterWidth: 0,
        columns: [],
        refresh$: new Subject<void>()
    } as IDejaGridColumnLayout;

    private lastScrollLeft = 0;

    private printColumnLayout$ = new Subject();
    private disableUserSelection$ = new Subject();

    private _noHorizontalScroll = false;
    private _itemListService: ItemListService<unknown>;
    private sizingLayoutInfos: DejaGridColumnsLayoutInfos;
    private columnsLayoutInfos: DejaGridColumnsLayoutInfos;
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
    private _minSearchLength = 0;
    private _maxHeight = 0;
    private _pageSize = 0;
    private _viewPortRowHeight = ViewPortService.itemDefaultSize;
    // private noColumnsSpecified = false;

    private columnGroups$ = new Subject<IDejaGridColumn[] | string>();
    private columns$ = new ReplaySubject<IDejaGridColumn[]>(1);
    private _columnGroups = [] as IDejaGridColumn[];
    private _waiter: boolean;

    /** Définit la hauteur d'une ligne pour le calcul du viewport en pixels */
    @Input()
    public set viewPortRowHeight(value: NumberInput) {
        this._viewPortRowHeight = coerceNumberProperty(value);
    }

    public get viewPortRowHeight(): NumberInput {
        return this._viewPortRowHeight;
    }

    /** Permet de définir la longueur minimale de caractères dans le champ de recherche avant que la recherche ou le filtrage soient effectués */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input()
    public set minSearchLength(value: NumberInput) {
        this._minSearchLength = coerceNumberProperty(value);
    }

    public get minSearchLength(): NumberInput {
        return this._minSearchLength;
    }

    /** Hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    @Input()
    public set maxHeight(value: NumberInput) {
        this._maxHeight = coerceNumberProperty(value);
    }

    public get maxHeight(): NumberInput {
        return this._maxHeight;
    }

    /** Définit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
    @Input()
    public set pageSize(value: NumberInput) {
        this._pageSize = coerceNumberProperty(value);
    }

    public get pageSize(): NumberInput {
        return this._pageSize;
    }

    /** Définit si le waiter doit être affiché dans la grille. */
    @Input()
    public set waiter(value: BooleanInput) {
        this._waiter = coerceBooleanProperty(value);
    }

    public get waiter(): BooleanInput {
        return this._waiter;
    }

    /** Permet de trier le tableau au clic sur l'entête de la colonne */
    @Input()
    public set sortable(value: BooleanInput) {
        this._sortable = coerceBooleanProperty(value);
    }

    public get sortable(): BooleanInput {
        return this._sortable;
    }

    /** Définit les options de regroupement utilisateur de la grille. Plusieurs champs peuvent etre spécifiés dans le HTML en utilisant la , comme séparateur (Ex: columnGroups="color, name") */
    @Input()
    public set columnGroups(value: IDejaGridColumn[]) {
        this.columnGroups$.next(value);
    }

    public get columnGroups(): IDejaGridColumn[] {
        return this._columnGroups;
    }

    public get noHorizontalScroll(): boolean {
        return this._noHorizontalScroll;
    }

    /** Affiche un barre de recherche au dessus du tableau. */
    @Input()
    public set searchArea(value: BooleanInput) {
        this._searchArea = coerceBooleanProperty(value);
    }

    public get searchArea(): BooleanInput {
        return this._searchArea;
    }

    /** Affiche une zone de regroupement des colonnes par drag and drop. */
    @Input()
    public set groupArea(value: BooleanInput) {
        this._groupArea = coerceBooleanProperty(value);
        if (this._columnsSortable && !this.clipboardService) {
            throw new Error('To use the DejaGrid.groupArea feature, please import and provide the DejaClipboardService in your application.');
        }
    }

    public get groupArea(): BooleanInput {
        return this._groupArea;
    }

    /** Rend les lignes du tableau draggable vers un autre composant (ne pas confondre avec la propriété `sortable`) */
    @Input()
    public set rowsDraggable(value: BooleanInput) {
        this._rowsDraggable = coerceBooleanProperty(value);
    }

    public get rowsDraggable(): BooleanInput {
        return this._rowsDraggable;
    }

    /** Rend les lignes du tableau triables par drag-and-drop */
    @Input()
    public set rowsSortable(value: BooleanInput) {
        this._rowsSortable = coerceBooleanProperty(value);
    }

    public get rowsSortable(): BooleanInput {
        return this._rowsSortable;
    }

    /** Définit si toutes les colonnes peuvent être draggable vers un autre composant. */
    @Input()
    public set columnsDraggable(value: BooleanInput) {
        this._columnsDraggable = coerceBooleanProperty(value);
    }

    public get columnsDraggable(): BooleanInput {
        return this._columnsDraggable;
    }

    /** Définit si toutes les colonnes peuvent être déplacées parmis les autres colonnes. */
    @Input()
    public set columnsSortable(value: BooleanInput) {
        this._columnsSortable = coerceBooleanProperty(value);
        if (this._columnsSortable && !this.clipboardService) {
            throw new Error('To use the DejaGrid.columnsSortable feature, please import and provide the DejaClipboardService in your application.');
        }
    }

    public get columnsSortable(): BooleanInput {
        return this._columnsSortable;
    }

    /** Permet de redimensionner manuellement les colonnes du tableau. */
    @Input()
    public set columnsSizable(value: BooleanInput) {
        this._columnsSizable = coerceBooleanProperty(value);
    }

    public get columnsSizable(): BooleanInput {
        return this._columnsSizable;
    }

    /** Permet la sélection multiple des ligne de la grille (avec la touche shift ou ctrl) */
    @Input()
    public set multiSelect(value: BooleanInput) {
        this._multiSelect = coerceBooleanProperty(value);
    }

    public get multiSelect(): BooleanInput {
        return this._multiSelect;
    }

    /** Définit la structure des colonnes de la grille. */
    @Input()
    public set columns(columns: IDejaGridColumn[]) {
        this.columns$.next(columns);
    }

    /** Retourne la structure des colonnes de la grille. */
    public get columns(): IDejaGridColumn[] {
        return this._columns;
    }

    /** Définit le modèle affiché dans les lignes de la grille. */
    @Input()
    // eslint-disable-next-line rxjs/finnish
    public set rows(rows: unknown[] | Promise<unknown[]> | Observable<unknown[]>) {
        this._rows = rows;
        if (this._rows && !this._columns) {
            if (this._rows instanceof Array) {
                this.calcColumnsLayout(this._rows);
            } else {
                this.viewPortChanged.pipe(
                    filter(vp => vp?.items?.length > 0),
                    take(1),
                    map(vp => vp.items),
                    takeUntil(this.destroyed$)
                ).subscribe(items => this.calcColumnsLayout(items));
            }
        }
        this.changeDetectorRef.markForCheck();
    }

    /** Retourne le modèle affiché dans les lignes de la grille. */
    // eslint-disable-next-line rxjs/finnish
    public get rows(): unknown[] | Promise<unknown[]> | Observable<unknown[]> {
        return this._rows;
    }

    /** Définit la colonne en surbrillance. */
    @Input()
    public set currentColumn(column: IDejaGridColumn) {
        this.columns.forEach(c => c.isCurrent = false);
        if (column) {
            column.isCurrent = true;
            this.ensureColumnVisible(column);
        }
        if (this._columnLayout) {
            this._columnLayout.refresh$.next();
        }
    }

    /** Retourne la colonne en surbrillance. */
    public get currentColumn(): IDejaGridColumn {
        return this.columns.find(c => c.isCurrent);
    }

    /** Definit le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading. */
    @Input()
    public set itemListService(value: ItemListService<unknown>) {
        this._itemListService = value;
    }

    /** Retourne le service de liste utilisé par ce composant. */
    public get itemListService(): ItemListService<unknown> {
        return this._itemListService || this.treeListComponent.itemListService;
    }

    /** Retourne une valeur indiquant le nombre de niveau hierarchiques affichés par la grille. */
    public get depthMax(): number {
        return this.treeListComponent.depthMax;
    }

    /** Retourne le service de viewport utilisé pour la grille */
    public get viewPort(): ViewPortService {
        return this.treeListComponent.viewPort;
    }

    public get searchPrefixTemplate(): TemplateRef<unknown> {
        return this.searchPrefixTemplateExternal || this.searchPrefixTemplateInternal;
    }

    public get searchSuffixTemplate(): TemplateRef<unknown> {
        return this.searchSuffixTemplateExternal || this.searchSuffixTemplateInternal;
    }

    public get rowTemplate(): TemplateRef<unknown> {
        return this.rowTemplateExternal || this.rowTemplateInternal;
    }

    public get parentRowTemplate(): TemplateRef<unknown> {
        return this.parentRowTemplateExternal || this.parentRowTemplateInternal;
    }

    public get cellTemplate(): TemplateRef<unknown> {
        return this._cellTemplate;
    }

    public get parentTitleTemplate(): TemplateRef<unknown> {
        return this._parentTitleTemplate;
    }

    public get columnsHeaderTemplate(): TemplateRef<unknown> {
        return this.headerTemplateExternal || this.headerTemplateInternal;
    }

    public get columnHeaderTemplate(): TemplateRef<unknown> {
        return this.columnHeaderTemplateExternal || this._columnHeaderTemplate;
    }

    public get columnLayout(): IDejaGridColumnLayout {
        return this._columnLayout;
    }

    public constructor(private changeDetectorRef: ChangeDetectorRef, private elementRef: ElementRef, @Optional() private clipboardService: DejaClipboardService) {
        super();

        const element = this.elementRef.nativeElement as HTMLElement;

        this.clearColumnLayout();

        const group$ = (groupInfos: IGroupInfo[]): Observable<IGroupInfo[]> => this.treeListComponent.group$(groupInfos).pipe(
            map(() => groupInfos)
        );

        combineLatest([this.columns$, this.columnGroups$]).pipe(
            map(([columns, columnGroups]) => {
                if (typeof columnGroups === 'string') {
                    const groups = columnGroups.split(',').map(v => v.trim());
                    return this._columnGroups = groups.map(group => columns.find(column => column.name === group));
                } else {
                    return this._columnGroups = columnGroups;
                }
            }),
            map(columnGroups => {
                const groupInfos = [] as IGroupInfo[];
                const sortInfos = this.treeListComponent.sortInfos;
                columnGroups.forEach(column => {
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
            switchMap(group$),
            takeUntil(this.destroyed$)
        ).subscribe(groupInfos => {
            this.groupChanged.emit(groupInfos);
            this.changeDetectorRef.markForCheck();
        });

        this.columns$.pipe(
            tap(columns => this._columns = columns),
            debounceTime(1),
            takeUntil(this.destroyed$)
        ).subscribe(() => this.calcColumnsLayout());

        this.printColumnLayout$.pipe(
            debounceTime(1000),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            console.log('');
            console.log('Auto columns layout:');
            console.log(JSON.stringify(this._columns, null, 4));
            console.log('');
        });

        this.disableUserSelection$.pipe(
            tap(() => element.setAttribute('disableselection', '')),
            debounceTime(1000),
            takeUntil(this.destroyed$)
        ).subscribe(() => element.removeAttribute('disableselection'));

        fromEvent(window, 'resize').pipe(
            filter(() => this.hasPercentageColumns),
            debounceTime(5),
            takeUntil(this.destroyed$)
        ).subscribe(() => this.calcColumnsLayout());

        const keyDown$ = fromEvent(element, 'keydown') as Observable<KeyboardEvent>;
        keyDown$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe(event => {
            const find = (index: number, backward: boolean): IDejaGridColumn => {
                if (backward) {
                    if (index === -1) {
                        index = this.columns.length;
                    }
                    // eslint-disable-next-line no-loops/no-loops
                    while (--index >= 0) {
                        const column = this.columns[index];
                        if (column.w > 0) {
                            return column;
                        }
                    }
                } else {
                    // eslint-disable-next-line no-loops/no-loops
                    while (++index < this.columns.length) {
                        const column = this.columns[index];
                        if (column.w > 0) {
                            return column;
                        }
                    }
                }
                return this.currentColumn;
            };

            switch (event.code) {
                case KeyCodes.LeftArrow:
                case KeyCodes.RightArrow:
                    this.currentColumn = this.columns && find(this.columns.findIndex(c => c.isCurrent), event.code === KeyCodes.LeftArrow);
                    event.preventDefault();
                    return false;

                default:
                    return true;
            }
        });

        const mouseDownEvent$ = fromEvent(element, 'mousedown') as Observable<MouseEvent>;
        mouseDownEvent$.pipe(
            filter(downEvent => downEvent.buttons === 1),
            switchMap(downEvent => {
                const clickedColumn = this.getColumnFromHtmlElement(downEvent.target as HTMLElement);
                const mouseUpEvent$ = fromEvent(element, 'mouseup') as Observable<MouseEvent>;
                return mouseUpEvent$.pipe(
                    take(1),
                    filter(() => !!clickedColumn),
                    tap(upEvent => {
                        const columnElement = this.getColumnElementFromHtmlElement(upEvent.target as HTMLElement);
                        if ((columnElement?.getAttribute('colname')) === clickedColumn.name) {
                            this.currentColumn = clickedColumn;
                        }
                    })
                );
            }),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    // get accessor
    public get value(): unknown {
        return this.rows;
    }

    // set accessor including call the onchange callback
    public set value(value: unknown) {
        this.rows = value as unknown[] | Promise<unknown[]> | Observable<unknown[]>;
    }

    /** Nettoye les caches et réaffiche le viewport. */
    public refresh(): void {
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
    public refreshViewPort(item?: IItemBase<unknown>): void {
        this.treeListComponent.refreshViewPort(item);
    }

    /** Efface la hauteur calculée des lignes en mode automatique */
    public clearRowsHeight(): void {
        if (this.treeListComponent) {
            this.treeListComponent.clearRowsHeight();
        }
    }

    /** Efface le viewport */
    public clearViewPort(): void {
        if (this.treeListComponent) {
            this.treeListComponent.clearViewPort();
        }
    }

    /** Calcul la position de la scrollbar horizontale pour que la colonne spéfiée soit dans la zone visible. */
    public ensureColumnVisible(column: IDejaGridColumn): boolean {
        if (column === undefined || !this.columns || this.columns.length === 0 || this._noHorizontalScroll) {
            return;
        }

        const listElement = this.treeListComponent.listElement;
        const scrollPos = listElement.scrollLeft;
        let prevWidth = 0;

        this.columns.find(c => {
            if (column === c) {
                return true;
            }
            prevWidth += c.w;
            return false;
        });

        if (prevWidth < scrollPos) {
            listElement.scrollLeft = prevWidth;
        } else if (scrollPos < prevWidth + column.w - listElement.clientWidth) {
            listElement.scrollLeft = prevWidth + column.w - listElement.clientWidth;
        }
    }

    public scroll(event: DejaTreeListScrollEvent): void {
        if (this.lastScrollLeft !== event.scrollLeft) {
            this.lastScrollLeft = event.scrollLeft;
            this.calcColumnsLayout();
        }
    }

    /** Trie la liste par le champs spécifié. */
    public sort(name?: string): void {
        this.treeListComponent.sort(name);
    }

    /** Trie la liste par le champs spécifié. */
    public sort$(name?: string): Observable<IViewListResult<unknown>> {
        return this.treeListComponent.sort$(name);
    }

    /** Groupe les éléments en fonction du modèle de groupe spécifié
     * @param groupInfos Modèle de groupe à appliquer.
     * @return Observable résolu par la fonction.
     */
    public group$(groups: IGroupInfo[]): Observable<IViewListResult<unknown>> {
        return this.treeListComponent.group$(groups);
    }

    /** Retire les groupe correspondants au modèle de groupe spécifié
     * @param groupInfos Modèle de groupe à retirer.
     * @return Observable résolu par la fonction.
     */
    public ungroup$(groupInfo: IGroupInfo): Observable<IViewListResult<unknown>> {
        return this.treeListComponent.ungroup$(groupInfo);
    }

    public onColumnHeaderClicked(event: IDejaGridColumnEvent): void {
        if (this.treeListComponent && !this.sortable || !event.column.sortable) {
            return;
        }

        const hideSpinner = (): void => {
            event.column.sorting = false;
            this.changeDetectorRef.markForCheck();
            this.header.refresh();
        };

        event.column.sorting = true;
        this.changeDetectorRef.markForCheck();

        timer(1).pipe(
            take(1),
            switchMap(() => this.sort$(event.column.name)),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            hideSpinner();
            this.sortChanged.emit(this.treeListComponent.sortInfos);
        }, (error: string) => {
            hideSpinner();
            throw error.toString();
        });
    }

    public onColumnDragEnd(): void {
        this.columnLayout.refresh$.next();
    }

    public onColumnLayoutChanged(e: IDejaGridColumnLayoutEvent): void {
        this.columns.splice(e.index, 1);

        if (e.target) {
            this.columns.splice(e.targetIndex, 0, e.column);
        } else {
            this.columns.push(e.column);
        }

        this.calcColumnsLayout();
        this.ensureColumnVisible(e.column);

        this.columnLayoutChanged.emit(e);

        this.changeDetectorRef.markForCheck();
    }

    public onColumnSizeChanged(e: IDejaGridColumnSizeEvent): void {

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

    public onGroupRemoved(event: IDejaChipsComponentCloseEvent): void {
        const column = event.item as IDejaGridColumn;

        const groupInfo = {
            groupByField: column.groupByField || column.name,
            groupTextField: column.groupTextField || column.name
        } as IGroupInfo;

        this.treeListComponent.ungroup$(groupInfo).pipe(
            take(1),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    public onGroupsChanged(e: IDejaGridGroupsEvent): void {
        this.columnGroups$.next(e.columns);
    }

    public calcColumnsLayout(rows?: unknown[]): void {
        // this.noColumnsSpecified = false;

        if (!this._columns || !this._columns.length) {
            if (rows?.length) {
                const searchFirstLastLevelRow = (items: IItemTree<unknown>[]): IItemTree<unknown> => items.find(row => {
                    if (row.$items) {
                        const srow: IItemTree<unknown> = searchFirstLastLevelRow(row.$items);
                        if (srow) {
                            return true;
                        }
                    } else {
                        return !!row;
                    }
                    return false;
                });

                const treeRow = searchFirstLastLevelRow(rows);
                if (treeRow) {
                    // this.noColumnsSpecified = true;
                    this._columns = Object.keys(treeRow).map(key => ({
                        label: key,
                        name: key,
                        width: '130px'
                    } as IDejaGridColumn));
                }
            }
        }

        // if (this.noColumnsSpecified) {
        //     this.printColumnLayout$.next();
        // }

        this.clearColumnLayout();

        if (!this._columns || !this._columns.length) {
            if (this.header) {
                this.header.refresh();
            }
            this._columnLayout.refresh$.next();
            return;
        }

        const listElement = this.treeListComponent?.listElement;
        if (!listElement) {
            return;
        }

        this._columnLayout.scrollLeft = -this.lastScrollLeft;
        let viewLeft = -this.lastScrollLeft;
        const containerWidth = listElement.clientWidth;

        // Calc total fixed width
        this.columnsLayoutInfos = new DejaGridColumnsLayoutInfos(this._columns);

        // Reset width
        this._columns.forEach(column => delete column.w);

        const calcColumnsWidth = (): number => {
            // Taille totale des colonnes visibles en pixel
            let totalFixedWidth = 0;

            // Attribution des colonnes en pixels
            this.columnsLayoutInfos.fixedColumns.filter(column => column.w !== 0).forEach(column => {
                const width = this.columnsLayoutInfos.columnsWidth[column.name];
                const minimumWidth = column.minWidth || this.columnsMinWidth;
                column.w = Math.max(minimumWidth, width.value);
                totalFixedWidth += column.w;
            });

            // Calcul de la place restante pour les colonnes en pourcent
            this.columnsLayoutInfos.totalFixedWidth = totalFixedWidth;

            // Filtrer les colonnes visibles en pourcent
            const percentColumns = this.columnsLayoutInfos.percentColumns.filter(column => column.w !== 0);

            // Calcul de la taille retsante pour l'attribution des pourcents une fois les tailles minimum enlevées
            let availableWidthForPercent = containerWidth - totalFixedWidth;
            percentColumns.forEach(column => availableWidthForPercent -= (column.minWidth || this.columnsMinWidth));
            let availableWidth = availableWidthForPercent;

            // Attribution des colonnes en pourcent
            percentColumns.forEach(column => {
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
            this.columnsLayoutInfos.responsiveColumns.find(column => {
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
        this._columns.filter(column => column.w > 0).forEach(column => {
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

    private ensureSizingVisible(column: IDejaGridColumn): void {
        if (column === undefined || !this.columns || this.columns.length === 0 || this._noHorizontalScroll) {
            return;
        }

        const listElement = this.treeListComponent.listElement;
        const scrollPos = listElement.scrollLeft;
        let prevWidth = 0;

        this.columns.find(c => {
            if (column === c) {
                return true;
            }
            prevWidth += c.w;
            return false;
        });

        if (prevWidth + column.w < scrollPos) {
            listElement.scrollLeft = prevWidth + column.w;
        } else if (scrollPos < prevWidth + column.w - listElement.clientWidth) {
            listElement.scrollLeft = prevWidth + column.w - listElement.clientWidth;
        }
    }

    private clearColumnLayout(): void {
        this._columnLayout.scrollLeft = 0;
        this._columnLayout.vpAfterWidth = 0;
        this._columnLayout.vpBeforeWidth = 0;
        this._columnLayout.columns = [];
    }

    private getColumnElementFromHtmlElement(element: HTMLElement): HTMLElement {
        let parentElement = element;

        // eslint-disable-next-line no-loops/no-loops
        while (parentElement && !parentElement.hasAttribute('colname')) {
            parentElement = parentElement.parentElement;
        }

        if (!parentElement) {
            return undefined;
        }

        return parentElement;
    }

    private getColumnFromHtmlElement(element: HTMLElement): IDejaGridColumn {
        const columnElement = this.getColumnElementFromHtmlElement(element);
        const colname = columnElement?.getAttribute('colname');
        return colname && this._columnLayout.columns.find(column => column.name === colname);
    }
}
