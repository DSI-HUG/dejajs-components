import { Component } from '@angular/core';
import { DejaPopupAction } from '../../../src/component/popup/model/popup-action.model';
import { DejaPopupBase } from '../../../src/component/popup/model/popup-base.class';

@Component({
    selector: 'custom-dialog-form-component',
    template: `

    <dpi-dialog-toolbar [config]="config" (actionSelected)="doAction($event)"></dpi-dialog-toolbar>

    <div mat-dialog-content>

        <forms-demo></forms-demo>

    </div>

    <div mat-dialog-actions *ngIf="config.hasActions">
        <dpi-dialog-actions></dpi-dialog-actions>
    </div>

    `,
})
export class DpiDialogCustomFormDemoComponent extends DejaPopupBase {

    public doAction(action: DejaPopupAction) {

        if (!action) {
            return false;
        }

        this.actionSelected = action;

        switch (action.name) {

            case 'undo':
                break;

            default:
                this.dialogRef.close(action);
                break;

        }

    }

}
