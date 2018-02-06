import { Component, EventEmitter, Input, Output } from '@angular/core';
import { element } from 'protractor';
import { IDejaAction } from '../../../common/core/action.interface';

@Component({
    selector: 'deja-combo-list',
    templateUrl: './combo-list.component.html',
    styleUrls: ['./combo-list.component.scss']
})
export class DejaComboListComponent<T> {

    private _itemsToSelect: T[];
    @Input() public set itemsToSelect(aItem: T[]) {
        this._itemsToSelect = aItem;
        this.checkMaxChar(aItem);
    }
    public get itemsToSelect(): T[] {
        return this._itemsToSelect;
    }

    private _itemsSelected: T[];
    @Input() public set itemsSelected(aItem: T[]) {
        this._itemsSelected = aItem;
        this.checkMaxChar(aItem);
    }
    public get itemsSelected(): T[] {
        return this._itemsSelected;
    }

    @Output() public action = new EventEmitter<IDejaComboListAction<T>>();

    public maxChar = 0;

    constructor() {
        this.init();
    }

    public selected(item: T) {
        const index = this._itemsToSelect.indexOf(item, 0);
        if (index > -1) {
            this._itemsSelected.unshift(this._itemsToSelect.splice(index, 1)[0]);
        }
    }

    public unselect(item: T) {
        const index = this._itemsSelected.indexOf(item, 0);
        if (index > -1) {
            this._itemsToSelect.unshift(this._itemsSelected.splice(index, 1)[0]);
        }
    }

    private init() {
        this.itemsSelected = [];
        this.itemsToSelect = [];
    }

    private checkMaxChar(aItem: T[]) {
        aItem.forEach((item: any) => {
            if (item.label.lenght > this.maxChar) {
                this.maxChar = item.label.lenght;
            }

        });
    }
}

export interface IDejaComboListAction<T> extends IDejaAction {
    payload: {
        currentItem?: T;
        selectedItems?: T[];
    };
}
