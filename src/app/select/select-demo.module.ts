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
import { DejaItemModule } from '@deja-js/core';
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
