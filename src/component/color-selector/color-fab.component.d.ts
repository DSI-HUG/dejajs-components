import { ElementRef } from '@angular/core';
import { DejaColorFab } from './index';
export declare class DejaColorFabComponent {
    element: HTMLElement;
    private _colorFab;
    private subscriptions;
    constructor(el: ElementRef);
    color: DejaColorFab;
    readonly tile: DejaColorFab;
    ngOnDestroy(): void;
}
