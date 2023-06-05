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
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaEditableModule } from '@deja-js/component/content-editable';

import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaContentEditableDemoComponent } from './content-editable-demo';
import { routing } from './content-editable-demo.routes';

@NgModule({
    declarations: [DejaContentEditableDemoComponent],
    exports: [DejaContentEditableDemoComponent],
    imports: [
        CommonModule,
        DejaEditableModule,
        DejaMarkdownModule,
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatTabsModule,
        MatToolbarModule,
        routing
    ],
    providers: [
    ]
})
export class DejaContentEditableDemoModule { }
