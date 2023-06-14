/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
    selector: 'deja-sidenav-menu-separator, [deja-sidenav-menu-separator]'
})
export class DejaSidenavMenuSeparatorDirective {
    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    public constructor() {
        Object.assign(this.elementRef.nativeElement.style, {
            display: 'block',
            background: 'rgba(0, 0, 0, 0.14)',
            height: '1px',
            margin: '8px 0'
        });
    }
}
