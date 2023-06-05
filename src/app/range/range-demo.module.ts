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
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaMessageBoxModule } from '@deja-js/component/message-box';
import { DejaRangeModule } from '@deja-js/component/range';
import { DejaSnackbarModule } from '@deja-js/component/snackbar';

import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaRangeDemoComponent } from './range-demo';
import { routing } from './range-demo.routes';

@NgModule({
    declarations: [DejaRangeDemoComponent],
    exports: [DejaRangeDemoComponent],
    imports: [
        CommonModule,
        DejaMarkdownModule,
        DejaMessageBoxModule,
        DejaRangeModule,
        DejaSnackbarModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        routing
    ],
    providers: [
    ]
})
export class DejaRangeDemoModule { }
