/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Pipe, PipeTransform } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Pipe({
    name: 'dejaDate'
})
export class DejaDateFormatPipe implements PipeTransform {

    public constructor(private momentDateAdapter: MomentDateAdapter) { }

    public transform(date: Date, format: string) {
        return this.momentDateAdapter.deserialize(date)?.format(format) || date;
    }
}
