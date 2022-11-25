import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { StyleEditorService } from '../style-editor.service';

@Component({
    selector: 'app-message-box-dialog',
    templateUrl: './message-box-dialog.component.html',
    styleUrls: ['./message-box-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MessageBoxDialogComponent {
    public constructor(
        @Inject(MAT_DIALOG_DATA) protected dialogParam: string,
        _styleEditorService: StyleEditorService
    ) {}
}
