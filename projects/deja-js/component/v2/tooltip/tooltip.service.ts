/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ConnectedPosition } from '@angular/cdk/overlay';
import { Type } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AbstractLazyModule, LazyLoaderService, subscribeWith } from '@deja-js/component/core';
import { merge } from 'lodash-es';
import { debounceTime, delay, EMPTY, filter, fromEvent, map, mergeWith, Observable, shareReplay, Subject, switchMap, tap, withLatestFrom } from 'rxjs';

import { TooltipConfig } from './tooltip.model';
import { TooltipComponentInterface } from './tooltip-component.interface';


export abstract class TooltipService<D> {
    protected close$ = new Subject<void>();

    protected positions: ReadonlyArray<ConnectedPosition> = [
        {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            offsetY: 20
        },
        {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetY: -20
        },
        {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'center',
            offsetX: -20
        },
        {
            originX: 'end',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'top',
            offsetX: 20
        },
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 20
        },
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetY: -20
        },
        {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
            offsetY: 20
        },
        {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom',
            offsetY: -20
        },
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top'
        }
    ];

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

        const additionalPanelClass = (tooltipConfig?.panelClass && tooltipConfig.panelClass instanceof Array && tooltipConfig.panelClass)
            || (tooltipConfig?.panelClass && typeof tooltipConfig?.panelClass === 'string' && [tooltipConfig?.panelClass])
            || new Array<string>();

        const config = merge(tooltipConfig, {
            hasBackdrop: false,
            panelClass: ['tooltip-overlay', 'no-padding-dialog', 'tooltip-opening', ...additionalPanelClass]
        } as TooltipConfig<D>);


        const dialogRef$ = this.openRef$(tooltipData, triggerElement, config).pipe(
            shareReplay({ bufferSize: 1, refCount: false })
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
                    debounceTime(config.hideDelay || 10),
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
            subscribeWith(close$),
            shareReplay({ bufferSize: 1, refCount: false })
        );
    }

    public close(): void {
        this.close$.next();
    }

    protected openRef$(tooltipData: D, triggerElement: HTMLElement, tooltipConfig: Partial<TooltipConfig<D>>): Observable<MatDialogRef<TooltipComponentInterface, void>> {
        return this.lazyLoaderService.loadModule$(this.getModule()).pipe(
            switchMap(moduleInfos => {
                const config = merge({}, this.tooltipConfig, tooltipConfig || {} as Partial<MatDialogConfig<D>>);
                config.data = tooltipData || {} as D;
                config.minWidth = config.minWidth || '100px';

                // injector is private in MatDialog
                // eslint-disable-next-line dot-notation
                this.dialog['_injector'] = moduleInfos.injector;
                const dialogRef = this.dialog.open<TooltipComponentInterface, D, void>(moduleInfos.module.componentType, config);
                return dialogRef.afterOpened().pipe(
                    map(() => dialogRef)
                );
            }),
            tap(dialogRef => {
                const componentInstance = dialogRef.componentInstance;
                const tooltipBounds = componentInstance.elementRef?.nativeElement.parentElement.getBoundingClientRect();
                const triggerBounds = triggerElement?.getBoundingClientRect();
                const bodyBounds = document.body.getBoundingClientRect();

                if (tooltipBounds && triggerBounds) {
                    this.positions.find((position, index) => {
                        // Calc trigger alignment
                        let left = position.offsetX || 0;
                        switch (position.originX) {
                            case 'start':
                                left += triggerBounds.left;
                                break;
                            case 'end':
                                left += triggerBounds.right;
                                break;
                            default:
                                left += triggerBounds.left + triggerBounds.width / 2;
                                break;
                        }

                        let top = position.offsetY || 0;
                        switch (position.originY) {
                            case 'top':
                                top += triggerBounds.top;
                                break;
                            case 'bottom':
                                top += triggerBounds.bottom;
                                break;
                            default:
                                top += triggerBounds.top + triggerBounds.height / 2;
                                break;
                        }

                        // Calc overlay position
                        switch (position.overlayX) {
                            case 'center':
                                left -= tooltipBounds.width / 2;
                                break;
                            case 'end':
                                left -= tooltipBounds.width;
                                break;
                            default:
                                break;
                        }

                        switch (position.overlayY) {
                            case 'center':
                                top -= tooltipBounds.height / 2;
                                break;
                            case 'bottom':
                                top -= tooltipBounds.height;
                                break;
                            default:
                                break;
                        }

                        if ((index < this.positions.length - 1) && (left < bodyBounds.left || top < bodyBounds.top || (left + tooltipBounds.width) > bodyBounds.right || (top + tooltipBounds.height) > bodyBounds.bottom)) {
                            // Try another psoition
                            return false;
                        }

                        if ((left + tooltipBounds.width) > bodyBounds.right) {
                            left = bodyBounds.right - tooltipBounds.width;
                        }

                        if ((top + tooltipBounds.height) > bodyBounds.bottom) {
                            top = bodyBounds.bottom - tooltipBounds.height;
                        }

                        if (top < bodyBounds.top) {
                            top = bodyBounds.top;
                        }

                        if (left < bodyBounds.left) {
                            left = bodyBounds.left;
                        }

                        dialogRef.updatePosition({
                            left: `${left}px`,
                            top: `${top}px`
                        });
                        dialogRef.addPanelClass('tooltip-opened');

                        return true;
                    });
                } else {
                    console.error('A tooltip component must inherits from TooltipComponent directive. Position can\'t be updated');
                }
            })
        );
    }

    protected abstract getModule(): Promise<Type<AbstractLazyModule<TooltipComponentInterface>>>;
}
