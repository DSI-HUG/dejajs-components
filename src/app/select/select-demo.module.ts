/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaItemModule } from '@deja-js/component/core/item-list';
import { DejaDialogModule } from '@deja-js/component/dialog';
import { DejaMessageBoxModule } from '@deja-js/component/message-box';
import { DejaSelectModule } from '@deja-js/component/select';
import { DejaBoldQueryModule } from '@deja-js/component/templates';

import { DejaMarkdownModule } from '../../component/markdown/index';
import { NewsCardModule } from '../common/news-card.module';
import { SelectDemoComponent } from './select-demo';
import { routing } from './select-demo.routes';

@NgModule({
    declarations: [
        SelectDemoComponent
    ],
    exports: [SelectDemoComponent],
    imports: [
        CommonModule,
        DejaBoldQueryModule,
        DejaDialogModule,
        DejaItemModule,
        DejaMarkdownModule,
        DejaMessageBoxModule,
        DejaSelectModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        NewsCardModule,
        ReactiveFormsModule,
        routing
    ],
    providers: [
    ]
})
export class SelectDemoModule { }
