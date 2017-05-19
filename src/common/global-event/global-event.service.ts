/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalEventEmmitter } from './global-event-emmitter';

@Injectable()
export class GlobalEventService {
    private globalEventEmmitter: GlobalEventEmmitter;

    constructor() {
        this.globalEventEmmitter = GlobalEventEmmitter.instance;
    }

    public register(event: string) {
        return new Observable<any[]>(observer => {
            this.globalEventEmmitter.on(event, (params: any[]) => {
                // console.log('message received: ' + event + '  params: ' + params[0]);
                observer.next(params);
            });
        });
    }
}
