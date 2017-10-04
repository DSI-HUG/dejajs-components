/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'deja-overlay-demo',
    styleUrls: ['./overlay-demo.scss'],
    templateUrl: './overlay-demo.html',
})
export class OverlayDemoComponent {
    public selected = '';
    public items = [
        { text: 'Refresh' },
        { text: 'Settings' },
        { text: 'Help', disabled: true },
        { text: 'Sign Out' },
    ];

    public tabIndex = 1;

    @ViewChild('contextMenu') private contextMenu;

    public select(text: string) { this.selected = text; }

    protected onContextMenu(event: MouseEvent) {
        const parent = event.currentTarget as HTMLElement;
        const parentRect = parent.getBoundingClientRect();
        this.contextMenu.show(event.pageX - parentRect.left, event.pageY - parentRect.top);
        event.preventDefault();
        return false;
    }
}
