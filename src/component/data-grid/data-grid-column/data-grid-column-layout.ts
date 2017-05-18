/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Subject } from 'rxjs/Subject';
import { IDejaGridColumn } from '../index';

export class IDejaGridColumnLayout {
    public scrollLeft: number;
    public vpBeforeWidth: number;
    public vpAfterWidth: number;
    public columns: IDejaGridColumn[];
    public refresh$: Subject<void>;
}
