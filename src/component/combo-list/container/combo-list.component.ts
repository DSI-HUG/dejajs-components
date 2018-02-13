/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IDejaComboListAction } from '../model/combo-list-action.interface';
import { valueAccessorFactory } from '../model/combo-list.accessor';
import { DejaComboListBase } from '../model/combo-list.base';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-combo-list',
    templateUrl: './combo-list.component.html',
    styleUrls: ['./combo-list.component.scss'],
    providers: [valueAccessorFactory(DejaComboListComponent)]
})
export class DejaComboListComponent<T> extends DejaComboListBase<T> implements OnChanges, ControlValueAccessor {

    @Input() public itemsToSelect: T[];
    @Input() public itemsSelectBuffer: T[];
    @Input() public disableFastActions = false;
    @Input() public sortDirection = null; // or 'asc' or 'desc'

    constructor() {
        super();
        this.itemsToSelect = [];
        this.itemsSelectBuffer = [];
    }

    public ngOnChanges() {
        this.sortAll();
    }

    // Select
    public toSelectListClick(listAction: IDejaComboListAction<T>): void {
        if (listAction.type === 'single') {
            this.itemsSelectBuffer.push(listAction.payload.currentItem);
        } else if (listAction.type === 'double') {
            this.itemsSelectBuffer.push(listAction.payload.currentItem);
        }
    }

    public toSelectArrowClick() {
        console.log('Select');
        this.itemsSelectBuffer = this.itemsSelectBuffer.filter((item: T) => this.doSelect(item));
    }

    public doSelect(item: T): boolean {
        const index = this.itemsToSelect.indexOf(item, 0);
        if (index > -1) {
            this.items.unshift(this.itemsToSelect.splice(index, 1)[0]);
            this.onChangeCallback(this.items);
            this.emit('select', item);
            this.sortAll();
            return false;
        }
        return true;
    }

    public selectAll() {
        this.items = this.items.concat(this.itemsToSelect);
        this.onChangeCallback(this.items);
        this.itemsToSelect = [];
        this.emit('select_all');
        this.sort(this.items);
    }

    // Deselect

    public selectedListClick(item: T): void {
        this.itemsSelectBuffer.push(item);
    }

    public selectedArrowClick() {
        console.log('deSelect');
        this.itemsSelectBuffer = this.itemsSelectBuffer.filter((item: T) => this.doDeselect(item));
    }

    public doDeselect(item: T): boolean {
        const index = this.items.indexOf(item, 0);
        if (index > -1) {
            this.itemsToSelect.unshift(this.items.splice(index, 1)[0]);
            this.onChangeCallback(this.items);
            this.emit('deselect', item);
            this.sortAll();
            return false;
        }
        return true;
    }

    public selectNone() {
        this.itemsToSelect = this.itemsToSelect.concat(this.items);
        this.items = [];
        this.onChangeCallback(this.items);
        this.emit('select_none');
        this.sort(this.itemsToSelect);
    }

    // from actionBar

    public onActionSelected(act: any) {
        console.log('action', act);
        // tslint:disable-next-line:no-string-literal
        this[act]();
    }

    protected sortAll() {
        this.sort(this.items);
        this.sort(this.itemsToSelect);
    }

    private sort(aItem: T[]): T[] {
        if (!this.sortDirection) {
            return aItem;
        }
        const fieldname = this.labelFieldName;
        const coeff = this.sortDirection === 'asc' ? 1 : -1;
        return aItem.sort((a, b) => {
            if (a[fieldname] < b[fieldname]) { return -1 * coeff; }
            if (a[fieldname] > b[fieldname]) { return 1 * coeff; }
            return 0;
        });
    }

    // private destroyEle;
}
