import { Component, OnInit } from '@angular/core';
import { DejaPopupComponent } from '../../../src/component/popup/component/popup/popup.component';
import { DejaPopupAction } from '../../../src/component/popup/model/popup-action.model';

@Component({
    selector: 'custom-dialog',
    template: `
    <deja-popup-toolbar [config]="config" (actionSelected)="doAction($event)"></deja-popup-toolbar>

    <div mat-dialog-content class="deja-popup-custom-content">

        <p>{{content}}</p>

        <p> This is an input parameter: '<b>{{inputparam}}</b>'</p>
        <mat-form-field>
            <input matInput type="text" [(ngModel)]="inputText" placeholder="Input text">
        </mat-form-field>

        <div *ngFor="let i of items">{{i}}</div>

    </div>

    <div mat-dialog-actions *ngIf="!!config.hasActions()" class="deja-popup-custom-actions">
        <deja-popup-actions></deja-popup-actions>
    </div>
    `,
    styles: [
        `
        :host{
            overflow: hidden;
        }
        .deja-popup-custom-content{
            overflow: auto;
            height: 300px;
            padding: 0 1rem;
        }
        .deja-popup-custom-actions{
            padding: 1rem;
        }
        `
    ]
})
export class DejaPopupCustomDemoComponent extends DejaPopupComponent implements OnInit {

    public content: string;
    public inputparam: string;
    public inputText: string;
    public items = [];

    public ngOnInit(): void {
        super.ngOnInit();
        this.content = 'Some content here.';
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
