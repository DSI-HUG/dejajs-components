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
     * Sync cloning of an object
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

            const tgt = typeof target === 'object' ? target : new target();
            if (Array.isArray(obj) !== Array.isArray(tgt)) {
                throw new Error('obj and target must be of the same type. (object <> object or Array <> Array)');
            }

            if (obj && Array.isArray(obj) && Array.isArray(tgt)) {
                return obj.map((o) => {
                    const cloned = {};
                    this.cloneSync(o, cloned);
                    tgt.push(cloned);
                }) as any;
            }

            return cloneInternal(obj, tgt);
        }
    }
}
