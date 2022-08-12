/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, HostBinding, Input } from '@angular/core';

import { SplitterDirection } from './splitter.component';

/**
 * Separator for the spltter component
 */
@Directive({
    selector: 'split-gutter'
})
export class SplitGutterDirective {
    /**
     * Direction of the separator
     * Can be `horizontal` or `vertical`
     */
    @Input()
    public direction = 'horizontal' as SplitterDirection;

    /**
     * Disable the separator
     * By default `false`
     */
    @Input()
    public set disabled(v: BooleanInput) {
        this._disabled = coerceBooleanProperty(v);
    }

    public get disabled(): BooleanInput {
        return this._disabled;
    }

    @HostBinding('disabled')
    protected _disabled = false;

    @HostBinding('style.cursor')
    protected get cursor(): string {
        if (this.disabled) {
            return 'default';
        } else if (this.direction === 'vertical') {
            return 'row-resize';
        } else {
            return 'col-resize';
        }
    }

    @HostBinding('style.background-image')
    protected get image(): string {
        if (this.disabled) {
            return '';
        } else if (this.direction === 'vertical') {
            return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC")';
        } else {
            // eslint-disable-next-line no-secrets/no-secrets
            return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==")';
        }
    }

    @HostBinding('style.content')
    protected get content(): string {
        return this.direction === 'horizontal' ? ' ' : null;
    }
}
