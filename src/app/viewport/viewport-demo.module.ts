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
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaViewPortModule } from '@deja-js/component/viewport';

import { DejaMarkdownModule } from '../../component/markdown/index';
import { NewsCardModule } from '../common/news-card.module';
import { DejaViewPortDemoComponent } from './viewport-demo';
import { routing } from './viewport-demo.routes';

@NgModule({
    declarations: [DejaViewPortDemoComponent],
    exports: [DejaViewPortDemoComponent],
    imports: [
        CommonModule,
        DejaMarkdownModule,
        DejaViewPortModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        NewsCardModule,
        routing
    ],
    providers: [
    ]
})
export class DejaViewPortDemoModule { }
