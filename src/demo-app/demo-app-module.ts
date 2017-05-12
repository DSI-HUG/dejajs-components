/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ApplicationRef, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { GroupingModule } from '../common/core/grouping/index';
import { DejaSortingModule } from '../common/core/sorting/index';
import { MaterialColors } from '../common/core/style/index';
import { GlobalEventService } from '../common/global-event/global-event.service';
import {
    DejaAccordionModule,
    DejaAutosizeTextAreaModule,
    DejaBackdropModule,
    DejaBoldQueryModule,
    DejaCircularPickerModule,
    DejaCodeViewerModule,
    DejaColorPickerModule,
    DejaColorSelectorModule,
    DejaDatePickerModule,
    DejaDateSelectorModule,
    DejaDialogModule,
    DejaDragDropModule,
    DejaEditableModule,
    DejaGridModule,
    DejaIFrameModule,
    DejaMarkdownModule,
    DejaMenuModule,
    DejaMessageBoxModule,
    DejaMonacoEditorModule,
    DejaMouseDragDropModule,
    DejaRangeModule,
    DejaSelectModule,
    DejaSnackbarModule,
    DejaSplitterModule,
    DejaTilesModule,
    DejaTooltipModule,
    DejaTreeListModule,
    DejaViewPortModule,
    /* deja-cli import module */
    /* The comment above mustn't be removed ! */
} from '../component';
import { DejaFormModule } from './../common/core/form/form.module';
import { DejaAccordionDemoComponent } from './accordion/accordion-demo';
import { DejaCircularPickerDemoComponent } from './circular-picker/circular-picker-demo';
import { DejaColorSelectorDemoComponent } from './color-selector/color-selector-demo';
import { NewsCardComponent } from './common/news-card.component';
import { DejaContentEditableDemoComponent } from './content-editable/content-editable-demo';
import { DejaDatePickerDemoComponent } from './date-picker/date-picker-demo';
import { DemoAppComponent } from './demo-app/demo-app';
import { routing } from './demo-app/routes';
import { GlobalEventsDemoComponent } from './global-events/global-events-demo';
import { GridDemoComponent } from './grid/grid-demo';
import { HomeComponentsComponent } from './home-components/home-components.component';
import { HomeGuidesComponent } from './home-guides/home-guides.component';
import { HomeComponent } from './home/home.component';
import { MenuDemoComponent } from './menu/menu-demo';
import { MessageBoxDemoComponent } from './message-box/message-box-demo';
import { DejaMonacoEditorDemoComponent } from './monaco-editor/monaco-editor-demo';
import { MonacoEditorDemoService } from './monaco-editor/monaco-editor-demo.service.';
import { MonacoEditorJsonFileResolver, MonacoEditorJsonToCompareFileResolver, MonacoEditorXmlFileResolver, MonacoEditorXmlToCompareFileResolver } from './monaco-editor/monaco-editor.resolver';
import { ProgressCircleDemoComponent } from './progress-circle/progress-circle-demo';
import { DejaRangeDemoComponent } from './range/range-demo';
import { ReactiveFormDemoComponent } from './reactive-form/reactive-form-demo';
import { SelectDemoComponent } from './select/select-demo';
import { CountriesListService } from './services/countries-list.service';
import { CountriesService } from './services/countries.service';
import { DrugsService } from './services/drugs.service';
import { NewsService } from './services/news.service';
import { DejaSnackbarDemoComponent } from './snackbar/snackbar-demo';
import { DejaSplitterDemoComponent } from './splitter/splitter-demo';
import { TextAreaDemoComponent } from './textarea/textarea-demo';
import { TilesDemoComponent } from './tiles/tiles-demo';
import { DejaTreeListDemoComponent } from './tree-list/tree-list-demo';
import { DejaViewPortDemoComponent } from './viewport/viewport-demo';

@NgModule({
    declarations: [
        HomeComponent,
        HomeComponentsComponent,
        HomeGuidesComponent,
        DejaAccordionDemoComponent,
        DejaContentEditableDemoComponent,
        DejaCircularPickerDemoComponent,
        DejaDatePickerDemoComponent,
        DejaColorSelectorDemoComponent,
        DemoAppComponent,
        GlobalEventsDemoComponent,
        GridDemoComponent,
        MenuDemoComponent,
        MessageBoxDemoComponent,
        SelectDemoComponent,
        TilesDemoComponent,
        TextAreaDemoComponent,
        DejaTreeListDemoComponent,
        DejaMonacoEditorDemoComponent,
        DejaSnackbarDemoComponent,
        DejaRangeDemoComponent,
        DejaSplitterDemoComponent,
        DejaViewPortDemoComponent,
        ProgressCircleDemoComponent,
        NewsCardComponent,
        ReactiveFormDemoComponent,
    ],
    entryComponents: [
        DemoAppComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        FlexLayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        DejaAccordionModule,
        DejaCodeViewerModule,
        DejaCircularPickerModule,
        DejaDateSelectorModule,
        DejaDatePickerModule,
        DejaDialogModule,
        DejaSelectModule,
        DejaTreeListModule,
        DejaTilesModule,
        DejaColorSelectorModule,
        DejaColorPickerModule,
        DejaBoldQueryModule,
        DejaIFrameModule,
        DejaMarkdownModule,
        DejaMenuModule,
        DejaMessageBoxModule,
        DejaEditableModule,
        DejaDragDropModule,
        DejaMouseDragDropModule.forRoot(),
        DejaBackdropModule,
        DejaGridModule,
        DejaSortingModule,
        DejaAutosizeTextAreaModule,
        DejaMonacoEditorModule,
        DejaSnackbarModule,
        DejaRangeModule,
        DejaSplitterModule,
        DejaTooltipModule,
        DejaViewPortModule,
        routing,
        GroupingModule,
        DejaFormModule,
    ],
    providers: [
        NewsService,
        CountriesService,
        CountriesListService,
        GlobalEventService,
        MaterialColors,
        DrugsService,
        // Monaco Editor Resolver Route
        MonacoEditorXmlFileResolver,
        MonacoEditorXmlToCompareFileResolver,
        MonacoEditorJsonFileResolver,
        MonacoEditorJsonToCompareFileResolver,
        MonacoEditorDemoService,
    ],
})
export class DemoAppModule {
    constructor(private appRef: ApplicationRef) { }

    protected ngDoBootstrap() {
        this.appRef.bootstrap(DemoAppComponent);
    }
}
