/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, Optional, Output } from '@angular/core';
import 'rxjs/add/operator/timeout';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { DejaClipboardService } from '../../../common/core/clipboard/clipboard.service';
import { ISortInfos } from '../../../common/core/sorting/sort-infos.model';
import { IDejaDragEvent } from '../../dragdrop/draggable.directive';
import { IDejaDropEvent } from '../../dragdrop/droppable.directive';
import { IDejaGridColumn, IDejaGridColumnEvent, IDejaGridColumnLayoutEvent, IDejaGridColumnSizeEvent } from '../data-grid-column/data-grid-column';
import { IDejaGridColumnLayout } from '../data-grid-column/data-grid-column-layout';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-grid-header',
    styleUrls: ['./data-grid-header.component.scss'],
    templateUrl: './data-grid-header.component.html',
})
export class DejaGridHeaderComponent implements OnDestroy {
    /** Template d'entête de colonne si définit extérieurement à la grille */
    @Input() public columnHeaderTemplateExternal;

    /** Infos de tri à afficher dans les entêtes */
    @Input() public sortInfos: ISortInfos;

    /** Cet évenement est levé lorsque la taille d'une colonne est modifiée */
    @Output() public columnSizeChanged = new EventEmitter<IDejaGridColumnSizeEvent>();

    /** Cet évenement est levé lorsque la position des colonnes est modifiée */
    @Output() public columnLayoutChanged = new EventEmitter<IDejaGridColumnLayoutEvent>();

    /** Cet évenement est levé lorsqu'une entête de colonne est cliquée */
    @Output() public columnHeaderClicked = new EventEmitter<IDejaGridColumnEvent>();

    /** Template d'entête de colonne par defaut définit dans le HTML de la grille */
    @ContentChild('columnHeaderTemplate') protected columnHeaderTemplateInternal;

    protected sizedColumn: IDejaGridColumn;
    private _columnsDraggable = false;
    private _columnsSortable = false;
    private _columnsSizable = false;
    private _columnLayout = {} as IDejaGridColumnLayout;
    private backupColumnOrder = [] as IDejaGridColumn[];
    private columnGroupKey = 'deja-grid-column';
    private subscriptions = [] as Subscription[];

    /** Définit si toutes les colonnes peuvent être draggable vers un autre composant.
     * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
     */
    @Input()
    public set columnsDraggable(value: boolean | string) {
        this._columnsDraggable = value != null && `${value}` !== 'false';
    }

    /** Retourne si toutes les colonnes peuvent être draggable vers un autre composant.
     * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
     */
    public get columnsDraggable() {
        return this._columnsDraggable;
    }

    /** Définit si toutes les colonnes peuvent être déplacées parmis les autres colonnes.
     * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
     */
    @Input()
    public set columnsSortable(value: boolean | string) {
        this._columnsSortable = value != null && `${value}` !== 'false';
    }

    /** Retourne si toutes les colonnes peuvent être déplacées parmis les autres colonnes.
     * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
     */
    public get columnsSortable() {
        return this._columnsSortable;
    }

    /** Définit si toutes les colonnes peuvent être redimensionées
     * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
     */
    @Input()
    public set columnsSizable(value: boolean | string) {
        this._columnsSizable = value != null && `${value}` !== 'false';
    }

    /** Retourne si toutes les colonnes peuvent être redimensionées
     * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
     */
    public get columnsSizable() {
        return this._columnsSizable;
    }

    @Input()
    /** Définit la structire de colonnes associée aux entêtes */
    public set columnLayout(layout: IDejaGridColumnLayout) {
        this._columnLayout = layout || {
            columns: [],
            scrollLeft: 0,
            vpAfterWidth: 0,
            vpBeforeWidth: 0,
            refresh$: new Subject<void>(),
        };
        this.changeDetectorRef.markForCheck();
    }

    /** Retourne la structire de colonnes associée aux entêtes */
    public get columnLayout() {
        return this._columnLayout;
    }

    protected get columnHeaderTemplate() {
        return this.columnHeaderTemplateExternal || this.columnHeaderTemplateInternal;
    }

    constructor(elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef, @Optional() private clipboardService: DejaClipboardService) {
        const element = elementRef.nativeElement as HTMLElement;

        this.subscriptions.push(Observable.fromEvent(element, 'mousedown')
            .filter((event: MouseEvent) => event.buttons === 1)
            .subscribe((downEvent: MouseEvent) => {
                const target = downEvent.target as HTMLElement;
                const column = this.getColumnFromHTMLElement(downEvent.target as HTMLElement);

                if (target.hasAttribute('separator')) {
                    if (this.columnsSizable && column.sizeable !== false) {
                        // Size clicked column
                        this.sizedColumn = column;
                        const sizedOrigin = downEvent.pageX;

                        const kill$ = new Subject();
                        const mouseUp$ = Observable.fromEvent(document, 'mouseup');

                        mouseUp$.first().subscribe(() => {
                            const e = {
                                column: null,
                            } as IDejaGridColumnSizeEvent;
                            this.columnSizeChanged.emit(e);
                            this.changeDetectorRef.markForCheck();
                            this.sizedColumn = undefined;
                        });

                        Observable.fromEvent(element.ownerDocument, 'mousemove')
                            .takeUntil(Observable.merge(mouseUp$, kill$))
                            .subscribe((moveEvent: MouseEvent) => {
                                if (moveEvent.buttons === 1) {
                                    const e = {
                                        column: this.sizedColumn,
                                        offsetWidth: moveEvent.pageX - sizedOrigin,
                                        originalEvent: moveEvent,
                                    } as IDejaGridColumnSizeEvent;
                                    this.columnSizeChanged.emit(e);
                                    this.changeDetectorRef.markForCheck();
                                } else {
                                    // Mouse up
                                    kill$.next();
                                }
                            });

                        downEvent.stopPropagation();
                        return false;
                    }
                } else {
                    const clickedColumn = column;

                    Observable.fromEvent(element, 'mouseup')
                        .first()
                        .timeout(1000)
                        .subscribe((upEvent: MouseEvent) => {
                            const columnElement = this.getColumnElementFromHTMLElement(upEvent.target as HTMLElement);
                            if ((columnElement && columnElement.getAttribute('colname')) === clickedColumn.name) {
                                const e = {
                                    column: clickedColumn,
                                    originalEvent: upEvent,
                                } as IDejaGridColumnEvent;
                                this.columnHeaderClicked.emit(e);
                                this.changeDetectorRef.markForCheck();
                            }
                        }, (_error) => { });
                }
            }));
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    public refresh() {
        this.changeDetectorRef.markForCheck();
    }

    protected getDragContext(column: IDejaGridColumn) {
        if (!this.clipboardService || (!this.columnsDraggable && !this.columnsSortable) || column.draggable === false) {
            return null;
        }

        // console.log(`getDragContext ` + column.name + ' ' + Date.now());
        return {
            dragendcallback: (event: IDejaDragEvent) => {
                if (!event.dragInfo.hasOwnProperty(this.columnGroupKey)) {
                    return;
                }
                column.dragged = false;
                this.backupColumnOrder = [];
                this.changeDetectorRef.markForCheck();
            },
            dragstartcallback: (event: IDejaDragEvent) => {
                if (!this.sizedColumn) {
                    event.dragInfo[this.columnGroupKey] = column;
                    column.dragged = true;

                    // Backup column layout
                    this.backupColumnOrder = [];
                    this._columnLayout.columns.forEach((col) => this.backupColumnOrder.push(col));
                } else {
                    event.preventDefault();
                }
            },
        };
    }

    protected getDropContext() {
        if (!this.clipboardService) {
            return null;
        }

        const dragCallback = (event: IDejaDropEvent) => {
            if (!this.columnsSortable || !event.dragInfo.hasOwnProperty(this.columnGroupKey)) {
                return;
            }

            const targetElement = this.getColumnElementFromHTMLElement(event.target as HTMLElement);
            const targetBounds = targetElement.getBoundingClientRect();
            const targetIndex = targetElement && +targetElement.getAttribute('index');
            if (targetIndex === undefined) {
                return;
            }

            const sourceColumn = event.dragInfo[this.columnGroupKey] as IDejaGridColumn;
            const sourceIndex = this._columnLayout.columns.findIndex((og) => og === sourceColumn);

            // Dead zones
            if (sourceIndex === targetIndex) {
                event.preventDefault();
                return;
            } else if (targetIndex === sourceIndex + 1) {
                if (event.x <= targetBounds.left + targetBounds.width / 2) {
                    event.preventDefault();
                    return;
                }
            } else if (targetIndex === sourceIndex - 1) {
                if (event.x >= targetBounds.left + targetBounds.width / 2) {
                    event.preventDefault();
                    return;
                }
            }

            this._columnLayout.columns.splice(sourceIndex, 1);
            this._columnLayout.columns.splice(targetIndex, 0, sourceColumn);
            event.preventDefault();
            this.changeDetectorRef.markForCheck();
        };

        return {
            dragleavecallback: () => {
                if (this.backupColumnOrder.length) {
                    // Restore original column layout
                    this._columnLayout.columns = [];
                    this.backupColumnOrder.forEach((col) => this._columnLayout.columns.push(col));
                }
            },
            dragentercallback: dragCallback,
            dragovercallback: dragCallback,
            dropcallback: (event: IDejaDropEvent) => {
                const sourceColumn = event.dragInfo[this.columnGroupKey] as IDejaGridColumn;
                let targetIndex = this._columnLayout.columns.findIndex((og) => og === sourceColumn);

                const e = {
                    column: sourceColumn,
                    originalEvent: event,
                    target: (++targetIndex < this._columnLayout.columns.length) ? this._columnLayout.columns[targetIndex] : null,
                } as IDejaGridColumnLayoutEvent;

                this.columnLayoutChanged.emit(e);
                event.preventDefault();
            },
        };
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
        const colName = columnElement && columnElement.getAttribute('colname');
        return colName && this._columnLayout.columns.find((column) => column.name === colName);
    }
}
