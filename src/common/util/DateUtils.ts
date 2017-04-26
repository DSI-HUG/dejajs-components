/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { DatePipe } from '@angular/common';

/**
 * Date conversion for DPI standards
 */
export class DateUtils {
    public static SYSTEM_DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';

    private static datePipe = new DatePipe('fr-CH');

    /**
     * Fromat a javascript date object to a 'yyyy-MM-dd HH:mm:ss' String Format
     * @param date
     * @returns {string}
     */
    public static formatSystem(date: Date): string {
        return DateUtils.datePipe.transform(date, DateUtils.SYSTEM_DATE_FORMAT);
    }
}
