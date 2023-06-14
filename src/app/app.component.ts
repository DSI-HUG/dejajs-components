/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewEncapsulation } from '@angular/core';
import { DejaTextMetricsService, Destroy } from '@deja-js/component/core';
import { IconService } from '@deja-js/component/core/graphics';
import { BehaviorSubject, takeUntil } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})
export class AppComponent extends Destroy {
    public version: string;
    private _theme: string;
    private theme$: BehaviorSubject<string>;

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private iconService = inject(IconService);
    private textMetrics = inject(DejaTextMetricsService);

    public constructor() {
        super();

        this.textMetrics.metricsElem = this.elementRef.nativeElement;

        try {
            this._theme = localStorage.getItem('dejajs-demo-color');
        } catch (_e) {
            console.log('Fail to get your prefered color from the local storage.');
        }

        if (!this._theme) {
            this._theme = 'blue';
        }
        this.theme$ = new BehaviorSubject<string>(this._theme);
        this.theme$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe(theme => document.body.setAttribute('theme', theme));

        this.iconService.addSvgIcon('angular', 'assets/img/logo/angular.svg');
        // iconService.useMaterialIcons(false);
    }

    public get theme(): string {
        return this._theme;
    }

    public set theme(theme: string) {
        this._theme = theme;
        try {
            localStorage.setItem('dejajs-demo-color', theme);
        } catch (_e) {
            console.log('Fail to set your prefered color to the local storage.');
        }

        this.theme$.next(theme);
    }
}
