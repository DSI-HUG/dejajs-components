import { ElementRef } from '@angular/core';
import { DejaConnectionPositionPair } from '@deja-js/core';

/**
 * Format of tooltip params
 */
export interface ITooltipParams {
    /** Renvoie ou définit l'élement du DOM sur lequel le conteneur déroulant devra s'aligner */
    ownerElement: ElementRef | HTMLElement;
    positions: DejaConnectionPositionPair | string;
    model: any;
}
