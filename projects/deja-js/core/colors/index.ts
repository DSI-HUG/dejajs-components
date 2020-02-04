/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { MaterialColors } from './material-colors';

@NgModule({
    providers: [MaterialColors],
})
export class DejaMaterialColorsModule {
    public static forRoot(): ModuleWithProviders<MaterialColors> {
        return {
            ngModule: MaterialColors,
            providers: [ MaterialColors ],
        };
    }
}

export * from './material-color';
export * from './material-colors';
