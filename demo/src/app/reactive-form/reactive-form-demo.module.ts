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
import { MatInputModule, MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaChipsModule, DejaCircularPickerModule, DejaColorPickerModule, DejaColorSelectorModule, DejaDatePickerModule, DejaEditableModule, DejaMonacoEditorModule, DejaRangeModule, DejaSelectModule, DejaTagModule, DejaTreeListModule } from '@deja-js/component';
import { StoreModule } from '@ngrx/store';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { userReducer } from './model/user.reducer';
import { DejaReactiveFormDemoComponent } from './reactive-form-demo';
import { routing } from './reactive-form-demo.routes';
import { UserService } from './service/user.service';

@NgModule({
    declarations: [DejaReactiveFormDemoComponent],
    exports: [DejaReactiveFormDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatInputModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        DejaMarkdownModule,
        DejaSelectModule,
        DejaDatePickerModule,
        DejaTreeListModule,
        DejaCircularPickerModule,
        DejaRangeModule,
        DejaColorSelectorModule,
        DejaColorPickerModule,
        DejaChipsModule,
        DejaTagModule,
        DejaEditableModule,
        DejaMonacoEditorModule,
        routing,
        StoreModule.forRoot({}),
        StoreModule.forFeature('userDemo', {
            user: userReducer,
        }),
    ],
    providers: [
        UserService,
    ],

})
export class DejaReactiveFormDemoModule { }
