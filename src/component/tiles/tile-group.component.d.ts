import { EventEmitter } from '@angular/core';
import { IDejaTile } from './';
export declare class DejaTileGroupComponent {
    model: IDejaTile;
    close: EventEmitter<void>;
    titleChanged: EventEmitter<string>;
    private edit$;
    private title;
    private _designMode;
    constructor();
    designMode: boolean | string;
}
