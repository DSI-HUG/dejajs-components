import { IRange } from '../../component/range/range.interface';
export interface IWeight extends IRange {
    minWeight: number;
    maxWeight: number;
}
export declare class Weight implements IWeight {
    minWeight: number;
    maxWeight: number;
    min: number;
    max: number;
    $width: number;
    constructor(minWeight: number, maxWeight: number);
}
