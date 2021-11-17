/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, Type } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Destroy } from '@deja-js/component/core/destroy';
import { debounceTime, Observable, Subject, switchMap, take, takeUntil } from 'rxjs';

import { AbstractLazyModule, LazyLoaderService } from '../lazy-loading/lazy-loader.service';

export abstract class DialogService<ReturnType, DataType> extends Destroy {
    protected openDialogSub$ = new Subject<MatDialogConfig<DataType>>();
    protected dialogResponse$ = new Subject<ReturnType>();
    protected dialogRef: MatDialogRef<Component, ReturnType>;

    public constructor(
        private lazyLoaderService: LazyLoaderService,
        private dialog: MatDialog,
        matDialogConfig?: MatDialogConfig<DataType>
    ) {
        super();

        this.openDialogSub$.pipe(
            debounceTime(50),
            switchMap(dialogConfig => this.lazyLoaderService.loadModule$(this.getModule()).pipe(
                switchMap(module => {
                    const config = { ...matDialogConfig || {}, ...dialogConfig };
                    config.minWidth = config.minWidth || '400px';

                    // injector is private in MatDialog
                    // eslint-disable-next-line dot-notation
                    this.dialog['_injector'] = module.injector;
                    this.dialogRef = this.dialog.open<Component, DataType, ReturnType>(module.instance.componentType, config);

                    return this.dialogRef.afterClosed();
                })
            )),
            takeUntil(this.destroyed$)
        ).subscribe(response => this.dialogResponse$.next(response));
    }

    public openDialog$(dialogData?: DataType, dialogConfig?: MatDialogConfig<DataType>): Observable<ReturnType> {
        dialogConfig = dialogConfig || {};
        dialogConfig.data = dialogData || {} as DataType;
        this.openDialogSub$.next(dialogConfig);
        return this.dialogResponse$.pipe(
            take(1)
        );
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }

    protected abstract getModule(): Promise<Type<AbstractLazyModule<unknown>>>;
}
