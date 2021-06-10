/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AbstractControl } from '@angular/forms';
export const numberValidator = (control: AbstractControl): string[] => {
    const val = +control.value;
    if (isNaN(val)) {
        return ['Not a number'];
    } else if (val < 0) {
        return [`Expected positive number. Got ${val}`];
    }
    return undefined;
};
