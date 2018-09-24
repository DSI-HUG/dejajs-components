/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { from as observableFrom, fromEvent as observableFromEvent, Subject } from 'rxjs';
import { first, takeWhile } from 'rxjs/operators';
import { KeyCodes } from '../../common/core/keycodes.enum';
import { IDateSelectorItem } from './date-selector-item.model';

export enum DaysOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}

export enum DateComponentLayout {
    dateonly = 1,
    datetime,
    timeonly,
}

const noop = () => { };

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-date-time-selector',
    styleUrls: ['./date-selector.scss'],
    templateUrl: './date-selector.component.html',
})
export class DejaDateSelectorComponent implements OnInit, ControlValueAccessor, OnDestroy {
    @Input() public startDay: DaysOfWeek = DaysOfWeek.Monday;
    @Input() public disableDates: Array<(DaysOfWeek | Date)>; // | ((d: Date) => boolean);
    @Input() public dateMax: Date;
    @Input() public dateMin: Date;
    @Input() public format: string;

    @Output() public dateChange = new EventEmitter();
    @Output() public timeChange = new EventEmitter();

    protected _local = 'fr';

    // Time
    protected beginOffset = Math.PI / 3;
    protected clocks = {
        hours: {
            ranges: [
                { min: 1, max: 12, beginOffset: Math.PI / 3 },
                { min: 13, max: 24, beginOffset: Math.PI / 3 },
            ],
        },
        minutes: {
            ranges: [
                { min: 0, max: 59, labelInterval: 5 },
            ],
        },
    };
    // /Time

    protected _keyboardNavigation = false;
    private _keyboardNavigation$ = new Subject();

    public get keyboardNavigation() {
        return this._keyboardNavigation;
    }

    public get keyboardNavigation$() {
        return this._keyboardNavigation$;
    }

    public get displayedDate() {
        return this._displayedDate;
    }

    public get local() {
        return this._local;
    }

    public onTouchedCallback: () => void = noop;
    public onChangeCallback: (_: any) => void = noop;

    private isAlive = true;

    private _currentDays: IDateSelectorItem[];
    private _currentDate: Date = new Date();

    private selectedDate: Date;
    private _displayedDate = new Date();

    private _days = [] as string[];
    private _emptyDays: any[];
    private _time: boolean;
    private _disabled: boolean;

    /**
     * Component Layout
     */
    @Input()
    public set layout(value: DateComponentLayout | string) {
        if (value) {
            if (typeof value === 'string') {
                this.layoutId = (<any>DateComponentLayout)[value];
                if (!this.layoutId) {
                    throw new Error('Invalid type for DateComponentLayout');
                }
                this.layoutClass = value;
            } else {
                this.layoutId = value;
                this.layoutClass = DateComponentLayout[value];
            }
        }
        this.changeDetectorRef.markForCheck();
    }
    public layoutClass: string;
    public layoutId: number;

    /**
     * Time property setter. Can be string or empty so you can use it like : <deja-date-selector time></deja-date-selector>
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

    /** Time property getter. */
    public get time() {
        return this._time;
    }

    public get days() {
        return this._days;
    }

    public get emptyDays() {
        return this._emptyDays;
    }

    public get currentDate() {
        return this._currentDate;
    }

    public get currentDays() {
        return this._currentDays;
    }

    /** Disabled property setter. Can be string or empty so you can use it like : <deja-date-selector disabled></deja-date-selector> */
    @Input()
    public set disabled(value: boolean | string) {
        this._disabled = coerceBooleanProperty(value) ? true : null;
        // this.changeDetectorRef.markForCheck();
        this.bind();
    }

    /** Disabled property getter. */
    public get disabled() {
        return this._disabled;
    }

    constructor(elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef, @Self() @Optional() public _control: NgControl) {
        const element = elementRef.nativeElement as HTMLElement;

        if (this._control) {
            this._control.valueAccessor = this;
        }

        observableFromEvent(element, 'click').pipe(
            takeWhile(() => this.isAlive))
            .subscribe((event: Event) => {
                const target = event.target as HTMLElement;
                if (target.hasAttribute('dateindex')) {
                    const dateSelectorItem = this._currentDays[+target.getAttribute('dateindex')];
                    if (!dateSelectorItem.disabled) {
                        const val = new Date(dateSelectorItem.date);
                        if (this._displayedDate) {
                            val.setHours(this._displayedDate.getHours(), this._displayedDate.getMinutes(), this._displayedDate.getSeconds(), this._displayedDate.getMilliseconds());
                        }
                        this.value = val;
                        this.dateChange.emit(this.value);
                    }
                }
            });

        observableFrom(this._keyboardNavigation$).pipe(
            takeWhile(() => this.isAlive))
            .subscribe(() => {
                this._keyboardNavigation = true;
                observableFromEvent(element, 'mouseenter').pipe(
                    first())
                    .subscribe(() => {
                        this._keyboardNavigation = false;
                        this.changeDetectorRef.markForCheck();
                    });
            });
        this.layout = DateComponentLayout.dateonly;
    }

    public ngOnInit() {
        if (!this._displayedDate) {
            this._displayedDate = this._currentDate;
            this.bind();
        }
    }

    public ngOnDestroy() {
        this.isAlive = false;
    }

    // ************* ControlValueAccessor Implementation **************
    // set accessor including call the onchange callback
    set value(v: Date) {
        if (v !== this.selectedDate) {
            this.writeValue(v);
            this.onChangeCallback(v);
        }
    }

    // get accessor
    get value(): Date {
        return this.selectedDate;
    }

    // From ControlValueAccessor interface
    public writeValue(value: Date | string) {
        if (value instanceof Date && value !== this.selectedDate) {
            if (this.selectedDate) {
                const h = (value) ? value.getHours() : 0;
                const m = (value) ? value.getMinutes() : 0;
                if (value && ((!this.layoutId && this.selectedDate.toLocaleTimeString() !== value.toLocaleTimeString()) || (this.layoutId > 1 && ((this.selectedDate.getHours() === 0 && this.selectedDate.getMinutes() === 0) && (h !== 0 && m !== 0) || (this.selectedDate.toLocaleDateString() !== value.toLocaleDateString()))))) {
                    value.setHours(this.selectedDate.getHours(), this.selectedDate.getMinutes(), this.selectedDate.getSeconds());
                }
            }
            this.selectedDate = value;
            this._displayedDate = value || this._currentDate;

        } else {
            this._displayedDate = this._currentDate;
        }
        this.bind();
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

    /**
     * @param month (attention : Janvier = 0, Décembre = 11)
     * @param year
     * @return Jours du mois au format IDateSelectorItem
     */
    public getAllDaysInMonth(month: number, year: number): IDateSelectorItem[] {
        const days: IDateSelectorItem[] = [];

        let day = 1;
        let date = new Date(year, month, day);

        while (date.getDay() !== this.startDay) {
            date = new Date(year, month, --day);
            const dateSelectorItem: IDateSelectorItem = {
                background: true,
                date: date,
            };
            days.splice(0, 0, dateSelectorItem);
        }

        let d = 0;
        for (d = 1; d <= this.daysInMonth(month + 1, year); d++) {
            date = new Date(year, month, d);

            const dateSelectorItem = {
                currentDate: (this._currentDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) ? true : null,
                date: date,
            };
            days.push(dateSelectorItem);
        }

        while (true) {
            date = new Date(year, month, d);
            if (date.getDay() === this.startDay) {
                break;
            } else {
                const dateSelectorItem = {
                    background: true,
                    date: date,
                };
                days.push(dateSelectorItem);
                d++;
            }
        }

        // Il nous faut 6 lignes de 7 jours pour correspondre à tous les mois. 6*7=42
        // Du coup on ajoute une ligne vide quand c'est nécessaire
        if (days.length < 42) {
            const x = 42 - days.length;
            this._emptyDays = new Array(x);
        } else {
            this._emptyDays = null;
        }

        return days;
    }

    public daysInMonth(month: number, year: number) {
        return new Date(year, month, 0).getDate();
    }

    public keyDown(event: KeyboardEvent) {
        if (this.disabled) {
            return undefined;
        }

        if (!this.selectedDate) {
            this.selectedDate = new Date(this._currentDate);
        }

        this._keyboardNavigation$.next();
        switch (event.keyCode) {
            case KeyCodes.PageUp:
            case KeyCodes.PageDown:
            case KeyCodes.UpArrow:
            case KeyCodes.DownArrow:
            case KeyCodes.LeftArrow:
            case KeyCodes.RightArrow:
                event.preventDefault();
                const d = new Date(this.selectedDate);
                switch (event.keyCode) {
                    case KeyCodes.PageUp:
                        // d.setMonth(d.getMonth() - 1);
                        this.setMonthIfPossible(d, -1);
                        break;
                    case KeyCodes.PageDown:
                        // d.setMonth(d.getMonth() + 1);
                        this.setMonthIfPossible(d, 1);
                        break;
                    case KeyCodes.UpArrow:
                        // d.setDate(d.getDate() - 7);
                        this.setDateIfPossible(d, -7);
                        break;
                    case KeyCodes.DownArrow:
                        // d.setDate(d.getDate() + 7);
                        this.setDateIfPossible(d, 7);
                        break;
                    case KeyCodes.LeftArrow:
                        // d.setDate(d.getDate() - 1);
                        this.setDateIfPossible(d, -1);
                        break;
                    case KeyCodes.RightArrow:
                        // d.setDate(d.getDate() + 1);
                        this.setDateIfPossible(d, 1);
                        break;
                    default:
                        break;
                }
                // this.selectedDate = d;
                // this._displayedDate = d;
                // this.bind();
                break;
            case KeyCodes.Space:
            case KeyCodes.Enter:
                event.preventDefault();
                this.onChangeCallback(this.selectedDate);
                break;

            default:
                return true;
        }
    }

    public changeMonth(x: number) {
        this.setMonthIfPossible(this._displayedDate, x);
        return false;
    }

    public changeYear(x: number) {
        this.setYearIfPossible(this._displayedDate, x);
        return false;
    }

    protected updateHours(hours: number) {
        let d: Date;

        if (hours === 24) {
            hours = 0;
        }

        if (this.selectedDate) {
            d = new Date(this.selectedDate);
        } else {
            d = new Date();
            d.setHours(0, 0, 0, 0);
        }

        d.setHours(hours);
        this.value = d;
        this.timeChange.emit(this.value);
    }

    protected updateMinutes(minutes: number) {
        let d: Date;

        if (this.selectedDate) {
            d = new Date(this.selectedDate);
        } else {
            d = new Date();
            d.setHours(0, 0, 0, 0);
        }

        d.setMinutes(minutes);
        this.value = d;
        this.timeChange.emit(this.value);
    }

    private bind() {
        const month = this._displayedDate.getMonth();
        const year = this._displayedDate.getFullYear();

        this._currentDays = this.getAllDaysInMonth(month, year);

        this._currentDays.forEach((day: IDateSelectorItem) => day.disabled = this.isDisabledDate(day.date));

        for (let i = 0; i < 7; i++) {
            this._days[i] = this._currentDays[i].date.toLocaleString('fr', { weekday: 'narrow' });
        }

        if (this.selectedDate && this.selectedDate.getFullYear() === year && this.selectedDate.getMonth() === month) {
            const selectedDay = this.selectedDate.getDate();
            this._currentDays.forEach((day: IDateSelectorItem) => day.selected = day.date.getDate() === selectedDay && day.date.getMonth() === month);
        }

        this.changeDetectorRef.markForCheck();
    }

    /**
     * Vérifie si la date passée en param est désactivée.
     *
     * @param date
     * @return sera false si this.disableDates n'existe pas / n'est pas un tableau,
     *         si la date envoyée en param est valide,
     *         si la date est superieure a dateMax
     *         ou si la date est inférieure a dateMin
     */
    private isDisabledDate(date: Date): boolean {
        if (this._disabled) {
            return true;
        }
        if (this.disableDates && this.disableDates instanceof Array) {
            const find = this.disableDates.find((d: Date | number) => {
                if (typeof d === 'number') {
                    return d === date.getDay();
                } else {
                    return d.toLocaleDateString() === date.toLocaleDateString();
                }
            });

            if (typeof find !== 'undefined') {
                return true;
            }
        }

        if ((this.dateMax && date.getTime() > this.dateMax.getTime()) || (this.dateMin && date.getTime() < this.dateMin.getTime())) {
            return true;
        }
        return false;
    }

    /**
     * Fonction récursive. Si le jour séléctionné + num est invalide, la fonction
     * se rappelle pour séléctionner le jour suivant (ou précédent)
     *
     * @param date
     * @param num : nombre de jours à ajouter à date.
     */
    private setDateIfPossible(date: Date, num: number): void {
        const d = new Date(date);
        d.setDate(d.getDate() + num);
        if ((this.dateMin && d.getTime() < this.dateMin.getTime()) || (this.dateMax && d.getTime() > this.dateMax.getTime())) {
            this._displayedDate = d;
            this.bind();
            this.dateChange.emit(this._displayedDate);
        } else if (this.disableDates && this.isDisabledDate(d)) {
            this.setDateIfPossible(d, num);
        } else {
            this.selectedDate = d;
            this._displayedDate = d;
            this.bind();
            this.dateChange.emit(this._displayedDate);
        }
    }

    /**
     * Fonction récursive. Si le mois séléctionné + num est invalide, la fonction
     * se rappelle pour séléctionner le jour suivant (ou précédent)
     *
     * @param date
     * @param num : nombre de mois à ajouter à date.
     */
    private setMonthIfPossible(date: Date, num: number): void {
        const d = new Date(date);
        d.setMonth(d.getMonth() + num);
        if (this.disableDates && this.isDisabledDate(d)) {
            num = (num < 0) ? -1 : 1;
            this.setDateIfPossible(d, num);
        } else {
            this.selectedDate = d;
            this._displayedDate = d;
            this.bind();
            this.dateChange.emit(this._displayedDate);
        }
    }

    /**
     * Fonction récursive. Si l'année séléctionné + num est invalide, la fonction
     * se rappelle pour séléctionner le jour suivant (ou précédent)
     *
     * @param date
     * @param num : nombre de jours à ajouter à date.
     */
    private setYearIfPossible(date: Date, num: number): void {
        const d = new Date(date);
        d.setFullYear(d.getFullYear() + num);
        if (this.disableDates && this.isDisabledDate(d)) {
            num = (num < 0) ? -1 : 1;
            this.setDateIfPossible(d, num);
        } else {
            this.selectedDate = d;
            this._displayedDate = d;
            this.bind();
            this.dateChange.emit(this._displayedDate);
        }
    }
}
