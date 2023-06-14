/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, inject, Input } from '@angular/core';
import { Rect } from '@deja-js/component/core/graphics';

@Directive({
    selector: '[deja-tile-position]'
})
export class DejaTilePositionDirective {
    private element: HTMLElement;

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    public constructor() {
        this.element = this.elementRef.nativeElement;
        this.element.style.display = 'none';
    }

    @Input()
    public set bounds(rect: Rect) {
        if (rect) {
            const { left, top, width, height } = rect;
            this.element.style.left = `${left}px`;
            this.element.style.top = `${top}px`;
            this.element.style.width = `${width}px`;
            this.element.style.height = `${height}px`;
            this.element.style.display = 'block';
        } else {
            this.element.style.display = 'none';
        }
    }
}
