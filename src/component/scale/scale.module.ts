/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { CommonModule } from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DejaScaleComponent, DejaScaleZoomFactorDirective, ScaleService } from "./index";

@NgModule({
    declarations: [DejaScaleZoomFactorDirective, DejaScaleComponent],
    exports: [DejaScaleComponent],
    imports: [
        CommonModule,
        FormsModule,
    ],
    providers: [ScaleService],
})
export class DejaScaleModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: DejaScaleModule,
            providers: [ScaleService],
        };
    }
}
