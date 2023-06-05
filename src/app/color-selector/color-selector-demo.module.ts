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
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaColorPickerModule } from '@deja-js/component/color-picker';
import { DejaColorSelectorModule } from '@deja-js/component/color-selector';

import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaColorSelectorDemoComponent } from './color-selector-demo';
import { routing } from './color-selector-demo.routes';

@NgModule({
    declarations: [DejaColorSelectorDemoComponent],
    exports: [DejaColorSelectorDemoComponent],
    imports: [
        CommonModule,
        DejaColorPickerModule,
        DejaColorSelectorModule,
        DejaMarkdownModule,
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        routing
    ],
    providers: [
    ]
})
export class DejaColorSelectorDemoModule { }
