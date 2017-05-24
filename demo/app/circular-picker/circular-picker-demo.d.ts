import { OnInit } from '@angular/core';
import { ICircularRange } from '../../index';
export declare class DejaCircularPickerDemoComponent implements OnInit {
    protected tabIndex: number;
    sm: number;
    sms: number;
    protected ranges1: ICircularRange[];
    protected ranges2: ICircularRange[];
    protected ranges3: ICircularRange[];
    protected ranges41: ICircularRange[];
    protected ranges42: ICircularRange[];
    private myModel;
    constructor();
    ngOnInit(): void;
    protected range42Changed(selection: number): void;
    protected getLabelForValue(value: number): string | number;
}
