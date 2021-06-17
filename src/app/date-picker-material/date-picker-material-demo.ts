/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateRange, MatDatepicker, MatDatepickerInput, MatDatepickerInputEvent, MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';
import { Destroy } from '@deja-js/component/core';
import { isMatch, parse, set, startOfToday } from 'date-fns';

import { dateTimeFormat } from './custom-date-format.directive';

@Component({
    selector: 'dejadate-picker-material-demo',
    styleUrls: ['./date-picker-material-demo.scss'],
    templateUrl: './date-picker-material-demo.html',
    encapsulation: ViewEncapsulation.None
})
export class DejaDatePickerMaterialDemoComponent extends Destroy {
    public tabIndex = 1;

    public dateForm: FormGroup;
    public dateRangeForm: FormGroup;
    public dateTimeForm: FormGroup;
    public dateTimeRangeForm: FormGroup;

    public events: string[] = [];

    public constructor(private fb: FormBuilder) {
        super();

        this.dateForm = this.fb.group({
            date: null
        });

        this.dateRangeForm = this.fb.group({
            start: null,
            end: null
        });

        this.dateTimeForm = this.fb.group({
            date: null,
            time: null
        });

        this.dateTimeRangeForm = this.fb.group({
            start: null,
            end: null,
            startTime: null,
            endTime: null
        });
    }

    /**
     * Triggered when changing date in calendar popup
     */
    public onDateTimeInput(event: MatDatepickerInputEvent<unknown>): void {
        const time = this.dateTimeForm.get('time').value as Date;
        this.dateTimeForm.get('date').setValue(set(event.value as Date, { hours: time.getHours(), minutes: time.getMinutes() }));
    }

    /**
     * Triggered when changing date in input field or calendar popup
     */
    public onDateTimeChange(event: MatDatepickerInputEvent<unknown>): void {
        const inputValue = (event.targetElement as HTMLInputElement).value;
        if (isMatch(inputValue, dateTimeFormat)) {
            const newDate = parse(inputValue, dateTimeFormat, startOfToday());
            this.dateTimeForm.get('date').setValue(newDate);
            this.dateTimeForm.get('time').setValue(newDate);
        }
    }

    /**
     * Triggered when closing the calendar popup
     */
    public onDateTimeClosed(dateTimePicker: MatDatepicker<unknown>): void {
        // copy the date field value to the time field (useful if the timepicker was updated but the datepicker popup was closed without applying the change)
        this.dateTimeForm.get('time').setValue((dateTimePicker.datepickerInput as MatDatepickerInput<Date>).value);
    }

    /**
     * Triggered when changing start or end date in calendar popup
     */
    public onDateTimeRangeInput(event: MatDatepickerInputEvent<unknown>, dateFieldName: string): void {
        const time = this.dateTimeRangeForm.get(`${dateFieldName}Time`).value as Date;
        this.dateTimeRangeForm.get(dateFieldName).setValue(set(event.value as Date, { hours: time.getHours(), minutes: time.getMinutes() }));
    }

    /**
     * Triggered when changing start or end date in input field or calendar popup
     */
    public onDateTimeRangeChange(event: MatDatepickerInputEvent<unknown>, dateFieldName: string): void {
        const inputValue = (event.targetElement as HTMLInputElement).value;
        if (isMatch(inputValue, dateTimeFormat)) {
            const newDate = parse(inputValue, dateTimeFormat, startOfToday());
            this.dateTimeRangeForm.get(dateFieldName).setValue(newDate);
            this.dateTimeRangeForm.get(`${dateFieldName}Time`).setValue(newDate);
        }
    }

    /**
     * Triggered when closing the calendar popup
     */
    public onDateTimeRangeClosed(dateTimeRangePicker: MatDateRangePicker<unknown>): void {
        // copy the date field values to each time fields (useful if the timepicker was updated but the datepicker popup was closed without applying the change)
        const dateRange = (dateTimeRangePicker.datepickerInput as MatDateRangeInput<DateRange<Date>>).value;
        this.dateTimeRangeForm.get('startTime').setValue(dateRange.start);
        this.dateTimeRangeForm.get('endTime').setValue(dateRange.end);
    }
}
