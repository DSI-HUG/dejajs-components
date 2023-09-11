import { inject, Injectable, Injector } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';

import { MessageBoxDialogService } from './message-box-dialog/message-box-dialog.service';

export interface MessageDialogDate {
    message: string;
    injector: Injector;
}

@Injectable()
export class StyleEditorPrintService {

    public openMessageDialog$ = new Subject<MessageDialogDate>();

    public messageDialogResult$: Observable<string | undefined>;

    private messageBoxDialogService = inject(MessageBoxDialogService);

    public constructor() {
        this.messageDialogResult$ = this.openMessageDialog$.pipe(
            switchMap(dialogData => this.messageBoxDialogService.openDialog$(dialogData.message, { injector: dialogData.injector }))
        );
    }

    public print(): void {
        console.log('StyleEditorPrintService', new Date());
        setInterval(() => console.log('StyleEditorPrintService', new Date()), 10000);
    }
}
