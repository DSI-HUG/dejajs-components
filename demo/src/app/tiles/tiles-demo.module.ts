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
import { MatButtonModule, MatCheckboxModule, MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaMessageBoxModule, DejaMouseDragDropModule, DejaSnackbarModule, DejaTilesModule } from '@deja-js/component';
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
        DejaMouseDragDropModule,
        DejaMessageBoxModule,
        routing,
    ],
    providers: [
    ],
})
export class DejaTilesDemoModule { }
