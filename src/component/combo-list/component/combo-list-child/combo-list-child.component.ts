/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { MatSelectionListChange } from '@angular/material';
import { IDejaAction } from '../../../../common/core/action.interface';

@Component({
    selector: 'deja-combo-list-child',
    templateUrl: './combo-list-child.component.html',
    styleUrls: ['./combo-list-child.component.scss'],
})
export class DejaComboListChildComponent<T> {

    @Input() public items: Array<T>;
    @Input() public itemsBuffer: Array<T> = [];
    @Input() public labelFieldName: string;
    @Input() public disabled: boolean;
    @Output() public action = new EventEmitter<IDejaAction>();

    private lastClick = Date.now();
    private lastItem: T;

    public stateChange(event: MatSelectionListChange) {
        if (!this.disabled) {
            const item: T = event.option.value;
            const now = Date.now();
            if (now - this.lastClick < 300 && this.lastItem === item) {
                this.emit('double', item);
            } else {
                this.emit('single', item);
            }
            this.lastClick = now;
            this.lastItem = item;
        }
    }

    public getClass(item: T) {
        const classNames = [];

        if (this.disabled) {
            classNames.push('list-disabled');
        }

        if (!!this.itemsBuffer && this.itemsBuffer.some((i: T) => i === item)) {
            classNames.push('list-selected');
        }

        return classNames;
    }

    private emit(type: string, payload: T) {
        const action: IDejaAction = {
            type,
            payload,
        };
        this.action.emit(action);
    }

}
