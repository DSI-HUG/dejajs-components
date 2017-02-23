/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { Component, ElementRef, Input } from '@angular/core';
import { Rect } from '../../common/core/graphics';

@Component({
    selector: 'deja-tile-selection',
    styleUrls: [
        './tile-selection.component.scss',
    ],
    template: '',
})
export class DejaTileSelectionComponent {
    private element: HTMLElement;

    constructor(el: ElementRef) {
        this.element = el.nativeElement as HTMLElement;
        this.element.setAttribute('hidden', '');
    }

    @Input()
    public set bounds(rect: Rect) {
        if (rect) {
            const {left, top, width, height } = rect;
            this.element.style.left = `${left}px`;
            this.element.style.top = `${top}px`;
            this.element.style.width = `${width}px`;
            this.element.style.height = `${height}px`;
            this.element.removeAttribute('hidden');
        } else {
            this.element.setAttribute('hidden', '');
        }
    }
}
