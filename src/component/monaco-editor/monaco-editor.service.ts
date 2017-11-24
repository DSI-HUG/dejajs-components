/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/publishLast';

/**
 * Monaco Editor Service
 *
 * Service used by Monaco Editor Component to load only once instance of the Monaco Editor Library
 */
@Injectable()
export class MonacoEditorService {
    public monacoApi$: Observable<any>;

    /**
     * Constructor
     */
    constructor() {
        const win = window as any;
        const api$ = new Subject<any>();

        this.monacoApi$ = Observable.from(api$)
            .first()
            .publishLast()
            .refCount();

        const onGotAmdLoader = () => {
            // Load monaco
            win.require(['vs/editor/editor.main'], () => api$.next(win.monaco));
        };

        // Load AMD loader if necessary
        if (!win.require && !win.monaco) {
            const loaderScript = document.createElement('script');
            loaderScript.type = 'text/javascript';
            loaderScript.src = 'vs/loader.js';
            loaderScript.addEventListener('load', onGotAmdLoader);
            document.body.appendChild(loaderScript);
        } else {
            onGotAmdLoader();
        }
    }
}
