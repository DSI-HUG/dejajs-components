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

import { Component, ContentChild, Input } from '@angular/core';
import { IDejaGridColumn, IDejaGridColumnLayout, IDejaGridRow } from "../index";

/** Composant représentant une ligne de la grille */
@Component({
    selector: 'deja-grid-row',
    styleUrls: ['./data-grid-row.component.scss'],
    templateUrl: './data-grid-row.component.html',
})
export class DejaGridRowComponent {
    /** Définit la structure de la ligne associée à ce composant */
    @Input() public row: IDejaGridRow;

    /** Définit la structure de colonnes a appliquer sur cette ligne */
    @Input() public currentColumn: IDejaGridColumn;

    /** Template de cellule si définit extérieurement à la grille */
    @Input() public cellTemplateExternal;

    /** Index de la ligne sur la liste plate de ItemListService */    
    @Input() public flatIndex: number;

    /** Template de cellule par defaut  définit dans le HTML de la grille */
    @ContentChild('cellTemplate') protected cellTemplateInternal;

    @Input()
    public set columnLayout(layout: IDejaGridColumnLayout) { 
        this._columnLayout = layout || {
            columns: [],
            scrollLeft: 0,
            vpAfterWidth: 0,
            vpBeforeWidth: 0,
        };
    }

    public get columnLayout() { 
        return this._columnLayout;
    }

    private _columnLayout = {} as IDejaGridColumnLayout;

    protected get cellTemplate() {
        return this.cellTemplateExternal || this.cellTemplateInternal;
    }
}

