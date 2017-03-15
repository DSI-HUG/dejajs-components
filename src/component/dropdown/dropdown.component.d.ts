import { AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
export declare class DejaDropDownComponent implements AfterViewInit {
    private elementRef;
    hide: EventEmitter<{}>;
    ownerElement: ElementRef | HTMLElement;
    ownerLeftMargin: number;
    ownerTopMargin: number;
    ownerRightMargin: number;
    ownerBottomMargin: number;
    containerElement: ElementRef | HTMLElement;
    avoidOnwerOverflow: boolean;
    closeOnEscape: true;
    private show$;
    private closeOnEscape$;
    private ownerAlignents;
    private dropdownAlignments;
    ownerAlignment: string;
    dropdownAlignment: string;
    readonly dropdownElement: HTMLElement;
    constructor(elementRef: ElementRef);
    ngAfterViewInit(): void;
    show(): void;
}
