import { Injectable, Injector } from '@angular/core';


export interface MessageDialogDate {
    message: string;
    injector: Injector;
}

@Injectable()
export class MessageBoxDialogPrintService {
    public print(): void {
        console.log('MessageBoxDialogPrintService', new Date());
        setInterval(() => console.log('MessageBoxDialogPrintService', new Date()), 10000);
    }
}
