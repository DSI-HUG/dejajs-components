import { Component, Inject, Injector, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
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
