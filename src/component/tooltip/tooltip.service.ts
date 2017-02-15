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

import { ElementRef, Injectable } from '@angular/core';

@Injectable()
export class DejaTooltipService {
    public params = {} as { [name: string]: ITooltipParams };

    constructor() { }
}

export interface ITooltipParams {
    /** Renvoie ou définit l'élement du DOM sur lequel le conteneur déroulant devra s'aligner */
    ownerElement: ElementRef | HTMLElement;
    model: any;
}
