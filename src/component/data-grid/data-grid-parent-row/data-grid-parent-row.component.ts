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

import { Component, ContentChild, Input } from '@angular/core';
import { IDejaGridColumn, IDejaGridParentRow } from '../index';

/** Composant représentant une ligne parente d'une structure de ligne hierarchique */
@Component({
    selector: 'deja-grid-parent-row',
    styleUrls: ['./data-grid-parent-row.component.scss'],
    templateUrl: './data-grid-parent-row.component.html',
})
export class DejaGridParentRowComponent {
    /** Définit la structure de la ligne associée à ce composant */
    @Input() public row: IDejaGridParentRow;

    /** Définit la structure de colonnes a appliquer sur cette ligne */
    @Input() public columns: IDejaGridColumn[];

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

    protected get columnLayout() {
        const colLayout = {} as IDejaGridParentRowColumnLayout;
        let left = 0;
        colLayout.columns = [];
        this.columns.forEach((column) => {
            if (this.row[column.name]) {
                if (colLayout.column0 === 0) {
                    colLayout.column0 = left;
                }
                colLayout.columns.push({
                    column: column,
                    left: left,
                });
            }
            left += column.w;
        });
        colLayout.column0 = left;
        return colLayout;
    };

    protected get cellTemplate() {
        return this.cellTemplateExternal || this.cellTemplateInternal;
    }

    protected get parentTitleTemplate() {
        return this.parentTitleTemplateExternal || this.parentTitleTemplateInternal;
    }
}

export interface IDejaGridParentRowColumnLayout {
    column0: number;
    columns: Array<{
        column: IDejaGridColumn;
        left: number;
    }>;
}
