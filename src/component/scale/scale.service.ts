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

import { Injectable } from '@angular/core';

@Injectable()
export class ScaleService {

    private _lastHoveredStep: Element;
    private _svgParent: Element;
    private _zoomByMouseHoverActivated: boolean;

    /**
     * Zoom step by event. This results in putting a specific class to simulate the hover effect on a step. Useful when using with drag and drop.
     * @param $event
     */
    public zoomStepByEvent($event) {
        let zoomableStep = this.getScaleStepByChild(event.target as HTMLElement);
        if (zoomableStep && zoomableStep !== this._lastHoveredStep) {
            zoomableStep.classList.add("hover");
            if (this._lastHoveredStep) {
                this._lastHoveredStep.classList.remove("hover");
            }
            this._lastHoveredStep = zoomableStep;
            if (!this._svgParent) {
                this._svgParent = zoomableStep.parentElement;
                this._zoomByMouseHoverActivated = this._svgParent.classList.contains("zoom");
            }
            this._svgParent.classList.add("hover");
            this._svgParent.classList.add("zoom");
        }
    }

    /**
     * Remove the last hovered step set by zoomStepByEvent.
     */
    public removeZoomLastVisitedStep() {
        if (this._lastHoveredStep) {
            this._lastHoveredStep.classList.remove("hover");
            this._lastHoveredStep = null;
        }
        if (this._svgParent) {
            this._svgParent.classList.remove("hover");
            if (!this._zoomByMouseHoverActivated) {
                this._svgParent.classList.remove("zoom");
            }
        }
    }

    /**
     * Return value of selected step in scale. It can be a main scale step or a zoomable scale step.
     * @param $event
     * @returns {string}
     */
    public getStepValueByEvent($event): string {
        let target: HTMLElement = $event.target;
        let svg: HTMLElement = target.parentElement;
        if ((target.tagName === 'rect' || target.tagName === 'text') && svg) {
            return svg.getAttribute("data-value");
        } else {
            return target.getAttribute("data-value");
        }
    }

    /**
     * Return main scale step HTMLElement by child contained in this step.
     * @param node
     * @returns {any}
     */
    public getScaleStepByChild(node: HTMLElement): HTMLElement {
        if (!node || node.nodeName === "DIV") {
            return null;
        }

        let svg: HTMLElement = node.parentElement;
        if ((node.tagName === 'rect' || node.tagName === 'text') && svg && svg.classList.contains("scale-step")) {
            return svg;
        } else if (node.classList.contains("scale-step")) {
            return node;
        } else {
            return this.getScaleStepByChild(svg);
        }
    }
}
