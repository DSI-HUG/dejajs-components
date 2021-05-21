/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Pipe, PipeTransform } from '@angular/core';
import { formatWithLocale } from '@deja-js/component/core';

@Pipe({
    name: 'dejaDate'
})
export class DejaDateFormatPipe implements PipeTransform {

    public transform(date: Date, dateFormat: string): string | Date {
        return formatWithLocale(date, dateFormat) || date;
    }
}
