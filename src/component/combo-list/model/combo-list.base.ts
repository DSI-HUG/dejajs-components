/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IDejaComboListAction } from '../model/combo-list-action.interface';
import { DejaComboListState } from './combo-list-state.class';

export abstract class DejaComboListBase<T> implements ControlValueAccessor {

    @Input() public set itemsSelected(aItem: T[]) {
        if (!!aItem && Array.isArray(aItem)) {
            this.state.selected = aItem;
        }
    }
    public get itemsSelected(): T[] {
        return this.state.selected;
    }

    @Input() public set itemsToSelect(aItem: T[]) {
        if (!!aItem && Array.isArray(aItem)) {
            this.state.selectable = aItem;
        }
    }

    @Input() public disableFastActions = false;

    @Input() public set labelFieldName(fieldName: string) {
        if (fieldName) {
            this.state.labelFieldName = fieldName;
            this.state.sortAll();
        }
    }
    public get labelFieldName(): string {
        return this.state.labelFieldName;
    }

    @Input() public set sortDirection(direction: null | 'asc' | 'desc') {
        this.state.sortDirection = direction || null;
        this.state.sortAll();
    }

    private _disabled = false;

    @Input()
    public set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }

    public get disabled() {
        return this._disabled;
    }

    @Output() public action = new EventEmitter<IDejaComboListAction<T>>();

    private _state: DejaComboListState<T>;
    public get state() {
        if (!this._state) {
            this._state = new DejaComboListState();
        }
        return this._state;
    }

    constructor() {
        this.itemsSelected = [];
        this.state.selectable = [];
        this.state.action = this.action;
    }

    // ************* ControlValueAccessor Implementation **************

    /** get accessor */
    public get value(): T[] {
        return this.itemsSelected;
    }

    /** From ControlValueAccessor interface */
    public writeValue(value: T[]): void {
        if (value !== this.itemsSelected) {
            this.itemsSelected = value;
            this.state.onChangeCallback(this.value);
            this.state.sortAll();
        }
    }

    /** From ControlValueAccessor interface */
    public registerOnChange(fn: any) {
        this.state.onChangeCallback = fn;
    }

    /** From ControlValueAccessor interface */
    public registerOnTouched(fn: any) {
        this.state.onTouchedCallback = fn;
    }

    // Allows Angular to disable the input.
    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // ************* End of ControlValueAccessor Implementation **************

}
