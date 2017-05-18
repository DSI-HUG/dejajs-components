/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DejaColorFab } from './index';

@Component({
    selector: 'deja-color-fab',
    styleUrls: [
        './color-fab.component.scss',
    ],
    template: '<ng-content></ng-content>',
})
export class DejaColorFabComponent {
    public element: HTMLElement;

    private _colorFab: DejaColorFab;
    private subscriptions = [] as Subscription[];

    constructor(el: ElementRef) {
        this.element = el.nativeElement as HTMLElement;
    }

    @Input()
    public set color(colorFab: DejaColorFab) {
        this._colorFab = colorFab;

        if (colorFab) {
            const toogleAttribute = (attribute: string, value: string | boolean) => {
                    if (value) {
                    this.element.setAttribute(attribute, value.toString());
                    } else {
                    this.element.removeAttribute(attribute);
                    }
            };

            this.subscriptions.push(Observable.from(colorFab.active$).subscribe((value) => toogleAttribute('active', value)));

            this.subscriptions.push(Observable.combineLatest(colorFab.color$, colorFab.disabled$)
                .map(([color, disabled]) => color && disabled ? color.grayScale : color)
                .subscribe((color) => this.element.style.backgroundColor = color ? color.toHex() : ''));

        } else {
            this.subscriptions.forEach((subscription) => subscription.unsubscribe());
            this.subscriptions = [];
        }
    }

    public get tile() {
        return this._colorFab;
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
