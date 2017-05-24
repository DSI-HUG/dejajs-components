/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { routing } from './route';

import { AppComponent } from './app.component';

import { GroupingModule } from '../../src/common/core/grouping/index';
import { MaterialColors } from '../../src/common/core/style/material-colors';
import { GlobalEventService } from './../../src/common/global-event/global-event.service';
import { NewsCardComponent } from './common/news-card.component';
import { userReducer } from './reactive-form/model/user.reducer';
import { UserService } from './reactive-form/service/user.service';
import { CountriesListService } from './services/countries-list.service';
import { CountriesService } from './services/countries.service';
import { DrugsService } from './services/drugs.service';
import { NewsService } from './services/news.service';

import {
    DejaAccordionModule,
    DejaAutosizeTextAreaModule,
    DejaBackdropModule,
    DejaChipsModule,
    DejaCircularPickerModule,
    DejaClipboardModule,
    DejaCodeViewerModule,
    DejaColorPickerModule,
    DejaColorSelectorModule,
    DejaDatePickerModule,
    DejaDateSelectorModule,
    DejaDialogModule,
    DejaDragDropModule,
    DejaDropDownModule,
    DejaEditableModule,
    DejaGridModule,
    DejaIFrameModule,
    DejaListLoaderModule,
    DejaMarkdownModule,
    DejaMenuModule,
    DejaMessageBoxModule,
    DejaMonacoEditorModule,
    DejaMouseDragDropModule,
    DejaRangeModule,
    DejaSelectModule,
    DejaSnackbarModule,
    DejaSortingModule,
    DejaSplitterModule,
    DejaTilesModule,
    DejaTooltipModule,
    DejaTreeListModule,
    DejaViewPortModule,
// } from '../../dist';
} from '../../src/index';

import { HomeComponentsComponent } from './home-components/home-components.component';
import { HomeGuidesComponent } from './home-guides/home-guides.component';
import { HomeComponent } from './home/home.component';

import { DejaAccordionDemoComponent } from './accordion/accordion-demo.component';
import { DejaCircularPickerDemoComponent } from './circular-picker/circular-picker-demo';
import { DejaColorSelectorDemoComponent } from './color-selector/color-selector-demo';
import { DejaContentEditableDemoComponent } from './content-editable/content-editable-demo';
import { DejaDatePickerDemoComponent } from './date-picker/date-picker-demo';
import { GlobalEventsDemoComponent } from './global-events/global-events-demo';
import { GridDemoComponent } from './grid/grid-demo';
import { MenuDemoComponent } from './menu/menu-demo';
import { MessageBoxDemoComponent } from './message-box/message-box-demo';
import { DejaMonacoEditorDemoComponent } from './monaco-editor/monaco-editor-demo';
import { ProgressCircleDemoComponent } from './progress-circle/progress-circle-demo';
import { DejaRangeDemoComponent } from './range/range-demo';
import { ReactiveFormDemoComponent } from './reactive-form/reactive-form-demo';
import { SelectDemoComponent } from './select/select-demo';
import { DejaSnackbarDemoComponent } from './snackbar/snackbar-demo';
import { DejaSplitterDemoComponent } from './splitter/splitter-demo';
import { TextAreaDemoComponent } from './textarea/textarea-demo';
import { TilesDemoComponent } from './tiles/tiles-demo';
import { DejaTreeListDemoComponent } from './tree-list/tree-list-demo';
import { DejaViewPortDemoComponent } from './viewport/viewport-demo';

import { MonacoEditorDemoService } from './monaco-editor/monaco-editor-demo.service.';
import { MonacoEditorJsonFileResolver, MonacoEditorJsonToCompareFileResolver, MonacoEditorXmlFileResolver, MonacoEditorXmlToCompareFileResolver } from './monaco-editor/monaco-editor.resolver';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HomeComponentsComponent,
        HomeGuidesComponent,
        DejaAccordionDemoComponent,
        DejaCircularPickerDemoComponent,
        DejaColorSelectorDemoComponent,
        DejaContentEditableDemoComponent,
        DejaDatePickerDemoComponent,
        GlobalEventsDemoComponent,
        GridDemoComponent,
        MenuDemoComponent,
        MessageBoxDemoComponent,
        DejaMonacoEditorDemoComponent,
        ProgressCircleDemoComponent,
        DejaRangeDemoComponent,
        ReactiveFormDemoComponent,
        SelectDemoComponent,
        DejaSnackbarDemoComponent,
        DejaSplitterDemoComponent,
        TextAreaDemoComponent,
        TilesDemoComponent,
        DejaTreeListDemoComponent,
        DejaViewPortDemoComponent,
        NewsCardComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        routing,

        MaterialModule,
        FlexLayoutModule,

        DejaAccordionModule,
        DejaAutosizeTextAreaModule,
        DejaBackdropModule,
        DejaChipsModule,
        DejaCircularPickerModule,
        DejaClipboardModule,
        DejaCodeViewerModule,
        DejaColorPickerModule,
        DejaColorSelectorModule,
        DejaEditableModule,
        DejaGridModule,
        DejaDatePickerModule,
        DejaDateSelectorModule,
        DejaDialogModule,
        DejaDragDropModule,
        DejaDropDownModule,
        DejaIFrameModule,
        DejaListLoaderModule,
        DejaMarkdownModule,
        DejaMenuModule,
        DejaMessageBoxModule,
        DejaMonacoEditorModule,
        DejaMouseDragDropModule.forRoot(),
        DejaRangeModule,
        DejaSelectModule,
        DejaSnackbarModule,
        DejaSortingModule,
        DejaSplitterModule,
        DejaTilesModule,
        DejaTooltipModule,
        DejaTreeListModule,
        DejaViewPortModule,
        GroupingModule,
        StoreModule.provideStore({
            user: userReducer,
        })
    ],
    providers: [
        CountriesService,
        CountriesListService,
        DrugsService,
        GlobalEventService,
        MaterialColors,
        NewsService,
        // Monaco Editor Resolver Route
        MonacoEditorXmlFileResolver,
        MonacoEditorXmlToCompareFileResolver,
        MonacoEditorJsonFileResolver,
        MonacoEditorJsonToCompareFileResolver,
        MonacoEditorDemoService,
        UserService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
