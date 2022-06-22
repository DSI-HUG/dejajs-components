/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type ControlsOf<T> = {
    [K in keyof T]: T[K] extends Array<infer U> ? FormArray<FormGroup<ControlsOf<U>>> : T[K] extends Record<string, unknown> ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>;
};

export * from './input-mixin';
