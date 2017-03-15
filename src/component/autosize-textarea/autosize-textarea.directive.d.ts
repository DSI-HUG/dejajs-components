import { AfterViewInit, ElementRef } from '@angular/core';
import { Validator } from '@angular/forms';
export declare class DejaAutosizeTextAreaDirective implements AfterViewInit, Validator {
    private elementRef;
    private resize$;
    constructor(elementRef: ElementRef);
    ngAfterViewInit(): void;
    validate(): {
        [key: string]: any;
    };
}
