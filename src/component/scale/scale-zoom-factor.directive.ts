/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer, SimpleChanges} from '@angular/core';

@Directive({
    selector: '[deja-scale-zoom-factor]',
})
export class DejaScaleZoomFactorDirective implements OnInit, OnChanges {

    @Input("zoomFactor") public zoomFactor = 20 as number;
    @Input("zoomEnabled") public zoomEnabled = false as boolean;

    private _zoomFactorPreviousValue: string;

    constructor(private _elementRef: ElementRef, private _renderer: Renderer) {
    }

    public ngOnInit() {
        this.removeAddZoomClass();
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes["zoomFactor"]) {
            this._zoomFactorPreviousValue = Number.isInteger(changes["zoomFactor"].previousValue)?changes["zoomFactor"].previousValue:null;
        }
        this.removeAddZoomClass();
    }

    private removeAddZoomClass () {
        let zoomClass = "zoom-" + this.zoomFactor;
        if (this.zoomEnabled) {
            this._renderer.setElementClass(this._elementRef.nativeElement, zoomClass, true);
            if (this._zoomFactorPreviousValue) {
                this._renderer.setElementClass(this._elementRef.nativeElement, "zoom-" + this._zoomFactorPreviousValue, false);
                this._zoomFactorPreviousValue = null;
            }
        } else {
            this._renderer.setElementClass(this._elementRef.nativeElement, zoomClass, false);
        }
        return null;
    }

}
