import { ElementRef } from '@angular/core';
export declare class DejaTooltipService {
    params: {
        [name: string]: ITooltipParams;
    };
    constructor();
}
export interface ITooltipParams {
    ownerElement: ElementRef | HTMLElement;
    model: any;
}
