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
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaColorSelectorModule } from '@deja-js/component/color-selector';
import { DejaMessageBoxModule } from '@deja-js/component/message-box';
import { DejaPopupModule } from '@deja-js/component/popup';
import { DejaSnackbarModule } from '@deja-js/component/snackbar';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DummyComponent } from './dummy/dummy.component';
import { DejaPopupCustomDemoComponent } from './popup-custom.component';
import { DejaPopupDemoComponent } from './popup-demo';
import { routing } from './popup-demo.routes';

@NgModule({
    declarations: [DejaPopupDemoComponent, DejaPopupCustomDemoComponent, DummyComponent],
    exports: [DejaPopupDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        MatInputModule,
        DejaColorSelectorModule,
        DejaPopupModule,
        DejaMarkdownModule,
        DejaSnackbarModule,
        DejaMessageBoxModule,
        routing,
    ],
    entryComponents: [
        DejaPopupCustomDemoComponent,
        DummyComponent,
    ]
})
export class DejaPopupDemoModule { }
