/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { catchError, Observable, of, throwError } from 'rxjs';

export interface CacheEntry<T> {
    timeStamp: number;
    data$: T;
}

export class Cache<T, K = string> extends Map<K, CacheEntry<T>> {

    public constructor(public duty = 86400000) {
        super();
    }

    public clear(timeStamp?: number): void {
        this.forEach((value, key) => {
            if (!timeStamp || (value.timeStamp && value.timeStamp <= timeStamp)) {
                this.delete(key);
            }
        });
    }

    public getCache(key: K, defaultValueFn?: (timeStamp: number) => T): T | undefined {
        const now = Date.now();

        // clear obsolete caches
        this.clear(now);

        let entry = super.get(key);
        if (!entry && defaultValueFn) {
            super.set(key, entry = {
                timeStamp: this.duty ? now + this.duty : 0,
                data$: defaultValueFn(now)
            });
        }
        return entry?.data$;
    }

    public setCache(key: K, value: T): void {
        super.set(key, {
            timeStamp: this.duty ? Date.now() + this.duty : 0,
            data$: value
        });
    }
}

export class ObservableCache<T, K = string> extends Cache<Observable<T | undefined>, K> {
    // eslint-disable-next-line rxjs/finnish
    public getCache(key: K, defaultValueFn?: (timeStamp: number) => Observable<T>): Observable<T | undefined> {
        const data$ = super.getCache(key, defaultValueFn);
        if (!data$) {
            return of(undefined);
        }

        return data$.pipe(
            catchError((err: unknown) => {
                // Clear cache entry in case of observable failure
                this.delete(key);
                return throwError(() => err);
            })
        );
    }
}
