/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { DateComponentLayout, DaysOfWeek, DejaDateSelectorComponent } from '../date-selector/date-selector.component';
import { formatToMask, formatToUnitOfTime } from './format-to-mask';

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as moment_ from 'moment';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { KeyCodes } from '../../common/core/keycodes.enum';
import { DejaConnectionPositionPair } from '../../common/core/overlay/connection-position-pair';
import { DejaChildValidatorDirective } from '../../common/core/validation/child-validator.directive';

const moment: (value?: any, format?: string) => moment_.Moment = (<any>moment_).default || moment_;

const noop = () => { };

/**
 * Date-picker component for Angular
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-date-picker',
    styleUrls: ['./date-picker.component.scss'],
    templateUrl: './date-picker.component.html',
})
export class DejaDatePickerComponent implements OnInit, ControlValueAccessor, AfterContentInit, OnDestroy {
    private static formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    public _layout: number | string;

    /** Maximum date avaliable inside date-picker */
    @Input() public dateMax: Date;
    /** Minimum date avaliable inside date-picker */
    @Input() public dateMin: Date;
    /** Date format. If unset, format will be 'YYYY-MM-DD' + ' HH:mm' it's a date-time selector */
    @Input() public set format(format: string) {
        this._format = format;
        this.formatChanged$.next(format);
    }
    public get format(): string {
        return this._format;
    }
    /** Placeholder for input */
    @Input() public placeholder = 'Date';
    /** Disabled dates. It's an array of DaysOfWeek (number between 0 and 6) or a date. */
    @Input() public disableDates: Array<DaysOfWeek | Date>; // | ((d: Date) => boolean);
    /** Reference to DejaDateSelectorComponent inside thic control */
    @ViewChild(DejaDateSelectorComponent) public dateSelectorComponent: DejaDateSelectorComponent;
    /** Template for MatHint inside mat-form-field-container */
    @ContentChild('hintTemplate') public matHint: any;
    /** Template for MatError inside mat-form-field-container */
    @ContentChild('errorTemplate') public matError: any;
    /** Offset de position horizontal de la zone de dropdown */
    @Input() public overlayOffsetX = 0;
    /** Offset de position verticale de la zone de dropdown */
    @Input() public overlayOffsetY = 6;
    /** Afficher un bouton raccourcis permettant de sélectionner la date courante */
    @Input() public showCurrentDateButton = false;

    @Output() public dateChange = new EventEmitter();
    @Output() public timeChange = new EventEmitter();

    /** Mask for input */
    protected _mask: any[];

    public get mask() {
        return this._mask;
    }

    public onTouchedCallback: () => void = noop;
    public onChangeCallback: (_: any) => void = noop;

    /** Internal use */
    public overlayOwnerElement: HTMLElement;
    public date = new Date();

    @ViewChild(DejaChildValidatorDirective) private inputValidatorDirective: DejaChildValidatorDirective;

    private isAlive = true;
    private _disabled: boolean;
    private _required: boolean;
    private _time: boolean;
    private _format: string;
    private inputElement$ = new ReplaySubject<HTMLElement>(1);
    private inputElement: HTMLElement;
    private focus$ = new Subject();
    private _showDropDown = false;
    private _positions = DejaConnectionPositionPair.default;

    private _inputModel: string;
    private cursorPosition: number;
    private formatChanged$ = new Subject<string>();
    private dateChanged$ = new Subject<Date>();

    @ViewChild('inputelement')
    public set inputElementRef(element: ElementRef) {
        if (element) {
            this.inputElement = element.nativeElement;
            if (this.inputElement) {
                this.overlayOwnerElement = this.inputElement;
            } else {
                this.overlayOwnerElement = this.elementRef.nativeElement;
            }
            this.inputElement$.next(this.inputElement);
        } else {
            this.overlayOwnerElement = this.elementRef.nativeElement;
        }
    }

    public get inputModel() {
        return this._inputModel;
    }

    @Input()
    public set positions(value: DejaConnectionPositionPair[] | string) {
        this._positions = typeof value === 'string' ? DejaConnectionPositionPair.parse(value) : value;
    }

    public get positions() {
        return this._positions;
    }

    /**
     * Constructor
     * subscribe on fifferent events needed inside this component
     */
    constructor(private elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef, @Self() @Optional() public _control: NgControl, @Optional() private _parentForm: NgForm, @Optional() private _parentFormGroup: FormGroupDirective) {
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this.overlayOwnerElement = this.elementRef.nativeElement;

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

        const cursorChanged$ = Observable.from(this.inputElement$)
            .switchMap((element: HTMLInputElement) => {
                return Observable.merge(Observable.fromEvent(element, 'mouseup'), Observable.fromEvent(element, 'focus'), Observable.fromEvent(element, 'keyup'))
                    .map(() => {
                        return element.selectionStart;
                    });
            });

        cursorChanged$.takeWhile(() => this.isAlive)
            .subscribe((position: number) => {
                this.cursorPosition = position;
            });

        keydown$.takeWhile(() => this.isAlive)
            .filter((event: KeyboardEvent) => !this.showDropDown && (event.keyCode === KeyCodes.KeyD || event.keyCode === KeyCodes.UpArrow || event.keyCode === KeyCodes.DownArrow))
            .subscribe((event: KeyboardEvent) => {
                event.preventDefault();
                switch (event.keyCode) {
                    case (KeyCodes.KeyD):
                        this.value = new Date();
                        break;

                    case (KeyCodes.UpArrow):
                        if (event.altKey) {
                            this.open();
                        } else if (this.date) {
                            // If cursor is on number, we can update it
                            if (!isNaN(+this._inputModel[this.cursorPosition - 1])) {
                                // We get an array of all sections of the date format
                                const format = this._format.match(DejaDatePickerComponent.formattingTokens);
                                // We check the letter of the format at cursor position
                                const f = this._format[this.cursorPosition - 1];
                                // With this letter we determinate the format by checking on format array
                                let unitOfTime = format.find((str) => str.indexOf(f) !== -1);
                                // If this format has a corresponding value inside formatToUnitOfTime object we can increment its value with moment.add() method
                                unitOfTime = (unitOfTime && formatToUnitOfTime[unitOfTime]) ? formatToUnitOfTime[unitOfTime] : undefined;
                                if (unitOfTime) {
                                    this.updateModel(moment(this.value).add(1, unitOfTime as moment_.unitOfTime.DurationConstructor).toDate());
                                }
                            }
                        }
                        break;
                    case (KeyCodes.DownArrow):
                        if (event.altKey) {
                            this.open();
                        } else if (this.date) {
                            // Same as arrowUp
                            if (!isNaN(+this._inputModel[this.cursorPosition - 1])) {
                                const format = this._format.match(DejaDatePickerComponent.formattingTokens);
                                const f = this._format[this.cursorPosition - 1];

                                let unitOfTime = format.find((str) => str.indexOf(f) !== -1);
                                unitOfTime = (unitOfTime && formatToUnitOfTime[unitOfTime]) ? formatToUnitOfTime[unitOfTime] : undefined;
                                if (unitOfTime) {
                                    this.updateModel(moment(this.value).subtract(1, unitOfTime as moment_.unitOfTime.DurationConstructor).toDate());
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            });

        const valueUpdated$ = Observable.combineLatest(this.formatChanged$, this.dateChanged$)
            .do(([format]) => {
                let mask = [] as string[];
                const array = format.match(DejaDatePickerComponent.formattingTokens);
                array.forEach((val: string) => {
                    if (formatToMask[val]) {
                        mask = [...mask, ...formatToMask[val]];
                    } else {
                        mask.push(val);
                    }
                });

                this._mask = mask;
            });

        valueUpdated$.takeWhile(() => this.isAlive)
            .subscribe(([format, value]) => {
                this.date = value;
                this._inputModel = (this.date) ? moment(this.date).format(format) : null;

                // si la position du curseur était stockée, on la restaure apres avoir changé la valeur
                if (this.cursorPosition) {
                    this.inputElement$
                        .delay(1)
                        .first()
                        .subscribe((elem: HTMLInputElement) => elem.setSelectionRange(this.cursorPosition, this.cursorPosition));
                }
                this.changeDetectorRef.markForCheck();
            });

        keydown$.takeWhile(() => this.isAlive)
            .filter(() => this.showDropDown)
            .subscribe((event: KeyboardEvent) => {
                switch (event.keyCode) {
                    case (KeyCodes.Escape):
                        this.close();
                        break;

                    default:
                        this.dateSelectorComponent.keyDown(event);

                }
            });

        Observable.combineLatest(this.inputElement$, this.focus$)
            .takeWhile(() => this.isAlive)
            .subscribe(([element]) => element.focus());
    }

    /** unsubscribe to all Observable when component is destroyed */
    public ngOnDestroy() {
        this.isAlive = false;
    }

    /** Init mask */
    public ngOnInit() {
        if (!this._format) {
            if (!this.layout || this.layout === DateComponentLayout.dateonly || this.layout === 'dateonly') {
                this.format = 'YYYY-MM-DD';
            } else if (this.layout === DateComponentLayout.datetime || this.layout === 'datetime') {
                this.format = 'YYYY-MM-DD HH:mm';
            } else if (this.layout === DateComponentLayout.timeonly || this.layout === 'timeonly') {
                this.format = 'HH:mm';
            } else {
                this.format = 'YYYY-MM-DD';
            }
        }
    }

    public get showDropDown() {
        return this._showDropDown;
    }

    /** disabled property setter. Can be string or empty so you can use it like : <deja-date-picker disabled></deja-date-picker> */
    @Input()
    public set disabled(value: boolean | string) {
        this._disabled = coerceBooleanProperty(value) ? true : null;
        this.changeDetectorRef.markForCheck();
    }

    /** disabled property getter. */
    public get disabled() {
        return this._disabled;
    }

    /** required property setter. Can be string or empty so you can use it like : <deja-date-picker required></deja-date-picker> */
    @Input()
    public set required(value: boolean | string) {
        this._required = coerceBooleanProperty(value) ? true : null;
        this.changeDetectorRef.markForCheck();
    }

    /** required property getter. */
    public get required() {
        return this._required;
    }

    /**
     * Component Layout
     */
    @Input()
    public set layout(value: DateComponentLayout | string) {
        if (value) {
            this._layout = value;
        }
        this.changeDetectorRef.markForCheck();
    }

    public get layout() {
        return this._layout;
    }

    /**
     * Time property setter. Can be string or empty so you can use it like : <deja-date-picker time></deja-date-picker>
     * Used to add time selector next to calendar
     */
    @Input()
    public set time(value: boolean | string) {
        this._time = coerceBooleanProperty(value) ? true : null;
        if (this._time) {
            this.layout = DateComponentLayout.datetime;
        }
        this.changeDetectorRef.markForCheck();
    }

    /** Time property getter */
    public get time() {
        return this._time;
    }

    /** Method to close date-picker dialog */
    public close() {
        this._showDropDown = false;
        this.changeDetectorRef.markForCheck();
        return false;
    }

    /** Method to open date-picker dialog */
    public open() {
        this._showDropDown = true;
        this.changeDetectorRef.markForCheck();
    }

    /** set accessor including call the onchange callback */
    public set value(v: Date) {
        if (v !== this.date) {
            this.writeValue(v);
            this.onChangeCallback(v);
        }
    }

    // ************* ControlValueAccessor Implementation **************
    /** get accessor */
    public get value(): Date {
        return this.date;
    }

    /** From ControlValueAccessor interface */
    public writeValue(value: Date) {
        if (value !== this.date) {
            this.dateChanged$.next(value);
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

    public setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
    // ************* End of ControlValueAccessor Implementation **************

    /** For reactive form. */
    public ngAfterContentInit() {
        if (this.inputValidatorDirective) {
            this.inputValidatorDirective.parentControl = this._control;
        }
    }

    /** Give focus to this component */
    public setFocus() {
        this.focus$.next();
    }

    /**
     * Called when user click on the input of this component.
     * If click is located on mat-icon 'calendar' who is in the matPrefix of mat-form-field-container, the picker show off.
     *
     * @param event
     */
    protected toggleDateSelector(event: Event) {
        if (this.disabled) {
            return undefined;
        }

        const target = event.currentTarget as HTMLElement;
        if (target.id !== 'calendar-button') {
            return undefined;
        }

        this.open();

        return false;
    }

    /**
     * Called when input change. If it's a string it's because user set the date manually. So we need to convert it into date with MomentJs.
     *
     * @param date new value of this model
     */
    public updateModel(date: string | Date) {
        if (typeof date === 'string') { // && date.replace(/_/g, '').length === this._format.length) {
            if (date.replace(/_/g, '').length === this._format.length) { // If mask is fully filled
                let d = moment(date, this._format).toDate();
                if (!moment(d).isValid()) {
                    console.warn('[DatePicker]: Invalid Date');
                    d = null;
                    this._control.control.setErrors({ invalidMask: true });
                    this.changeDetectorRef.markForCheck();
                }
                date = d;
            } else if (!date.match(/[0-9]/)) { // if mask is empty - do nothing
                return;
            } else { // If mask is partially filled
                date = null;
                console.warn('[DatePicker]: Invalid Date');
                this._control.control.setErrors({ invalidMask: true });
                this.changeDetectorRef.markForCheck();
            }
        }

        if (typeof date !== 'string') {

            if (this.value && this.value.getTime() === date.getTime()) {
                this.close();
                return;
            }

            let event: EventEmitter<any>;

            // now we check if it's date or time who is updated to raise correct event
            if (this.value && (date.getFullYear() !== this.value.getFullYear() || date.getMonth() !== this.value.getMonth() || date.getDate() !== this.value.getDate())) {
                event = this.dateChange;
            } else if (this.value && (date.getHours() !== this.value.getHours() || date.getMinutes() !== this.value.getMinutes() || date.getSeconds() !== this.value.getSeconds() || date.getMilliseconds() !== this.value.getMilliseconds())) {
                event = this.timeChange;
            } else {
                event = this.dateChange;
            }

            this.value = date;
            this.onTouchedCallback();
            event.emit(date);

            if (!this._layout || this._layout === DateComponentLayout.dateonly) {
                this.close();
            } else {
                this.changeDetectorRef.markForCheck();
            }
        }
    }

    /** Reset date-picker values. */
    protected reset() {
        this.value = undefined;
        delete this._inputModel;
        this.onChangeCallback(this.value);
        this.close();
    }

    public onBlur() {
        this.onTouchedCallback();
    }

    public setToCurrentDate(): void {
        this.value = new Date();
    }
}
