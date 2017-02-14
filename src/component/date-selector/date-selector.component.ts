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

import { AfterContentInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import 'rxjs/Rx';
import { Observable, Subscription } from 'rxjs/Rx';
import { Position } from '../../common/core/graphics';
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

const noop = () => { };

const DejaDateSelectorComponentValueAccessor = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DejaDateSelectorComponent),
};

@Component({
    encapsulation: ViewEncapsulation.None,
    providers: [DejaDateSelectorComponentValueAccessor],
    selector: 'deja-date-time-selector',
    styleUrls: ['./date-selector.scss'],
    templateUrl: './date-selector.component.html',
})
export class DejaDateSelectorComponent implements AfterContentInit {
    @Input() public startDay: DaysOfWeek = DaysOfWeek.Monday;
    @Input() public disableDates: Array<(DaysOfWeek | Date)>; // | ((d: Date) => boolean);
    @Input() public dateMax: Date;
    @Input() public dateMin: Date;

    @Output() public dateChange = new EventEmitter();

    @ViewChild('bodyElem') public dateSelectorBodyElem: ElementRef;

    public _keyboardNavigation = false;

    protected local = 'fr';

    protected keydown: Observable<any>;

    // Time
    protected beginOffset = Math.PI / 3;
    protected clocks = {
        hours: {
            ranges: [
                {min: 1, max: 12, beginOffset: Math.PI / 3},
                {min: 13, max: 24, beginOffset: Math.PI / 3},
            ],
        },
        minutes: {
            ranges: [
                {min: 0, max: 59, labelInterval: 5},
            ], 
        },
    };
    // /Time

    private keyboardNavigationPos: Position;
    private mouseMoveObs: Subscription;

    private currentDays: IDateSelectorItem[];
    private currentDate: Date = new Date();

    private selectedDate: Date;
    private displayedDate: Date;

    private days = [];
    private emptyDays: any[];
    private _time: boolean = false;

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    @Input() 
    public set time(value: boolean) { 
        this._time = coerceBooleanProperty(value);
    }
    
    public get time() { 
        return this._time;
    }
    
    public get keyboardNavigation() {
        return this._keyboardNavigation;
    }

    public set keyboardNavigation(value: boolean) {
        this._keyboardNavigation = value;
        if (value) {
            if (this.mouseMoveObs) {
                return;
            }
            this.mouseMoveObs = Observable.fromEvent(this.dateSelectorBodyElem.nativeElement, 'mousemove').subscribe((event: MouseEvent) => {
                if (!this.keyboardNavigationPos) {
                    this.keyboardNavigationPos = new Position(event.x, event.y);
                } else if (Math.abs(event.x - this.keyboardNavigationPos.left) > 5 || Math.abs(event.y - this.keyboardNavigationPos.top) > 5) {
                    this.keyboardNavigation = false;
                    delete this.keyboardNavigationPos;
                }
            });
        } else if (this.mouseMoveObs) {
            this.mouseMoveObs.unsubscribe();
            delete this.mouseMoveObs;
        }
    }

    constructor(private elementRef: ElementRef) { }

    public ngAfterContentInit() {
        if (!this.displayedDate) {
            this.displayedDate = this.currentDate;
            this.bind();
        }

        this.keydown = Observable.fromEvent(this.dateSelectorBodyElem.nativeElement, 'keydown');
        this.dateSelectorBodyElem.nativeElement.focus();
        this.keydown.subscribe((event: KeyboardEvent) => this.keyEventSubscriber(event));
    }

    public keyEventSubscriber(event: KeyboardEvent) {
        if (!this.selectedDate) {
            this.selectedDate = new Date(this.currentDate);
        }
        this.keyboardNavigation = true;
        switch (event.keyCode) {
            case KeyCodes.PageUp:
            case KeyCodes.PageDown:
            case KeyCodes.UpArrow:
            case KeyCodes.DownArrow:
            case KeyCodes.LeftArrow:
            case KeyCodes.RightArrow:
                event.preventDefault();
                let d = new Date(this.selectedDate);
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
                // this.displayedDate = d;
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
    public writeValue(value: Date) {
        if (value !== this.selectedDate) {
            if (this.selectedDate) {
                let h = (value) ? value.getHours() : 0;
                let m = (value) ? value.getMinutes() : 0;
                if ( 
                    (!this.time && this.selectedDate.toLocaleTimeString() !== value.toLocaleTimeString())
                    || (this.time && ((this.selectedDate.getHours() === 0 && this.selectedDate.getMinutes() === 0) && (h !== 0 && m !== 0) || (this.selectedDate.toLocaleDateString() !== value.toLocaleDateString())))
                ) {
                    value.setHours(this.selectedDate.getHours(), this.selectedDate.getMinutes(), this.selectedDate.getSeconds());
                }
            }

            this.selectedDate = value;
            this.displayedDate = value || this.currentDate;

            this.bind();
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

    /**
     * @param {number} month (attention : Janvier = 0, Décembre = 11)
     * @param {number} year
     * @return {IDateSelectorItem[]} Jours du mois au format IDateSelectorItem
     */
    public getAllDaysInMonth(month: number, year: number): IDateSelectorItem[] {
        let days: IDateSelectorItem[] = [];

        let day = 1;
        let date = new Date(year, month, day);

        while (date.getDay() !== this.startDay) {
            date = new Date(year, month, --day);
            let dateSelectorItem: IDateSelectorItem = {
                background: true,
                date: date,
            };
            days.splice(0, 0, dateSelectorItem);
        }

        let d = 0;
        for (d = 1; d <= this.daysInMonth(month + 1, year); d++) {
            date = new Date(year, month, d);

            let dateSelectorItem = {
                currentDate: (this.currentDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) ? true : null,
                date: date,
            };
            days.push(dateSelectorItem);
        }

        while (true) {
            date = new Date(year, month, d);
            if (date.getDay() === this.startDay) {
                break;
            } else {
                let dateSelectorItem = {
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
            let x = 42 - days.length;
            this.emptyDays = new Array(x);
        } else {
            this.emptyDays = null;
        }

        return days;
    }

    public daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    protected changeMonth(x: number) {
        this.setMonthIfPossible(this.displayedDate, x);
    }

    protected changeYear(x: number) {
        this.setYearIfPossible(this.displayedDate, x);
    }

    protected dateClicked(dateSelectorItem: IDateSelectorItem) {
        if (!dateSelectorItem.disabled) {
            this.value = dateSelectorItem.date;
        }
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
    }

    private bind() {
        let month = this.displayedDate.getMonth();
        let year = this.displayedDate.getFullYear();

        this.currentDays = this.getAllDaysInMonth(month, year);

        this.currentDays.forEach((day: IDateSelectorItem) => {
            day.disabled = this.isDisabledDate(day.date);
        });

        for (let i = 0; i < 7; i++) {
            this.days[i] = this.currentDays[i].date.toLocaleString('fr', { weekday: 'narrow' });
        }
    }

    private getHoursModel() { 
        return this.displayedDate.getHours() || 24;
    }

    /**
     * Vérifie si la date passée en param est désactivée.
     * 
     * @param {Date} date
     * @return {boolean} sera false si this.disableDates n'existe pas / n'est pas un tableau,
     *                   si la date envoyée en param est valide,
     *                   si la date est superieure a dateMax
     *                   ou si la date est inférieure a dateMin
     */
    private isDisabledDate(date: Date): boolean {
        if (this.disableDates && this.disableDates instanceof Array) {
            let find = this.disableDates.find((d: Date | number) => {
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
     * @param {Date} date
     * @param {number} num : nombre de jours à ajouter à date.
     */
    private setDateIfPossible(date: Date, num: number): void {
        let d = new Date(date);
        d.setDate(d.getDate() + num);
        if (this.disableDates && this.isDisabledDate(d)) {
            this.setDateIfPossible(d, num);
        } else {
            this.selectedDate = d;
            this.displayedDate = d;
            this.bind();
        }
    }

    /**
     * Fonction récursive. Si le mois séléctionné + num est invalide, la fonction
     * se rappelle pour séléctionner le jour suivant (ou précédent)
     * 
     * @param {Date} date
     * @param {number} num : nombre de mois à ajouter à date.
     */
    private setMonthIfPossible(date: Date, num: number): void {
        let d = new Date(date);
        d.setMonth(d.getMonth() + num);
        if (this.disableDates && this.isDisabledDate(d)) {
            num = (num < 0) ? -1 : 1;
            this.setDateIfPossible(d, num);
        } else {
            this.selectedDate = d;
            this.displayedDate = d;
            this.bind();
        }
    }

    /**
     * Fonction récursive. Si l'année séléctionné + num est invalide, la fonction
     * se rappelle pour séléctionner le jour suivant (ou précédent)
     * 
     * @param {Date} date
     * @param {number} num : nombre de jours à ajouter à date.
     */
    private setYearIfPossible(date: Date, num: number): void {
        let d = new Date(date);
        d.setFullYear(d.getFullYear() + num);
        if (this.disableDates && this.isDisabledDate(d)) {
            num = (num < 0) ? -1 : 1;
            this.setDateIfPossible(d, num);
        } else {
            this.selectedDate = d;
            this.displayedDate = d;
            this.bind();
        }
    }
}
