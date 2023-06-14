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
import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { Directive, ElementRef, HostBinding, inject, Input } from '@angular/core';

import { SplitterDirection } from './splitter-direction-type';

/**
 * Directive representing a panel in a Splitter Component
 */
@Directive({
    selector: 'split-area'
})
export class SplitAreaDirective {

    @HostBinding('style.order')
    public order: number;

    @HostBinding('style.flex-basis.%')
    protected _size: number | null = null;

    public direction = 'horizontal' as SplitterDirection;

    /**
     * Size in percent of the current area
     */
    @Input()
    public set size(value: NumberInput) {
        this._size = coerceNumberProperty(value);
    }

    public get size(): number {
        const parentElement = this.elementRef.nativeElement.parentElement;
        const parentSizeInPixels = this.direction === 'horizontal' ? parentElement.offsetWidth : parentElement.offsetHeight;
        return 100 * this.sizeinPixels / parentSizeInPixels;
    }

    public get sizeinPixels(): number {
        return this.direction === 'horizontal' ? this.elementRef.nativeElement.offsetWidth : this.elementRef.nativeElement.offsetHeight;
    }

    /**
     * Min size in percent of the current area
     */
    @Input()
    public set minSizePixel(value: NumberInput) {
        this._minSizePixel = coerceNumberProperty(value);
    }

    public get minSizePixel(): number {
        return this._minSizePixel;
    }

    @HostBinding('style.min-width.px')
    protected get minWidth(): number {
        return this.direction === 'vertical' ? null : this._minSizePixel;
    }

    @HostBinding('style.min-height.px')
    protected get minHeight(): number {
        return this.direction === 'horizontal' ? null : this._minSizePixel;
    }

    private _minSizePixel = 0;

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
}
