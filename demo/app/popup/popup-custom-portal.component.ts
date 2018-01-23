import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DejaPopupActionsComponent } from '../../../src/component/popup/component/popup-actions/popup-actions.component';
import { DejaPopupComponent } from '../../../src/component/popup/component/popup/popup.component';
import { DejaPopupBase } from '../../../src/component/popup/model/popup-base.class';
import { DejaPopupConfig } from '../../../src/component/popup/model/popup-config.model';

@Component({
    selector: 'custom-dialog-portal',
    template: `
    <div mat-dialog-content>
        <div [cdkPortalOutlet]="portalInstance"></div>
    </div>
    `,
})
export class DpiDialogPortalDemoComponent extends DejaPopupComponent implements OnInit {

    public portalInstance: Portal<any>;

    constructor(
        public dialogRef: MatDialogRef<DejaPopupBase>,
        @Inject(MAT_DIALOG_DATA) public config: DejaPopupConfig,
        private inj: Injector,
    ) {
        super(dialogRef, config, inj);
    }

    public ngOnInit(): void {
        super.ngOnInit();
        this.portalInstance = new ComponentPortal(DejaPopupActionsComponent, undefined, this.inj);
    }

}
