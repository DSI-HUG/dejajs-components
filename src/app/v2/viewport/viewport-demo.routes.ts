/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

import { ViewPortDemoComponent } from './viewport-demo';

const routes: Routes = [
    { path: '', component: ViewPortDemoComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

export const routing: ModuleWithProviders<Route> = RouterModule.forChild(routes);
