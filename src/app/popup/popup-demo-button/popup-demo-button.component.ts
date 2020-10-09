/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { CONTAINER_DATA } from '../popup-demo.service';

export interface PopupDemoButtonComponentData {
    iconName: string;
    iconTooltip?: string;
    buttonColor?: ThemePalette;
    onClickEvent?(event: MouseEvent, instance: PopupDemoButtonComponent): void;
}

@Component({
    selector: 'deja-dummy-button',
    templateUrl: './popup-demo-button.component.html',
    styleUrls: ['./popup-demo-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupDemoButtonComponent {

    public constructor(
        @Inject(CONTAINER_DATA) public data: PopupDemoButtonComponentData
    ) {
    }

    public onClick(event: MouseEvent): void {
        if (this.data?.onClickEvent) {
            this.data.onClickEvent(event, this);
        }
    }
}
