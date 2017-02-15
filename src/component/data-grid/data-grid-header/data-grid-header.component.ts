/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import { Observable, Subscription } from 'rxjs/Rx';
import { IDejaDragEvent, IDejaDropEvent, ISortInfos } from "../../../index";
import { IDejaGridColumn, IDejaGridColumnEvent, IDejaGridColumnLayout, IDejaGridColumnLayoutEvent, IDejaGridColumnSizeEvent } from "../index";

@Component({
    selector: 'deja-grid-header',
    styleUrls: ['./data-grid-header.component.scss'],
    templateUrl: './data-grid-header.component.html',
})
export class DejaGridHeaderComponent {
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

    private _columnsDraggable = false;
    private _columnsSortable = false;
    private _columnsSizable = false;
    private _columnLayout = {} as IDejaGridColumnLayout;
    private backupColumnOrder = [] as IDejaGridColumn[];
    private _sizedColumn: IDejaGridColumn;
    private sizedOrigin: number;
    private columnGroupKey = 'deja-grid-column';
    private clickedColumn: IDejaGridColumn;
    private clickedTime: number;
    private mouseMoveObs: Subscription;
    private mouseUpObs: Subscription;

    /** Définit si toutes les colonnes peuvent être draggable vers un autre composant.
     * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
     */
    @Input()
    public set columnsDraggable(value: boolean) {
        this._columnsDraggable = coerceBooleanProperty(value);
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
    public set columnsSortable(value: boolean) {
        this._columnsSortable = coerceBooleanProperty(value);
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
    public set columnsSizable(value: boolean) {
        this._columnsSizable = coerceBooleanProperty(value);
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
            };
    }

    /** Retourne la structire de colonnes associée aux entêtes */
    public get columnLayout() {
        return this._columnLayout;
    }

    protected get columnHeaderTemplate() {
        return this.columnHeaderTemplateExternal || this.columnHeaderTemplateInternal;
    }

    protected set sizedColumn(column: IDejaGridColumn) {
        this._sizedColumn = column;
        this.mouseMove = column !== undefined;
    }

    protected get sizedColumn() {
        return this._sizedColumn;
    }

    constructor(private elementRef: ElementRef) { }

    protected ngAfterViewInit() {
        Observable.fromEvent(document, 'mouseup').subscribe(() => {
            if (this.sizedColumn) {
                this.sizedColumn = undefined;
            }
        });
    }

    protected getDragContext(column: IDejaGridColumn) {
        if ((!this.columnsDraggable && !this.columnsSortable) || column.draggable === false) {
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
        return {
            dragleavecallback: () => {
                if (this.backupColumnOrder.length) {
                    // Restore original column layout
                    this._columnLayout.columns = [];
                    this.backupColumnOrder.forEach((col) => this._columnLayout.columns.push(col));
                }
            },
            dragovercallback: (event: IDejaDropEvent) => {
                if (!this.columnsSortable || !event.dragInfo.hasOwnProperty(this.columnGroupKey)) {
                    return;
                }

                let targetElement = this.getColumnElementFromHTMLElement(event.target as HTMLElement);
                let targetBounds = targetElement.getBoundingClientRect();
                let targetIndex = targetElement && +targetElement.getAttribute('index');
                if (targetIndex === undefined) {
                    return;
                }

                let sourceColumn = event.dragInfo[this.columnGroupKey] as IDejaGridColumn;
                let sourceIndex = this._columnLayout.columns.findIndex((og) => og === sourceColumn);

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
            },
            dropcallback: (event: IDejaDropEvent) => {
                let sourceColumn = event.dragInfo[this.columnGroupKey] as IDejaGridColumn;
                let targetIndex = this._columnLayout.columns.findIndex((og) => og === sourceColumn);

                let e = {
                    column: sourceColumn,
                    originalEvent: event,
                    target: (++targetIndex < this._columnLayout.columns.length) ? this._columnLayout.columns[targetIndex] : null,
                } as IDejaGridColumnLayoutEvent;

                this.columnLayoutChanged.emit(e);
                event.preventDefault();
            },
        };
    }

    @HostListener('mousedown', ['$event'])
    protected onMouseDown(event: MouseEvent) {
        if (event.buttons !== 1) {
            return;
        }

        let target = event.target as HTMLElement;
        let column = this.getColumnFromHTMLElement(event.target as HTMLElement);

        if (target.hasAttribute('separator')) {
            if (this.columnsSizable && column.sizeable !== false) {
                // Size clicked column
                this.sizedColumn = column;
                this.sizedOrigin = event.pageX;
            }

            event.stopPropagation();
            return false;
        }

        this.clickedColumn = column;
        this.clickedTime = this.clickedColumn && Date.now();
        this.mouseUp = true;
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
                        let e = {
                            column: this.clickedColumn,
                            originalEvent: event,
                        } as IDejaGridColumnEvent;
                        this.columnHeaderClicked.emit(e);
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

    private set mouseMove(value: boolean) {
        if (value && this._sizedColumn) {
            if (this.mouseMoveObs) {
                return;
            }

            let element = this.elementRef.nativeElement as HTMLElement;
            this.mouseMoveObs = Observable.fromEvent(element.ownerDocument, 'mousemove').subscribe((event: MouseEvent) => {
                if (event.buttons === 1) {
                    let e = {
                        column: this.sizedColumn,
                        offsetWidth: event.pageX - this.sizedOrigin,
                        originalEvent: event,
                    } as IDejaGridColumnSizeEvent;
                    this.columnSizeChanged.emit(e);
                } else {
                    // Mouse up
                    this.sizedColumn = undefined;
                }
            });
        } else if (this.mouseMoveObs) {
            let e = {
                column: null,
            } as IDejaGridColumnSizeEvent;
            this.columnSizeChanged.emit(e);

            this.mouseMoveObs.unsubscribe();
            delete this.mouseMoveObs;
        }
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
        let colName = columnElement && columnElement.getAttribute('colname');
        return colName && this._columnLayout.columns.find((column) => column.name === colName);
    }
}
