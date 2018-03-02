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
import { MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GlobalEventService } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaGlobalEventsDemoComponent } from './global-events-demo';
import { routing } from './global-events-demo.routes';

@NgModule({
    declarations: [DejaGlobalEventsDemoComponent],
    exports: [DejaGlobalEventsDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        DejaMarkdownModule,
        routing,
    ],
    providers: [
        GlobalEventService
    ],
})
export class DejaGlobalEventsDemoModule { }
