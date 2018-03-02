/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomeModule', data: { title: 'Home' } },
    { path: 'guides', loadChildren: './home-guides/home-guides.module#HomeGuidesModule', data: { title: 'Guides' } },
    { path: 'accordion', loadChildren: './accordion/accordion-demo.module#DejaAccordionDemoModule', data: { title: 'Accordion' } },
    { path: 'circular-picker', loadChildren: './circular-picker/circular-picker-demo.module#DejaCircularPickerDemoModule', data: { title: 'Circular Picker' } },
    { path: 'colorselector', loadChildren: './color-selector/color-selector-demo.module#DejaColorSelectorDemoModule', data: { title: 'Color Selector' } },
    { path: 'contenteditableselector', loadChildren: './content-editable/content-editable-demo.module#DejaContentEditableDemoModule', data: { title: 'Content Editable' } },
    { path: 'date-picker', loadChildren: './date-picker/date-picker-demo.module#DejaDatePickerDemoModule', data: { title: 'Date Picker' } },
    { path: 'events', loadChildren: './global-events/global-events-demo.module#DejaGlobalEventsDemoModule', data: { title: 'Events' } },
    { path: 'grid', loadChildren: './grid/grid-demo.module#DejaGridDemoModule', data: { title: 'Grid' } },
    { path: 'intervalSelector', loadChildren: './interval-selector/interval-selector-demo.module#DejaIntervalSelectorDemoModule', data: { title: 'Interval Selector' } },
    { path: 'message-box', loadChildren: './message-box/message-box-demo.module#DejaMessageBoxDemoModule', data: { title: 'Message Box' } },
    { path: 'numeric-stepper', loadChildren: './numeric-stepper/numeric-stepper-demo.module#DejaNumericStepperDemoModule', data: { title: 'Numeric Stepper' } },
    { path: 'overlay', loadChildren: './overlay/overlay-demo.module#DejaOverlayDemoModule', data: { title: 'Overlay' } },
    { path: 'popup', loadChildren: './popup/popup-demo.module#DejaPopupDemoModule', data: { title: 'Popup' } },
    { path: 'progress-circle', loadChildren: './progress-circle/progress-circle-demo.module#DejaProgressCircleDemoModule', data: { title: 'Progress Circle' } },
    { path: 'range', loadChildren: './range/range-demo.module#DejaRangeDemoModule', data: { title: 'Range' } },
    { path: 'reactive-form', loadChildren: './reactive-form/reactive-form-demo.module#DejaReactiveFormDemoModule', data: { title: 'Reactive Form' } },
    { path: 'select', loadChildren: './select/select-demo.module#SelectDemoModule', data: { title: 'Select' } },
    { path: 'snackbar', loadChildren: './snackbar/snackbar-demo.module#DejaSnackbarDemoModule', data: { title: 'Snackbar' } },
    { path: 'splitter', loadChildren: './splitter/splitter-demo.module#DejaSplitterDemoModule', data: { title: 'Splitter' } },
    { path: 'tag', loadChildren: './tag/tag-demo.module#DejaTagDemoModule', data: { title: 'Tag' } },
    { path: 'tiles', loadChildren: './tiles/tiles-demo.module#DejaTilesDemoModule', data: { title: 'Tiles' } },
    { path: 'tree-list', loadChildren: './tree-list/tree-list-demo.module#DejaTreeListDemoModule', data: { title: 'Tree List' } },
    { path: 'viewport', loadChildren: './viewport/viewport-demo.module#DejaViewPortDemoModule', data: { title: 'Viewport' } },
    { path: 'monaco-editor', loadChildren: './monaco-editor/monaco-editor-demo.module#MonacoEditorDemoModule', data: { title: 'Monaco Editor' } },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
