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
    { path: 'circular-picker', loadChildren: () => import('./circular-picker/circular-picker-demo.module').then(m => m.DejaCircularPickerDemoModule), data: { title: 'Circular Picker' } },
    { path: 'colorselector', loadChildren: () => import('./color-selector/color-selector-demo.module').then(m => m.DejaColorSelectorDemoModule), data: { title: 'Color Selector' } },
    { path: 'contenteditableselector', loadChildren: () => import('./content-editable/content-editable-demo.module').then(m => m.DejaContentEditableDemoModule), data: { title: 'Content Editable' } },
    { path: 'iframe', loadChildren: () => import('./iframe/iframe-demo.module').then(m => m.DejaIframeDemoModule), data: { title: 'Iframe' } },
    { path: 'lazy-dialog', loadChildren: () => import('./lazy-dialog/lazy-dialog-demo.module').then(m => m.LazyDialogDemoModule), data: { title: 'Lazy Dialog' } },
    { path: 'message-box', loadChildren: () => import('./message-box/message-box-demo.module').then(m => m.DejaMessageBoxDemoModule), data: { title: 'Message Box' } },
    { path: 'overlay', loadChildren: () => import('./overlay/overlay-demo.module').then(m => m.DejaOverlayDemoModule), data: { title: 'Overlay' } },
    { path: 'range', loadChildren: () => import('./range/range-demo.module').then(m => m.DejaRangeDemoModule), data: { title: 'Range' } },
    { path: 'sidenav', loadChildren: () => import('./sidenav/sidenav-demo.module').then(m => m.DejaSidenavDemoModule), data: { title: 'Sidenav' } },
    { path: 'snackbar', loadChildren: () => import('./snackbar/snackbar-demo.module').then(m => m.DejaSnackbarDemoModule), data: { title: 'Snackbar' } },
    { path: 'splitter', loadChildren: () => import('./splitter/splitter-demo.module').then(m => m.DejaSplitterDemoModule), data: { title: 'Splitter' } },
    { path: 'tiles', loadChildren: () => import('./tiles/tiles-demo.module').then(m => m.DejaTilesDemoModule), data: { title: 'Tiles' } },
    { path: 'time-picker', loadChildren: () => import('./time-picker/time-picker-demo.module').then(m => m.DejaTimePickerDemoModule), data: { title: 'Time Picker' } },
    { path: 'date-with-time-picker', loadChildren: () => import('./date-with-time-picker/date-with-time-picker-demo.module').then(m => m.DejaContentEditableDemoModule), data: { title: 'Date With Time Picker' } },
    { path: 'v2-numeric-stepper', loadChildren: () => import('./v2/numeric-stepper/numeric-stepper-demo.module').then(m => m.DejaNumericStepperDemoModule), data: { title: 'Numeric Stepper V2' } },
    { path: 'monaco-editor-v2', loadChildren: () => import('./v2/monaco-editor/monaco-editor-demo.module').then(m => m.MonacoEditorDemoModule), data: { title: 'Monaco Editor V2' } },
    { path: 'tree-list-v2', loadChildren: () => import('./v2/tree-list/tree-list-demo.module').then(m => m.TreeListDemoModule), data: { title: 'Tree List V2' } },
    { path: 'viewport-v2', loadChildren: () => import('./v2/viewport/viewport-demo.module').then(m => m.ViewPortDemoModule), data: { title: 'Viewport V2' } },
    { path: '**', redirectTo: 'home', pathMatch: 'prefix' }
];

export const appRoutingProviders: Route[] = [

];

export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(routes, {});
