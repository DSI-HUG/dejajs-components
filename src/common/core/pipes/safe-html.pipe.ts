/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Just for testing
 *
 * @deprecated
 */
@Pipe({ name: 'safeHTML' })
export class SafeHTMLPipe {
    constructor(private sanitizer: DomSanitizer) {
        this.sanitizer = sanitizer;
    }

    public transform(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
