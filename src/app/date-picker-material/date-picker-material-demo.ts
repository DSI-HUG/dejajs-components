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

        this.dateForm.valueChanges.pipe(
            debounceTime(10),
            takeUntil(this.destroyed$)
        ).subscribe(values => {
            console.log('date selected', values.date);
        });

        this.dateRangeForm.valueChanges.pipe(
            debounceTime(10),
            takeUntil(this.destroyed$)
        ).subscribe(values => {
            console.log('Range selected', values.from, 'to', values.to);
        });
    }

    public onDateTimeClosed(time: Date): void {
        const values = this.dateForm.value;
        if (!values.date) {
            values.date = new Date();
        }
        if (!time) {
            time = new Date();
        }
        values.date.setHours(time.getHours());
        values.date.setMinutes(time.getMinutes());
        values.date.setSeconds(time.getSeconds());
        this.dateForm.setValue(values);
    }

    public onDateTimeRangeClosed(from: Date, to: Date): void {
        const values = this.dateRangeForm.value;
        if (!values.from && !values.to) {
            values.from = new Date();
            values.to = new Date();
        } else if (!values.from) {
            values.from = values.to;
        } else if (!values.to) {
            values.to = values.from;
        }
        values.from.setHours(from?.getHours() || 0);
        values.from.setMinutes(from?.getMinutes() || 0);
        values.from.setSeconds(from?.getSeconds() || 0);
        values.to.setHours(to?.getHours() || 0);
        values.to.setMinutes(to?.getMinutes() || 0);
        values.to.setSeconds(to?.getSeconds() || 0);
        this.dateRangeForm.setValue(values);
    }
}
