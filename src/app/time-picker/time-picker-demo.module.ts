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
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaTimePickerModule } from '@deja-js/component/time-picker';

import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaTimePickerDemoComponent } from './time-picker-demo';
import { routing } from './time-picker-demo.routes';

@NgModule({
    declarations: [DejaTimePickerDemoComponent],
    exports: [DejaTimePickerDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        DejaTimePickerModule,
        DejaMarkdownModule,
        routing
    ],
    providers: [
    ]
})
export class DejaTimePickerDemoModule { }
