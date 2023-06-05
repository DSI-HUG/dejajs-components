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
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaCircularPickerModule } from '@deja-js/component/circular-picker';

import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaCircularPickerDemoComponent } from './circular-picker-demo';
import { routing } from './circular-picker-demo.routes';

@NgModule({
    declarations: [DejaCircularPickerDemoComponent],
    exports: [DejaCircularPickerDemoComponent],
    imports: [
        CommonModule,
        DejaCircularPickerModule,
        DejaMarkdownModule,
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        routing
    ],
    providers: [
    ]
})
export class DejaCircularPickerDemoModule { }
