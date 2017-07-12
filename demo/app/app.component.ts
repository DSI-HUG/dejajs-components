/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import 'rxjs/add/observable/from';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

class Color {
    public label: string;
    public value: string;
    constructor(label?: string, value?: string) {
        this.label = label;
        this.value = value;
    }
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
    public version: string;
    protected navOpened = true;

    protected colors = [
        new Color('HUG', 'hug'),
        new Color('Pink', 'pink'),
        new Color('Teal', 'teal'),
        new Color('Amber', 'amber'),
    ];

    private _theme: Color;
    protected theme$: BehaviorSubject<Color>;
    private theme$sub: Subscription;

    constructor(elementRef: ElementRef) {
        const elem = elementRef.nativeElement as HTMLElement;
        try {
            this._theme = this.colors.find((color) => color.value === localStorage.getItem('dejajs-demo-color'));
        } catch (_e) {
            console.log('Fail to get your prefered color from the local storage.');
        }

        if (!this._theme) {
            this._theme = this.colors[0];
        }
        this.theme$ = new BehaviorSubject<any>(this._theme);
        this.theme$sub = Observable.from(this.theme$).subscribe((theme) => elem.setAttribute('theme', theme.value));
    }

    public get theme() {
        return this._theme;
    }

    public set theme(theme: any) {
        this._theme = theme;
        try {
            localStorage.setItem('dejajs-demo-color', theme.value);
        } catch (_e) {
            console.log('Fail to set your prefered color to the local storage.');
        }

        this.theme$.next(theme);
    }

    public ngOnDestroy() {
        this.theme$sub.unsubscribe();
    }

    protected get debug() {
        // console.log('Binding ' + Date.now());
        return null;
    }
}
