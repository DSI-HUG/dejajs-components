import { ElementRef } from '@angular/core';
import { DejaMouseDragDropService } from './mouse-dragdrop.service';
export declare class DejaMouseDragDropCursorComponent {
    private dragDropService;
    private icon;
    private content;
    private position$;
    private cursor$;
    private _dragCursor;
    private _currentCursor;
    private _dropCursor;
    constructor(elementRef: ElementRef, dragDropService: DejaMouseDragDropService);
    private readonly iconElement;
    private readonly contentElement;
}
