/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DateComponentLayout } from '@deja-js/component/date-selector';

@Component({
    selector: 'dejadate-picker-demo',
    styleUrls: ['./date-picker-demo.scss'],
    templateUrl: './date-picker-demo.html'
})
export class DejaDatePickerDemoComponent implements OnInit {
    public tabIndex = 1;

    public theDate: Date = new Date();
    public theDateSelected: Date = new Date();

    public disabledDate = [0, 6, new Date(2016, 9, 12)];

    public dateRangeFrom: Date;
    public dateRangeTo: Date;
    public dateMin: Date;
    public dateMax: Date;

    public myLayout = DateComponentLayout.timeonly;

    // HTML Variables
    public datetimeRangeFrom: Date;
    public datetimeRangeTo: Date;
    public theFreeEntryDatePicker: Date;
    public theTimePicker: Date;
    public theDatetimePicker: Date;
    public theDatePicker: Date;
    public theDateTimeLayout: Date;
    public disableDateTime: Date;
    public theDateTime: Date;
    public theDate1: Date;
    public theDate2: Date;
    public theDate3: Date;

    public ngOnInit(): void {
        const now: Date = new Date();
        this.dateMin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        this.dateMax = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        this.theDateSelected = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        console.log(this.dateMin);
        console.log(this.dateMax);
    }

    public dateChange(date: Date): void {
        console.log('dateChange', date);
    }

    public timeChange(date: Date): void {
        console.log('timeChange', date);
    }
}
