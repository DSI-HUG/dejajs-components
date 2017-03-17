import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { DejaDropDownComponent } from '../dropdown/index';
import { ITooltipParams } from './index';
import { DejaTooltipService } from './tooltip.service';
export declare class DejaTooltipComponent implements OnInit {
    private tooltipService;
    dropdown: DejaDropDownComponent;
    tooltipTemplate: any;
    name: string;
    hide: EventEmitter<{}>;
    params: ITooltipParams;
    private model;
    constructor(elementRef: ElementRef, tooltipService: DejaTooltipService);
    ngOnInit(): void;
}
