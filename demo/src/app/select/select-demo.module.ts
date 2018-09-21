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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaBoldQueryModule, DejaDialogModule, DejaItemModule, DejaMessageBoxModule, DejaSelectModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { NewsCardComponent } from '../common/news-card.component';
import { NewsCardModule } from '../common/news-card.module';
import { SelectDemoComponent } from './select-demo';
import { routing } from './select-demo.routes';

@NgModule({
    declarations: [
        SelectDemoComponent,
    ],
    exports: [SelectDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule,
        MatTabsModule,
        MatToolbarModule,
        MatInputModule,
        DejaSelectModule,
        DejaMarkdownModule,
        DejaMessageBoxModule,
        DejaDialogModule,
        DejaItemModule,
        DejaBoldQueryModule,
        NewsCardModule,
        routing,
    ],
    providers: [
    ],
})
export class SelectDemoModule { }
