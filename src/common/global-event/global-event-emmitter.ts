/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { IGlobalEventEmmitter } from './global-event-emmiter.interface';

export class GlobalEventEmmitter implements IGlobalEventEmmitter {
    private static _instance: GlobalEventEmmitter;

    public static get instance() {
        if (!this._instance) {
            this._instance = new GlobalEventEmmitter();
        }
        return this._instance;
    }

    private _callbacks = {} as any;

    public off = (event: string, fn: () => void) => {
        return this.removeEventListener(event, fn);
    }

    public removeListener = (event: string, fn: () => void) => {
        return this.removeEventListener(event, fn);
    }

    public removeAllListeners = () => {
        return this.removeEventListener();
    }

    public removeEventListener = (event?: string, fn?: () => void) => {
        this._callbacks = this._callbacks || {};

        // all
        if (!event) {
            this._callbacks = {};
            return this;
        }

        // specific event
        const callbacks = this._callbacks[`$${event}`];
        if (!callbacks) {
            return this;
        }

        // remove all handlers
        if (!fn) {
            delete this._callbacks[`$${event}`];
            return this;
        }

        // remove specific handler
        let cb;
        for (let i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];
            if (cb === fn || cb.fn === fn) {
                callbacks.splice(i, 1);
                break;
            }
        }
        return this;
    }

    public emit = (event: string, ...params: any[]) => {
        this._callbacks = this._callbacks || {};
        let callbacks = this._callbacks[`$${event}`];

        if (callbacks) {
            callbacks = callbacks.slice(0);
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < callbacks.length; ++i) {
                callbacks[i].apply(this, params);
            }
        }

        return this;
    }

    public listeners = (event: string) => {
        this._callbacks = this._callbacks || {};
        return this._callbacks[`$${event}`] || [];
    }

    public hasListeners = (event: string) => {
        return !!this.listeners(event).length;
    }

    public on = (event: string, fn: (params: any[]) => void) => {
        return this.addEventListener(event, fn);
    }

    public addEventListener = (event: string, fn: (params: any[]) => void) => {
        this._callbacks = this._callbacks || {};
        (this._callbacks[`$${event}`] = this._callbacks[`$${event}`] || []).push(fn);
        return this;
    }
}

// tslint:disable-next-line
(<any>window)['GlobalEventEmmitter'] = GlobalEventEmmitter;
