import { EventEmitter } from '@angular/core';
import { ElementRef, OnDestroy } from '@angular/core';
import { DejaTile, IDejaTilesModelEvent } from './index';
export declare class DejaTileComponent implements OnDestroy {
    template: any;
    designMode: any;
    modelChanged: EventEmitter<IDejaTilesModelEvent>;
    close: EventEmitter<Event>;
    element: HTMLElement;
    private _tile;
    private subscriptions;
    constructor(el: ElementRef);
    tile: DejaTile;
    ngOnDestroy(): void;
}
