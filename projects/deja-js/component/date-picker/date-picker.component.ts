/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Optional, Output, Self, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { CanUpdateErrorState, ErrorStateMatcher } from '@angular/material';
import { MatFormFieldControl } from '@angular/material/form-field';
import { DateComponentLayout, DaysOfWeek, DejaDateSelectorComponent } from '@deja-js/component/date-selector';
import { DejaChildValidatorDirective, DejaConnectionPositionPair, KeyCodes } from '@deja-js/core';
import { _MatInputMixinBase } from '@deja-js/core/util';
import * as moment_ from 'moment';
import { combineLatest as observableCombineLatest, from as observableFrom, fromEvent as observableFromEvent, merge as observableMerge, ReplaySubject, Subject } from 'rxjs';
import { delay, filter, first, map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { formatToMask, formatToUnitOfTime } from './format-to-mask';

const moment: (value?: any, format?: string, strict?: boolean) => moment_.Moment = (<any>moment_).default || moment_;

const noop = () => { };

/**
 * Date-picker component for Angular
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{provide: MatFormFieldControl, useExisting: DejaDatePickerComponent}],
    selector: 'deja-date-picker',
    styleUrls: ['./date-picker.component.scss'],
    templateUrl: './date-picker.component.html',
})
export class DejaDatePickerComponent extends _MatInputMixinBase implements OnInit, ControlValueAccessor, AfterContentInit, DoCheck, OnDestroy, MatFormFieldControl<Date | string>, CanUpdateErrorState {
    public static nextId = 0;
    private static formattingTokens = new RegExp(`(\\[[^\\[]*\\])|(\\\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)`, 'g');

    @HostBinding() public id = `my-tel-input-${DejaDatePickerComponent.nextId++}`;
    @HostBinding('class.floating') public get shouldLabelFloat() {
        return this.focused || !this.empty || !!this.mask;
    }

    @HostBinding('attr.aria-describedby') public describedBy = '';

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
    @Input() public get placeholder(): string {
        return this._placeholder;
    }
    public set placeholder(plh: string) {
        this._placeholder = plh;
        this.stateChanges.next();
    }

    @Input() public label: string;
    /** Disabled dates. It's an array of DaysOfWeek (number between 0 and 6) or a date. */
    @Input() public disableDates: Array<DaysOfWeek | Date>; // | ((d: Date) => boolean);
    /** Reference to DejaDateSelectorComponent inside thic control */
    @ViewChild(DejaDateSelectorComponent, { static: true }) public dateSelectorComponent: DejaDateSelectorComponent;
    /** Offset de position horizontal de la zone de dropdown */
    @Input() public overlayOffsetX = 0;
    /** Offset de position verticale de la zone de dropdown */
    @Input() public overlayOffsetY = 6;
    /** Afficher un bouton raccourcis permettant de sélectionner la date courante */
    @Input() public set showCurrentDateButton(value: boolean) {
        this._showCurrentDateButton = coerceBooleanProperty(value);
    }
    public get showCurrentDateButton() {
        return this._showCurrentDateButton;
    }

    @Output() public dateChange = new EventEmitter();
    @Output() public timeChange = new EventEmitter();

    /** matFormField implementation */
    public stateChanges = new Subject<void>();

    private _allowFreeEntry = false;

    /** Permettre la saisie de texte libre */
    @Input()
    public set allowFreeEntry(value: boolean | string) {
        this._allowFreeEntry = coerceBooleanProperty(value) || null;
    }

    public get allowFreeEntry() {
        return this._allowFreeEntry;
    }

    /** Mask for input */
    public _mask: any[];

    public get mask() {
        return this._mask;
    }

    public onTouchedCallback: () => void = noop;
    public onChangeCallback: (_: any) => void = noop;

    /** Internal use */
    public overlayOwnerElement: HTMLElement;
    public date: Date | string;

    /** matFormField focus implementation */
    public focused = false;

    /** This property indicates whether the associated NgControl is in an error state. */
    public errorState = false;

    /** This property allows us to specify a unique string for the type of control in form field.
     * The <mat-form-field> will add an additional class based on this type that can be used to
     * easily apply special styles to a <mat-form-field> that contains a specific type of control.
     * In this example we'll use deja-date-picker as our control type which will result in the form field
     * adding the class mat-form-field-deja-date-picker.
     */
    public controlType = 'deja-date-picker';

    @ViewChild(DejaChildValidatorDirective) private inputValidatorDirective: DejaChildValidatorDirective;

    /** Default placeholder for input */
    private _placeholder: string;
    private _showCurrentDateButton: boolean;
    private isAlive = true;
    private _disabled: boolean;
    private _required: boolean;
    private _time: boolean;
    private _format: string;
    private inputElement$ = new ReplaySubject<HTMLInputElement>(1);
    private inputElement: HTMLInputElement;
    private focus$ = new Subject();
    private _showDropDown = false;
    private _positions = DejaConnectionPositionPair.default;

    private _inputModel: string;
    private cursorPosition: number;
    private formatChanged$ = new Subject<string>();
    private dateChanged$ = new Subject<Date | string>();

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

    public get empty() {
        return !this.value;
    }

    /**
     * Constructor
     * subscribe on different events needed inside this component
     */
    constructor(
        private elementRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef,
        @Self() @Optional() public ngControl: NgControl,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        _defaultErrorStateMatcher: ErrorStateMatcher,
        private fm: FocusMonitor,
    ) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
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

        fm.monitor(this.elementRef.nativeElement, true)
            .subscribe(origin => {
                this.focused = !!origin;
                if (!this.focused) {
                    this.onTouchedCallback();
                } else {
                    if (!this.value) {
                        setTimeout(() => this.inputElement.setSelectionRange(0, 0));
                    }
                }
                this.stateChanges.next();
            });

        const keydown$ = observableFrom(this.inputElement$).pipe(
            switchMap((element) => observableFromEvent(element, 'keydown')));

        const cursorChanged$ = observableFrom(this.inputElement$).pipe(
            switchMap((element: HTMLInputElement) => {
                return observableMerge(observableFromEvent(element, 'mouseup'), observableFromEvent(element, 'focus'), observableFromEvent(element, 'keyup')).pipe(
                    map(() => {
                        return element.selectionStart;
                    }));
            }));

        cursorChanged$.pipe(takeWhile(() => this.isAlive))
            .subscribe((position: number) => {
                this.cursorPosition = position;
            });

        keydown$.pipe(takeWhile(() => this.isAlive),
            filter((event: KeyboardEvent) => !this.showDropDown && (event.keyCode === KeyCodes.KeyD || event.keyCode === KeyCodes.UpArrow || event.keyCode === KeyCodes.DownArrow)))
            .subscribe((event: KeyboardEvent) => {
                switch (event.keyCode) {
                    case (KeyCodes.KeyD):
                        if (!this.allowFreeEntry) {
                            event.preventDefault();
                            this.setToCurrentDate();
                        }
                        break;

                    case (KeyCodes.UpArrow):
                        event.preventDefault();
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
                        event.preventDefault();
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

        const valueUpdated$ = observableCombineLatest(this.formatChanged$, this.dateChanged$).pipe(
            tap(([format]) => {
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
            }));

        valueUpdated$.pipe(takeWhile(() => this.isAlive))
            .subscribe(([format, value]) => {
                this.date = value;
                this._inputModel = (this.date) ? (this.date instanceof Date ? moment(this.date).format(format) : this.date) : null;

                // si la position du curseur était stockée, on la restaure apres avoir changé la valeur
                if (this.cursorPosition && !this.allowFreeEntry) {
                    this.inputElement$.pipe(
                        delay(1),
                        first())
                        .subscribe((elem: HTMLInputElement) => elem.setSelectionRange(this.cursorPosition, this.cursorPosition));
                }
                this.changeDetectorRef.markForCheck();
            });

        keydown$.pipe(takeWhile(() => this.isAlive),
            filter(() => this.showDropDown))
            .subscribe((event: KeyboardEvent) => {
                switch (event.keyCode) {
                    case (KeyCodes.Escape):
                        this.close();
                        break;

                    default:
                        this.dateSelectorComponent.keyDown(event);

                }
            });

        observableCombineLatest(this.inputElement$, this.focus$).pipe(
            takeWhile(() => this.isAlive))
            .subscribe(([element]) => element.focus());
    }

    /** unsubscribe to all Observable when component is destroyed */
    public ngOnDestroy() {
        this.isAlive = false;
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elementRef.nativeElement);
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

    public ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    /** This method is used by the <mat-form-field> to specify the IDs that should be used for the aria-describedby attribute of your component.
     * The method has one parameter, the list of IDs, we just need to apply the given IDs to our host element.
     */
    public setDescribedByIds(ids: string[]) {
        this.describedBy = ids.join(' ');
    }

    /** This method will be called when the form field is clicked on.
     * It allows your component to hook in and handle that click however it wants.
     * The method has one parameter, the MouseEvent for the click.
     * In our case we'll just focus the first <input> if the user isn't about to click an <input> anyways.
     */
    public onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.elementRef.nativeElement.querySelector('input').focus();
        }
    }

    public get showDropDown() {
        return this._showDropDown;
    }

    /** disabled property setter. Can be string or empty so you can use it like : <deja-date-picker disabled></deja-date-picker> */
    @Input()
    public set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value) ? true : null;
        this.stateChanges.next();
        this.changeDetectorRef.markForCheck();
    }

    /** disabled property getter. */
    public get disabled() {
        return this._disabled;
    }

    /** required property setter. Can be string or empty so you can use it like : <deja-date-picker required></deja-date-picker> */
    @Input()
    public set required(value: boolean) {
        this._required = coerceBooleanProperty(value) ? true : null;
        this.stateChanges.next();
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
    public set value(v: Date | string) {
        if (v !== this.date) {
            this.writeValue(v);
            this.onChangeCallback(v);
            this.stateChanges.next();
        }
    }

    // ************* ControlValueAccessor Implementation **************
    /** get accessor */
    public get value(): Date | string {
        return this.date;
    }

    /** From ControlValueAccessor interface */
    public writeValue(value: Date | string) {
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
            this.inputValidatorDirective.parentControl = this.ngControl;
        }
    }

    /** Give focus to this component */
    public setFocus() {
        this.focus$.next();
    }

    /**
     * Called when user click on the input of this component.
     * If click is located on icon 'calendar' who is in the matPrefix of mat-form-field-container, the picker show off.
     *
     * @param event
     */
    public toggleDateSelector(event: Event) {
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
        if (typeof date === 'string' && !this.allowFreeEntry) { // && date.replace(/_/g, '').length === this._format.length) {
            if (date.replace(/_/g, '').length === this._format.length) { // If mask is fully filled
                let d = moment(date, this._format).toDate();
                if (!moment(d).isValid()) {
                    console.warn('[DatePicker]: Invalid Date');
                    d = null;
                    this.ngControl.control.setErrors({ invalidMask: true });
                    this.changeDetectorRef.markForCheck();
                }
                date = d;
            } else if (!date.match(/[0-9]/)) { // if mask is empty - do nothing
                return;
            } else { // If mask is partially filled
                date = null;
                console.warn('[DatePicker]: Invalid Date');
                this.ngControl.control.setErrors({ invalidMask: true });
                this.changeDetectorRef.markForCheck();
            }
        }

        if (date instanceof Date) {
            if (this.value instanceof Date && this.value && this.value.getTime() === date.getTime()) {
                this.close();
                return;
            }

            let event: EventEmitter<any>;

            // now we check if it's date or time who is updated to raise correct event
            if (this.value instanceof Date && this.value && (date.getFullYear() !== this.value.getFullYear() || date.getMonth() !== this.value.getMonth() || date.getDate() !== this.value.getDate())) {
                event = this.dateChange;
            } else if (this.value instanceof Date && this.value && (date.getHours() !== this.value.getHours() || date.getMinutes() !== this.value.getMinutes() || date.getSeconds() !== this.value.getSeconds() || date.getMilliseconds() !== this.value.getMilliseconds())) {
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
        } else if (this.allowFreeEntry) {
            this.value = date;
            this.onTouchedCallback();
            this.dateChange.emit(date);
            this.changeDetectorRef.markForCheck();
        }
    }

    /** Reset date-picker values. */
    public reset() {
        setTimeout(() => { // To prevent "ExpressionChangedAfterItHasBeenCheckedError"
            this.value = undefined;
            delete this._inputModel;
        });
        this.close();
    }

    public setToCurrentDate(): void {
        this.value = new Date();

        this.selectHours();
    }

    private selectHours() {
        if (this.layout === DateComponentLayout.datetime) {
            setTimeout(() => {
                const hoursTemplate = moment(this.date).format('HH:mm');
                const stringDate = this.inputElement.value;
                const hoursPosition = stringDate.indexOf(hoursTemplate);
                this.inputElement.setSelectionRange(hoursPosition, stringDate.length);
            });
        }
    }
}
