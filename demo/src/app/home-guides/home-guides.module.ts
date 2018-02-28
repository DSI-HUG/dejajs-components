/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { HomeGuidesComponent } from './home-guides.component';
import { routing } from './home-guides.routes';

@NgModule({
    declarations: [HomeGuidesComponent],
    exports: [HomeGuidesComponent],
    imports: [
        CommonModule,
        DejaMarkdownModule,
        routing,
    ],
    providers: [
    ],
})
export class HomeGuidesModule { }
