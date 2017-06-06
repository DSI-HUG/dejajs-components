/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { KeyCodes } from '../../common/core/keycodes.enum';
import { DejaChildValidatorDirective } from '../../common/core/validation/child-validator.directive';
import { DaysOfWeek, DejaDateSelectorComponent } from '../date-selector/date-selector.component';
import { formatToMask } from './format-to-mask';

import * as moment_ from 'moment';
const moment: (value?: any, format?: string) => moment_.Moment = (<any>moment_).default || moment_;

const noop = () => { };

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'deja-date-picker',
    styleUrls: ['./date-picker.component.scss'],
    templateUrl: './date-picker.component.html',
})
export class DejaDatePickerComponent implements OnInit, ControlValueAccessor, AfterContentInit, OnDestroy {
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
    protected mask: any[];

    @ViewChild(DejaChildValidatorDirective) private inputValidatorDirective: DejaChildValidatorDirective;

    private subscriptions = [] as Subscription[];
    private _disabled: boolean;
    private _time: boolean;
    private inputElement$ = new ReplaySubject<HTMLElement>(1);
    private focus$ = new Subject();
    private _showDropDown = false;

    private date = new Date();

    private inputModel;

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    @ViewChild('inputelement')
    private set inputElementRef(element: ElementRef) {
        if (element) {
            this.inputElement$.next(element.nativeElement);
        }
    }

    constructor(private elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef, @Self() @Optional() public _control: NgControl, @Optional() private _parentForm: NgForm, @Optional() private _parentFormGroup: FormGroupDirective) {
        if (this._control) {
            this._control.valueAccessor = this;
        }

        if (this._parentForm) {
            this._parentForm.ngSubmit.subscribe(() => {
                this.changeDetectorRef.markForCheck();
            });
        }

        if (this._parentFormGroup) {
            this._parentFormGroup.ngSubmit.subscribe(() => {
                this.changeDetectorRef.markForCheck();
            });
        }

        const keydown$ = Observable.from(this.inputElement$)
            .switchMap((element) => Observable.fromEvent(element, 'keydown'));

        this.subscriptions.push(keydown$
            .filter((event: KeyboardEvent) => !this.showDropDown && (event.keyCode === KeyCodes.KeyD || event.keyCode === KeyCodes.UpArrow || event.keyCode === KeyCodes.DownArrow))
            .subscribe((event: KeyboardEvent) => {
                event.preventDefault();
                switch (event.keyCode) {
                    case (KeyCodes.KeyD):
                        this.value = new Date();
                        break;

                    case (KeyCodes.UpArrow):
                        if (event.altKey) {
                            this.showDropDown = true;
                        } else if (this.date) {
                            const d = new Date(this.date);
                            d.setDate(this.date.getDate() + 1);
                            this.value = d;
                        }
                        break;
                    case (KeyCodes.DownArrow):
                        if (event.altKey) {
                            this.showDropDown = true;
                        } else if (this.date) {
                            const d = new Date(this.date);
                            d.setDate(this.date.getDate() - 1);
                            this.value = d;
                        }
                        break;
                    default:
                        break;
                }
            }));

        this.subscriptions.push(keydown$
            .filter(() => this.showDropDown)
            .subscribe((event: KeyboardEvent) => {
                switch (event.keyCode) {
                    case (KeyCodes.Escape):
                        this.showDropDown = false;
                        break;

                    default:
                        this.dateSelectorComponent.keyDown(event);

                }
            }));

        this.subscriptions.push(Observable.combineLatest(this.inputElement$, this.focus$)
            .subscribe(([element]) => element.focus()));
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    public ngOnInit() {
        const formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

        if (!this.format) {
            this.format = 'YYYY-MM-DD' + ((this.time) ? ' HH:mm' : '');
        }

        let mask = [];
        const array = this.format.match(formattingTokens);
        array.forEach((val: string) => {
            if (formatToMask[val]) {
                mask = [...mask, ...formatToMask[val]];
            } else {
                mask.push(val);
            }
        });

        this.mask = mask;
    }

    private get containerElement() {
        return this.dropdownContainerId && this.elementRef.nativeElement.ownerDocument.getElementById(this.dropdownContainerId);
    }

    private set showDropDown(value: boolean) {
        this._showDropDown = value;
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

    public ngAfterContentInit() {
        if (this.inputValidatorDirective) {
            this.inputValidatorDirective.parentControl = this._control;
        }
    }

    public setFocus() {
        this.focus$.next();
    }

    protected toggleDateSelector(event: Event) {
        if (this.disabled) {
            return;
        }

        const target = event.currentTarget as HTMLElement;
        if (target.id !== 'calendar-button') {
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
        if (typeof date === 'string' && date.replace(/_/g, '').length === this.format.length) {
            let d = moment(date, this.format).toDate();
            if (!moment(d).isValid()) {
                d = new Date();
            }
            date = d;
        }

        if (typeof date !== 'string') {
            this.value = date;
        }
    }

    protected reset() {
        this.value = undefined;
        delete this.inputModel;
        this.onChangeCallback(this.value);
        this.close();
    }
}
