/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/**
 * Copy of private mixin https://github.com/angular/components/blob/master/src/material/input/input.ts
 * to make easier input forms.
 */

import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { CanUpdateErrorStateCtor, ErrorStateMatcher, mixinErrorState } from '@angular/material/core';

export class MatInputBase {
    constructor(
        public _defaultErrorStateMatcher: ErrorStateMatcher,
        public _parentForm: NgForm,
        public _parentFormGroup: FormGroupDirective,
        public ngControl: NgControl
    ) { }
}

export const _MatInputMixinBase: CanUpdateErrorStateCtor & typeof MatInputBase = mixinErrorState(MatInputBase);
