/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable, OnDestroy } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MediaService implements OnDestroy {
    public isMobile$: Observable<boolean>;
    private isAlive = true;

    constructor(media: ObservableMedia) {
        this.isMobile$ = Observable.merge(Observable.of(1), media.asObservable())
            .takeWhile(() => this.isAlive)
            .map(() => media.isActive('xs') || media.isActive('sm'))
            .distinctUntilChanged();
    }

    public ngOnDestroy() {
        this.isAlive = false;
    }
}
