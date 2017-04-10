import { ChangeDetectorRef, ElementRef, OnInit } from '@angular/core';
import { Position } from '../../common/core/graphics/position';
export declare enum ClockwiseFactorEnum {
    clockwise = -1,
    counterClockwise = 1,
}
export declare class DejaCircularPickerComponent implements OnInit {
    private changeDetectorRef;
    clockwiseFactor: ClockwiseFactorEnum;
    fullDiameter: number;
    labelsDiameter: number;
    outerLabels: boolean;
    ranges: ICircularRange[];
    labelTemplate: any;
    cursorTemplate: any;
    disabled: boolean | string;
    private _disabled;
    private _value;
    private TwoPI;
    private radius;
    private configs;
    private selectedConfig;
    private circularValues;
    private cursor;
    private cursorHand;
    private cursorElement;
    private clickedTime;
    private onTouchedCallback;
    private onChangeCallback;
    private picker;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    value: number;
    writeValue(value: number): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    protected pointToValue(x: number, y: number, config: IConfig): number;
    protected valueToPoint(value: number, radiusOffset: number, config: IConfig): Position;
    private pointToAngle(x, y, config);
    private valueToAngle(value, config);
    private bind();
    private updateCursor();
    private getHTMLElement(element, attr);
}
export interface IConfig {
    range: ICircularRange;
    steps: number;
    stepAngle: number;
}
export interface ICircularRange {
    min: number;
    max: number;
    interval?: number;
    labelInterval?: number;
    beginOffset?: number;
}
