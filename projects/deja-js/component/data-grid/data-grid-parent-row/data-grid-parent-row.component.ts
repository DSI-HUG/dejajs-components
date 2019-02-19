/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input } from '@angular/core';
import { ItemListService } from '@deja-js/core';
import { IDejaGridColumn } from '../data-grid-column/data-grid-column';
import { IDejaGridRow } from '../data-grid-row/data-grid-row';
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
    @Input() public cellTemplateExternal: any;

    /** Template de titre si définit extérieurement à la grille */
    @Input() public parentTitleTemplateExternal: any;

    /** Index de la ligne sur la liste plate de ItemListService */
    @Input() public flatIndex: number;

    /** Template de titre par defaut définit dans le HTML de la grille */
    @ContentChild('parentTitleTemplate') public parentTitleTemplateInternal: any;

    /** Template de cellule par defaut  définit dans le HTML de la grille */
    @ContentChild('cellTemplate') public cellTemplateInternal: any;

    private _columnLayout = {} as IDejaGridParentRowColumnLayout;

    public get columnLayoutOfColumn0() {
        return this._columnLayout.column0;
    }

    public get columnLayoutOfColumns() {
        return this._columnLayout.columns;
    }

    /** Définit la structure de colonnes a appliquer sur cette ligne */
    @Input()
    public set columns(columns: IDejaGridColumn[]) {
        let left = 0;
        this._columnLayout.columns = [];
        columns.forEach((column) => {
            if (this.getCellText(this.row, column.name)) {
                if (this._columnLayout.column0 === 0) {
                    this._columnLayout.column0 = left;
                }
                this._columnLayout.columns.push({
                    column: column,
                    left: left,
                });
            }
            left += column.w;
        });
        this._columnLayout.column0 = left;
        this.changeDetectorRef.markForCheck();
    }

    public get cellTemplate() {
        return this.cellTemplateExternal || this.cellTemplateInternal;
    }

    public get parentTitleTemplate() {
        return this.parentTitleTemplateExternal || this.parentTitleTemplateInternal;
    }

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    public getCellText(row: IDejaGridRow, textField: string) {
        return ItemListService.getItemText(row, textField);
    }
}

export interface IDejaGridParentRowColumnLayout {
    column0: number;
    columns: {
        column: IDejaGridColumn;
        left: number;
    }[];
}
