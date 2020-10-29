/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChild, EventEmitter, HostBinding, Input, Optional, Output, Self, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NgControl } from '@angular/forms';

import { IDejaChipsComponentCloseEvent } from './chips-close.event';

@Component({
    selector: 'deja-chips',
    styleUrls: [
        './chips.component.scss'
    ],
    templateUrl: './chips.component.html'
})
export class DejaChipsComponent implements ControlValueAccessor {
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() public readonly close = new EventEmitter<IDejaChipsComponentCloseEvent>();

    /** Retourne ou definit la liste des éléments. */
    @Input() public _items: unknown[];

    /** Retourne ou definit le champ à utiliser comme texte. */
    @Input() public textField: string;

    /** Template d'élément si définit extérieurement au composant */
    @Input() public itemTemplateExternal: TemplateRef<unknown>;

    /** Template de control d'insertion si définit extérieurement au composant */
    @Input() public insertTemplateExternal: TemplateRef<unknown>;

    @HostBinding('attr.disabled') public _disabled: boolean = null;

    @ContentChild('itemTemplate') private itemTemplateInternal: TemplateRef<unknown>;

    @ContentChild('insertTemplate') private insertTemplateInternal: TemplateRef<unknown>;

    private _readonly = false;

    public constructor(@Self() @Optional() public control: NgControl) {
        if (this.control) {
            this.control.valueAccessor = this;
        }
    }

    /** Lecture seule */
    @Input()
    public set readonly(value: BooleanInput) {
        this._readonly = coerceBooleanProperty(value) || null;
    }

    public get readonly() {
        return this._readonly;
    }

    /** Retourne ou definit si le selecteur est desactivé. */
    @Input()
    public set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value) || null;
    }

    public get disabled() {
        return this._disabled;
    }

    @Input()
    public set items(value: unknown[]) {
        this.writeValue(value);
    }

    public get items(): unknown[] {
        return this._items;
    }

    public get itemTemplate() {
        return this.itemTemplateExternal || this.itemTemplateInternal;
    }

    public get insertTemplate() {
        return this.insertTemplateExternal || this.insertTemplateInternal;
    }

    // ************* ControlValueAccessor Implementation **************
    // set accessor including call the onchange callback
    public set value(value: unknown[]) {
        this.writeValue(value);
        this.onChangeCallback(value);
    }

    // get accessor
    public get value(): unknown[] {
        return this._items;
    }

    // From ControlValueAccessor interface
    public writeValue(value: unknown[]) {
        this._items = value;
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn: (_a: unknown) => void) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn: () => void) {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
    // ************* End of ControlValueAccessor Implementation **************

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public getTextValue(value: any) {
        if (!value) {
            return '';
        } else if (this.textField && value.model && value.model[this.textField] !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return value.model[this.textField];
        } else if (this.textField && value[this.textField] !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return value[this.textField];
        } else if (value.displayName) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return typeof value.displayName === 'string' ? value.displayName : value.displayName();
        } else if (typeof value.toString === 'function') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return value.toString();
        } else {
            return '';
        }
    }

    public onClose(closeEvent: Event, item: unknown, index: number): boolean {
        const newEvent = new CustomEvent('DejaChipsCloseEvent', {}) as IDejaChipsComponentCloseEvent;
        newEvent.item = item;
        newEvent.index = index;
        this.items.splice(index, 1);
        this.onChangeCallback(this.items);
        this.close.emit(newEvent);
        closeEvent.stopPropagation();
        return false;
    }

    protected onChangeCallback = (_a: unknown) => undefined as void;
    protected onTouchedCallback = () => undefined as void;
}
