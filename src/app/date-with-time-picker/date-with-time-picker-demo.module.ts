/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DatepickerWithTimeComponent } from '@deja-js/component/date-picker/datepicker-with-time';

import { DejaMarkdownModule } from '../../component/markdown/index';
import { DateWithTimePickerDemoComponent } from './date-with-time-picker-demo';
import { routing } from './date-with-time-picker-demo.routes';

@NgModule({
    declarations: [DateWithTimePickerDemoComponent],
    exports: [DateWithTimePickerDemoComponent],
    imports: [
        CommonModule,
        DatepickerWithTimeComponent,
        DejaMarkdownModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatLegacyButtonModule,
        MatLegacyButtonModule,
        MatTabsModule,
        MatToolbarModule,
        ReactiveFormsModule,
        routing
    ],
    providers: [
    ]
})
export class DejaContentEditableDemoModule { }
