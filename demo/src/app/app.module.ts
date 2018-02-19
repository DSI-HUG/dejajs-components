/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import localeFrCH from '@angular/common/locales/fr-CH';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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
import { FoldersService } from './services/folders.service';
import { NewsService } from './services/news.service';
import { PeopleService } from './services/people.service';

import {
    DejaAccordionModule,
    DejaChipsModule,
    DejaCircularPickerModule,
    DejaClipboardModule,
    DejaCodeViewerModule,
    DejaColorPickerModule,
    DejaColorSelectorModule,
    DejaComboListModule,
    DejaDatePickerModule,
    DejaDateSelectorModule,
    DejaDialogModule,
    DejaDragDropModule,
    DejaEditableModule,
    DejaGridModule,
    DejaIFrameModule,
    DejaIntervalSelectorModule,
    DejaListLoaderModule,
    DejaMarkdownModule,
    DejaMessageBoxModule,
    DejaMouseDragDropModule,
    DejaNumericStepperModule,
    DejaOverlayModule,
    DejaPopupModule,
    DejaRangeModule,
    DejaSelectModule,
    DejaSidenavModule,
    DejaSlimScrollModule,
    DejaSnackbarModule,
    DejaSortingModule,
    DejaSplitterModule,
    DejaTagModule,
    DejaTilesModule,
    DejaTooltipModule,
    DejaTreeListModule,
    DejaViewPortModule,
    // } from '../../dist';
} from '../../src/index';

import { registerLocaleData } from '@angular/common';
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatSidenavModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { DejaItemModule } from '../../src/common/core/item-list/index';
import { DejaBoldQueryModule } from '../../src/component';
import { DejaAccordionDemoComponent } from './accordion/accordion-demo.component';
import { DejaCircularPickerDemoComponent } from './circular-picker/circular-picker-demo';
import { DejaColorSelectorDemoComponent } from './color-selector/color-selector-demo';
import { ComboListDemoComponent } from './combo-list/combo-list.component';
import { DejaContentEditableDemoComponent } from './content-editable/content-editable-demo';
import { DejaDatePickerDemoComponent } from './date-picker/date-picker-demo';
import { GlobalEventsDemoComponent } from './global-events/global-events-demo';
import { GridDemoComponent } from './grid/grid-demo';
import { HomeGuidesComponent } from './home-guides/home-guides.component';
import { HomeComponent } from './home/home.component';
import { DejaIntervalSelectorDemoComponent } from './interval-selector/interval-selector-demo';
import { MessageBoxDemoComponent } from './message-box/message-box-demo';
import { MonacoEditorDemoService } from './monaco-editor/monaco-editor-demo.service.';
import { DejaNumericStepperDemoComponent } from './numeric-stepper/numeric-stepper-demo.component';
import { OverlayDemoComponent } from './overlay/overlay-demo';
import { DummyComponent } from './popup/dummy/dummy.component';
import { DejaPopupCustomDemoComponent } from './popup/popup-custom.component';
import { PopupDemoComponent } from './popup/popup-demo';
import { ProgressCircleDemoComponent } from './progress-circle/progress-circle-demo';
import { DejaRangeDemoComponent } from './range/range-demo';
import { ReactiveFormDemoComponent } from './reactive-form/reactive-form-demo';
import { SelectDemoComponent } from './select/select-demo';
import { DejaSnackbarDemoComponent } from './snackbar/snackbar-demo';
import { DejaSplitterDemoComponent } from './splitter/splitter-demo';
import { TagDemoComponent } from './tag/tag-demo.component';
import { TilesDemoComponent } from './tiles/tiles-demo';
import { DejaTreeListDemoComponent } from './tree-list/tree-list-demo';
import { DejaViewPortDemoComponent } from './viewport/viewport-demo';

registerLocaleData(localeFrCH);

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HomeGuidesComponent,
        DejaAccordionDemoComponent,
        DejaCircularPickerDemoComponent,
        DejaColorSelectorDemoComponent,
        DejaContentEditableDemoComponent,
        DejaDatePickerDemoComponent,
        GlobalEventsDemoComponent,
        GridDemoComponent,
        OverlayDemoComponent,
        MessageBoxDemoComponent,
        DejaNumericStepperDemoComponent,
        ProgressCircleDemoComponent,
        PopupDemoComponent,
        DejaRangeDemoComponent,
        DejaIntervalSelectorDemoComponent,
        ReactiveFormDemoComponent,
        SelectDemoComponent,
        DejaSnackbarDemoComponent,
        DejaSplitterDemoComponent,
        TagDemoComponent,
        TilesDemoComponent,
        DejaTreeListDemoComponent,
        DejaViewPortDemoComponent,
        NewsCardComponent,
        DejaPopupCustomDemoComponent,
        DummyComponent,
        ComboListDemoComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        routing,
        FlexLayoutModule,
        MatIconModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDividerModule,
        MatInputModule,
        MatMenuModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        DejaAccordionModule,
        DejaBoldQueryModule,
        DejaChipsModule,
        DejaCircularPickerModule,
        DejaClipboardModule,
        DejaCodeViewerModule,
        DejaColorPickerModule,
        DejaColorSelectorModule,
        DejaComboListModule,
        DejaEditableModule,
        DejaGridModule,
        DejaDatePickerModule,
        DejaDateSelectorModule,
        DejaDialogModule,
        DejaDragDropModule,
        DejaIFrameModule,
        DejaListLoaderModule,
        DejaMarkdownModule,
        DejaNumericStepperModule,
        DejaOverlayModule,
        DejaMessageBoxModule,
        DejaMouseDragDropModule.forRoot(),
        DejaPopupModule,
        DejaRangeModule,
        DejaIntervalSelectorModule,
        DejaSelectModule,
        DejaSidenavModule,
        DejaSlimScrollModule,
        DejaSnackbarModule,
        DejaSortingModule,
        DejaSplitterModule,
        DejaTagModule,
        DejaTilesModule,
        DejaTooltipModule,
        DejaTreeListModule,
        DejaViewPortModule,
        DejaItemModule,
        GroupingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('userDemo', {
            user: userReducer,
        }),
    ],
    providers: [
        CountriesService,
        FoldersService,
        CountriesListService,
        PeopleService,
        GlobalEventService,
        MaterialColors,
        NewsService,
        MonacoEditorDemoService,
        UserService,
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        DejaPopupCustomDemoComponent,
        DummyComponent,
    ]
})
export class AppModule { }