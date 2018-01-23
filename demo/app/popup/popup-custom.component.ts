import { Component, OnInit } from '@angular/core';
import { DejaPopupComponent } from '../../../src/component/popup/component/popup/popup.component';
import { DejaPopupAction } from '../../../src/component/popup/model/popup-action.model';

@Component({
    selector: 'custom-dialog',
    template: `

    <dpi-dialog-toolbar [config]="config" (actionSelected)="doAction($event)"></dpi-dialog-toolbar>

    <div mat-dialog-content class="dpi-dialog-custom-content">

        <p>{{content}}</p>

        <p> Le texte suivant est un parametre en entrée: '<b>{{inputparam}}</b>'</p>

        <mat-form-field>
            <textarea type="text" mat-autosize matInput [(ngModel)]="inputText" placeholder="Ceci est un test de saisie" ></textarea>
        </mat-form-field>

        <div *ngFor="let i of items">{{i}}</div>

    </div>

    <div mat-dialog-actions *ngIf="!!config.hasActions()" class="dpi-dialog-custom-actions">
        <dpi-dialog-actions></dpi-dialog-actions>
    </div>

    `,
})
export class DpiDialogCustomDemoComponent extends DejaPopupComponent implements OnInit {

    public content: string;
    public inputparam: string;
    public inputText: string;
    public items = [];

    public ngOnInit(): void {
        super.ngOnInit();
        this.content = 'Ceci un on dialog custom. qui est défini dans un composant séparé. Il doit étendre la class DpiDialogComponent. On lui passe également des paramètre en entrée.';
        this.inputparam = this.config.data.test;
        for (let i = 0; i < 50; i++) {
            this.items.push(i);
        }
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
