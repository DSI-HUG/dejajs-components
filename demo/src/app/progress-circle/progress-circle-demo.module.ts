/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule, MatProgressSpinnerModule, MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaListLoaderModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaProgressCircleDemoComponent } from './progress-circle-demo';
import { routing } from './progress-circle-demo.routes';

@NgModule({
    declarations: [DejaProgressCircleDemoComponent],
    exports: [DejaProgressCircleDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatTabsModule,
        MatToolbarModule,
        DejaMarkdownModule,
        DejaListLoaderModule,
        routing,
    ],
    providers: [
    ],
})
export class DejaProgressCircleDemoModule { }
