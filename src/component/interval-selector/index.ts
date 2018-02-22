/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DejaIntervalSelectorBoundaryComponent } from './interval-selector-boundary.component';
import {DejaIntervalSelectorComponent} from './interval-selector.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        DejaIntervalSelectorComponent, DejaIntervalSelectorBoundaryComponent,
    ],
    declarations: [
        DejaIntervalSelectorComponent, DejaIntervalSelectorBoundaryComponent,
    ],
    providers: [],
})
export class DejaIntervalSelectorModule { }

export * from './interval-selector-boundary.model';
export * from './interval-selector-compare-function.model';
export * from './interval-selector-interval.model';
export * from './interval-selector-data.model';
export * from './interval-selector-event-data.model';
export * from './interval-selector.service';
