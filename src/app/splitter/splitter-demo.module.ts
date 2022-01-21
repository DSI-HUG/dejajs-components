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
import { DejaSplitterModule } from '@deja-js/component/splitter';

import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaSplitterDemoComponent } from './splitter-demo';
import { routing } from './splitter-demo.routes';

@NgModule({
    declarations: [DejaSplitterDemoComponent],
    exports: [DejaSplitterDemoComponent],
    imports: [
        CommonModule,
        DejaMarkdownModule,
        DejaSplitterModule,
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        routing
    ],
    providers: [
    ]
})
export class DejaSplitterDemoModule { }
