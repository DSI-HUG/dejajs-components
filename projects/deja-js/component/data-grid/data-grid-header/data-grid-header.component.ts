/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, Optional, Output, TemplateRef } from '@angular/core';
import { DejaClipboardService } from '@deja-js/component/core';
import { Destroy } from '@deja-js/component/core';
import { ISortInfos } from '@deja-js/component/core';
import { IDejaDragContext, IDejaDragEvent, IDejaDropContext, IDejaDropEvent } from '@deja-js/component/dragdrop';
import { fromEvent, merge, Observable, of, Subject } from 'rxjs';
import { catchError, filter, switchMap, take, takeUntil, tap, timeout } from 'rxjs/operators';

import { IDejaGridColumn, IDejaGridColumnEvent, IDejaGridColumnLayoutEvent, IDejaGridColumnSizeEvent } from '../data-grid-column/data-grid-column';
import { IDejaGridColumnLayout } from '../data-grid-column/data-grid-column-layout';

@Component({
    selector: 'deja-grid-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./data-grid-header.component.scss'],
    templateUrl: './data-grid-header.component.html'
})
export class DejaGridHeaderComponent extends Destroy {
    /** Template d'entête de colonne si définit extérieurement à la grille */
    @Input() public columnHeaderTemplateExternal: TemplateRef<unknown>;

    /** Infos de tri à afficher dans les entêtes */
    @Input() public sortInfos: ISortInfos;

    /** Cet évenement est levé lorsque la taille d'une colonne est modifiée */
    @Output() public readonly columnSizeChanged = new EventEmitter<IDejaGridColumnSizeEvent>();

    /** Cet évenement est levé lorsque la position des colonnes est modifiée */
    @Output() public readonly columnLayoutChanged = new EventEmitter<IDejaGridColumnLayoutEvent>();

    /** Cet évenement est levé lorsqu'une entête de colonne est cliquée */
    @Output() public readonly columnHeaderClicked = new EventEmitter<IDejaGridColumnEvent>();

    /** Cet évenement est levé lorsqu'une colonne est drag and dropée */
    @Output() public readonly columnDragEnd = new EventEmitter();

    /** Template d'entête de colonne par defaut définit dans le HTML de la grille */
    @ContentChild('columnHeaderTemplate') public columnHeaderTemplateInternal: TemplateRef<unknown>;

    public _sizedColumn: IDejaGridColumn;
    private _columnsDraggable = false;
    private _columnsSortable = false;
    private _columnsSizable = false;
    private _columnLayout = {} as IDejaGridColumnLayout;
    private backupColumnOrder = [] as IDejaGridColumn[];
    private columnGroupKey = 'deja-grid-column';

    /** Définit si toutes les colonnes peuvent être draggable vers un autre composant.
     * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
     */
    @Input()
    public set columnsDraggable(value: BooleanInput) {
        this._columnsDraggable = coerceBooleanProperty(value);
    }

    /** Retourne si toutes les colonnes peuvent être draggable vers un autre composant.
     * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
     */
    public get columnsDraggable(): BooleanInput {
        return this._columnsDraggable;
    }

    /** Définit si toutes les colonnes peuvent être déplacées parmis les autres colonnes.
     * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
     */
    @Input()
    public set columnsSortable(value: BooleanInput) {
        this._columnsSortable = coerceBooleanProperty(value);
    }

    /** Retourne si toutes les colonnes peuvent être déplacées parmis les autres colonnes.
     * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
     */
    public get columnsSortable(): BooleanInput {
        return this._columnsSortable;
    }

    public get sizedColumn(): IDejaGridColumn {
        return this._sizedColumn;
    }

    /** Définit si toutes les colonnes peuvent être redimensionées
     * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
     */
    @Input()
    public set columnsSizable(value: BooleanInput) {
        this._columnsSizable = coerceBooleanProperty(value);
    }

    /** Retourne si toutes les colonnes peuvent être redimensionées
     * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
     */
    public get columnsSizable(): BooleanInput {
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
            refresh$: new Subject<void>()
        };
        this.changeDetectorRef.markForCheck();
    }

    /** Retourne la structire de colonnes associée aux entêtes */
    public get columnLayout(): IDejaGridColumnLayout {
        return this._columnLayout;
    }

    public get columnHeaderTemplate(): TemplateRef<unknown> {
        return this.columnHeaderTemplateExternal || this.columnHeaderTemplateInternal;
    }

    public constructor(elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef, @Optional() private clipboardService: DejaClipboardService) {
        super();

        const element = elementRef.nativeElement as HTMLElement;

        const mouseDownEvent$ = fromEvent(element, 'mousedown') as Observable<MouseEvent>;
        mouseDownEvent$.pipe(
            filter(downEvent => downEvent.buttons === 1),
            switchMap(downEvent => {
                const target = downEvent.target as HTMLElement;
                const column = this.getColumnFromHtmlElement(downEvent.target as HTMLElement);
                const mouseUpEvent$ = fromEvent(element.ownerDocument, 'mouseup') as Observable<MouseEvent>;

                if (target.hasAttribute('separator')) {
                    if (this.columnsSizable && column.sizeable !== false) {
                        // Size clicked column
                        this._sizedColumn = column;
                        const sizedOrigin = downEvent.screenX;

                        const kill$ = new Subject();

                        const mouseUp$ = mouseUpEvent$.pipe(
                            take(1),
                            tap(() => {
                                const e = {
                                    column: null
                                } as IDejaGridColumnSizeEvent;
                                this.columnSizeChanged.emit(e);
                                this.changeDetectorRef.markForCheck();
                                this._sizedColumn = undefined;
                            })
                        );

                        const mouseMoveEvent$ = fromEvent(element.ownerDocument, 'mousemove') as Observable<MouseEvent>;
                        const mouseMove$ = mouseMoveEvent$.pipe(
                            // eslint-disable-next-line rxjs/no-unsafe-takeuntil
                            takeUntil(mouseUpEvent$),
                            // eslint-disable-next-line rxjs/no-unsafe-takeuntil
                            takeUntil(kill$),
                            tap(moveEvent => {
                                if (moveEvent.buttons === 1) {
                                    const e = {
                                        column: this._sizedColumn,
                                        offsetWidth: moveEvent.screenX - sizedOrigin,
                                        originalEvent: moveEvent
                                    } as IDejaGridColumnSizeEvent;
                                    this.columnSizeChanged.emit(e);
                                    this.changeDetectorRef.markForCheck();
                                } else {
                                    // Mouse up
                                    kill$.next();
                                }
                            })
                        );

                        downEvent.stopPropagation();
                        return merge(mouseUp$, mouseMove$);
                    }
                } else {
                    const clickedColumn = column;

                    return mouseUpEvent$.pipe(
                        take(1),
                        timeout(1000),
                        tap(upEvent => {
                            const columnElement = this.getColumnElementFromHtmlElement(upEvent.target as HTMLElement);
                            if ((columnElement?.getAttribute('colname')) === clickedColumn.name) {
                                const index = +columnElement.getAttribute('index');
                                const e = {
                                    column: clickedColumn,
                                    originalEvent: upEvent,
                                    index: index
                                } as IDejaGridColumnEvent;
                                this.columnHeaderClicked.emit(e);
                                this.changeDetectorRef.markForCheck();
                            }
                        }),
                        catchError(_error => of(null as MouseEvent))
                    );
                }

                return of(null as MouseEvent);
            }),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    public refresh(): void {
        this.changeDetectorRef.markForCheck();
    }

    public getDragContext(column: IDejaGridColumn): IDejaDragContext {
        if (!this.clipboardService || (!this.columnsDraggable && !this.columnsSortable) || column.draggable === false) {
            return null as IDejaDragContext;
        }

        // console.log(`getDragContext ` + column.name + ' ' + Date.now());
        return {
            dragendcallback: (event: IDejaDragEvent) => {
                // eslint-disable-next-line no-prototype-builtins
                if (!event.dragInfo.hasOwnProperty(this.columnGroupKey)) {
                    return;
                }
                column.dragged = false;
                this.backupColumnOrder = [];
                this.columnDragEnd.emit();
                this.changeDetectorRef.markForCheck();
            },
            dragstartcallback: (event: IDejaDragEvent) => {
                if (!this._sizedColumn) {
                    event.dragInfo[this.columnGroupKey] = column;
                    column.dragged = true;

                    // Backup column layout
                    this.backupColumnOrder = this._columnLayout.columns.map(col => col);
                } else {
                    event.preventDefault();
                }
            }
        } as IDejaDragContext;
    }

    public getDropContext(): IDejaDropContext {
        if (!this.clipboardService) {
            return null as IDejaDropContext;
        }

        const dragCallback = (event: IDejaDropEvent) => {
            // eslint-disable-next-line no-prototype-builtins
            if (!this.columnsSortable || !event.dragInfo.hasOwnProperty(this.columnGroupKey)) {
                return;
            }

            const targetElement = this.getColumnElementFromHtmlElement(event.target as HTMLElement);
            const targetBounds = targetElement?.getBoundingClientRect();
            const targetIndex = targetElement && +targetElement.getAttribute('index');
            if (targetIndex === undefined) {
                return;
            }

            const sourceColumn = event.dragInfo[this.columnGroupKey] as IDejaGridColumn;
            const sourceIndex = this._columnLayout.columns.findIndex(og => og === sourceColumn);

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

            const e = {
                column: sourceColumn,
                index: sourceIndex,
                originalEvent: event,
                target: this._columnLayout.columns[targetIndex],
                targetIndex: targetIndex
            } as IDejaGridColumnLayoutEvent;

            this.columnLayoutChanged.emit(e);
            event.preventDefault();
        };

        return {
            dragleavecallback: () => {
                if (this.backupColumnOrder.length) {
                    // Restore original column layout
                    this._columnLayout.columns = this.backupColumnOrder.map(col => col);
                }
            },
            dragentercallback: dragCallback,
            dragovercallback: dragCallback,
            dropcallback: dragCallback
        } as IDejaDropContext;
    }

    private getColumnElementFromHtmlElement(element: HTMLElement): HTMLElement {
        let parentElement = element;

        // eslint-disable-next-line no-loops/no-loops
        while (parentElement && !parentElement.hasAttribute('colname')) {
            element = parentElement;
            parentElement = parentElement.parentElement;
        }

        if (!parentElement) {
            return undefined;
        }

        return parentElement;
    }

    private getColumnFromHtmlElement(element: HTMLElement): IDejaGridColumn {
        const columnElement = this.getColumnElementFromHtmlElement(element);
        const colName = columnElement?.getAttribute('colname');
        return colName && this._columnLayout.columns.find(column => column.name === colName);
    }
}
