/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Destroy } from '@deja-js/component/core';
import { IFormBuilder, IFormGroup } from '@rxweb/types';
import { debounceTime, takeUntil } from 'rxjs/operators';

interface DateForm {
    date: Date;
}

interface DateRangeForm {
    from: Date;
    to: Date;
}

@Component({
    selector: 'dejadate-picker-material-demo',
    styleUrls: ['./date-picker-material-demo.scss'],
    templateUrl: './date-picker-material-demo.html',
    encapsulation: ViewEncapsulation.None
})
export class DejaDatePickerMaterialDemoComponent extends Destroy {
    public tabIndex = 1;

    public dateForm: IFormGroup<DateForm>;
    public dateRangeForm: IFormGroup<DateRangeForm>;
    public dateTimeForm: IFormGroup<DateForm>;
    public dateTimeRangeForm: IFormGroup<DateRangeForm>;

    public time: Date;
    public from: Date;
    public to: Date;

    public constructor(fb: FormBuilder) {
        super();

        const formBuilder = fb as IFormBuilder;

        this.dateForm = formBuilder.group<DateForm>({
            date: null
        });

        this.dateRangeForm = formBuilder.group<DateRangeForm>({
            from: null,
            to: null
        });

        this.dateTimeForm = formBuilder.group<DateForm>({
            date: null
        });

        this.dateTimeRangeForm = formBuilder.group<DateRangeForm>({
            from: null,
            to: null
        });

        this.dateTimeForm.valueChanges.pipe(
            debounceTime(10),
            takeUntil(this.destroyed$)
        ).subscribe(values => {
            console.log('date selected', values.date);
        });

        this.dateTimeRangeForm.valueChanges.pipe(
            debounceTime(10),
            takeUntil(this.destroyed$)
        ).subscribe(values => {
            console.log('Range selected', values.from, 'to', values.to);
        });
    }

    public onDateTimeOpened(): void {
        const values = this.dateTimeForm.value;
        this.time = values.date ? new Date(values.date) : null;
    }

    public onDateTimeRangeOpened(): void {
        const values = this.dateTimeRangeForm.value;
        this.from = values.from ? new Date(values.from) : null;
        this.to = values.to ? new Date(values.to) : null;
    }

    public onDateTimeClosed(time: Date): void {
        const values = this.dateTimeForm.value;
        if (!values.date) {
            values.date = new Date();
        }
        if (!time) {
            time = new Date();
        }
        values.date.setHours(time.getHours());
        values.date.setMinutes(time.getMinutes());
        values.date.setSeconds(time.getSeconds());
        this.dateTimeForm.setValue(values);
    }

    public onDateTimeRangeClosed(from: Date, to: Date): void {
        const values = this.dateTimeRangeForm.value;
        if (!values.from && !values.to) {
            values.from = new Date();
            values.to = new Date();
        } else if (!values.from) {
            values.from = new Date(values.to);
        } else if (!values.to) {
            values.to = new Date(values.from);
        }
        if (!from) {
            from = new Date(0, 0, 0, 0, 0, 0);
        }
        if (!to) {
            to = new Date(0, 0, 0, 23, 59, 59);
        }
        values.from.setHours(from.getHours());
        values.from.setMinutes(from.getMinutes());
        values.from.setSeconds(from.getSeconds());
        values.to.setHours(to.getHours());
        values.to.setMinutes(to.getMinutes());
        values.to.setSeconds(to.getSeconds());
        this.dateTimeRangeForm.setValue(values);
    }
}
