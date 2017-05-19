/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DejaAccordionBodyComponent, DejaAccordionComponent, DejaAccordionGroupComponent, DejaAccordionHeaderComponent } from './accordion.component';

const DEJA_ACCORDION_COMPONENTS = [DejaAccordionBodyComponent, DejaAccordionComponent, DejaAccordionGroupComponent, DejaAccordionHeaderComponent];

@NgModule({
    declarations: [DEJA_ACCORDION_COMPONENTS],
    exports: [DEJA_ACCORDION_COMPONENTS],
    imports: [CommonModule],
})
export class DejaAccordionModule { }
