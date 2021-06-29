/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Destroy } from '@deja-js/component/core';
import { combineLatest, merge, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    public dateTimeRangeApplied = false;

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
            datetime: null,
            time: null
        });

        this.dateTimeRangeForm = this.fb.group({
            startDateTime: null,
            endDateTime: null,
            startTime: null,
            endTime: null
        });

        this.dateTimeForm.valueChanges.pipe(
            takeUntil(this.destroyed$)
        ).subscribe((values: { time: Date; datetime: Date }) => {
            let datetime = values.datetime;
            if (!datetime) {
                datetime = new Date();
            }
            datetime.setHours(values.time?.getHours() || 0);
            datetime.setMinutes(values.time?.getMinutes() || 0);
            datetime.setSeconds(values.time?.getSeconds() || 0);
            this.dateTimeForm.controls.datetime.setValue(datetime, { emitEvent: false, emitModelToViewChange: true });
            console.log(datetime);
        });

        const startDateTime$ = combineLatest([of(this.dateTimeRangeForm.controls.startDateTime), this.dateTimeRangeForm.controls.startDateTime.valueChanges, this.dateTimeRangeForm.controls.startTime.valueChanges]);
        const endDateTime$ = combineLatest([of(this.dateTimeRangeForm.controls.endDateTime), this.dateTimeRangeForm.controls.endDateTime.valueChanges, this.dateTimeRangeForm.controls.endTime.valueChanges]);
        merge(startDateTime$, endDateTime$).pipe(
            takeUntil(this.destroyed$)
        ).subscribe(([control, dateTime, time]: [AbstractControl, Date, Date]) => {
            if (!dateTime) {
                dateTime = new Date();
            }

            dateTime.setHours(time?.getHours() || 0);
            dateTime.setMinutes(time?.getMinutes() || 0);
            dateTime.setSeconds(time?.getSeconds() || 0);
            control.setValue(dateTime, { emitEvent: false, emitModelToViewChange: true });
            console.log(dateTime);
        });
    }
}
