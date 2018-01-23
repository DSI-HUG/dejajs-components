import { Component, Inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DejaPopupComponent } from '../../../src/component/popup/component/popup/popup.component';
import { DejaPopupAction } from '../../../src/component/popup/model/popup-action.model';
import { DejaPopupBase } from '../../../src/component/popup/model/popup-base.class';
import { DejaPopupConfig } from '../../../src/component/popup/model/popup-config.model';

@Component({
    selector: 'custom-dialog-component',
    template: `

    <dpi-dialog-toolbar [config]="config" (actionSelected)="doAction($event)"></dpi-dialog-toolbar>

    <div mat-dialog-content class="dpi-dialog-custom-content">
casc

    </div>

    <div mat-dialog-actions *ngIf="config.hasActions()" class="dpi-dialog-custom-actions">
        <dpi-dialog-actions></dpi-dialog-actions>
    </div>

    `,
    styles: [
        `
        `
    ]
})
export class DpiDialogCustomComponentDemoComponent extends DejaPopupComponent {

    public content: string;
    public inputparam: string;
    public inputText: string;
    public items = [];

    constructor(
        public dialogRef: MatDialogRef<DejaPopupBase>,
        @Inject(MAT_DIALOG_DATA) public config: DejaPopupConfig,
        public injector: Injector,

    ) {
        super(dialogRef, config, injector);

    }

    public doChange(e: any) {
        console.log('doChange', e);

    }

    public doAction(action: DejaPopupAction) {

        if (!action) {
            return false;
        }

        this.actionSelected = action;

        switch (action.name) {

            case 'undo':
                this.inputText = '';
                break;

            default:
                this.dialogRef.close(action);
                break;

        }

    }

}
