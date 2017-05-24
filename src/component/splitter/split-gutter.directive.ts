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
import {Directive, ElementRef, Input, Renderer} from '@angular/core';

@Directive({
    selector: 'split-gutter',
})
export class SplitGutterDirective {

    @Input() set order(v: number) {
        this.setStyle('order', v);
    }

    private _direction: string;
    @Input() set direction(v: string) {
        this._direction = v;
        this.refreshStyle();
    }

    @Input() set size(v) {
        this.setStyle('flex-basis', v + 'px');
    }

    private _disabled = false;
    @Input() set disabled(v: boolean) {
        this._disabled = v;
        this.refreshStyle();
    }

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
