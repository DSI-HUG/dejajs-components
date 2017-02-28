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

import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { DejaMouseDragDropService } from './mouse-dragdrop.service';
import { Observable } from 'rxjs/Rx';
import { Position } from '../../common/core/graphics/position';

/** Menu avec placement optimisé (Voir DejaDropDownComponent) */
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-mouse-dragdrop-cursor',
    styleUrls: [
        './mouse-dragdrop-cursor.component.scss',
    ],
    templateUrl: './mouse-dragdrop-cursor.component.html',
})
export class DejaMouseDragDropCursorComponent {
    constructor(elementRef: ElementRef, private dragDropService: DejaMouseDragDropService) {
        const element = elementRef.nativeElement as HTMLElement;

        Observable.from(this.dragDropService.mousePosition$)
            .subscribe((position) => {
                if (position) {
                    element.style.left = `${position.left}px`;
                    element.style.top = `${position.top}px`;
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
            });
    }
}
