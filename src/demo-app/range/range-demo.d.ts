import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { IStepRangeEvent, Range } from '../../component/range/range.interface';
import { Weight } from './weight.interface';
export declare class DejaRangeDemoComponent {
    readOnlyRanges: Range[];
    rangesWithInterval: Range[];
    steps: number[];
    ranges: Range[];
    numericStep: number;
    weights: Weight[];
    errors: Observable<any>;
    protected errorFeed: EventEmitter<any>;
    protected rangeRef: any;
    protected weightRef: any;
    constructor();
    protected stepFn(event: IStepRangeEvent): number;
    protected remove(index: number): void;
    protected add(index: number): void;
    protected increase(): void;
    protected decrease(): void;
    private computeRangeFromWeight();
}
