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
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaDatePickerModule } from '@deja-js/component/date-picker';
import { DejaDateSelectorModule } from '@deja-js/component/date-selector';

import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaDatePickerDemoComponent } from './date-picker-demo';
import { routing } from './date-picker-demo.routes';

@NgModule({
    declarations: [DejaDatePickerDemoComponent],
    exports: [DejaDatePickerDemoComponent],
    imports: [
        CommonModule,
        DejaDatePickerModule,
        DejaDateSelectorModule,
        DejaMarkdownModule,
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatTabsModule,
        MatToolbarModule,
        routing
    ],
    providers: [
    ]
})
export class DejaDatePickerDemoModule { }
