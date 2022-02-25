/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Type } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'lodash-es';
import { map, Observable, ReplaySubject, shareReplay, Subject, switchMap, tap, withLatestFrom } from 'rxjs';

import { subscribeWith } from '../custom-operators';
import { AbstractLazyModule, LazyLoaderService } from './lazy-loader.service';


export abstract class DialogService<ReturnType, DataType, ComponentType = unknown> {
    protected openDialogSub$ = new ReplaySubject<MatDialogConfig<DataType>>(1);
    protected dialogRef: MatDialogRef<ComponentType, ReturnType>;
    protected close$ = new Subject<ReturnType>();

    public constructor(
        private lazyLoaderService: LazyLoaderService,
        private dialog: MatDialog,
        private matDialogConfig?: MatDialogConfig<DataType>
    ) { }

    public openDialog$(dialogData?: DataType, dialogConfig?: MatDialogConfig<DataType>): Observable<ReturnType> {
        // dialogConfig = dialogConfig || {};
        // dialogConfig.data = dialogData || {} as DataType;
        // this.openDialogSub$.next(dialogConfig);
        // return this.dialogResponse$;
        const dialogRef$ = this.openDialogRef$(dialogData, dialogConfig).pipe(
            shareReplay({ bufferSize: 1, refCount: false })
        );

        const externalClose$ = this.close$.pipe(
            withLatestFrom(dialogRef$),
            tap(([response, dialogRef]) => dialogRef.close(response))
        );

        return dialogRef$.pipe(
            switchMap(dialogRef => dialogRef.afterClosed()),
            subscribeWith(externalClose$),
            shareReplay({ bufferSize: 1, refCount: false })
        );
    }

    public closeDialog(response?: ReturnType): void {
        this.close$.next(response);
    }

    protected openDialogRef$(dialogData: DataType, dialogConfig?: Partial<MatDialogConfig<DataType>>): Observable<MatDialogRef<ComponentType, ReturnType>> {
        return this.lazyLoaderService.loadModule$(this.getModule()).pipe(
            switchMap(moduleInfos => {
                const config = merge({}, this.matDialogConfig, dialogConfig || {} as Partial<MatDialogConfig<DataType>>);
                config.data = dialogData || {} as DataType;
                config.minWidth = config.minWidth || '400px';

                // injector is private in MatDialog
                // eslint-disable-next-line dot-notation
                this.dialog['_injector'] = moduleInfos.injector;
                const dialogRef = this.dialog.open<ComponentType, DataType, ReturnType>(moduleInfos.module.componentType, config);

                return dialogRef.afterOpened().pipe(
                    map(() => dialogRef)
                );
            })
        );
    }

    protected abstract getModule(): Promise<Type<AbstractLazyModule<ComponentType>>>;
}
