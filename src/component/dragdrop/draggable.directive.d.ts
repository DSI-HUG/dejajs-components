import { ElementRef } from '@angular/core';
import { DejaClipboardService } from '../../common/core/clipboard/clipboard.service';
export declare class DejaDraggableDirective {
    private clipboardService;
    private dragdropid;
    private draggable;
    private draginfokey;
    private objectKey;
    private elementKey;
    private uuidKey;
    private _context;
    context: IDejaDragContext;
    constructor(elementRef: ElementRef, clipboardService: DejaClipboardService);
}
export interface IDejaDragEvent extends DragEvent {
    dragInfo: {
        [key: string]: any;
    };
    dragObject: any;
    dragElement: HTMLElement;
}
export interface IDejaDragContext {
    object: any;
    dragstartcallback: (event: IDejaDragEvent) => void;
    dragendcallback: (event: IDejaDragEvent) => void;
}
