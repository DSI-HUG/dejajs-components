/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { ContentChild } from '@angular/core';
import { Input } from '@angular/core';
import { Destroy, ItemListService } from '@deja-js/core';
import { from, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IDejaGridColumnLayout } from '../data-grid-column/data-grid-column-layout';
import { IDejaGridRow } from './data-grid-row';

/** Composant représentant une ligne de la grille */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-grid-row',
    styleUrls: ['./data-grid-row.component.scss'],
    templateUrl: './data-grid-row.component.html'
})
export class DejaGridRowComponent extends Destroy {
    /** Définit la structure de la ligne associée à ce composant */
    @Input() public row: IDejaGridRow<unknown>;

    /** Template de cellule si définit extérieurement à la grille */
    @Input() public cellTemplateExternal: TemplateRef<unknown>;

    /** Index de la ligne sur la liste plate de ItemListService */
    @Input() public flatIndex: number;

    /** Template de cellule par defaut  définit dans le HTML de la grille */
    @ContentChild('cellTemplate') public cellTemplateInternal: TemplateRef<unknown>;

    private _columnLayout = {} as IDejaGridColumnLayout;
    private refresh$sub: Subscription;

    @Input()
    public set columnLayout(layout: IDejaGridColumnLayout) {
        if (this.refresh$sub) {
            this.refresh$sub.unsubscribe();
            this.refresh$sub = undefined;
        }

        this._columnLayout = layout || {
            columns: [],
            scrollLeft: 0,
            vpAfterWidth: 0,
            vpBeforeWidth: 0,
            refresh$: undefined
        };

        if (this._columnLayout.refresh$) {
            this.refresh$sub = from(this._columnLayout.refresh$).pipe(
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());
        }
    }

    public get columnLayout() {
        return this._columnLayout;
    }

    public get cellTemplate() {
        return this.cellTemplateExternal || this.cellTemplateInternal;
    }

    public constructor(private changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    public getCellText(row: IDejaGridRow<unknown>, textField: string) {
        return ItemListService.getItemText(row, textField) as string;
    }
}
