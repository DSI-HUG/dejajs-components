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

import { Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { DejaTile } from './tile.class';

@Component({
    selector: 'deja-tile',
    styleUrls: [
        './tile.component.scss',
    ],
    templateUrl: './tile.component.html',
})
export class DejaTileComponent implements OnDestroy {
    @Input() public template;
    @Input() public designMode;

    public element: HTMLElement;

    private _tile: DejaTile;
    private subscriptions = [] as Subscription[];

    constructor(el: ElementRef) {
        this.element = el.nativeElement as HTMLElement;
        this.element.setAttribute('hidden', '0');
    }

    @Input()
    public set tile(tile: DejaTile) {
        this._tile = tile;

        if (tile) {
            this.subscriptions.push(Observable.from(tile.pixelBounds$)
                .first()
                .delay(1)
                .filter(() => !this._tile.isHidden)
                .subscribe(() => {
                    this.element.removeAttribute('hidden');
                }));

            this.subscriptions.push(Observable.from(tile.pixelBounds$)
                .subscribe((bounds) => {
                    this.element.style.left = `${bounds.left}px`;
                    this.element.style.top = `${bounds.top}px`;
                    this.element.style.width = `${bounds.width}px`;
                    this.element.style.height = `${bounds.height}px`;
                }));

            this.subscriptions.push(Observable.from(tile.pressed$)
                .subscribe((value) => {
                    if (value) {
                        this.element.setAttribute('pressed', '');
                    } else {
                        this.element.removeAttribute('pressed');
                    }
                }));

            this.subscriptions.push(Observable.from(tile.selected$)
                .subscribe((value) => {
                    if (value) {
                        this.element.setAttribute('selected', '');
                    } else {
                        this.element.removeAttribute('selected');
                    }
                }));

            this.subscriptions.push(Observable.from(tile.dragging$)
                .subscribe((value) => {
                    if (value) {
                        this.element.setAttribute('drag', '');
                    } else {
                        this.element.removeAttribute('drag');
                    }
                }));

            this.subscriptions.push(Observable.from(tile.dropping$)
                .subscribe((value) => {
                    if (value) {
                        this.element.setAttribute('drop', '');
                    } else {
                        this.element.removeAttribute('drop');
                    }
                }));

            this.subscriptions.push(Observable.from(tile.cutted$)
                .subscribe((value) => {
                    if (value) {
                        this.element.setAttribute('cutted', '');
                    } else {
                        this.element.removeAttribute('cutted');
                    }
                }));

            this.subscriptions.push(Observable.from(tile.expanded$)
                .subscribe((value) => {
                    if (value) {
                        this.element.setAttribute('expanded', '');
                    } else {
                        this.element.removeAttribute('expanded');
                    }
                }));

            this.subscriptions.push(Observable.from(tile.deleted$)
                .subscribe(() => {
                    this.element.remove();
                }));

            const tooogleHide$ = Observable.from(tile.hidden$)
                .do((value) => {
                    if (value) {
                        this.element.setAttribute('hidden', '1');
                    } else {
                        this.element.setAttribute('hidden', '2');
                    }
                });

            // Hide
            this.subscriptions.push(tooogleHide$
                .filter((value) => value)
                .delay(1000)
                .subscribe(() => this.element.setAttribute('hidden', '0')));

            // Show
            this.subscriptions.push(tooogleHide$
                .filter((value) => !value)
                .delay(1)
                .subscribe(() => this.element.removeAttribute('hidden')));

        } else {
            this.subscriptions.forEach((subscription) => subscription.unsubscribe());
            this.subscriptions = [];
        }
    }

    public get tile() {
        return this._tile;
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
