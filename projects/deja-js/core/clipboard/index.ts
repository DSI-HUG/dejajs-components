/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { DejaClipboardService } from './clipboard.service';

@NgModule({
    providers: [DejaClipboardService],
})
export class DejaClipboardModule {
    public static forRoot(): ModuleWithProviders<DejaClipboardModule> {
        return {
            ngModule: DejaClipboardModule,
            providers: [ DejaClipboardService ],
        };
    }
}

export * from './clipboard.service';
