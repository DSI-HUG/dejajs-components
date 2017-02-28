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
import { Position } from './../../common/core/graphics/position';
import { ICursorInfos } from './mouse-dragdrop.service';

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
                element.style.left = `${pos.left}px`;
                element.style.top = `${pos.top}px`;
            });

        position$
            .filter((pos) => !pos)
            .subscribe(() => {
                element.style.left = '-1000px';
                element.style.top = '-1000px';
            });

        const infos$ = Observable.from(this.infos$);

        // Hide
        infos$
            .filter((infos) => !infos)
            .do(() => {
                if (this._infos) {
                    this.contentElement.style.opacity = '0';
                    this.iconElement.style.opacity = '0';
                    this.position$.next(null);
                }
            })
            .delay(150)
            .do((infos) => this._infos = infos)
            .subscribe(() => element.style.display = 'none');

        const show$ = infos$
            .filter((infos) => !!infos)
            .do(() => {
                element.style.display = '';
                this.contentElement.style.opacity = '0';
                this.iconElement.style.opacity = '0';
            });

        // Show content
        show$
            .filter((infos) => !!infos.html)
            .do((infos) => {
                this.contentElement.innerHTML = infos.html;
                element.className = infos.className;
                this.contentElement.style.width = `${infos.width || 48}px`;
                this.contentElement.style.height = `${infos.height || 48}px`;
            })
            .delay(1)
            .do(() => this.contentElement.style.opacity = '1')
            .delay(150)
            .subscribe((infos) => this._infos = infos);

        // Show block icon
        show$
            .filter((infos) => !infos.html)
            .delay(1)
            .do(() => this.iconElement.style.opacity = '1')
            .delay(150)
            .subscribe((infos) => {
                this._infos = infos;
                this.contentElement.innerHTML = '';
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


