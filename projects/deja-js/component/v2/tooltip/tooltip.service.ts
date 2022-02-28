/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Type } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AbstractLazyModule, LazyLoaderService, subscribeWith } from '@deja-js/component/core';
import { merge } from 'lodash-es';
import { debounceTime, delay, EMPTY, filter, fromEvent, map, mergeWith, Observable, shareReplay, Subject, switchMap, tap, timer, withLatestFrom } from 'rxjs';

import { TooltipComponent } from './tooltip.component';
import { TooltipConfig } from './tooltip.model';


export abstract class TooltipService<D> {
    protected close$ = new Subject<void>();

    public constructor(
        private lazyLoaderService: LazyLoaderService,
        private dialog: MatDialog,
        private tooltipConfig?: MatDialogConfig<D>
    ) {
        if (!this.tooltipConfig) {
            this.tooltipConfig = new MatDialogConfig();
        }
    }

    public open$(triggerElement: HTMLElement, tooltipData: D, tooltipConfig?: TooltipConfig<D>): Observable<void> {
        this.close();

        const bounds = triggerElement.getBoundingClientRect() || { left: 0, bottom: 0 };
        const config = merge(tooltipConfig, {
            position: {
                left: `${Math.round(bounds.left) - 100}px`,
                top: `${Math.round(bounds.bottom) + 32}px`
            } as DialogPosition,
            hasBackdrop: false,
            panelClass: ['tooltip', 'no-padding-dialog']
        } as TooltipConfig<D>);


        const dialogRef$ = this.openRef$(tooltipData, triggerElement, config).pipe(
            shareReplay({ bufferSize: 1, refCount: false })
        );

        const animate$ = dialogRef$.pipe(
            switchMap(dialogRef => {
                dialogRef.addPanelClass('tooltip-opening');
                return timer(1).pipe(
                    tap(() => dialogRef.addPanelClass('tooltip-opened'))
                );
            })
        );

        const checkClose$ = dialogRef$.pipe(
            switchMap(dialogRef => {
                const tooltipElement = dialogRef.componentInstance.elementRef?.nativeElement.parentElement;

                const mouseEnterTooltip$ = tooltipElement ? fromEvent(tooltipElement, 'mouseenter') : EMPTY;
                const mouseEnterTrigger$ = triggerElement ? fromEvent(triggerElement, 'mouseenter') : EMPTY;
                const mouseLeaveTooltip$ = tooltipElement ? fromEvent(tooltipElement, 'mouseleave') : EMPTY;
                const mouseLeaveTrigger$ = triggerElement ? fromEvent(triggerElement, 'mouseleave') : EMPTY;
                const set$ = mouseEnterTooltip$.pipe(
                    mergeWith(mouseEnterTrigger$),
                    map(() => false)
                );
                const reset$ = mouseLeaveTooltip$.pipe(
                    mergeWith(mouseLeaveTrigger$),
                    map(() => true)
                );
                return set$.pipe(
                    mergeWith(reset$),
                    debounceTime(config.hideDelay || 50),
                    filter(Boolean),
                    map(() => undefined as void)
                );
            })
        );

        const close$ = checkClose$.pipe(
            mergeWith(this.close$),
            withLatestFrom(dialogRef$),
            tap(([_, dialogRef]) => dialogRef.removePanelClass('tooltip-opened')),
            delay(300),
            tap(([response, dialogRef]) => dialogRef.close(response))
        );

        return dialogRef$.pipe(
            switchMap(dialogRef => dialogRef.afterClosed()),
            subscribeWith(close$, animate$),
            shareReplay({ bufferSize: 1, refCount: false })
        );
    }

    public close(): void {
        this.close$.next();
    }

    protected openRef$(tooltipData: D, triggerElement: HTMLElement, tooltipConfig: Partial<TooltipConfig<D>>): Observable<MatDialogRef<TooltipComponent, void>> {
        return this.lazyLoaderService.loadModule$(this.getModule()).pipe(
            switchMap(moduleInfos => {
                const config = merge({}, this.tooltipConfig, tooltipConfig || {} as Partial<MatDialogConfig<D>>);
                config.data = tooltipData || {} as D;
                config.minWidth = config.minWidth || '400px';

                // injector is private in MatDialog
                // eslint-disable-next-line dot-notation
                this.dialog['_injector'] = moduleInfos.injector;
                const dialogRef = this.dialog.open<TooltipComponent, D, void>(moduleInfos.module.componentType, config);
                return dialogRef.afterOpened().pipe(
                    map(() => dialogRef)
                );
            }),
            tap(dialogRef => {
                const bodyPosition = document.body.getBoundingClientRect();
                const componentInstance = dialogRef.componentInstance;

                const tooltipPosition = componentInstance.elementRef?.nativeElement.parentElement.getBoundingClientRect();
                const triggerPosition = triggerElement?.getBoundingClientRect();

                if (tooltipPosition && triggerPosition) {
                    let left = Math.max(bodyPosition.left, tooltipPosition.left);
                    let top = Math.max(bodyPosition.top, tooltipPosition.top);

                    if (tooltipPosition.bottom > bodyPosition.bottom) {
                        top = triggerPosition.top - tooltipPosition.height - 32;
                        left = triggerPosition.left - 100;
                    }

                    if (tooltipPosition.right > bodyPosition.right) {
                        left = triggerPosition.left - tooltipPosition.width;
                    }

                    dialogRef.updatePosition({
                        left: `${left}px`,
                        top: `${top}px`
                    });
                } else {
                    console.error('A tooltip component must inherits from TooltipComponent directive. Position can\'t be updated');
                }
            })
        );
    }

    protected abstract getModule(): Promise<Type<AbstractLazyModule<TooltipComponent>>>;
}
