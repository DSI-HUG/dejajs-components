/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IDejaAction } from '../../../common/core/action.interface';
import { IDejaComboListAction } from '../model/combo-list-action.interface';
import { noop } from '../model/combo-list.accessor';

export abstract class DejaComboListBase<T> implements ControlValueAccessor {

    @Input() public items: T[];
    @Input() public disabled = false;
    @Input() public labelFieldName = 'label';
    @Output() public action = new EventEmitter<IDejaAction>();

    public onTouchedCallback: () => void = noop;
    public onChangeCallback: (_: any) => void = noop;

    constructor() {
        this.items = [];
    }

    // ************* ControlValueAccessor Implementation **************

    /** get accessor */
    public get value(): T[] {
        return this.items;
    }

    /** From ControlValueAccessor interface */
    public writeValue(value: T[]): void {
        if (value !== this.items) {
            this.items = value;
            this.onChangeCallback(this.value);
            this.sortAll();
        }
    }

    /** From ControlValueAccessor interface */
    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
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

    protected sortAll() { }
}
