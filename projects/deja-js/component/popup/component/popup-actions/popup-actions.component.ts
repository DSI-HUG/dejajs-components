/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DejaPopupAction } from '../../model/popup-action.model';
import { DejaPopupConfig } from '../../model/popup-config.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-popup-actions',
    templateUrl: './popup-actions.component.html',
    styleUrls: ['./popup-actions.component.scss']
})
export class DejaPopupActionsComponent implements OnInit {

    public nonClosingButtons: DejaPopupAction[];

    public buttons: DejaPopupAction[];

    constructor(@Inject(MAT_DIALOG_DATA) public config: DejaPopupConfig) { }

    public ngOnInit() {
        console.log('DejaPopupActionsComponent config=', this.config);
        if (this.config.actions && this.config.actions.length) {
            this.buttons = this.config.actions;
        }

        if (this.config.nonClosingActions && this.config.nonClosingActions.length) {
            this.nonClosingButtons = this.config.nonClosingActions;
        }
    }

    public emit(action: DejaPopupAction) {
        if (this.config.dejaPopupCom$) {
            action.target = this.config.id;
            this.config.dejaPopupCom$.next(action);
        }
    }

}
