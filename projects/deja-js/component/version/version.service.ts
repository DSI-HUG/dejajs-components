/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';

import * as dejaJsComponentPkg from '../package.json';

interface PackageJsonInterface {
    version: string;
}

@Injectable({
    providedIn: 'root'
})
export class VersionService {

    public dejajsComponentVersion: string;

    public init(): void {
        const pkgJson = dejaJsComponentPkg as unknown;
        this.dejajsComponentVersion = (pkgJson as PackageJsonInterface).version;
        document.body.setAttribute('dejajs-component-version', this.dejajsComponentVersion);
    }
}
