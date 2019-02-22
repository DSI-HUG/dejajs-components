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
import { MatButtonModule, MatIconModule, MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaMessageBoxModule } from '@deja-js/component/message-box';
import { DejaSnackbarModule } from '@deja-js/component/snackbar';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaSnackbarDemoComponent } from './snackbar-demo';
import { routing } from './snackbar-demo.routes';

@NgModule({
    declarations: [DejaSnackbarDemoComponent],
    exports: [DejaSnackbarDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        DejaSnackbarModule,
        DejaMarkdownModule,
        DejaMessageBoxModule,
        routing,
    ],
    providers: [
    ],
})
export class DejaSnackbarDemoModule { }
