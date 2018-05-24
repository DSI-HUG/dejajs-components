/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDejaAction } from '../../../../common/core/action.interface';

@Component({
    selector: 'deja-combo-list-actionbar',
    templateUrl: './combo-list-actionbar.component.html',
    styleUrls: ['./combo-list-actionbar.component.scss']
})
export class DejaComboListActionbarComponent<T> {

    @Input() public disabled: boolean;
    @Input() public disableFastActions: boolean;

    @Output() public action = new EventEmitter<IDejaAction>();

    public emit(type: string) {
        const action: IDejaAction = {
            type,
        };
        this.action.emit(action);
    }

}
