/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
import { KeysPipe } from './keys.pipe';
import { StringToDateFormatPipe } from './moment.pipe';
import { SafeHTMLPipe } from './safe-html.pipe';
import { SafeStylePipe } from './safe-style.pipe';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        StringToDateFormatPipe,
        SafeHTMLPipe,
        SafeStylePipe,
        TimeAgoPipe,
    ],
    exports: [
        KeysPipe,
        StringToDateFormatPipe,
        SafeHTMLPipe,
        SafeStylePipe,
        TimeAgoPipe,
    ],
})
export class DejaPipeModule { }

export * from './keys.pipe';
export * from './moment.pipe';
export * from './safe-html.pipe';
export * from './safe-style.pipe';
export * from './time-ago.pipe';
