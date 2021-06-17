import { Platform } from '@angular/cdk/platform';
import { Directive } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, NativeDateAdapter } from '@angular/material/core';
import { formatWithLocale } from '@deja-js/component/core';
import { parse, startOfToday } from 'date-fns';

export const dateFormat = 'dd.MM.yyyy';
export const dateTimeFormat = 'dd.MM.yyyy HH:mm';

const matDateFormats: MatDateFormats = {
    parse: {
        dateInput: dateFormat
    },
    display: {
        dateInput: dateFormat,
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM yyyy'
    }
};

export class CustomDateAdapter extends NativeDateAdapter {
    parse(value: string): Date | null {
        return parse(value, dateTimeFormat, startOfToday());
    }

    format(date: Date, displayFormat: string): string {
        return formatWithLocale(date, displayFormat);
    }
}

@Directive({
    selector: '[date-format]',
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'fr-CH' },
        {
            provide: DateAdapter,
            useClass: CustomDateAdapter,
            deps: [MAT_DATE_LOCALE, Platform]
        },
        { provide: MAT_DATE_FORMATS, useValue: matDateFormats }
    ]
})
export class CustomDateFormatDirective {
}

const matDateTimeFormats: MatDateFormats = {
    parse: {
        dateInput: dateTimeFormat
    },
    display: {
        dateInput: dateTimeFormat,
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM yyyy'
    }
};

export class CustomDateTimeAdapter extends NativeDateAdapter {
    parse(value: string): Date | null {
        return parse(value, dateTimeFormat, startOfToday());
    }

    format(date: Date, displayFormat: string): string {
        return formatWithLocale(date, displayFormat);
    }
}

@Directive({
    selector: '[date-time-format]',
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'fr-CH' },
        {
            provide: DateAdapter,
            useClass: CustomDateTimeAdapter,
            deps: [MAT_DATE_LOCALE, Platform]
        },
        { provide: MAT_DATE_FORMATS, useValue: matDateTimeFormats }
    ]
})
export class CustomDateTimeFormatDirective {
}
