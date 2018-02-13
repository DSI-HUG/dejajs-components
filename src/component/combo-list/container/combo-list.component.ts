/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IDejaAction } from '../../../common/core/action.interface';
// import { IDejaComboListAction } from '../model/combo-list-action.interface';
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
    @Input() public disableFastActions = false;
    @Input() public sortDirection = null; // or 'asc' or 'desc'

    public toSelectTrigger: IDejaAction;
    public selectedTrigger: IDejaAction;

    constructor() {
        super();
        this.itemsToSelect = [];
    }

    public ngOnChanges() {
        this.sortAll();
    }

    // Select
    public toSelectListAction(listAction: IDejaAction): void {
        debugger;
        console.log('toSelectListAction', listAction);

        if (listAction.type === 'flush_buffer') {

            this.itemsToSelect = this.itemsToSelect.filter((item: T) => this.doSelect(item));

        } else if (listAction.type === 'double') {
            this.items.push(listAction.payload.currentItem);
        }
    }

    // public toSelectMove(type: 'move_buffer' | 'move_all') {
    //     const newAction: IDejaAction = {
    //         type,
    //         payload: Date.now()
    //     };
    //     this.toSelectTrigger = newAction;
    // }

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
        debugger;
        this.items = this.items.concat(this.itemsToSelect);
        this.onChangeCallback(this.items);
        this.itemsToSelect = [];
        this.emit('select_all');
        this.sort(this.items);
    }

    // Deselect
    public selectedListAction(listAction: IDejaAction): void {
        if (listAction.type === 'flush_buffer') {
            this.itemsToSelect.forEach((item: T) => this.doDeselect(item));
            // this.items = this.items.filter((item: T) => this.doDeselect(item));
        } else if (listAction.type === 'double') {
            this.items.push(listAction.payload.currentItem);
        }
    }

    // public selectedArrowClick() {
    //     console.log('deSelect');
    // }

    // public selectedMove(type: 'move_buffer' | 'move_all') {
    //     const newAction: IDejaAction = {
    //         type,
    //         payload: Date.now()
    //     };
    //     this.selectedTrigger = newAction;
    // }

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

    public onActionSelected(act: IDejaAction) {
        console.log('action', act);
        // tslint:disable-next-line:no-string-literal
        // this[act]();
        // this.trigger = act;
        if (act.payload === 'toSelect') {
            if (act.type === 'move_all') {
                this.selectAll();
            }
            this.toSelectTrigger = act;
        } else {
            this.selectedTrigger = act;
            if (act.type === 'move_all') {
                this.selectNone();
            }
        }
    }

    // public toSelectMove(type: 'move_buffer' | 'move_all') {
    //     const newAction: IDejaAction = {
    //         type,
    //         payload: Date.now()
    //     };
    //     this.toSelectTrigger = newAction;
    // }

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
    // 'selectAll' | 'toSelectArrowClick' | 'selectedArrowClick' | 'selectNone'
}
