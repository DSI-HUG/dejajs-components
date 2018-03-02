/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaDatePickerModule, DejaGridModule, DejaIntervalSelectorModule, DejaTreeListModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaIntervalSelectorDemoComponent } from './interval-selector-demo';
import { routing } from './interval-selector-demo.routes';

@NgModule({
    declarations: [DejaIntervalSelectorDemoComponent],
    exports: [DejaIntervalSelectorDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        DejaDatePickerModule,
        DejaIntervalSelectorModule,
        DejaMarkdownModule,
        DejaTreeListModule,
        DejaGridModule,
        routing,
    ],
    providers: [
    ],
})
export class DejaIntervalSelectorDemoModule { }
