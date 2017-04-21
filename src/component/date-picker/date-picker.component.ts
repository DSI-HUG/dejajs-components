/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs/Rx';
import { DaysOfWeek, DejaDateSelectorComponent } from '../date-selector';

const noop = () => { };

const DejaDatePickerComponentValueAccessor = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DejaDatePickerComponent),
};

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
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
    @Input() public placeholder = 'Date';
    @Input() public disableDates: Array<DaysOfWeek | Date>; // | ((d: Date) => boolean);
    @ViewChild(DejaDateSelectorComponent) public dateSelectorComponent: DejaDateSelectorComponent;
    @Output() public dateChange = new EventEmitter();
    @ContentChild('hintTemplate') protected mdHint;
    @ViewChild('inputelement') private inputElementRef: ElementRef;

    private _showDropDown = false;
    private keyDownSubscription: Subscription;
    private _disabled: boolean;
    private _time: boolean;

    private date = new Date();

    private inputModel;

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor(private elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) { }

    public ngOnInit() { }

    private get containerElement() {
        return this.dropdownContainerId && this.elementRef.nativeElement.ownerDocument.getElementById(this.dropdownContainerId);
    }

    private set showDropDown(value: boolean) {
        if (value !== this._showDropDown) {
            this._showDropDown = value;
            if (value) {
                const inputElement = this.inputElementRef.nativeElement as HTMLElement;
                this.keyDownSubscription = Observable
                    .fromEvent(inputElement, 'keydown')
                    .subscribe((event: KeyboardEvent) => {
                        this.dateSelectorComponent.keyDown(event);
                        this.setFocus();
                });
            } else {
                if (this.keyDownSubscription) {
                    this.keyDownSubscription.unsubscribe();
                    delete this.keyDownSubscription;
                }
            }
        }

        this.changeDetectorRef.markForCheck();
    }

    private get showDropDown() {
        return this._showDropDown;
    }

    @Input()
    public set disabled(value: boolean | string) {
        this._disabled = (value != null && `${value}` !== 'false') ? true : null;
        this.changeDetectorRef.markForCheck();
    }

    public get disabled() {
        return this._disabled;
    }

    @Input()
    public set time(value: boolean | string) {
        this._time = (value != null && `${value}` !== 'false') ? true : null;
        this.changeDetectorRef.markForCheck();
    }

    public get time() {
        return this._time;
    }

    public close() {
        this.showDropDown = false;
    }

    public open() {
        this.showDropDown = true;
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
            this.changeDetectorRef.markForCheck();
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

    public setFocus() {
        const inputElement = this.inputElementRef.nativeElement as HTMLElement;
        inputElement.focus();
    }

    protected toggleDateSelector(event: Event) {
        if (this.disabled) {
            return;
        }

        const target = event.currentTarget as HTMLElement;
        if (target.id !== 'date-selector-input') {
            return;
        }

        this.showDropDown = !this.showDropDown;
        return false;
    }

    protected onDateChange(newDate: Date) {
        this.value = newDate;
        // TODO
        // if (this.value.getHours() === newDate.getHours() && this.value.getMinutes() === newDate.getMinutes() && this.value.getSeconds() === newDate.getSeconds()) {
        //     this.setFocus();
        // }
    }

    protected updateModel(date: string | Date) {
        if (typeof date === 'string') {
            let d = new Date(date);
            if (!moment(d).isValid()) {
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
