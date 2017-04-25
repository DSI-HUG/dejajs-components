/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/**
 * Created by rtr on 22.12.2016.
 */
import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer } from '@angular/core';
import { DejaSplitterComponent } from './splitter.component';

@Directive({
    selector: 'split-area',
})
export class SplitAreaDirective implements OnInit, OnDestroy {

    @Input()
    public set order(v: number) {
        this._order = !isNaN(v) ? v : null;
        this.split.updateArea(this, this._order, this._size, this._minSizePixel);
    }

    @Input()
    public set size(v: number) {
        this._size = !isNaN(v) ? v : null;
        this.split.updateArea(this, this._order, this._size, this._minSizePixel);
    }

    @Input()
    public set minSizePixel(v: number) {
        this._minSizePixel = (!isNaN(v) && v > 0) ? v : 0;
        this.split.updateArea(this, this._order, this._size, this._minSizePixel);
    }

    private _order: number | null = null;
    private _size: number | null = null;
    private _minSizePixel = 0;
    private eventsLockFct: Function[] = [];

    constructor(private elementRef: ElementRef,
                private renderer: Renderer,
                private split: DejaSplitterComponent) {
    }

    public ngOnInit() {
        this.split.addArea(this, this._order, this._size, this._minSizePixel);
    }

    public lockEvents() {
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'selectstart', () => false));
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'dragstart', () => false));
    }

    public unlockEvents() {
        while (this.eventsLockFct.length > 0) {
            const fct = this.eventsLockFct.pop();
            if (fct) {
                fct();
            }
        }
    }

    public setStyle(key: string, value: any) {
        this.renderer.setElementStyle(this.elementRef.nativeElement, key, value);
    }

    public ngOnDestroy() {
        this.split.removeArea(this);
    }
}
