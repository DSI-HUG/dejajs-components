/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DATE_TIME_ADAPTER = new InjectionToken<DateTimeAdapter<unknown>>('DATE_TIME_ADAPTER');

export interface DateTimeAdapter<D> {
    setTime: (date: D, hours: number, minutes: number, seconds: number) => D;
}
