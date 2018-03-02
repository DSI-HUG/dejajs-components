/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Color } from '@deja-js/component';
import { MaterialColors } from '@deja-js/component';
import { DejaPopupAction } from '@deja-js/component';
import { DejaPopupConfig } from '@deja-js/component';
import { IColorEvent } from '@deja-js/component';

@Component({
    selector: 'deja-dummy',
    templateUrl: './dummy.component.html',
    styleUrls: ['./dummy.component.scss']
})
export class DummyComponent {

    public selectedColor = new Color(233, 30, 99);

    constructor(
        @Inject(MAT_DIALOG_DATA) public config: DejaPopupConfig,
        public materialColors: MaterialColors,
    ) { }

    public onColorPickerChange(event: IColorEvent) {
        const action = new DejaPopupAction('color-change', 'ground-control');
        action.data = event;
        this.config.dejaPopupCom$.next(action);
    }

}
