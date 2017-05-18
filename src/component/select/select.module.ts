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
import { MdIconModule, MdInputModule} from '@angular/material';
import { DejaChildValidatorModule } from '../../common/core/validation';
import { DejaBackdropModule } from '../backdrop';
import { DejaChipsModule } from '../chips';
import { DejaDropDownModule } from '../dropdown';
import { DejaSelectComponent } from './select.component';

@NgModule({
    declarations: [
        DejaSelectComponent,
    ],
    exports: [
        DejaSelectComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MdIconModule,
        MdInputModule,
        DejaChildValidatorModule,
        DejaChipsModule,
        DejaDropDownModule,
        DejaBackdropModule,
    ],
})
export class DejaSelectModule {}
