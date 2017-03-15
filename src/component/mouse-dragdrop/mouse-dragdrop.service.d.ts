import { BehaviorSubject, Subject } from 'rxjs/Rx';
import { Position } from '../../common/core/graphics/position';
export declare class DejaMouseDragDropService {
    private _context;
    private _isDragging;
    dragCursor$: BehaviorSubject<IDragCursorInfos>;
    dropCursor$: Subject<IDropCursorInfos>;
    dragging$: BehaviorSubject<boolean>;
    constructor();
    readonly isDragging: boolean;
    context: IDragDropContext;
}
export interface IDragDropContext {
    [key: string]: any;
}
export interface IDropCursorInfos {
    html?: string;
    width?: number;
    height?: number;
    className?: string;
}
export interface IDragCursorInfos extends IDropCursorInfos {
    position: Position;
    originalEvent: MouseEvent;
}
