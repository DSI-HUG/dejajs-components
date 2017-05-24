/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
import { PendingOnFocusDirective } from './pending-onfocus.directive';
import { ValidateOnBlurDirective } from './validate-onblur.directive';

@NgModule({
    declarations: [
        PendingOnFocusDirective,
        ValidateOnBlurDirective,
    ],
    exports: [
        PendingOnFocusDirective,
        ValidateOnBlurDirective,
    ],
})
export class DejaFormModule { }

export * from './validate-onblur.directive';
export * from './pending-onfocus.directive';
