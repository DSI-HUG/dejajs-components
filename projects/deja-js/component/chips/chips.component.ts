/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChild, EventEmitter, HostBinding, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

const noop = () => { };

export interface IDejaChipsComponentCloseEvent extends CustomEvent {
    item: any;
    index: number;
}

@Component({
    selector: 'deja-chips',
    styleUrls: [
        './chips.component.scss',
    ],
    templateUrl: './chips.component.html',
})
export class DejaChipsComponent implements ControlValueAccessor {
    /** Retourne ou definit la liste des éléments. */
    @Input() public _items: any[];

    /** Retourne ou definit le champ à utiliser comme texte. */
    @Input() public textField: string;

    /** Template d'élément si définit extérieurement au composant */
    @Input() public itemTemplateExternal: any;

    /** Template de control d'insertion si définit extérieurement au composant */
    @Input() public insertTemplateExternal: any;

    @Output() public close = new EventEmitter<IDejaChipsComponentCloseEvent>();

    protected onTouchedCallback: () => void = noop;
    protected onChangeCallback: (_: any) => void = noop;

    @HostBinding('attr.disabled') public _disabled: boolean = null;

    @ContentChild('itemTemplate') private itemTemplateInternal: any;

    @ContentChild('insertTemplate') private insertTemplateInternal: any;

    constructor(@Self() @Optional() public _control: NgControl) {
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }

    private _readonly = false;

    /** Lecture seule */
    @Input()
    public set readonly(value: boolean | string) {
        this._readonly = coerceBooleanProperty(value) || null;
    }

    public get readonly() {
        return this._readonly;
    }

    /** Retourne ou definit si le selecteur est desactivé. */
    @Input()
    public set disabled(value: boolean | string) {
        this._disabled = coerceBooleanProperty(value) || null;
    }

    public get disabled() {
        return this._disabled;
    }

    @Input()
    public set items(value: any[]) {
        this.writeValue(value);
    }

    public get items(): any[] {
        return this._items;
    }

    // ************* ControlValueAccessor Implementation **************
    // set accessor including call the onchange callback
    public set value(value: any[]) {
        this.writeValue(value);
        this.onChangeCallback(value);
    }

    // get accessor
    public get value(): any[] {
        return this._items;
    }

    // From ControlValueAccessor interface
    public writeValue(value: any[]) {
        this._items = value;
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
    // ************* End of ControlValueAccessor Implementation **************

    public get itemTemplate() {
        return this.itemTemplateExternal || this.itemTemplateInternal;
    }

    public get insertTemplate() {
        return this.insertTemplateExternal || this.insertTemplateInternal;
    }

    public getTextValue(value: any) {
        if (!value) {
            return '';
        } else {
            if (this.textField && value.model && value.model[this.textField] !== undefined) {
                return value.model[this.textField];
            } else if (this.textField && value[this.textField] !== undefined) {
                return value[this.textField];
            } else if (value.displayName) {
                return typeof value.displayName === 'string' ? value.displayName : value.displayName();
            } else if (typeof value.toString === 'function') {
                return value.toString();
            }
        }
    }

    public onClose(item: any, index: number) {
        const event = new CustomEvent('DejaChipsCloseEvent', {}) as IDejaChipsComponentCloseEvent;
        event.item = item;
        event.index = index;
        this.items.splice(index, 1);
        this.onChangeCallback(this.items);
        this.close.emit(event);
    }
}
