/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input } from '@angular/core';
import { IDejaGridColumn } from '../data-grid-column/data-grid-column';
import { IDejaGridParentRow } from './data-grid-parent-row';

/** Composant représentant une ligne parente d'une structure de ligne hierarchique */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-grid-parent-row',
    styleUrls: ['./data-grid-parent-row.component.scss'],
    templateUrl: './data-grid-parent-row.component.html',
})
export class DejaGridParentRowComponent {
    /** Définit la structure de la ligne associée à ce composant */
    @Input() public row: IDejaGridParentRow;

    /** Template de cellule si définit extérieurement à la grille */
    @Input() public cellTemplateExternal;

    /** Template de titre si définit extérieurement à la grille */
    @Input() public parentTitleTemplateExternal;

    /** Index de la ligne sur la liste plate de ItemListService */
    @Input() public flatIndex: number;

    /** Template de titre par defaut définit dans le HTML de la grille */
    @ContentChild('parentTitleTemplate') protected parentTitleTemplateInternal;

    /** Template de cellule par defaut  définit dans le HTML de la grille */
    @ContentChild('cellTemplate') protected cellTemplateInternal;

    private columnLayout = {} as IDejaGridParentRowColumnLayout;

    /** Définit la structure de colonnes a appliquer sur cette ligne */
    @Input()
    public set columns(columns: IDejaGridColumn[]) {
        let left = 0;
        this.columnLayout.columns = [];
        columns.forEach((column) => {
            if (this.row[column.name]) {
                if (this.columnLayout.column0 === 0) {
                    this.columnLayout.column0 = left;
                }
                this.columnLayout.columns.push({
                    column: column,
                    left: left,
                });
            }
            left += column.w;
        });
        this.columnLayout.column0 = left;
        this.changeDetectorRef.markForCheck();
    }

    protected get cellTemplate() {
        return this.cellTemplateExternal || this.cellTemplateInternal;
    }

    protected get parentTitleTemplate() {
        return this.parentTitleTemplateExternal || this.parentTitleTemplateInternal;
    }

    constructor(private changeDetectorRef: ChangeDetectorRef) { }
}

export interface IDejaGridParentRowColumnLayout {
    column0: number;
    columns: {
        column: IDejaGridColumn;
        left: number;
    }[];
}
