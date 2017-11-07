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
    private listeners$ = {};
    private listenersFn$ = {};

    constructor() {
        this.globalEventEmmitter = GlobalEventEmmitter.instance;
    }

    public register(event: string) {
        if (!this.listeners$[event]) {
            this.listeners$[event] = new Observable<any[]>(observer => {
                this.listenersFn$[event] = (params: any[]) => {
                    // console.log('message received: ' + event + '  params: ' + params[0]);
                    observer.next(params);
                }
                this.globalEventEmmitter.on(event, this.listenersFn$[event]);
            });
        }

        return this.listeners$[event];
    }

    public unregister(event: string) {
        if (this.listeners$[event]) {
            this.globalEventEmmitter.off(event, this.listenersFn$[event]);
            this.listeners$[event] = undefined;
            this.listenersFn$[event] = undefined;
        }
    }
}
