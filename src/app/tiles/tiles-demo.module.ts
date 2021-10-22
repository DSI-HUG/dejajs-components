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
import { MatTabsModule } from '@angular/material/tabs';
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
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        MatButtonModule,
        MatCheckboxModule,
        DejaTilesModule,
        DejaMarkdownModule,
        DejaSnackbarModule,
        MouseDragDropModule,
        DejaMessageBoxModule,
        routing
    ],
    providers: [
    ]
})
export class DejaTilesDemoModule { }
