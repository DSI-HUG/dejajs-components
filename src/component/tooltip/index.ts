/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DejaDropDownModule } from '../dropdown/index';
import { DejaTooltipComponent } from './tooltip.component';
import { DejaTooltipDirective } from './tooltip.directive';
import { DejaTooltipService } from './tooltip.service';

@NgModule({
    declarations: [
        DejaTooltipComponent,
        DejaTooltipDirective,
    ],
    exports: [
        DejaTooltipComponent,
        DejaTooltipDirective,
    ],
    imports: [
        CommonModule,
        DejaDropDownModule,
    ],
    providers: [
        DejaTooltipService,
    ],
})
export class DejaTooltipModule { }

export * from './tooltip.service';
export * from './tooltip.directive';
export * from './tooltip.component';
