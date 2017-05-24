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
import { HomeComponentsComponent } from './home-components/home-components.component';
import { HomeGuidesComponent } from './home-guides/home-guides.component';
import { HomeComponent } from './home/home.component';
import { MenuDemoComponent } from './menu/menu-demo';
import { MessageBoxDemoComponent } from './message-box/message-box-demo';
import { DejaMonacoEditorDemoComponent } from './monaco-editor/monaco-editor-demo';
import { MonacoEditorJsonFileResolver, MonacoEditorJsonToCompareFileResolver, MonacoEditorXmlFileResolver, MonacoEditorXmlToCompareFileResolver } from './monaco-editor/monaco-editor.resolver';
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

const routes: Routes = [
    { component: HomeComponent, path: '' },
    { component: HomeComponentsComponent, path: 'components', children: [
        { component: DejaAccordionDemoComponent, path: 'accordion' },
        { component: DejaCircularPickerDemoComponent, path: 'circular-picker' },
        { component: DejaColorSelectorDemoComponent, path: 'colorselector' },
        { component: DejaContentEditableDemoComponent, path: 'contenteditableselector' },
        { component: DejaDatePickerDemoComponent, path: 'date-picker' },
        { component: GlobalEventsDemoComponent, path: 'events' },
        { component: GridDemoComponent, path: 'grid' },
        { component: MenuDemoComponent, path: 'menu' },
        { component: MessageBoxDemoComponent, path: 'message-box' },
        {
            component: DejaMonacoEditorDemoComponent, path: 'monaco-editor', resolve: {
                jsonFile: MonacoEditorJsonFileResolver,
                jsonToCompareFile: MonacoEditorJsonToCompareFileResolver,
                xmlFile: MonacoEditorXmlFileResolver,
                xmlToCompareFile: MonacoEditorXmlToCompareFileResolver,
            }
        },
        { component: ProgressCircleDemoComponent, path: 'progress-circle' },
        { component: DejaRangeDemoComponent, path: 'range' },
        { component: ReactiveFormDemoComponent, path: 'reactive-form' },
        { component: SelectDemoComponent, path: 'select' },
        { component: DejaSnackbarDemoComponent, path: 'snackbar' },
        { component: DejaSplitterDemoComponent, path: 'splitter' },
        { component: TextAreaDemoComponent, path: 'textarea' },
        { component: TilesDemoComponent, path: 'tiles' },
        { component: DejaTreeListDemoComponent, path: 'tree-list' },
        { component: DejaViewPortDemoComponent, path: 'viewport' },
        { path: '**', pathMatch: 'prefix', redirectTo: 'accordion'},
    ]},
    { component: HomeGuidesComponent, path: 'guides' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
