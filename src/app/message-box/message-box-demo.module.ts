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
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaDialogModule } from '@deja-js/component/dialog';
import { DejaMessageBoxModule } from '@deja-js/component/message-box';
import { DejaTooltipModule } from '@deja-js/component/tooltip';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaMessageBoxDemoComponent } from './message-box-demo';
import { routing } from './message-box-demo.routes';

@NgModule({
    declarations: [DejaMessageBoxDemoComponent],
    exports: [DejaMessageBoxDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        MatIconModule,
        DejaDialogModule,
        DejaMessageBoxModule,
        DejaMarkdownModule,
        DejaTooltipModule,
        routing,
    ],
    providers: [
    ],
})
export class DejaMessageBoxDemoModule { }
