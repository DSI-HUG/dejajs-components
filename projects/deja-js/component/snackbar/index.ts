/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DejaSnackbarComponent } from './snackbar.component';

@NgModule({
  declarations: [DejaSnackbarComponent],
  exports: [ DejaSnackbarComponent ],
  imports: [
    CommonModule,
  ],
})
export class DejaSnackbarModule { }

export * from './snackbar.component';
