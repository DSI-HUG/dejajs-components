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
    Output,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IDejaAction } from '../../../../common/core/action.interface';
import { valueAccessorFactory } from '../../model/combo-list.accessor';
import { DejaComboListBase } from '../../model/combo-list.base';

@Component({
    selector: 'deja-combo-list-child',
    templateUrl: './combo-list-child.component.html',
    styleUrls: ['./combo-list-child.component.scss'],
    providers: [valueAccessorFactory(DejaComboListChildComponent)]
})
export class DejaComboListChildComponent<T> extends DejaComboListBase<T> implements ControlValueAccessor {
    @Input() public set trigger(a: IDejaAction) {
        console.log('set trigger', a);
        if (!a) {
            return;
        }
        if (a.type === 'move_buffer') {
            this.emit('flush_buffer', null, this.itemsBuffer.concat([]));
        }
        this.itemsBuffer = [];
    }
    @Input() public labelFieldName: string;
    @Input() public disabled: boolean;
    @Output() public action = new EventEmitter<IDejaAction>();

    public itemsBuffer: Array<T> = [];
    private lastClick = Date.now();

    public onClick(item: T) {
        const now = Date.now();
        if (this.disabled) {
            return;
        }
        if (now - this.lastClick < 300) {
            this.toggleItem(item, false);
            this.emit('double', item);
        } else {
            this.toggleItem(item);
        }
        this.lastClick = now;
    }

    public getClass(item: T) {
        const classNames = [];

        if (this.disabled) {
            classNames.push('list-disabled');
        }

        if (this.itemsBuffer.includes(item)) {
            classNames.push('list-selected');
        }

        return classNames;
    }

    private toggleItem(item: T, add = true) {
        const index = this.itemsBuffer.indexOf(item, 0);
        if (index > -1) {
            this.itemsBuffer.splice(index, 1);
        } else if (add) {
            this.itemsBuffer.push(item);
        }
    }

}
