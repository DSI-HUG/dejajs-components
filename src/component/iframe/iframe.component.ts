/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'deja-iframe',
    styleUrls: [
        './iframe.component.scss',
    ],
    template: '<iframe id="djframe" #iframe><ng-content></ng-content></iframe>'
})
export class DejaIFrameComponent {
    @ViewChild('iframe')
    public iframe: ElementRef;

    @Input()
    public set sourceUrl(url: string) {
        const iframeElement = this.iframe.nativeElement as HTMLElement;

        if (url) {
            iframeElement.setAttribute('src', url);
        } else {
            iframeElement.removeAttribute('src');
        }
    }

    public get sourceUrl() {
        const iframeElement = this.iframe.nativeElement as HTMLElement;
        return iframeElement.hasAttribute('src') ? iframeElement.getAttribute('src') : undefined;
    }
}
