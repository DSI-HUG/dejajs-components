/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef } from '@angular/core';

@Directive()
export class TooltipComponent {
    public constructor(
        public elementRef: ElementRef<HTMLElement>
    ) { }
}
