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

import { IDejaGridColumn } from "../index";

export class IDejaGridColumnLayout {
    public scrollLeft: number;
    public vpBeforeWidth: number;
    public vpAfterWidth: number;
    public columns: IDejaGridColumn[];
}
