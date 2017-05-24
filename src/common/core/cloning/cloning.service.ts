/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

/**
 * Service for cloning or copying an object
 */
@Injectable()
export class CloningService {
    /**
     * Clone an object and his prototype
     *
     * @param object  The object to clone.
     * @return A new instance of the passed object and cloned
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
     * Async Clone of an object and his prototype
     *
     * @param object  The object to clone.
     * @return An observable completed with the cloned object
     */
    public cloneWithPrototype$(object: any) {
        return Observable.of(this.cloneSyncWithPrototype(object));
    }

    /**
     * Clone an object without the prototype
     *
     * @param object  The object to clone.
     * @return A new instance of the passed object and cloned.
     */
    public cloneSync(object: any): any {
        try {
            return JSON.parse(JSON.stringify(object));
        } catch (err) {
            return null;
        }
    }

    /**
     * @deprecated
     */
    public clone(object: any) {
        return this.clone$(object).toPromise();
    }

    /**
     * Sync cloning of an object
     *
     * @param object  The object to clone.
     * @return Observable resolving to the cloned object.
     */
    public clone$(object: any) {
        return Observable.of(this.cloneSync(object));
    }

    /**
     * Extening object that entered in first argument.
     *
     * Returns extended object or false if have no target object or incorrect type.
     *
     * If you wish to clone source object (without modify it), just use empty new
     * object as first argument, like this:
     *   deepCopy({}, yourObj_1, [yourObj_N]);
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

    /**
     * Recursive cloning array.
     */
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
