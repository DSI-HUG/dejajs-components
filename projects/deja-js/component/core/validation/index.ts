/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DejaChildValidatorDirective } from './child-validator.directive';

@NgModule({
    declarations: [
        DejaChildValidatorDirective
    ],
    exports: [
        DejaChildValidatorDirective
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class DejaChildValidatorModule { }

export * from './validation-error';
export * from './validation-messages';
export * from './child-validator.directive';
