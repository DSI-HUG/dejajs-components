/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IconService } from './icon.service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [IconService],
})
export class DejaMatIconModule { }

export * from './icon.service';
