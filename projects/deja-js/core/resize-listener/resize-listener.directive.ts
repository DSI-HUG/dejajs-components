/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Output } from '@angular/core';

@Directive({
    selector: '[resize-listener]',
})
export class DejaResizeListenerDirective implements OnDestroy {
    private element: HTMLElement;
    private resizeSensor: HTMLDivElement;
    @Output() public sizeChanged = new EventEmitter<Event>();

    constructor(public elementRef: ElementRef) {
        this.element = elementRef.nativeElement as HTMLElement;
        this.resizeSensor = document.createElement('div');
        this.resizeSensor.dir = 'ltr';
        this.resizeSensor.className = 'resize-sensor';
        const style = 'position: absolute; left: -10px; top: -10px; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
        const styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';

        this.resizeSensor.style.cssText = style;
        this.resizeSensor.innerHTML =
            `<div class="resize-sensor-expand" style="${style}">
                <div style="${styleChild}"></div>
            </div>
            <div class="resize-sensor-shrink" style="${style}">
                <div style="${styleChild}width: 200%; height: 200%"></div>
            </div>`;
        this.element.appendChild(this.resizeSensor);
        const expand = this.resizeSensor.children[0] as HTMLElement;
        const expandChild = expand.children[0] as HTMLElement;
        const shrink = this.resizeSensor.children[1] as HTMLElement;

        const position = window.getComputedStyle(this.element).getPropertyPriority('position');
        if ('absolute' !== position && 'relative' !== position && 'fixed' !== position) {
            this.element.style.position = 'relative';
        }

        const getElementSize = (e: HTMLElement) => {
            if (!e.getBoundingClientRect) {
                return {
                    width: e.offsetWidth,
                    height: e.offsetHeight
                };
            }

            const rect = e.getBoundingClientRect();
            return {
                width: Math.round(rect.width),
                height: Math.round(rect.height)
            };
        };

        let rafId: number;
        const size = getElementSize(this.element);
        let lastWidth = size.width;
        let lastHeight = size.height;

        const reset = () => {
            // set display to block, necessary otherwise hidden elements won't ever work
            const invisible = this.element.offsetWidth === 0 && this.element.offsetHeight === 0;
            const saveDisplay = invisible && this.element.style.display;

            if (invisible) {
                this.element.style.display = 'block';
            }

            expandChild.style.width = expandChild.style.height = '100000px';
            expand.scrollLeft = expand.scrollTop = shrink.scrollLeft = shrink.scrollTop = 100000;

            if (invisible) {
                this.element.style.display = saveDisplay;
            }
        };

        const onScroll = () => {

            const s = getElementSize(this.element);
            const newWidth = s.width;
            const newHeight = s.height;

            const onResized = () => {
                rafId = 0;

                if (newWidth === lastWidth && newHeight === lastHeight) {
                    return;
                }

                lastWidth = newWidth;
                lastHeight = newHeight;
                this.sizeChanged.emit();
            };

            if ((newWidth !== lastWidth || newHeight !== lastHeight) && !rafId) {
                rafId = requestAnimationFrame(onResized);
            }

            reset();
        };

        expand.addEventListener('scroll', onScroll);
        shrink.addEventListener('scroll', onScroll);

        // Fix for custom Elements
        requestAnimationFrame(reset);
    }

    public ngOnDestroy() {
        if (this.resizeSensor) {
            if (this.element.contains(this.resizeSensor)) {
                this.element.removeChild(this.resizeSensor);
            }
            delete this.resizeSensor;
        }
    }
}
