/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DejaChipsModule } from '@deja-js/component/chips';
import { DejaChildValidatorModule, MediaModule } from '@deja-js/component/core';
import { DejaItemModule } from '@deja-js/component/core/item-list';
import { DejaListLoaderModule } from '@deja-js/component/loaders';
import { DejaOverlayModule } from '@deja-js/component/overlay';

import { DejaSelectComponent } from './select.component';

@NgModule({
    declarations: [
        DejaSelectComponent
    ],
    exports: [
        DejaSelectComponent
    ],
    imports: [
        CommonModule,
        DejaChildValidatorModule,
        DejaChipsModule,
        DejaItemModule,
        DejaListLoaderModule,
        DejaOverlayModule,
        FormsModule,
        MatIconModule,
        MatInputModule,
        MediaModule
    ]
})
export class DejaSelectModule { }

export * from './select.component';
