/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MediaModule } from '@deja-js/core';
import { DejaOverlayComponent } from './overlay.component';

@NgModule({
    declarations: [DejaOverlayComponent],
    exports: [DejaOverlayComponent],
    imports: [
        CommonModule,
        OverlayModule,
        MediaModule,
    ],
})
export class DejaOverlayModule { }

export * from './overlay.component';
