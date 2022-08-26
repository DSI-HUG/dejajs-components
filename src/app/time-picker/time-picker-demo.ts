/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ControlsOf } from '@deja-js/component/core';

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

interface DateForm {
    date7: Date;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-time-picker-demo',
    styleUrls: ['./time-picker-demo.scss'],
    templateUrl: './time-picker-demo.html',
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: myFormats }
    ]
})
export class DejaTimePickerDemoComponent {
    public tabIndex = 1;

    public date0: Date = null;
    public date1 = new Date(2021, 4, 6, 9, 5, 0);
    public date2 = new Date();
    public date3 = new Date();
    public date4 = new Date();
    public date5 = new Date();
    public date6 = new Date();
    public date7 = new Date(2021, 4, 28, 12, 55, 0);
    public disable6 = true;
    public dateForm: FormGroup<ControlsOf<DateForm>>;

    public constructor(private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder) {
        this.dateForm = this.fb.group({
            date7: [this.date7]
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
        const clone = date && new Date(date.getTime());
        this.date0 = clone;
        this.changeDetectorRef.markForCheck();
    }

    public date1Changed(date: Date): void {
        const clone = date && new Date(date.getTime());
        this.date1 = clone;
        this.changeDetectorRef.markForCheck();
    }

    public date2Changed(date: Date): void {
        const clone = date && new Date(date.getTime());
        this.date2 = clone;
        this.changeDetectorRef.markForCheck();
    }

    public date3Changed(date: Date): void {
        const clone = date && new Date(date.getTime());
        this.date3 = clone;
        this.changeDetectorRef.markForCheck();
    }

    public date4Changed(date: Date): void {
        const clone = date && new Date(date.getTime());
        this.date4 = clone;
        this.changeDetectorRef.markForCheck();
    }

    public date5Changed(date: Date): void {
        const clone = date && new Date(date.getTime());
        this.date5 = clone;
        this.changeDetectorRef.markForCheck();
    }

    public date6Changed(date: Date): void {
        const clone = date && new Date(date.getTime());
        this.date6 = clone;
        this.changeDetectorRef.markForCheck();
    }
}
