import { ElementRef, EventEmitter } from '@angular/core';
import { DejaTooltipService } from '.';
export declare class DejaTooltipDirective {
    model: any;
    name: string;
    show: EventEmitter<{}>;
    constructor(elementRef: ElementRef, tooltipService: DejaTooltipService);
}
