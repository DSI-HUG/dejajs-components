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
import { MatCheckboxModule, MatFormFieldModule, MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaDatePickerModule, DejaDateSelectorModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaDatePickerDemoComponent } from './date-picker-demo';
import { routing } from './date-picker-demo.routes';

@NgModule({
    declarations: [DejaDatePickerDemoComponent],
    exports: [DejaDatePickerDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatCheckboxModule,
        MatTabsModule,
        MatToolbarModule,
        DejaDatePickerModule,
        DejaDateSelectorModule,
        DejaMarkdownModule,
        routing,
    ],
    providers: [
    ],
})
export class DejaDatePickerDemoModule { }
