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
import { DejaSortingModule } from '@deja-js/component/core/item-list';
import { DejaDialogModule } from '@deja-js/component/dialog';
import { DejaMessageBoxModule } from '@deja-js/component/message-box';
import { ItemModule } from '@deja-js/component/v2/item-list';
import { MouseDragDropModule } from '@deja-js/component/v2/mouse-dragdrop';
import { DejaNumericStepperModule } from '@deja-js/component/v2/numeric-stepper';
import { TreeListModule } from '@deja-js/component/v2/tree-list';

import { FoldersService } from 'src/app/services/folders.service';

import { DejaMarkdownModule } from '../../../component/markdown/index';
import { NewsCardModule } from '../../common/news-card.module';
import { TreeListDemoComponent } from './tree-list-demo';
import { routing } from './tree-list-demo.routes';

@NgModule({
    declarations: [
        TreeListDemoComponent
    ],
    exports: [
        TreeListDemoComponent
    ],
    imports: [
        CommonModule,
        DejaDialogModule,
        DejaMarkdownModule,
        DejaMessageBoxModule,
        DejaNumericStepperModule,
        DejaSortingModule,
        FormsModule,
        ItemModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        MouseDragDropModule,
        NewsCardModule,
        ReactiveFormsModule,
        routing,
        TreeListModule
    ],
    providers: [
        FoldersService
    ]
})
export class TreeListDemoModule { }
