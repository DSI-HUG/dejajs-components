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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ViewPortModule } from '@deja-js/component/v2/viewport';

import { DejaMarkdownModule } from '../../../component/markdown/index';
import { NewsCardModule } from '../../common/news-card.module';
import { ViewPortDemoComponent } from './viewport-demo';
import { routing } from './viewport-demo.routes';

@NgModule({
    declarations: [ViewPortDemoComponent],
    exports: [ViewPortDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        ViewPortModule,
        DejaMarkdownModule,
        NewsCardModule,
        routing
    ],
    providers: [
    ]
})
export class ViewPortDemoModule { }
