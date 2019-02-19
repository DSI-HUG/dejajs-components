/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ElementRef, Injectable } from '@angular/core';
import { DejaConnectionPositionPair } from '@deja-js/core';

/**
 * Service to pass some params through tooltip module
 */
@Injectable()
export class DejaTooltipService {
    /** Tooltip params */
    public params = {} as { [name: string]: ITooltipParams };
}

/**
 * Format of tooltip params
 */
export interface ITooltipParams {
    /** Renvoie ou définit l'élement du DOM sur lequel le conteneur déroulant devra s'aligner */
    ownerElement: ElementRef | HTMLElement;
    positions: DejaConnectionPositionPair | string;
    model: any;
}
