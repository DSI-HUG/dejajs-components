/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AbstractControl } from '@angular/forms';
export const cheeseValidator = (control: AbstractControl): ReadonlyArray<string> | null => {
    const val = control.value as string;
    if (val === 'gruyère') {
        return [`${val} is not a fruit`];
    }
    return null;
};
