/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
// import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IDejaAction } from '../../../common/core/action.interface';
import { valueAccessorFactory } from '../model/combo-list.accessor';
import { DejaComboListBase } from '../model/combo-list.base';
import { DejaComboListService } from '../service/combo-list.service';

@Component({
    // changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-combo-list',
    templateUrl: './combo-list.component.html',
    styleUrls: ['./combo-list.component.scss'],
    providers: [valueAccessorFactory(DejaComboListComponent)]
})
export class DejaComboListComponent<T> extends DejaComboListBase<T> implements ControlValueAccessor {

    @Input() public set itemsToSelect(aItem: T[]) {
        if (!!aItem && Array.isArray(aItem)) {
            this.srv.selectable = aItem;
        }
    }
    @Input() public disableFastActions = false;

    constructor(public srv: DejaComboListService<T>) {
        super();
        this.items = [];
    }

    // Select
    public toSelectListAction(listAction: IDejaAction): void {
        console.log('toSelectListAction', listAction);
        if (listAction.type === 'single') {
            this.srv.toggleSelectable(listAction.payload);
        } else if (listAction.type === 'double') {
            this.srv.raiseOne(listAction.payload);
        }
    }

    // Deselect
    public selectedListAction(listAction: IDejaAction): void {
        console.log('selectedListAction', listAction);
        if (listAction.type === 'single') {
            this.srv.toggleSelected(listAction.payload);
        } else if (listAction.type === 'double') {
            this.srv.dropOne(listAction.payload);
        }
    }
}
