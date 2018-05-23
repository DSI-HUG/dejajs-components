/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/* From Angular for infos
export const DEFAULT_BREAKPOINTS = [
    {
        alias: 'xs',
        mediaQuery: '(min-width: 0px) and (max-width: 599px)'
    },
    {
        alias: 'gt-xs',
        overlapping: true,
        mediaQuery: '(min-width: 600px)'
    },
    {
        alias: 'lt-sm',
        overlapping: true,
        mediaQuery: '(max-width: 599px)'
    },
    {
        alias: 'sm',
        mediaQuery: '(min-width: 600px) and (max-width: 959px)'
    },
    {
        alias: 'gt-sm',
        overlapping: true,
        mediaQuery: '(min-width: 960px)'
    },
    {
        alias: 'lt-md',
        overlapping: true,
        mediaQuery: '(max-width: 959px)'
    },
    {
        alias: 'md',
        mediaQuery: '(min-width: 960px) and (max-width: 1279px)'
    },
    {
        alias: 'gt-md',
        overlapping: true,
        mediaQuery: '(min-width: 1280px)'
    },
    {
        alias: 'lt-lg',
        overlapping: true,
        mediaQuery: '(max-width: 1279px)'
    },
    {
        alias: 'lg',
        mediaQuery: '(min-width: 1280px) and (max-width: 1919px)'
    },
    {
        alias: 'gt-lg',
        overlapping: true,
        mediaQuery: '(min-width: 1920px)'
    },
    {
        alias: 'lt-xl',
        overlapping: true,
        mediaQuery: '(max-width: 1920px)'
    },
    {
        alias: 'xl',
        mediaQuery: '(min-width: 1920px) and (max-width: 5000px)'
    }
];
*/

import { Injectable, NgZone, OnDestroy } from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MediaService implements OnDestroy {
    private isAlive = true;
    public isMobile$: Observable<boolean>;
    public mediaChanged$: BehaviorSubject<string>;
    public mql = {} as { [alias: string]: MediaQueryList };

    constructor(private zone: NgZone) {

        this.mql.xs = window.matchMedia('(max-width: 599px)');
        this.mql.sm = window.matchMedia('(min-width: 600px) and (max-width:959px)');
        this.mql.md = window.matchMedia('(min-width: 860px) and (max-width:1279px)');
        this.mql.lg = window.matchMedia('(min-width: 1280px)');

        Object.keys(this.mql).forEach((alias) => {
            this.mql[alias].addListener(this.onMQLEvent.bind(this, alias));
            if (this.mql[alias].matches) {
                this.mediaChanged$ = new BehaviorSubject(alias);
            }
        });

        this.isMobile$ = Observable.from(this.mediaChanged$)
            .takeWhile(() => this.isAlive)
            .map(() => this.mql.xs.matches || this.mql.sm.matches)
            .distinctUntilChanged();
    }

    public ngOnDestroy() {
        Object.keys(this.mql).forEach((alias) => {
            this.mql[alias].removeListener(this.onMQLEvent as any);
            delete this.mql[alias];
        });
        this.isAlive = false;
    }

    private onMQLEvent(alias: string) {
        this.zone.run(() => {
            this.mediaChanged$.next(alias);
        });
    }
}
