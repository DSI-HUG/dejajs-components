/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DejaTextMetricsService } from './text-metrics.service';

@NgModule({
    imports: [CommonModule],
    providers: [DejaTextMetricsService],
})
export class DejaTextMetricsModule { }

export * from './text-metrics.service';
