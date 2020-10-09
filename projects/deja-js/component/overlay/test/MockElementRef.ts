/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ElementRef } from '@angular/core';

export class MockElementRef extends ElementRef {
    public constructor() {
        super(null);
        this.nativeElement = {
            getBoundingClientRect: () => ({ top: 0, left: 0 })
        };
    }
}
