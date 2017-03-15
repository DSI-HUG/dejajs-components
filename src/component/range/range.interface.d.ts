export interface IRange {
    min: number;
    max: number;
    $width?: number;
}
export interface IRangeEvent extends Event {
    range: IRange;
    ranges: IRange[];
    index: number;
}
export interface IStepRangeEvent extends IRangeEvent {
    newMax: number;
}
export declare class Range implements IRange {
    min: number;
    max: number;
    $width: number;
    constructor(min: number, max: number, $width?: number);
}
