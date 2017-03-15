import { ElementRef } from '@angular/core';
import { DejaMouseDragDropService } from './mouse-dragdrop.service';
export declare class DejaMouseDraggableDirective {
    private _context;
    context: IDejaMouseDraggableContext;
    constructor(elementRef: ElementRef, dragDropService: DejaMouseDragDropService);
    protected onMouseDown(e: DragEvent): boolean;
}
export interface IDejaMouseDraggableContext {
    target?: string;
    className?: string;
    dragStart?: (HTMLElement) => any;
}
