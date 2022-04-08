/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Type } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable, ReplaySubject, switchMap, take, throttleTime } from 'rxjs';

import { AbstractLazyModule, LazyLoaderService } from './lazy-loader.service';

export abstract class DialogService<ReturnType, DataType> {
    protected openDialogSub$ = new ReplaySubject<MatDialogConfig<DataType>>(1);
    protected dialogResponse$: Observable<ReturnType>;
    protected dialogRef: MatDialogRef<unknown, ReturnType>;

    public constructor(
        private lazyLoaderService: LazyLoaderService,
        private dialog: MatDialog,
        matDialogConfig?: MatDialogConfig<DataType>
    ) {
        this.dialogResponse$ = this.openDialogSub$.pipe(
            throttleTime(10),
            take(1),
            switchMap(dialogConfig => this.lazyLoaderService.loadModule$(this.getModule()).pipe(
                switchMap(moduleInfos => {
                    const config = { ...matDialogConfig || {}, ...dialogConfig };
                    config.minWidth = config.minWidth || '400px';

                    // injector is private in MatDialog
                    // eslint-disable-next-line @typescript-eslint/dot-notation
                    this.dialog['_injector'] = moduleInfos.injector;
                    this.dialogRef = this.dialog.open<unknown, DataType, ReturnType>(moduleInfos.module.componentType, config);

                    return this.dialogRef.afterClosed();
                })
            ))
        );
    }

    public openDialog$(dialogData?: DataType, dialogConfig?: MatDialogConfig<DataType>): Observable<ReturnType> {
        dialogConfig = dialogConfig || {};
        dialogConfig.data = dialogData || {} as DataType;
        this.openDialogSub$.next(dialogConfig);
        return this.dialogResponse$;
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }

    protected abstract getModule(): Promise<Type<AbstractLazyModule<unknown>>>;
}
