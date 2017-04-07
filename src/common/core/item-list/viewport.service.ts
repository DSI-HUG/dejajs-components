/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

/** Service de gestion du viewport d'une liste.
 * Ce service permet la gestion du viewport verticalement ou horizontalement.
 */
@Injectable()
export class ViewPortService {
    public viewPort$: Observable<IViewPort>;
}

export interface IViewPort {

}
