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
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaGridModule } from '@deja-js/component/data-grid';
import { DejaDialogModule } from '@deja-js/component/dialog';
import { DejaDragDropModule } from '@deja-js/component/dragdrop';
import { DejaMessageBoxModule } from '@deja-js/component/message-box';
import { DejaSplitterModule } from '@deja-js/component/splitter';

import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaGridDemoComponent } from './grid-demo';
import { routing } from './grid-demo.routes';

@NgModule({
    declarations: [DejaGridDemoComponent],
    exports: [DejaGridDemoComponent],
    imports: [
        CommonModule,
        DejaDialogModule,
        DejaDragDropModule,
        DejaGridModule,
        DejaMarkdownModule,
        DejaMessageBoxModule,
        DejaSplitterModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatTabsModule,
        MatToolbarModule,
        routing
    ]
})
export class DejaGridDemoModule { }
