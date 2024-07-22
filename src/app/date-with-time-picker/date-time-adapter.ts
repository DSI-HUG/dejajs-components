/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { DateTimeAdapter } from '@deja-js/component/date-picker/datepicker-with-time';

@Injectable()
export class NativeDateTimeAdapter extends DateFnsAdapter implements DateTimeAdapter<Date> {

    public setTime(date: Date, hours: number, minutes: number, seconds: number): Date {
        date.setHours(hours, minutes, seconds);
        return date;
    }

}
