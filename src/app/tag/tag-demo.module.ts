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
import { DejaTagModule } from '@deja-js/component/tag';

import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaTagDemoComponent } from './tag-demo.component';
import { routing } from './tag-demo.routes';

@NgModule({
    declarations: [DejaTagDemoComponent],
    exports: [DejaTagDemoComponent],
    imports: [
        CommonModule,
        DejaMarkdownModule,
        DejaTagModule,
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        routing
    ],
    providers: [
    ]
})
export class DejaTagDemoModule { }
