/*
*  @license
*  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
*
*  Use of this source code is governed by an Apache-2.0 license that can be
*  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
*/
import {
    Component,
    // Input,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { valueAccessorFactory } from '../../model/combo-list.accessor';
import { DejaComboListBase } from '../../model/combo-list.base';

@Component({
    selector: 'deja-combo-list-child',
    templateUrl: './combo-list-child.component.html',
    styleUrls: ['./combo-list-child.component.scss'],
    providers: [valueAccessorFactory(DejaComboListChildComponent)]
})
export class DejaComboListChildComponent<T> extends DejaComboListBase<T> implements ControlValueAccessor {

    public itemsSelectBuffer: Array<T> = [];
    private lastClick = Date.now();

    public toggleItem(item: T) {
        const now = Date.now();

        if (this.disabled) {
            return;
        }
        if (now - this.lastClick < 300) {
            this.emit('double', item);
        } else {
            this.emit('single', item);
            this.bufferToggle(item);
        }
        this.lastClick = now;
    }

    public getClass(item: T) {
        const classNames = [];

        if (this.disabled) {
            classNames.push('list-disabled');
        }

        if (this.itemsSelectBuffer.includes(item)) {
            classNames.push('list-selected');
        }

        return classNames;
    }

    private bufferToggle(item: T) {
        const index = this.itemsSelectBuffer.indexOf(item, 0);
        if (index > -1) {
            this.itemsSelectBuffer.splice(index, 1);
        } else {
            this.itemsSelectBuffer.push(item);
        }
    }

}
