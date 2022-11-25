import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { StyleEditorPrintService } from '../style-editor-print.service';
import { MessageBoxDialogPrintService } from './message-box-dialog-print.service';

@Component({
    selector: 'app-message-box-dialog',
    templateUrl: './message-box-dialog.component.html',
    styleUrls: ['./message-box-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        MessageBoxDialogPrintService
    ]
})
export class MessageBoxDialogComponent {
    public constructor(
        @Inject(MAT_DIALOG_DATA) protected dialogParam: string,
        syleEditorPrintService: StyleEditorPrintService,
        messageBoxDialogPrintService: MessageBoxDialogPrintService
    ) {
        syleEditorPrintService.print();
        messageBoxDialogPrintService.print();
    }
}
