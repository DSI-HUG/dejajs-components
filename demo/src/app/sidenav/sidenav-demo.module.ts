/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { DejaSidenavModule } from '@deja-js/component';
import { SidenavDemoComponent } from './sidenav-demo.component';

const routes: Routes = [
    { path: '', component: SidenavDemoComponent },
];

@NgModule({
    declarations: [SidenavDemoComponent],
    exports: [SidenavDemoComponent],
    imports: [
        CommonModule,
        DejaSidenavModule,
        MatButtonModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        RouterModule.forChild(routes),
    ],
    providers: [
    ],
})
export class DejaSidenavDemoModule { }
