/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';

export class TooltipConfig<D> extends MatDialogConfig<D> {
    public hideDelay?: number;
}
