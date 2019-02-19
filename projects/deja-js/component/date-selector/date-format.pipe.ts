/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Pipe, PipeTransform } from '@angular/core';

import * as moment_ from 'moment';
const moment: (value?: any, format?: string) => moment_.Moment = (<any>moment_).default || moment_;

@Pipe({
    name: 'dejaDate'
})
export class DejaDateFormatPipe implements PipeTransform {
    public transform(date: Date, format: string) {
        return moment(date).format(format);
    }
}
