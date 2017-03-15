import { ElementRef, OnDestroy, OnInit, Renderer } from '@angular/core';
import { DejaSplitterComponent } from './splitter.component';
export declare class SplitAreaDirective implements OnInit, OnDestroy {
    private elementRef;
    private renderer;
    private split;
    order: number;
    size: number;
    minSizePixel: number;
    private _order;
    private _size;
    private _minSizePixel;
    private eventsLockFct;
    constructor(elementRef: ElementRef, renderer: Renderer, split: DejaSplitterComponent);
    ngOnInit(): void;
    lockEvents(): void;
    unlockEvents(): void;
    setStyle(key: string, value: any): void;
    ngOnDestroy(): void;
}
