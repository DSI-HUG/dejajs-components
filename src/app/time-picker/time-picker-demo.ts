/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { TimePickerDisplayModeEnum } from 'projects/deja-js/component/time-picker';

export const myFormats = {
    parse: {
        dateInput: 'DD/MM/YYYY HH:mm'
    },
    display: {
        dateInput: 'DD/MM/YYYY HH:mm',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'DD/MM/YYYY HH:mm',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-time-picker-demo',
    styleUrls: ['./time-picker-demo.scss'],
    templateUrl: './time-picker-demo.html',
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: myFormats }
    ]
})
export class DejaTimePickerDemoComponent {
    public tabIndex = 1;

    public modeFullTime = TimePickerDisplayModeEnum.FULL_TIME;
    public modeFullTimeWithHoursDisabled = TimePickerDisplayModeEnum.FULL_TIME_WITH_HOURS_DISABLED;
    public modeFullTimeWithMinutesDisabled = TimePickerDisplayModeEnum.FULL_TIME_WITH_MINUTES_DISABLED;
    public modeHoursOnly = TimePickerDisplayModeEnum.HOURS_ONLY;
    public modeMinutesOnly = TimePickerDisplayModeEnum.MINUTES_ONLY;

    public date0 = new Date();
    public date1 = new Date(2021, 4, 6, 9, 5, 0);
    public date2 = new Date();
    public date3 = new Date();
    public date4 = new Date();
    public date5 = new Date();
    public date6 = new Date(2021, 4, 28, 8, 55, 0);
    public date7 = new Date();
    public date8 = new Date(2021, 4, 28, 12, 55, 0);
    public disable7 = true;
    public dateForm: FormGroup;

    public constructor(private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder) {
        this.dateForm = this.fb.group({
            date8: [this.date8]
        });
    }

    public matDateChange(event: MatDatepickerInputEvent<Date>): void {
        const date = event.value;
        const clone = new Date(date);
        clone.setHours(this.date0.getHours());
        clone.setMinutes(this.date0.getMinutes());
        this.date0 = clone;
        this.changeDetectorRef.markForCheck();
    }

    public date0Changed(date: Date): void {
        const clone = new Date(date.getTime());
        this.date0 = clone;
        this.changeDetectorRef.markForCheck();
    }

    public date1Changed(date: Date): void {
        const clone = new Date(date.getTime());
        this.date1 = clone;
        this.changeDetectorRef.markForCheck();
    }

    public date2Changed(date: Date): void {
        const clone = new Date(date.getTime());
        this.date2 = clone;
        this.changeDetectorRef.markForCheck();
    }

    public date3Changed(date: Date): void {
        const clone = new Date(date.getTime());
        this.date3 = clone;
        this.changeDetectorRef.markForCheck();
    }

    public date4Changed(date: Date): void {
        const clone = new Date(date.getTime());
        this.date4 = clone;
        this.changeDetectorRef.markForCheck();
    }

    public date5Changed(date: Date): void {
        const clone = new Date(date.getTime());
        this.date5 = clone;
        this.changeDetectorRef.markForCheck();
    }

    public date6Changed(date: Date): void {
        const clone = new Date(this.date6.getTime());
        clone.setMinutes(date.getMinutes());

        this.date6 = clone;
        this.changeDetectorRef.markForCheck();
    }

    public date7Changed(date: Date): void {
        const clone = new Date(date.getTime());
        this.date7 = clone;
        this.changeDetectorRef.markForCheck();
    }
}
