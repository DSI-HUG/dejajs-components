import { ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Color } from '../../common/core/graphics/index';
import { MaterialColor } from '../../common/core/style';
export declare class DejaColorPickerComponent implements ControlValueAccessor {
    private elementRef;
    colors: MaterialColor[];
    dropdownContainerId: string;
    dropdownAlignment: string;
    isOpen: boolean;
    colorhover: EventEmitter<{}>;
    protected onTouchedCallback: () => void;
    protected onChangeCallback: (_: any) => void;
    private _small;
    private _disabled;
    private _value;
    readonly containerElement: any;
    constructor(elementRef: ElementRef);
    small: boolean;
    disabled: boolean;
    value: Color;
    writeValue(value: Color): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    protected onClick(event: Event): boolean;
    protected onColorChange(color: Color): void;
}
