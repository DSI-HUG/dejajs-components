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

import { DejaTagComponent } from './tag.component';

@NgModule({
    declarations: [DejaTagComponent],
    exports: [DejaTagComponent],
    imports: [
        CommonModule,
        DejaChipsModule,
        FormsModule,
        MatIconModule,
        MatInputModule
    ],
    providers: []
})
export class DejaTagModule { }

export * from './tag.component';
