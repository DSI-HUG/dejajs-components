/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, HostBinding, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { KeyCodes } from '@deja-js/core';

/**
 * Deja Tag Component for Angular
 *
 * This component allow you to manage element into an array of string
 */
@Component({
    selector: 'deja-tag',
    templateUrl: 'tag.component.html',
    styleUrls: ['tag.component.scss'],
})
export class DejaTagComponent implements ControlValueAccessor {

    /**
     * Current value into the input
     */
    public text = '';

    /**
     * Current value of the array of string
     */
    public items: string[] = [];

    /**
     * Placeholder of the input
     */
    @Input() public placeholder: string;

    /** Allow to disabled the component */
    @Input()
    public set disabled(value: boolean | string) {
        const disabled = coerceBooleanProperty(value);
        this._disabled = disabled || null;
    }

    /**
     * Get disable value
     */
    public get disabled() {
        return this._control ? this._control.disabled : this._disabled;
    }

    @HostBinding('attr.disabled') public _disabled: boolean = null;

    // NgModel implementation
    protected onTouchedCallback = (_a?: any) => { };
    protected onChangeCallback = (_a?: any) => { };
    protected onValidatorChangeCallback = (_a?: any) => { };

    constructor(@Self() @Optional() public _control: NgControl) {
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }

    // ************* ControlValueAccessor Implementation **************
    public get value() {
        return this.items;
    }

    public set value(val) {
        this.writeValue(val);
        this.onChangeCallback(val);
        this.onTouchedCallback();
    }

    public writeValue(value: string[]) {
        this.items = value ? value : [];
    }

    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
    // ************* End of ControlValueAccessor Implementation **************

    /**
     * Trigerred when user press key into the component
     */
    public onKeyDown(e: KeyboardEvent) {
        if (e.code === KeyCodes.Enter) {
            const target = e.target as HTMLInputElement;
            this.onAddItem(target.value);
        }
    }

    /**
     * Add item into the the list
     * @param val : Value of the text to add
     */
    public onAddItem(val: string) {
        if (val) {
            this.items.push(val);
            this.value = this.items;
            this.text = '';
        }
    }

    public onRemoveItem() {
        this.onChangeCallback(this.value);
    }
}
