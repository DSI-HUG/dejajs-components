/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDejaAction } from '../../../common/core/action.interface';
import { DejaComboListBase } from '../model/combo-list.base';

@Component({
    selector: 'deja-combo-list',
    templateUrl: './combo-list.component.html',
    styleUrls: ['./combo-list.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: DejaComboListComponent,
        multi: true,
    }],
})
export class DejaComboListComponent<T> extends DejaComboListBase<T> implements ControlValueAccessor {

    // Select
    public toSelectListAction(listAction: IDejaAction): void {
        this.doAction(listAction, 'toggleSelectable', 'raiseOne');
    }

    // Deselect
    public selectedListAction(listAction: IDejaAction): void {
        this.doAction(listAction, 'toggleSelected', 'dropOne');
    }

    // ActionBar
    public actionBarAction(listAction: IDejaAction): void {
        if (listAction.type) {
            this.state[listAction.type]();
        }
    }

    // action launcher
    private doAction(listAction: IDejaAction, singleAction: string, doubleAction: string) {
        if (listAction.type === 'single') {
            this.state[singleAction](listAction.payload);
        } else if (listAction.type === 'double') {
            this.state[doubleAction](listAction.payload);
        }

    }
}
