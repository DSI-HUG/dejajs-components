import { Position } from './../../common/core/graphics/position';
import { ICursorInfos } from './mouse-dragdrop.service';
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

import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DejaMouseDragDropService } from './mouse-dragdrop.service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

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
    @ViewChild('block') private icon: ElementRef;
    @ViewChild('content') private content: ElementRef;
    private position$ = new BehaviorSubject<Position>(undefined);
    private infos$ = new BehaviorSubject<ICursorInfos>(undefined);
    private _infos: ICursorInfos;

    constructor(elementRef: ElementRef, private dragDropService: DejaMouseDragDropService) {
        const element = elementRef.nativeElement as HTMLElement;

        const position$ = Observable.from(this.position$);

        position$
            .filter((pos) => !!pos)
            .subscribe((pos) => {
                const width = element.offsetWidth;
                const height = element.offsetHeight;
                element.style.left = `${pos.left - width / 2}px`;
                element.style.top = `${pos.top - height / 2}px`;
            });

        position$
            .filter((pos) => !pos)
            .subscribe(() => {
                element.style.left = '';
                element.style.top = '';
            });

        const infos$ = Observable.from(this.infos$);

        // Hide
        infos$
            .filter((infos) => !infos)
            .do(() => {
                if (this._infos) {
                    this.contentElement.style.opacity = '0';
                    this.iconElement.style.opacity = '0';
                }
            })
            .delay(1000)
            .do((infos) => this._infos = infos)
            .subscribe(() => element.style.display = 'none');

        const show$ = infos$
            .filter((infos) => !!infos)
            .do((infos) => {
                element.style.display = '';
                this.contentElement.innerHTML = infos.html;
                this.contentElement.style.display = '';
                this.contentElement.style.opacity = '0';
                this.iconElement.style.display = '';
                this.iconElement.style.opacity = '0';
            })
            .delay(500);

        // Show content
        show$
            .filter((infos) => !!infos.html)
            .do((infos) => {
                element.className = infos.className;
                element.style.width = `${infos.width || 48}px`;
                element.style.height = `${infos.height || 48}px`;
            })
            .delay(500)
            .subscribe((infos) => {
                this._infos = infos;
                this.contentElement.style.opacity = '1';
            });

        // Show block icon
        show$
            .filter((infos) => !infos.html)
            .do(() => {
                element.style.width = '48px';
                element.style.height = '48px';
            })
            .delay(1)
            .do(() => {
                this.iconElement.style.opacity = '1';
            })
            .delay(500)
            .subscribe((infos) => {
                this._infos = infos;
                element.className = '';
            });

        Observable.from(this.dragDropService.cursorInfos$)
            .subscribe((infos) => {
                if (!!infos !== !!this._infos || !infos || !!infos.html !== !!this._infos.html) {
                    // Update Content
                    this.infos$.next(infos);
                } else {
                    // Update only Position
                    this.position$.next(infos.position);
                    this._infos = infos;
                }
            });
    }

    private get iconElement() {
        return this.icon.nativeElement as HTMLElement;
    }

    private get contentElement() {
        return this.content.nativeElement as HTMLElement;
    }
}


