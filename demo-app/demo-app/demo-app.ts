/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'demo-app',
    styleUrls: ['./demo-app.scss'],
    templateUrl: './demo-app.html',
})
export class DemoAppComponent {
    public version: string;
    protected navOpened = true;

    protected colors = [
        {label: 'HUG', value: 'hug'},
        {label: 'Pink', value: 'pink'},
        {label: 'Teal', value: 'teal'},
        {label: 'Amber', value: 'amber'},
    ];

    private _theme = this.colors.find((color) => color.value === localStorage.getItem('dejajs-demo-color')) || this.colors[0];
    protected theme$ = new BehaviorSubject<any>(this._theme);

    constructor (elementRef: ElementRef) {
        const elem = elementRef.nativeElement as HTMLElement;

        Observable.from(this.theme$).subscribe((theme) => elem.setAttribute('theme', theme.value) );
    }

    public get theme() {
        return this._theme;
    }

    public set theme(theme: any) {
        this._theme = theme;
        localStorage.setItem('dejajs-demo-color', theme.value);
        this.theme$.next(theme);
    }

    protected get debug() {
        // console.log('Binding ' + Date.now());
        return null;
    }
}

