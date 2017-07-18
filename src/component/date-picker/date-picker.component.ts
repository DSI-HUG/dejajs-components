/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { KeyCodes } from '../../common/core/keycodes.enum';
import { DejaChildValidatorDirective } from '../../common/core/validation/child-validator.directive';
import { DaysOfWeek, DejaDateSelectorComponent } from '../date-selector/date-selector.component';
import { formatToMask, formatToUnitOfTime } from './format-to-mask';

import * as moment_ from 'moment';
const moment: (value?: any, format?: string) => moment_.Moment = (<any>moment_).default || moment_;

const noop = () => { };

/**
 * Date-picker component for Angular2
 */
@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'deja-date-picker',
    styleUrls: ['./date-picker.component.scss'],
    templateUrl: './date-picker.component.html',
})
export class DejaDatePickerComponent implements OnInit, ControlValueAccessor, AfterContentInit, OnDestroy {
    private static formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    /** Maximum date avaliable inside date-picker */
    @Input() public dateMax: Date;
    /** Minimum date avaliable inside date-picker */
    @Input() public dateMin: Date;
    /** Dropdown container id. @see DejaDropDowncomponent documentation for details */
    @Input() public dropdownContainerId: string;
    /** Dropdown alignment. @see DejaDropDowncomponent documentation for details */
    @Input() public dropdownAlignment = 'left right top bottom';
    /** Owner alignment. @see DejaDropDowncomponent documentation for details */
    @Input() public ownerAlignment = 'left bottom';
    /** Date format. If unset, format will be 'YYYY-MM-DD' + ' HH:mm' it's a date-time selector */
    @Input() public set format(format: string) {
        this._format = format;
        this.formatChanged$.next(format);
    }
    /** Placeholder for input */
    @Input() public placeholder = 'Date';
    /** Disabled dates. It's an array of DaysOfWeek (number between 0 and 6) or a date. */
    @Input() public disableDates: Array<DaysOfWeek | Date>; // | ((d: Date) => boolean);
    /** Reference to DejaDateSelectorComponent inside thic control */
    @ViewChild(DejaDateSelectorComponent) public dateSelectorComponent: DejaDateSelectorComponent;
    /** Template for MdHint inside md-input-container */
    @ContentChild('hintTemplate') protected mdHint;
    /** Template for MdError inside md-input-container */
    @ContentChild('errorTemplate') protected mdError;
    /** Mask for input */
    protected mask: any[];

    @ViewChild(DejaChildValidatorDirective) private inputValidatorDirective: DejaChildValidatorDirective;

    private subscriptions = [] as Subscription[];
    private _disabled: boolean;
    private _required: boolean;
    private _time: boolean;
    private _format: string;
    private inputElement$ = new ReplaySubject<HTMLElement>(1);
    private focus$ = new Subject();
    private _showDropDown = false;

    private date = new Date();

    private inputModel;
    private cursorPosition: number;
    private formatChanged$ = new Subject<string>();
    private dateChanged$ = new Subject<Date>();

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    @ViewChild('inputelement')
    private set inputElementRef(element: ElementRef) {
        if (element) {
            this.inputElement$.next(element.nativeElement);
        }
    }

    /**
     * Constructor
     * subscribe on fifferent events needed inside this component
     */
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

        const cursorChanged$ = Observable.from(this.inputElement$)
            .switchMap((element: HTMLInputElement) => {
                return Observable.merge(Observable.fromEvent(element, 'mouseup'), Observable.fromEvent(element, 'focus'), Observable.fromEvent(element, 'keyup'))
                    .map(() => {
                        return element.selectionStart;
                    });
            });

        this.subscriptions.push(cursorChanged$
            .subscribe((position: number) => {
                this.cursorPosition = position;
            })
        );

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
                            // If cursor is on number, we can update it
                            if (!isNaN(+this.inputModel[this.cursorPosition - 1])) {
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
                            this.showDropDown = true;
                        } else if (this.date) {
                            // Same as arrowUp
                            if (!isNaN(+this.inputModel[this.cursorPosition - 1])) {
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
            }));

        const valueUpdated$ = Observable.combineLatest(this.formatChanged$, this.dateChanged$)
            .do(([format]) => {
                let mask = [];
                const array = format.match(DejaDatePickerComponent.formattingTokens);
                array.forEach((val: string) => {
                    if (formatToMask[val]) {
                        mask = [...mask, ...formatToMask[val]];
                    } else {
                        mask.push(val);
                    }
                });

                this.mask = mask;
            });

        this.subscriptions.push(valueUpdated$.subscribe(([format, value]) => {
            this.date = value;
            this.inputModel = (this.date) ? moment(this.date).format(format) : null;

            // si la position du curseur était stockée, on la restaure apres avoir changé la valeur
            if (this.cursorPosition) {
                this.inputElement$.delay(1).first().subscribe((elem: HTMLInputElement) => elem.setSelectionRange(this.cursorPosition, this.cursorPosition));
            }
            this.changeDetectorRef.markForCheck();
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

    /** unsubscribe to all Observable when component is destroyed */
    public ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    /** Init mask */
    public ngOnInit() {
        if (!this._format) {
            const time = this.time ? ' HH:mm' : '';
            this.format = `YYYY-MM-DD${time}`;
        }
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

    /** disabled property setter. Can be string or empty so you can use it like : <deja-date-picker disabled></deja-date-picker> */
    @Input()
    public set disabled(value: boolean | string) {
        this._disabled = (value != null && `${value}` !== 'false') ? true : null;
        this.changeDetectorRef.markForCheck();
    }

    /** disabled property getter. */
    public get disabled() {
        return this._disabled;
    }

    /** required property setter. Can be string or empty so you can use it like : <deja-date-picker required></deja-date-picker> */
    @Input()
    public set required(value: boolean | string) {
        this._required = (value != null && `${value}` !== 'false') ? true : null;
        this.changeDetectorRef.markForCheck();
    }

    /** required property getter. */
    public get required() {
        return this._required;
    }

    /**
     * Time property setter. Can be string or empty so you can use it like : <deja-date-picker time></deja-date-picker>
     * Used to add time selector next to calendar
     */
    @Input()
    public set time(value: boolean | string) {
        this._time = (value != null && `${value}` !== 'false') ? true : null;
        this.changeDetectorRef.markForCheck();
    }

    /** Time property getter */
    public get time() {
        return this._time;
    }

    /** Method to close date-picker dialog */
    public close() {
        this.showDropDown = false;
    }

    /** Method to open date-picker dialog */
    public open() {
        this.showDropDown = true;
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
     * If click is located on md-icon 'calendar' who is in the mdPrefix of md-input-container, the picker show off.
     *
     * @param {Event} event
     */
    protected toggleDateSelector(event: Event) {
        if (this.disabled) {
            return undefined;
        }

        const target = event.currentTarget as HTMLElement;
        if (target.id !== 'calendar-button') {
            return undefined;
        }

        this.showDropDown = !this.showDropDown;
        return false;
    }

    /**
     * ngModelChange of date-selector.
     *
     * @param {Date} newDate Date to set.
     */
    protected onDateChange(newDate: Date) {
        this.value = newDate;
        // TODO
        // if (this.value.getHours() === newDate.getHours() && this.value.getMinutes() === newDate.getMinutes() && this.value.getSeconds() === newDate.getSeconds()) {
        //     this.setFocus();
        // }
    }

    /**
     * Called when input change. If it's a string it's because user set the date manually. So we need to convert it into date with MomentJs.
     *
     * @param {string | Date} date new value of this model
     */
    protected updateModel(date: string | Date) {
        if (typeof date === 'string' && date.replace(/_/g, '').length === this._format.length) {
            let d = moment(date, this._format).toDate();
            if (!moment(d).isValid()) {
                d = new Date();
            }
            date = d;
        }

        if (typeof date !== 'string') {
            this.value = date;
        }
    }

    /** Reset date-picker values. */
    protected reset() {
        this.value = undefined;
        delete this.inputModel;
        this.onChangeCallback(this.value);
        this.close();
    }
}
