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
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaDialogModule, DejaDragDropModule, DejaItemModule, DejaMessageBoxModule, DejaMouseDragDropModule, DejaSortingModule, DejaTreeListModule, GroupingService } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { NewsCardModule } from '../common/news-card.module';
import { DejaTreeListDemoComponent } from './tree-list-demo';
import { routing } from './tree-list-demo.routes';

@NgModule({
    declarations: [
        DejaTreeListDemoComponent
    ],
    exports: [
        DejaTreeListDemoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        DejaTreeListModule,
        DejaMarkdownModule,
        DejaMessageBoxModule,
        DejaDialogModule,
        DejaItemModule,
        DejaMouseDragDropModule.forRoot(),
        DejaDragDropModule,
        DejaSortingModule,
        NewsCardModule,
        routing,
    ],
    providers: [
        GroupingService,
    ],
})
export class DejaTreeListDemoModule { }
