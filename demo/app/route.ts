/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DejaAccordionDemoComponent } from './accordion/accordion-demo.component';
import { DejaCircularPickerDemoComponent } from './circular-picker/circular-picker-demo';
import { DejaColorSelectorDemoComponent } from './color-selector/color-selector-demo';
import { DejaContentEditableDemoComponent } from './content-editable/content-editable-demo';
import { DejaDatePickerDemoComponent } from './date-picker/date-picker-demo';
import { GlobalEventsDemoComponent } from './global-events/global-events-demo';
import { GridDemoComponent } from './grid/grid-demo';
import { HomeGuidesComponent } from './home-guides/home-guides.component';
import { HomeComponent } from './home/home.component';
import { MenuDemoComponent } from './menu/menu-demo';
import { MessageBoxDemoComponent } from './message-box/message-box-demo';
import { DejaMonacoEditorDemoComponent } from './monaco-editor/monaco-editor-demo';
import { ProgressCircleDemoComponent } from './progress-circle/progress-circle-demo';
import { DejaRangeDemoComponent } from './range/range-demo';
import { ReactiveFormDemoComponent } from './reactive-form/reactive-form-demo';
import { SelectDemoComponent } from './select/select-demo';
import { DejaSnackbarDemoComponent } from './snackbar/snackbar-demo';
import { DejaSplitterDemoComponent } from './splitter/splitter-demo';
import { TagDemoComponent } from './tag/tag-demo.component';
import { TextAreaDemoComponent } from './textarea/textarea-demo';
import { TilesDemoComponent } from './tiles/tiles-demo';
import { DejaTreeListDemoComponent } from './tree-list/tree-list-demo';
import { DejaViewPortDemoComponent } from './viewport/viewport-demo';

const routes: Routes = [
    { component: HomeComponent, path: 'home', data: { title: 'Home' } },
    { component: DejaAccordionDemoComponent, path: 'accordion', data: { title: 'Accordion' } },
    { component: DejaCircularPickerDemoComponent, path: 'circular-picker', data: { title: 'Circular Picker' } },
    { component: DejaColorSelectorDemoComponent, path: 'colorselector', data: { title: 'Color Selector' } },
    { component: DejaContentEditableDemoComponent, path: 'contenteditableselector', data: { title: 'Content Editable' } },
    { component: DejaDatePickerDemoComponent, path: 'date-picker', data: { title: 'Date Picker' } },
    { component: GlobalEventsDemoComponent, path: 'events', data: { title: 'Events' } },
    { component: GridDemoComponent, path: 'grid', data: { title: 'Grid' } },
    { component: MenuDemoComponent, path: 'menu', data: { title: 'Menu' } },
    { component: MessageBoxDemoComponent, path: 'message-box', data: { title: 'Message Box' } },
    { component: DejaMonacoEditorDemoComponent, path: 'monaco-editor', data: { title: 'Monaco Editor' } },
    { component: ProgressCircleDemoComponent, path: 'progress-circle', data: { title: 'Progress Circle' } },
    { component: DejaRangeDemoComponent, path: 'range', data: { title: 'Range' } },
    { component: ReactiveFormDemoComponent, path: 'reactive-form', data: { title: 'Reactive Form' } },
    { component: SelectDemoComponent, path: 'select', data: { title: 'Select' } },
    { component: DejaSnackbarDemoComponent, path: 'snackbar', data: { title: 'Snackbar' } },
    { component: DejaSplitterDemoComponent, path: 'splitter', data: { title: 'Splitter' } },
    { component: TagDemoComponent, path: 'tag', data: { title: 'Tag' } },
    { component: TextAreaDemoComponent, path: 'textarea', data: { title: 'Textarea' } },
    { component: TilesDemoComponent, path: 'tiles', data: { title: 'Tiles' } },
    { component: DejaTreeListDemoComponent, path: 'tree-list', data: { title: 'Tree List' } },
    { component: DejaViewPortDemoComponent, path: 'viewport', data: { title: 'Viewport' } },
    { component: HomeGuidesComponent, path: 'guides', data: { title: 'Guides' } },
    { path: '**', pathMatch: 'prefix', redirectTo: 'home'},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
