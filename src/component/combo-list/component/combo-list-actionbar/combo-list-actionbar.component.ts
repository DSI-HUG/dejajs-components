/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDejaAction } from '../../../../common/core/action.interface';

@Component({
    selector: 'deja-combo-list-actionbar',
    templateUrl: './combo-list-actionbar.component.html',
    styleUrls: ['./combo-list-actionbar.component.scss']
})
export class DejaComboListActionbarComponent {

    private _disabled: boolean;
    private _disableFastActions: boolean;

    @Input()
    public set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }

    public get disabled() {
        return this._disabled;
    }

    @Input()
    public set disableFastActions(value: boolean) {
        this._disableFastActions = coerceBooleanProperty(value);
    }

    public get disableFastActions() {
        return this._disableFastActions;
    }

    @Output() public action = new EventEmitter<IDejaAction>();

    public emit(type: string) {
        const action: IDejaAction = {
            type,
        };
        this.action.emit(action);
    }

}
