import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
export declare class DejaDialogComponent {
    closed: EventEmitter<{}>;
    private okButton;
    private cancelButton;
    constructor(elementRef: ElementRef);
    close(event: MouseEvent): void;
}
