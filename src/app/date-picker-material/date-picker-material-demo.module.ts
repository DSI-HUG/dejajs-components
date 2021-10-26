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
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaTimePickerModule } from '@deja-js/component/time-picker';

import { DejaMarkdownModule } from '../../component/markdown';
import { CustomDateFormatDirective, CustomDateTimeFormatDirective } from './custom-date-format.directive';
import { DejaDatePickerMaterialDemoComponent } from './date-picker-material-demo';
import { routing } from './date-picker-material-demo.routes';

@NgModule({
    declarations: [CustomDateFormatDirective, CustomDateTimeFormatDirective, DejaDatePickerMaterialDemoComponent],
    exports: [DejaDatePickerMaterialDemoComponent],
    imports: [
        CommonModule,
        DejaMarkdownModule,
        DejaTimePickerModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        MatTabsModule,
        MatToolbarModule,
        ReactiveFormsModule,
        routing
    ],
    providers: [
    ]
})
export class DejaDatePickerMaterialDemoModule { }
