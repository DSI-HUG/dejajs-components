import { ElementRef } from '@angular/core';
import { DejaMouseDragDropService, IDragCursorInfos, IDragDropContext, IDropCursorInfos } from './mouse-dragdrop.service';
import { Observable } from 'rxjs/Rx';
export declare class DejaMouseDroppableDirective {
    private _context;
    private _dragContext;
    context: IDejaMouseDroppableContext;
    constructor(elementRef: ElementRef, dragDropService: DejaMouseDragDropService);
}
export interface IDejaMouseDroppableContext {
    dragEnter?: (dragContext: IDragDropContext, dragCursor: IDragCursorInfos) => IDropCursorInfos | Observable<IDropCursorInfos>;
    dragOver?: (dragContext: IDragDropContext, dragCursor: IDragCursorInfos) => IDropCursorInfos;
    dragLeave?: (dragContext: IDragDropContext) => void;
    drop?: (dragContext: IDragDropContext) => void;
}
