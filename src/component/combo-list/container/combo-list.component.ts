/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IDejaAction } from '../../../common/core/action.interface';
import { valueAccessorFactory } from '../model/combo-list.accessor';
import { DejaComboListBase } from '../model/combo-list.base';

@Component({
    selector: 'deja-combo-list',
    templateUrl: './combo-list.component.html',
    styleUrls: ['./combo-list.component.scss'],
    providers: [valueAccessorFactory(DejaComboListComponent)],
})
export class DejaComboListComponent<T> extends DejaComboListBase<T> implements ControlValueAccessor {

    // Select
    public toSelectListAction(listAction: IDejaAction): void {
        if (listAction.type === 'single') {
            this.state.toggleSelectable(listAction.payload);
        } else if (listAction.type === 'double') {
            this.state.raiseOne(listAction.payload);
        }
    }

    // Deselect
    public selectedListAction(listAction: IDejaAction): void {
        if (listAction.type === 'single') {
            this.state.toggleSelected(listAction.payload);
        } else if (listAction.type === 'double') {
            this.state.dropOne(listAction.payload);
        }
    }

    // ActionBar
    public actionBarAction(listAction: IDejaAction): void {
        if (listAction.type) {
            this.state[listAction.type]();
        }
    }

}
