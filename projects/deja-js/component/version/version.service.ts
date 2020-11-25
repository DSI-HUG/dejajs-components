/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';

import * as dejaJsComponentPkg from '../package.json';

@Injectable({
    providedIn: 'root'
})
export class VersionService {

    public dejajsComponentVersion = dejaJsComponentPkg.version;

    public init(): void {
        document.body.setAttribute('dejajs-component-version', this.dejajsComponentVersion);
    }
}
