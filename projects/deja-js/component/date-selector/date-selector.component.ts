/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/* eslint-disable @typescript-eslint/naming-convention */
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Optional, Output, Self, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Destroy, KeyCodes } from '@deja-js/component/core';
import { format } from 'date-fns';
import { fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';

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

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-date-time-selector',
    styleUrls: ['./date-selector.scss'],
    templateUrl: './date-selector.component.html'
})
export class DejaDateSelectorComponent extends Destroy implements OnInit, ControlValueAccessor {
    @Input() public startDay: DaysOfWeek = DaysOfWeek.Monday;
    @Input() public disableDates: Array<(DaysOfWeek | Date)>; // | ((d: Date) => boolean);
    @Input() public dateMax: Date;
    @Input() public dateMin: Date;
    @Input() public format: string;

    @Output() public readonly dateChange = new EventEmitter();
    @Output() public readonly timeChange = new EventEmitter();

    public _local = 'fr';
    public layoutClass: string;
    public layoutId: number;

    public zeroHourDate = new Date(0, 0, 0, 0, 0, 0, 0);

    private _keyboardNavigation = false;
    private _keyboardNavigation$ = new Subject<boolean>();

    public get keyboardNavigation(): boolean {
        return this._keyboardNavigation;
    }

    public get displayedDate(): Date {
        return this._displayedDate;
    }

    public get local(): string {
        return this._local;
    }

    private _currentDays: IDateSelectorItem[];
    private _currentDate: Date = new Date();

    private selectedDate: Date;
    private _displayedDate = new Date();

    private _days = [] as string[];
    private _emptyDays: number[];
    private _time: boolean;
    private _disabled: boolean;

    /**
     * Component Layout
     */
    @Input()
    public set layout(value: DateComponentLayout | string) {
        if (value) {
            if (typeof value === 'string') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    /**
     * Time property setter. Can be string or empty so you can use it like : <deja-date-selector time></deja-date-selector>
     * Used to add time selector next to calendar
     */
    @Input()
    public set time(value: BooleanInput) {
        this._time = coerceBooleanProperty(value) ? true : null;
        if (this._time) {
            this.layout = DateComponentLayout.datetime;
        }
        this.changeDetectorRef.markForCheck();
    }

    /** Time property getter. */
    public get time(): BooleanInput {
        return this._time;
    }

    public get days(): string[] {
        return this._days;
    }

    public get emptyDays(): number[] {
        return this._emptyDays;
    }

    public get currentDate(): Date {
        return this._currentDate;
    }

    public get currentDays(): IDateSelectorItem[] {
        return this._currentDays;
    }

    /** Disabled property setter. Can be string or empty so you can use it like : <deja-date-selector disabled></deja-date-selector> */
    @Input()
    public set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value) ? true : null;
        // this.changeDetectorRef.markForCheck();
        this.bind();
    }

    /** Disabled property getter. */
    public get disabled(): BooleanInput {
        return this._disabled;
    }

    public constructor(elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef, @Self() @Optional() public _control: NgControl) {
        super();

        const element = elementRef.nativeElement as HTMLElement;

        if (this._control) {
            this._control.valueAccessor = this;
        }

        fromEvent(element, 'mousedown').pipe(
            takeUntil(this.destroyed$)
        ).subscribe(event => {
            event.stopPropagation();
            event.preventDefault();
            return false;
        });

        fromEvent(element, 'click').pipe(
            takeUntil(this.destroyed$)
        ).subscribe(event => {
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

        merge(this._keyboardNavigation$, fromEvent(element, 'mouseleave'), fromEvent(element, 'click')).pipe(
            filter(() => this._keyboardNavigation),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this._keyboardNavigation = false;
            this.changeDetectorRef.markForCheck();
        });

        this._keyboardNavigation$.pipe(
            filter(value => value),
            tap(value => this._keyboardNavigation = value),
            debounceTime(2000),
            takeUntil(this.destroyed$)
        ).subscribe(() => this._keyboardNavigation$.next(false));

        this.layout = DateComponentLayout.dateonly;
    }

    public ngOnInit(): void {
        if (!this._displayedDate) {
            this._displayedDate = this._currentDate;
            this.bind();
        }
    }

    // ************* ControlValueAccessor Implementation **************
    // set accessor including call the onchange callback
    public set value(v: Date) {
        if (v !== this.selectedDate) {
            this.writeValue(v);
            this.onChangeCallback(v);
        }
    }

    // get accessor
    public get value(): Date {
        return this.selectedDate;
    }

    // From ControlValueAccessor interface
    public writeValue(value: Date | string): void {
        if (value instanceof Date && value !== this.selectedDate) {
            const clone = new Date(value.getTime());
            if (this.selectedDate) {
                // When using a date-picker without time keep the time specified in the selectedDate when changing date
                if (this.layoutId === 1 && this.selectedDate.toLocaleDateString() !== clone.toLocaleDateString()) {
                    clone.setHours(this.selectedDate.getHours(), this.selectedDate.getMinutes(), this.selectedDate.getSeconds());
                }
            }
            this.selectedDate = clone;
            this._displayedDate = clone || this._currentDate;
        } else {
            this._displayedDate = this._currentDate;
        }
        this.bind();
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn: (_a: unknown) => void): void {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
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

        // eslint-disable-next-line no-loops/no-loops
        while (date.getDay() !== this.startDay) {
            date = new Date(year, month, --day);
            const dateSelectorItem: IDateSelectorItem = {
                background: true,
                date: date
            };
            days.splice(0, 0, dateSelectorItem);
        }

        let d = 0;
        // eslint-disable-next-line no-loops/no-loops
        for (d = 1; d <= this.daysInMonth(month + 1, year); d++) {
            date = new Date(year, month, d);

            const dateSelectorItem = {
                currentDate: (this._currentDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) ? true : null,
                date: date
            };
            days.push(dateSelectorItem);
        }

        // eslint-disable-next-line no-loops/no-loops, no-constant-condition
        while (true) {
            date = new Date(year, month, d);
            if (date.getDay() === this.startDay) {
                break;
            } else {
                const dateSelectorItem = {
                    background: true,
                    date: date
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

    public daysInMonth(month: number, year: number): number {
        return new Date(year, month, 0).getDate();
    }

    public keyDown(event: KeyboardEvent): boolean {
        if (this.disabled) {
            return undefined;
        }

        if (!this.selectedDate) {
            this.selectedDate = new Date(this._currentDate);
        }

        this._keyboardNavigation$.next(true);
        let d: Date;
        switch (event.code) {
            case KeyCodes.PageUp:
            case KeyCodes.PageDown:
            case KeyCodes.UpArrow:
            case KeyCodes.DownArrow:
            case KeyCodes.LeftArrow:
            case KeyCodes.RightArrow:
                event.preventDefault();
                d = new Date(this.selectedDate);
                switch (event.code) {
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
        return undefined;
    }

    public changeMonth(x: number): boolean {
        this.setMonthIfPossible(this._displayedDate, x);
        return false;
    }

    public changeYear(x: number): boolean {
        this.setYearIfPossible(this._displayedDate, x);
        return false;
    }

    public updateTime(hours: Date): void {
        let d: Date;

        if (this.selectedDate) {
            d = new Date(this.selectedDate);
        } else {
            d = new Date();
            d.setHours(0, 0, 0, 0);
        }

        d.setHours(hours.getHours(), hours.getMinutes(), hours.getSeconds(), hours.getMilliseconds());
        this.value = d;
        this.timeChange.emit(this.value);
    }

    public getDisplayedDate(): string {
        const sb = new Array<string>();
        if (!this.format) {
            if (this.layoutId < 3) {
                sb.push(this.displayedDate?.toLocaleDateString());
            }
            if (this.layoutId > 1) {
                const hours = `0${this.displayedDate.getHours()}`;
                const minutes = `0${this.displayedDate.getMinutes()}`;
                sb.push(`${hours.slice(-2)}:${minutes.slice(-2)}`);
            }
        } else {
            sb.push((this.displayedDate && this.format && format(this.displayedDate, this.format)) || this.displayedDate?.toLocaleDateString());
        }

        return sb.join('&nbsp;&nbsp;');
    }

    public onTouchedCallback = (): void => undefined;
    public onChangeCallback = (_a?: unknown): void => undefined;

    private bind() {
        const month = this._displayedDate.getMonth();
        const year = this._displayedDate.getFullYear();

        this._currentDays = this.getAllDaysInMonth(month, year);

        this._currentDays.forEach((day: IDateSelectorItem) => day.disabled = this.isDisabledDate(day.date));

        // eslint-disable-next-line no-loops/no-loops
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
