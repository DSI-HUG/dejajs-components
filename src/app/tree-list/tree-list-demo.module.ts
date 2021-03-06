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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaItemModule } from '@deja-js/component/core';
import { DejaSortingModule } from '@deja-js/component/core';
import { GroupingService } from '@deja-js/component/core';
import { DejaDialogModule } from '@deja-js/component/dialog';
import { DejaDragDropModule } from '@deja-js/component/dragdrop';
import { DejaMessageBoxModule } from '@deja-js/component/message-box';
import { DejaMouseDragDropModule } from '@deja-js/component/mouse-dragdrop';
import { DejaTreeListModule } from '@deja-js/component/tree-list';

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
        ReactiveFormsModule,
        MatFormFieldModule,
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
        DejaMouseDragDropModule,
        DejaDragDropModule,
        DejaSortingModule,
        NewsCardModule,
        routing
    ],
    providers: [
        GroupingService
    ]
})
export class DejaTreeListDemoModule { }
