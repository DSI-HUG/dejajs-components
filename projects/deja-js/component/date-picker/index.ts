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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DejaChildValidatorModule } from '@deja-js/component/core';
import { DejaDateSelectorModule } from '@deja-js/component/date-selector';
import { DejaOverlayModule } from '@deja-js/component/overlay';
import { TextMaskModule } from 'angular2-text-mask';

import { DejaDatePickerComponent } from './date-picker.component';

@NgModule({
    declarations: [DejaDatePickerComponent],
    exports: [DejaDatePickerComponent],
    imports: [
        CommonModule,
        FormsModule,
        DejaOverlayModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        DejaChildValidatorModule,
        DejaDateSelectorModule,
        TextMaskModule
    ]
})
export class DejaDatePickerModule { }

export * from './format-to-mask';
export * from './date-picker.component';
