/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IDejaComboListAction } from '../model/combo-list-action.interface';
import { noop } from '../model/combo-list.accessor';
import { DejaComboListService } from '../service/combo-list.service';

export abstract class DejaComboListBase<T> implements ControlValueAccessor {

    @Input() public set items(aItem: T[]) {
        this.srv.selected = aItem;
    }
    public get items(): T[] {
        return this.srv.selected;
    }

    @Input() public set labelFieldName(fieldName: string) {
        if (fieldName) {
            this.srv.labelFieldName = fieldName;
            this.srv.sortAll();
        }
    }
    public get labelFieldName(): string {
        return this.srv.labelFieldName;
    }

    @Input() public set sortDirection(direction: null | 'asc' | 'desc') {
        this.srv.sortDirection = direction || null;
        this.srv.sortAll();
    }

    @Input() public disabled = false;

    @Output() public action = new EventEmitter<IDejaComboListAction<T>>();

    public onTouchedCallback: () => void = noop;

    public srv: DejaComboListService<T>;

    // public ngOnInit() {
    // this.srv.labelFieldName = 'label';
    // this.srv.sortDirection = 'asc';
    // }

    // ************* ControlValueAccessor Implementation **************

    /** get accessor */
    public get value(): T[] {
        return this.items;
    }

    /** From ControlValueAccessor interface */
    public writeValue(value: T[]): void {
        if (value !== this.items) {
            this.items = value;
            this.srv.onChangeCallback(this.value);
            this.srv.sortAll();
        }
    }

    /** From ControlValueAccessor interface */
    public registerOnChange(fn: any) {
        this.srv.onChangeCallback = fn;
    }

    /** From ControlValueAccessor interface */
    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    // Allows Angular to disable the input.
    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // ************* End of ControlValueAccessor Implementation **************

    protected emit(type: string, currentItem: T = null, selectedItems = this.items) {
        const action: IDejaComboListAction<T> = {
            type,
            payload: {
                currentItem,
                selectedItems,
            }
        };
        this.action.emit(action);
    }

}
