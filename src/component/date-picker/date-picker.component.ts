/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { Component, ContentChild, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';
import { DaysOfWeek, DejaDateSelectorComponent } from '../date-selector';

const noop = () => { };

const DejaDatePickerComponentValueAccessor = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DejaDatePickerComponent),
};

@Component({
    encapsulation: ViewEncapsulation.None,
    providers: [DejaDatePickerComponentValueAccessor],
    selector: 'deja-date-picker',
    styleUrls: ['./date-picker.component.scss'],
    templateUrl: './date-picker.component.html',
})
export class DejaDatePickerComponent implements OnInit {
    @Input() public dateMax: Date;
    @Input() public dateMin: Date;
    @Input() public dropdownContainerId: string;
    @Input() public dropdownAlignment = 'left right top bottom';
    @Input() public ownerAlignment = 'left bottom';
    @Input() public format: string;
    @Input() public placeholder: string = 'Date';
    @Input() public disableDates: Array<DaysOfWeek | Date>; // | ((d: Date) => boolean);
    @ViewChild(DejaDateSelectorComponent) public dateSelectorComponent: DejaDateSelectorComponent;
    @Output() public dateChange = new EventEmitter();
    @ContentChild('hintTemplate') protected mdHint;
    @ViewChild('inputelement') private inputElementRef: ElementRef;


    private _useDropDown = false;
    private keydown: Observable<{}>;
    private keyDownSubscription: Subscription;
    private _disabled: boolean = false;
    private _time: boolean = false;

    private date = new Date();

    private inputModel;

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor(private elementRef: ElementRef) { }

    public ngOnInit() { }

    private get containerElement() {
        return this.dropdownContainerId && this.elementRef.nativeElement.ownerDocument.getElementById(this.dropdownContainerId);
    }

    private set useDropDown(value: boolean) {
        if (value !== this._useDropDown) {
            this._useDropDown = value;
            if (value) {
                this.keydown = Observable.fromEvent(this.inputElementRef.nativeElement, 'keydown');
                this.keyDownSubscription = this.keydown.subscribe(() => {
                    this.dateSelectorComponent.keyboardNavigation = false;
                });
            } else {
                if (this.keyDownSubscription) {
                    this.keyDownSubscription.unsubscribe();
                    delete this.keyDownSubscription;
                }
            }
        }
    }

    private get useDropDown() {
        return this._useDropDown;
    }

    @Input()
    public set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }

    public get disabled() {
        return this._disabled;
    }

    @Input()
    public set time(value: boolean) {
        this._time = coerceBooleanProperty(value);
    }

    public get time() {
        return this._time;
    }

    public close() {
        this.useDropDown = false;
    }

    public open() {
        this.useDropDown = true;
    }

    // set accessor including call the onchange callback
    public set value(v: Date) {
        if (v !== this.date) {
            this.writeValue(v);
            this.onChangeCallback(v);
        }
    }

    // ************* ControlValueAccessor Implementation **************
    // get accessor
    public get value(): Date {
        return this.date;
    }

    // From ControlValueAccessor interface
    public writeValue(value: Date) {
        if (value !== this.date) {
            this.date = value;
            this.inputModel = (this.format && this.date) ? moment(this.date).format(this.format) : (this.date) ? this.date.toLocaleString() : null;
        }
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    // ************* End of ControlValueAccessor Implementation **************

    protected toggleDateSelector(event: Event) {
        if (this.disabled) {
            return;
        }

        let target = event.currentTarget as HTMLElement;
        if (target.id !== 'deja-date-selector-input') {
            return;
        }

        this.useDropDown = !this.useDropDown;
        return false;
    }

    protected onDateChange(event: Date) {
        this.value = event;
    }

    protected updateModel(date: string | Date) {
        if (typeof date === 'string') {
            let d = new Date(date);
            if (!moment(d).isValid()) {
                // TODO : eventually throw error
                d = new Date();
            }
            date = d;
        }

        if (this.date.toLocaleTimeString() !== date.toLocaleTimeString()) {
            date.setHours(this.date.getHours(), this.date.getMinutes(), this.date.getSeconds());
        }
        this.value = date;
        this.close();
    }

    protected reset() {
        this.value = undefined;
        delete this.inputModel;
        this.onChangeCallback(this.value);
        this.close();
    }
}
