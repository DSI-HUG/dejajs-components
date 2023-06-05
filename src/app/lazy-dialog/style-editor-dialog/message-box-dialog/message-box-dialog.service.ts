import { Injectable, Type } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { AbstractLazyModule, DialogService, LazyLoaderService } from '@deja-js/component/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageBoxDialogService extends DialogService<string, string> {
    public constructor(
        lazyLoaderService: LazyLoaderService,
        dialog: MatDialog
    ) {
        super(lazyLoaderService, dialog, {
            panelClass: 'no-padding-dialog'
        } as MatDialogConfig<string>);
    }

    public openDialog$(dialogData: string, dialogConfig?: MatDialogConfig<string>): Observable<string> {
        return super.openDialog$(dialogData, dialogConfig);
    }

    protected getModule(): Promise<Type<AbstractLazyModule<unknown>>> {
        return import('./message-box-dialog.module').then(m => m.MessageBoxDialogModule);
    }
}
