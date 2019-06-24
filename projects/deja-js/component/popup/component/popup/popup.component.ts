/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component, Inject, Injector, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DejaPopupAction } from '../../model/popup-action.model';
import { DejaPopupBase } from '../../model/popup-base.class';
import { DejaPopupConfig } from '../../model/popup-config.model';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-popup',
    styleUrls: ['popup.component.scss'],
    templateUrl: 'popup.component.html',
})
export class DejaPopupComponent extends DejaPopupBase {

    public isMinified = false;
    public isFullscreen = false;

    constructor(
        public dialogRef: MatDialogRef<DejaPopupBase>,
        @Inject(MAT_DIALOG_DATA) public config: DejaPopupConfig,
        protected injector: Injector,
    ) {
        super();
    }

    public doAction(_action: DejaPopupAction) { }

}
