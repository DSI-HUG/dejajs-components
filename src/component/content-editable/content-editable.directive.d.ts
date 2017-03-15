import { ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class DejaEditableDirective implements ControlValueAccessor {
    private model;
    private _inEdition;
    private _editMode;
    private _mandatory;
    private _multiline;
    private onTouchedCallback;
    private onChangeCallback;
    private edit$;
    private element;
    constructor(elementRef: ElementRef);
    mandatory: boolean;
    multiline: boolean;
    editMode: boolean;
    inEdition: boolean;
    value: any;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    focus(): void;
    selectAll(): void;
    edit(selectOnFocus?: boolean): void;
    private isChildElement(element);
    private refreshView();
}
