import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';

import { MessageBoxDialogService } from './message-box-dialog/message-box-dialog.service';

@Injectable()
export class StyleEditorService {

    public openMessageDialog$ = new Subject<string>();

    public messageDialogResult$: Observable<string>;

    public constructor(messageBoxDialogService: MessageBoxDialogService) {
        setInterval(() => console.log('StyleEditorService', new Date()), 10000);

        this.messageDialogResult$ = this.openMessageDialog$.pipe(
            switchMap(dialogData => messageBoxDialogService.openDialog$(dialogData))
        );
    }
}
