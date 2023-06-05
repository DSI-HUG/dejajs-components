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
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaMessageBoxModule } from '@deja-js/component/message-box';
import { DejaSnackbarModule } from '@deja-js/component/snackbar';
import { DejaTilesModule } from '@deja-js/component/tiles';
import { MouseDragDropModule } from '@deja-js/component/v2/mouse-dragdrop';

import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaTilesDemoComponent } from './tiles-demo';
import { routing } from './tiles-demo.routes';

@NgModule({
    declarations: [DejaTilesDemoComponent],
    exports: [DejaTilesDemoComponent],
    imports: [
        CommonModule,
        DejaMarkdownModule,
        DejaMessageBoxModule,
        DejaSnackbarModule,
        DejaTilesModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatTabsModule,
        MatToolbarModule,
        MouseDragDropModule,
        routing
    ],
    providers: [
    ]
})
export class DejaTilesDemoModule { }
