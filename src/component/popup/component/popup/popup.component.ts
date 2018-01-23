import { Component, Inject, Injector, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DejaPopupAction } from '../../model/popup-action.model';
import { DejaPopupBase } from '../../model/popup-base.class';
import { DejaPopupConfig } from '../../model/popup-config.model';
import { DejaPopupReponse } from '../../model/popup-response.model';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'popup',
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

    public doAction(action: DejaPopupAction) {

        if (!action) {
            return false;
        }

        const res = new DejaPopupReponse(action, this.dialogRef.componentInstance);
        res.lastAction = action;
        this.dialogRef.close(res);

    }

}
