/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { Component, ElementRef, Input } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { combineLatestWith, map, takeUntil } from 'rxjs';

import { DejaColorFab } from './color-fab.class';

@Component({
    selector: 'deja-color-fab',
    styleUrls: [
        './color-fab.component.scss'
    ],
    template: '<ng-content></ng-content>'
})
export class DejaColorFabComponent extends Destroy {
    public element: HTMLElement;

    private _colorFab: DejaColorFab;

    public constructor(el: ElementRef) {
        super();
        this.element = el.nativeElement as HTMLElement;
    }

    @Input()
    public set color(colorFab: DejaColorFab) {
        this._colorFab = colorFab;

        if (colorFab) {
            const toggleAttribute = (attribute: string, value: BooleanInput): void => {
                if (value) {
                    this.element.setAttribute(attribute, value.toString());
                } else {
                    this.element.removeAttribute(attribute);
                }
            };

            colorFab.active$.pipe(
                takeUntil(this.destroyed$)
            ).subscribe(value => toggleAttribute('active', value));

            colorFab.color$.pipe(
                combineLatestWith(colorFab.disabled$),
                map(([color, disabled]) => color && disabled ? color.grayScale : color),
                takeUntil(this.destroyed$)
            ).subscribe(color => this.element.style.backgroundColor = color ? color.toHex() : '');
        }
    }

    public get tile(): DejaColorFab {
        return this._colorFab;
    }
}
