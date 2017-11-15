/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Pipe, PipeTransform} from '@angular/core';
import * as moment_ from 'moment';
const moment: (value?: any, format?: string) => moment_.Moment = (<any>moment_).default || moment_;

/**
 * Use moment to transform string to date
 * @deprecated
 */
@Pipe({ name: 'stringToDateFormat' })
export class StringToDateFormatPipe implements PipeTransform {
    /**
     * Create a date from a string given in parameter using moment
     *
     * @param dateString date in string format 'DD.MM.YYYY HH:mm:ss'
     * @param format format choosen for the date
     */
    public transform(dateString, format: string): any {
        return moment(dateString, 'DD.MM.YYYY HH:mm:ss').format(format);
    }
}
