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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
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
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        ReactiveFormsModule,
        routing
    ],
    providers: [
    ]
})
export class DejaContentEditableDemoModule { }
