/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

/**
 * Service for cloning or copying an object
 */
@Injectable()
export class CloningService {
    /**
     * Clone of an object asyncronously
     *
     * @param object  The object to clone.
     * @param type The type of object to clone
     * @return Observable resolving to the cloned object.
     */
    public clone$<T>(object: any, type?: { new(): T } | object): Observable<T> {
        return Observable.of(this.cloneSync(object, type));
    }

    /**
     * Clone an object or a class
     *
     * @param object  The object to clone.
     * @param target The type or an instance of the target
     * @return The cloned object.
     */
    public cloneSync<T>(obj: object, target?: { new(): T } | object): T {
        if (!target) {
            return JSON.parse(JSON.stringify(obj));
        } else {
            const cloneInternal = (src: any, tgt?: any) => {
                if (!src || typeof src !== 'object') {
                    return src;
                }

                if (!tgt) {
                    tgt = new src.constructor();
                }

                Object.keys(src).forEach((key) => {
                    const val = src[key];

                    if (typeof val !== 'object' || val === null) {
                        tgt[key] = val;

                    } else if (Array.isArray(val)) {
                        // just clone arrays (and recursive clone objects inside)
                        const clone = [];
                        val.forEach((item, index) => {
                            clone[index] = cloneInternal(item);
                        });
                        tgt[key] = clone;

                    } else if (val instanceof Date) {
                        tgt[key] = new Date(val.getTime());

                    } else if (val instanceof RegExp) {
                        tgt[key] = new RegExp(val);

                    } else {
                        tgt[key] = cloneInternal(val);

                    }
                });

                return tgt;
            };

            /** deprecated, replaced by clone array because not working if target is an object */
            if (obj && Array.isArray(obj)) {
                return obj.map((o) => this.cloneSync(o, target)) as any;
            }

            return cloneInternal(obj, typeof target === 'object' ? target : new target());
        }
    }

    /**
     * Clone an Array
     *
     * @param object  The Array to clone.
     * @param target The type or an instance of the target
     * @return The cloned Array.
     */
    public cloneArray<T>(obj: object[], target?: { new(): T } | T[]): T[] {
        if (target && Array.isArray(target)) {
            obj.forEach((o) => {
                const cloned = this.cloneSync(o) as T;
                target.push(cloned);
            });
            return target as T[];
        } else {
            return obj.map((o) => this.cloneSync(o, target));
        }
    }

    /**
     * Clone an array asyncronously
     *
     * @param object  The array to clone.
     * @param target The type or an instance of the target
     * @return Observable resolving to the cloned array.
     */
    public cloneArray$<T>(obj: any[], target?: { new(): T } | T[]): Observable<T> {
        if (target && Array.isArray(target)) {
            obj.forEach((o) => {
                const cloned = this.cloneSync(o) as T;
                target.push(cloned);
            });
            return Observable.from(target);
        } else {
            return Observable.from(obj)
                .switchMap((o) => this.clone$(o, target));
        }
    }
}
