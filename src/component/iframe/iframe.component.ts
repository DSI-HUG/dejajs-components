import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'deja-iframe',
    styleUrls: [
        './iframe.component.scss',
    ],
    template: '<iframe id="djframe" #iframe><ng-content></ng-content></iframe>'
})
export class DejaIFrameComponent {
    @ViewChild('iframe') iframe: ElementRef;

    @Input()
    public set sourceUrl(url: string) {
        const iframeElement = this.iframe.nativeElement as HTMLElement;

        if (url) {
            iframeElement.setAttribute('src', url);
        } else {
            iframeElement.removeAttribute('src');
        }
    }
}
