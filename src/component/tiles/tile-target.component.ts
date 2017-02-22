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

import { Component, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DejaTilesLayoutProvider } from './tiles-layout.provider';

@Component({
    selector: 'deja-tile-target',
    styleUrls: [
        './tile-target.component.scss',
    ],
    template: '',
})
export class DejaTileTargetComponent {
    constructor(el: ElementRef, layoutProvider: DejaTilesLayoutProvider) {
        const element = el.nativeElement as HTMLElement;

        element.setAttribute('hidden', '');

        Observable.from(layoutProvider.dragTargetRect)
            .subscribe((rect) => {
                if (rect) {
                    const {left, top, width, height } = rect;
                    element.style.left = `${left}px`;
                    element.style.top = `${top}px`;
                    element.style.width = `${width}px`;
                    element.style.height = `${height}px`;
                    element.removeAttribute('hidden');
                } else {
                    element.setAttribute('hidden', '');
                }
            });
    }
}
