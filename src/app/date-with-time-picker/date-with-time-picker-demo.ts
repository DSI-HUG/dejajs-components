/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Destroy } from '@deja-js/component/core';
import { frCH } from 'date-fns/locale';
import { debounceTime, takeUntil } from 'rxjs';

import { NativeDateTimeAdapter as DateTimeFnsAdapter } from './date-time-adapter';


export const myFormats = {
    parse: {
        dateInput: 'dd.MM.yyyy HH:mm'
    },
    display: {
        dateInput: 'dd.MM.yyyy HH:mm',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'dd.MM.yyyy HH:mm',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

interface DateFormControls {
    date: FormControl<Date | null>;
}

interface DateRangeFormControls {
    from: FormControl<Date | null>;
    to: FormControl<Date | null>;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-time-picker-demo',
    styleUrls: ['./date-with-time-picker-demo.scss'],
    templateUrl: './date-with-time-picker-demo.html',
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: myFormats },
        { provide: MAT_DATE_LOCALE, useValue: frCH },
        { provide: DateAdapter, useClass: DateTimeFnsAdapter }
    ]
})
export class DateWithTimePickerDemoComponent extends Destroy {
    public tabIndex = 1;
    public dateTimeForm: FormGroup<DateFormControls>;
    public dateTimeRangeForm: FormGroup<DateRangeFormControls>;

    public constructor() {
        super();
        this.dateTimeForm = new FormGroup<DateFormControls>({
            date: new FormControl(new Date())
        });

        this.dateTimeRangeForm = new FormGroup<DateRangeFormControls>({
            from: new FormControl<Date | null>(null),
            to: new FormControl<Date | null>(null)
        });

        this.dateTimeForm.valueChanges.pipe(
            debounceTime(10),
            takeUntil(this.destroyed$)
        ).subscribe(values => {
            console.log('date time selected', values.date);
        });

        this.dateTimeRangeForm.valueChanges.pipe(
            debounceTime(10),
            takeUntil(this.destroyed$)
        ).subscribe(values => {
            console.log('date time range selected', values.from, 'to', values.to);
        });
    }

    public getError(validationErrors: ValidationErrors | null): string | null {
        if (!validationErrors) {
            return null;
        } else if (validationErrors.matDatepickerMax) {
            return 'La date est trop grande';
        } else if (validationErrors.matDatepickerMin) {
            return 'La date est trop petite';
        } else if (validationErrors.invalidDate) {
            return 'La date est invalide';
        } else if (validationErrors.required) {
            return 'La date est manquante';
        } else {
            return 'La date est invalide ou manquante';
        }
    }
}
