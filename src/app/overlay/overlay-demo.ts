/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DejaOverlayComponent } from '@deja-js/component/overlay';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-overlay-demo',
    styleUrls: ['./overlay-demo.scss'],
    templateUrl: './overlay-demo.html',
})
export class DejaOverlayDemoComponent {
    public selected = '';
    public items = [
        { text: 'Refresh' },
        { text: 'Settings' },
        { text: 'Help', disabled: true },
        { text: 'Sign Out' },
    ];

    public tabIndex = 1;

    @ViewChild('contextMenu')
    private contextMenu: DejaOverlayComponent;

    public select(text: string) { this.selected = text; }

    protected onContextMenu(event: MouseEvent) {
        const parent = event.currentTarget as HTMLElement;
        const parentRect = parent.getBoundingClientRect();
        this.contextMenu.show(event.pageX - parentRect.left, event.pageY - parentRect.top);
        event.preventDefault();
        return false;
    }
}
