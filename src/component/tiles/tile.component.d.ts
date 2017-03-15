import { EventEmitter } from '@angular/core';
import { ElementRef, OnDestroy } from '@angular/core';
import { DejaTile } from './tile.class';
export declare class DejaTileComponent implements OnDestroy {
    template: any;
    designMode: any;
    modelChanged: EventEmitter<{}>;
    close: EventEmitter<{}>;
    element: HTMLElement;
    private _tile;
    private subscriptions;
    constructor(el: ElementRef);
    tile: DejaTile;
    ngOnDestroy(): void;
}
