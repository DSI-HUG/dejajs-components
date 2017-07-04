/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

/**
 * Service for cloning or copying an object
 */
@Injectable()
export class CloningService {
    /**
     * @deprecated 03.07.2017 Use cloneSync with the parameter type specified instead
     */
    public cloneSyncWithPrototype(object: any) {
        if (!object || typeof object !== 'object') {
            return object;
        }

        const target = new object.constructor();
        Object.assign(target, object);
        Object.keys(target).forEach((key) => {
            if (target[key] instanceof Array) {
                const a = target[key] as any[];
                target[key] = a.map((element) => this.cloneSyncWithPrototype(element));
            } else if (target[key] instanceof Date) {
                target[key] = new Date(target[key]);
            } else if (typeof target[key] === 'object') {
                target[key] = this.cloneSyncWithPrototype(target[key]);
            }
        });
        return target;
    }

    /**
     * @deprecated Use clone$ with the parameter type specified instead
     */
    public cloneWithPrototype$(object: any) {
        return Observable.of(this.cloneSyncWithPrototype(object));
    }

    /**
     * Clone an object or a class
     *
     * @param object  The object to clone.
     * @param type The type of object to clone
     * @return A new instance of the passed object and cloned.
     */
    public cloneSync<T>(obj: any, Type?: { new (): T }, ): T {
        if (!Type) {
            return JSON.parse(JSON.stringify(obj));
        } else {
            const cloneInternal = (source: any, target?: any) => {
                if (!target) {
                    target = new source.constructor();
                }

                Object.keys(target).forEach((key) => {
                    const val = source[key];

                    if (typeof val !== 'object' || val === null) {
                        target[key] = val;

                    } else if (Array.isArray(val)) {
                        // just clone arrays (and recursive clone objects inside)
                        const clone = [];
                        val.forEach((item, index) => {
                            clone[index] = cloneInternal(item);
                        });
                        target[key] = clone;

                    } else if (val instanceof Date) {
                        target[key] = new Date(val.getTime());

                    } else if (val instanceof RegExp) {
                        target[key] = new RegExp(val);

                    } else {
                        target[key] = cloneInternal(val);

                    }
                });

                return target;
            };

            const target = new Type();
            cloneInternal(obj, target);
            return target;
        }
    }

    /**
     * @deprecated 01.03.2017
     */
    public clone(object: any) {
        return this.clone$(object).toPromise();
    }

    /**
     * Sync cloning of an object
     *
     * @param object  The object to clone.
     * @param type The type of object to clone
     * @return Observable resolving to the cloned object.
     */
    public clone$<T>(object: any, type?: { new (): T }, ): Observable<T> {
        return Observable.of(this.cloneSync(object, type));
    }

    /**
     * @deprecated 03.07.2017 Use cloneSync with the parameter type specified instead
     */
    public deepCopy(...objects: any[]) {
        if (objects.length < 1 || typeof objects[0] !== 'object') {
            return false;
        }

        if (objects.length < 2) {
            return objects[0];
        }

        const target = objects[0];

        // convert objects to array and cut off target object
        const that = this;  // Keep reference on class
        const args = Array.prototype.slice.call(objects, 1);
        let val;
        let src;

        args.forEach((obj) => {
            // skip argument if it is array or isn't object
            if (typeof obj !== 'object' || Array.isArray(obj)) {
                return;
            }

            Object.keys(obj).forEach((key) => {
                src = target[key]; // source value
                val = obj[key]; // new value

                // recursion prevention
                if (val === target) {
                    return;

                    /**
                     * if new value isn't object then just overwrite by new value
                     * instead of extending.
                     */
                } else if (typeof val !== 'object' || val === null) {
                    target[key] = val;
                    return;

                    // just clone arrays (and recursive clone objects inside)
                } else if (Array.isArray(val)) {
                    target[key] = that.deepCloneArray(val);
                    return;

                    // custom cloning and overwrite for specific objects
                } else if (that.isSpecificValue(val)) {
                    target[key] = that.cloneSpecificValue(val);
                    return;

                    // overwrite by new value if source isn't object or array
                } else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
                    target[key] = that.deepCopy({}, val);
                    return;

                    // source value and new value is objects both, extending...
                } else {
                    target[key] = that.deepCopy(src, val);
                    return;
                }
            });
        });

        return target;
    }

    private deepCloneArray(arr) {
        const clone = [];
        const that = this;
        arr.forEach((item, index) => {
            if (typeof item === 'object' && item !== null) {
                if (Array.isArray(item)) {
                    clone[index] = that.deepCloneArray(item);
                } else if (that.isSpecificValue(item)) {
                    clone[index] = that.cloneSpecificValue(item);
                } else {
                    clone[index] = that.deepCopy({}, item);
                }
            } else {
                clone[index] = item;
            }
        });
        return clone;
    }

    private isSpecificValue(val) {
        return (
            val instanceof Date
            || val instanceof RegExp
        ) ? true : false;
    }

    private cloneSpecificValue(val): any {
        if (val instanceof Date) {
            return new Date(val.getTime());
        } else if (val instanceof RegExp) {
            return new RegExp(val);
        } else {
            throw new Error('Unexpected situation');
        }
    }
}
