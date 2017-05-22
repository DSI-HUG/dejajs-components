/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
import { DejaSortIndicatorComponent } from './sort-indicator.component';
import { SortingService } from './sorting.service';

@NgModule({
    declarations: [DejaSortIndicatorComponent],
    exports: [DejaSortIndicatorComponent],
    providers: [SortingService],
})
export class DejaSortingModule { }

export * from './sort-infos.model';
export * from './sorting.service';
export * from './sort-indicator.component';
