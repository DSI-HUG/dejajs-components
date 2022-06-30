/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { FormArray, FormControl, ɵElement } from '@angular/forms';

export type ControlsOf<T> = {
    [K in keyof T]:
    T[K] extends Array<infer U> ? FormArray<FormControl<U>> :
        T[K] extends Array<infer U> | undefined ? FormArray<FormControl<U>> :
            T[K] extends ReadonlyArray<infer U> ? FormArray<FormControl<U>> :
                T[K] extends ReadonlyArray<infer U> | undefined ? FormArray<FormControl<U>> :
                    ɵElement<T[K], never>;
};

export * from './input-mixin';
