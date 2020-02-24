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
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DejaSplitterComponent } from './splitter.component';

/**
 * Directive representing a panel in a Splitter Component
 */
@Directive({
    selector: 'split-area',
})
export class SplitAreaDirective implements OnInit, OnDestroy {

    /**
     * Order position of the current area
     */
    @Input()
    public set order(value: number | string) {
        const v = coerceNumberProperty(value);
        this._order = !isNaN(v) ? v : null;
        this.split.updateArea(this, this._order, this._size, this._minSizePixel);
    }

    /**
     * Size in percent of the current area
     */
    @Input()
    public set size(value: number | string) {
        const v = coerceNumberProperty(value);
        this._size = !isNaN(v) ? v : null;
        this.split.updateArea(this, this._order, this._size, this._minSizePixel);
    }

    /**
     * Min size in percent of the current area
     */
    @Input()
    public set minSizePixel(value: number | string) {
        const v = coerceNumberProperty(value);
        this._minSizePixel = (!isNaN(v) && v > 0) ? v : 0;
        this.split.updateArea(this, this._order, this._size, this._minSizePixel);
    }

    private _order: number | null = null;
    private _size: number | null = null;
    private _minSizePixel = 0;
    private eventsLockFct: Function[] = [];

    /**
     * Constructor
     */
    constructor(private elementRef: ElementRef,
                private renderer: Renderer2,
                private split: DejaSplitterComponent) {
    }

    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     */
    public ngOnInit() {
        this.split.addArea(this, this._order, this._size, this._minSizePixel);
    }

    /**
     * Lock the events
     */
    public lockEvents() {
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'selectstart', () => false));
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'dragstart', () => false));
    }

    /**
     * Unlock the events
     */
    public unlockEvents() {
        while (this.eventsLockFct.length > 0) {
            const fct = this.eventsLockFct.pop();
            if (fct) {
                fct();
            }
        }
    }

    /**
     * Set a style for the current area
     * @param key style key
     * @param value style value
     */
    public setStyle(key: string, value: any) {
        value == null ? this.renderer.removeStyle(this.elementRef.nativeElement, key) : this.renderer.setStyle(this.elementRef.nativeElement, key, value);
    }

    /**
     * Lifecycle hook that is called when a directive, pipe or service is destroyed.
     */
    public ngOnDestroy() {
        this.split.removeArea(this);
    }
}
