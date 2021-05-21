/* eslint-disable @typescript-eslint/explicit-function-return-type */
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), data: { title: 'Home' } },
    // { path: 'guides', loadChildren: './home-guides/home-guides.module#HomeGuidesModule', data: { title: 'Guides' } },
    // { path: 'accordion', loadChildren: './accordion/accordion-demo.module#DejaAccordionDemoModule', data: { title: 'Accordion' } },
    { path: 'circular-picker', loadChildren: () => import('./circular-picker/circular-picker-demo.module').then(m => m.DejaCircularPickerDemoModule), data: { title: 'Circular Picker' } },
    { path: 'colorselector', loadChildren: () => import('./color-selector/color-selector-demo.module').then(m => m.DejaColorSelectorDemoModule), data: { title: 'Color Selector' } },
    // { path: 'combo-list', loadChildren: './combo-list/combo-list-demo.module#DejaComboListDemoModule', data: { title: 'Combo List' } },
    { path: 'contenteditableselector', loadChildren: () => import('./content-editable/content-editable-demo.module').then(m => m.DejaContentEditableDemoModule), data: { title: 'Content Editable' } },
    { path: 'date-picker', loadChildren: () => import('./date-picker/date-picker-demo.module').then(m => m.DejaDatePickerDemoModule), data: { title: 'Date Picker' } },
    { path: 'editor', loadChildren: () => import('./editor/editor-demo.module').then(m => m.DejaEditorDemoModule), data: { title: 'Editor' } },
    // { path: 'events', loadChildren: './global-events/global-events-demo.module#DejaGlobalEventsDemoModule', data: { title: 'Events' } },
    { path: 'grid', loadChildren: () => import('./grid/grid-demo.module').then(m => m.DejaGridDemoModule), data: { title: 'Grid' } },
    { path: 'iframe', loadChildren: () => import('./iframe/iframe-demo.module').then(m => m.DejaIframeDemoModule), data: { title: 'Iframe' } },
    { path: 'message-box', loadChildren: () => import('./message-box/message-box-demo.module').then(m => m.DejaMessageBoxDemoModule), data: { title: 'Message Box' } },
    { path: 'monaco-editor', loadChildren: () => import('./monaco-editor/monaco-editor-demo.module').then(m => m.MonacoEditorDemoModule), data: { title: 'Monaco Editor' } },
    { path: 'numeric-stepper', loadChildren: () => import('./numeric-stepper/numeric-stepper-demo.module').then(m => m.DejaNumericStepperDemoModule), data: { title: 'Numeric Stepper' } },
    { path: 'overlay', loadChildren: () => import('./overlay/overlay-demo.module').then(m => m.DejaOverlayDemoModule), data: { title: 'Overlay' } },
    { path: 'popup', loadChildren: () => import('./popup/popup-demo.module').then(m => m.DejaPopupDemoModule), data: { title: 'Popup' } },
    // { path: 'progress-circle', loadChildren: './progress-circle/progress-circle-demo.module#DejaProgressCircleDemoModule', data: { title: 'Progress Circle' } },
    { path: 'range', loadChildren: () => import('./range/range-demo.module').then(m => m.DejaRangeDemoModule), data: { title: 'Range' } },
    // { path: 'reactive-form', loadChildren: './reactive-form/reactive-form-demo.module#DejaReactiveFormDemoModule', data: { title: 'Reactive Form' } },
    { path: 'select', loadChildren: () => import('./select/select-demo.module').then(m => m.SelectDemoModule), data: { title: 'Select' } },
    { path: 'sidenav', loadChildren: () => import('./sidenav/sidenav-demo.module').then(m => m.DejaSidenavDemoModule), data: { title: 'Sidenav' } },
    { path: 'snackbar', loadChildren: () => import('./snackbar/snackbar-demo.module').then(m => m.DejaSnackbarDemoModule), data: { title: 'Snackbar' } },
    { path: 'splitter', loadChildren: () => import('./splitter/splitter-demo.module').then(m => m.DejaSplitterDemoModule), data: { title: 'Splitter' } },
    { path: 'tag', loadChildren: () => import('./tag/tag-demo.module').then(m => m.DejaTagDemoModule), data: { title: 'Tag' } },
    { path: 'tiles', loadChildren: () => import('./tiles/tiles-demo.module').then(m => m.DejaTilesDemoModule), data: { title: 'Tiles' } },
    { path: 'tree-list', loadChildren: () => import('./tree-list/tree-list-demo.module').then(m => m.DejaTreeListDemoModule), data: { title: 'Tree List' } },
    { path: 'viewport', loadChildren: () => import('./viewport/viewport-demo.module').then(m => m.DejaViewPortDemoModule), data: { title: 'Viewport' } },
    { path: 'monaco-editor-v2', loadChildren: () => import('./v2/monaco-editor/monaco-editor-demo.module').then(m => m.MonacoEditorDemoModule), data: { title: 'Monaco Editor V2' } },
    { path: 'tree-list-v2', loadChildren: () => import('./v2/tree-list/tree-list-demo.module').then(m => m.TreeListDemoModule), data: { title: 'Tree List V2' } },
    { path: 'viewport-v2', loadChildren: () => import('./v2/viewport/viewport-demo.module').then(m => m.ViewPortDemoModule), data: { title: 'Viewport V2' } },
    { path: '**', redirectTo: 'home', pathMatch: 'prefix' }
];

export const appRoutingProviders: Route[] = [

];

export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });
