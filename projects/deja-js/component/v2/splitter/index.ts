/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SplitAreaDirective } from './split-area.directive';
import { DejaSplitterComponent } from './splitter.component';

@NgModule({
    declarations: [
        DejaSplitterComponent,
        SplitAreaDirective
    ],
    exports: [
        DejaSplitterComponent,
        SplitAreaDirective
    ],
    imports: [
        CommonModule
    ]
})
export class DejaSplitterModule {

}

export * from './splitter-direction-type';
export * from './split-area.directive';
export * from './splitter.component';
