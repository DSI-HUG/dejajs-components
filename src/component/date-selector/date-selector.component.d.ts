import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { IDateSelectorItem } from './date-selector-item.model';
export declare enum DaysOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}
export declare class DejaDateSelectorComponent implements AfterContentInit {
    private changeDetectorRef;
    startDay: DaysOfWeek;
    disableDates: Array<(DaysOfWeek | Date)>;
    dateMax: Date;
    dateMin: Date;
    dateChange: EventEmitter<{}>;
    protected local: string;
    protected beginOffset: number;
    protected clocks: {
        hours: {
            ranges: {
                min: number;
                max: number;
                beginOffset: number;
            }[];
        };
        minutes: {
            ranges: {
                min: number;
                max: number;
                labelInterval: number;
            }[];
        };
    };
    protected keyboardNavigation: boolean;
    private keyboardNavigation$;
    private currentDays;
    private currentDate;
    private selectedDate;
    private displayedDate;
    private days;
    private emptyDays;
    private _time;
    private onTouchedCallback;
    private onChangeCallback;
    time: boolean | string;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef);
    ngAfterContentInit(): void;
    value: Date;
    writeValue(value: Date): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    getAllDaysInMonth(month: number, year: number): IDateSelectorItem[];
    daysInMonth(month: any, year: any): number;
    keyDown(event: KeyboardEvent): boolean;
    protected changeMonth(x: number): void;
    protected changeYear(x: number): void;
    protected updateHours(hours: number): void;
    protected updateMinutes(minutes: number): void;
    protected getHoursModel(): number;
    private bind();
    private isDisabledDate(date);
    private setDateIfPossible(date, num);
    private setMonthIfPossible(date, num);
    private setYearIfPossible(date, num);
}
