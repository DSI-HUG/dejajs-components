/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

/**
 * @deprecated
 */
@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
    public transform(value): any {
        return Object.keys(value).map((key) => value[key]);
    }
}
