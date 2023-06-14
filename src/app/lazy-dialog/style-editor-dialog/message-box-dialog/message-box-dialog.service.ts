import { Injectable, Type } from '@angular/core';
import { MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { AbstractLazyModule, DialogService } from '@deja-js/component/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageBoxDialogService extends DialogService<string, string> {
    public constructor() {
        super();

        this.matDialogConfig = {
            panelClass: 'no-padding-dialog'
        } as MatDialogConfig<string>;
    }

    public openDialog$(dialogData: string, dialogConfig?: MatDialogConfig<string>): Observable<string> {
        return super.openDialog$(dialogData, dialogConfig);
    }

    protected getModule(): Promise<Type<AbstractLazyModule<unknown>>> {
        return import('./message-box-dialog.module').then(m => m.MessageBoxDialogModule);
    }
}
