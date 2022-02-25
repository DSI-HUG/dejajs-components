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
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaDialogModule } from '@deja-js/component/dialog';
import { DejaMessageBoxModule } from '@deja-js/component/message-box';

import { TooltipModule } from '../../../projects/deja-js/component/v2/tooltip/index';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaMessageBoxDemoComponent } from './message-box-demo';
import { routing } from './message-box-demo.routes';
import { NewsTooltipService } from './tooltip/news-tooltip.service';

@NgModule({
    declarations: [DejaMessageBoxDemoComponent],
    exports: [DejaMessageBoxDemoComponent],
    imports: [
        CommonModule,
        DejaDialogModule,
        DejaMarkdownModule,
        DejaMessageBoxModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatTabsModule,
        MatToolbarModule,
        routing,
        TooltipModule
    ],
    providers: [
        NewsTooltipService
    ]
})
export class DejaMessageBoxDemoModule { }
