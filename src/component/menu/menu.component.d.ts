import { ElementRef } from '@angular/core';
export declare class DejaMenuComponent {
    private elementRef;
    dropdownContainerId: string;
    buttonAlignment: string;
    menuAlignment: string;
    isVisible: boolean;
    ownerElement: HTMLElement;
    constructor(elementRef: ElementRef);
    private readonly containerElement;
    show(event: Event): void;
    close(): void;
}
