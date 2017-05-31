/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import {Directive, ElementRef, Input, Renderer} from '@angular/core';

/**
 * Separator for the spltter component
 */
@Directive({
    selector: 'split-gutter',
})
export class SplitGutterDirective {

    /**
     * Order of the seperator
     */
    @Input() set order(v: number) {
        this.setStyle('order', v);
    }

    private _direction: string;
    /**
     * Direction of the separator
     * Can be `horizontal` or `vertical`
     */
    @Input() set direction(v: string) {
        this._direction = v;
        this.refreshStyle();
    }

    /**
     * Separator size in pixel
     */
    @Input() set size(v) {
        this.setStyle('flex-basis', v + 'px');
    }

    private _disabled = false;
    /**
     * Disable the separator
     * By default `false`
     */
    @Input() set disabled(v: boolean) {
        this._disabled = v;
        this.refreshStyle();
    }

    /**
     * Constructor
     */
    constructor(private elementRef: ElementRef,
                private renderer: Renderer) {
    }

    private refreshStyle() {
        const state = this._disabled === true ? 'disabled' : this._direction;

        this.setStyle('cursor', this.getCursor(state));
        this.setStyle('background-image', `url("${ this.getImage(state) }")`);
    }

    private setStyle(key: string, value: any) {
        this.renderer.setElementStyle(this.elementRef.nativeElement, key, value);
    }

    private getCursor(state: string) {
        switch (state) {
            case 'disabled':
                return 'default';
            case 'vertical':
                return 'row-resize';
            case 'horizontal':
                return 'col-resize';
            default:
                return null;
        }
    }

    private getImage(state: string) {
        switch (state) {
            case 'disabled':
                return '';
            case 'vertical':
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC';
            case 'horizontal':
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==';
            default:
                return null;
        }
    }
}
