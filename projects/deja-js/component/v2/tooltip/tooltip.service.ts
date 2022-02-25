/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { DialogPosition, MatDialogRef } from '@angular/material/dialog';
import { DialogService, subscribeWith } from '@deja-js/component/core';
import { merge } from 'lodash-es';
import { debounceTime, delay, EMPTY, filter, fromEvent, map, mergeWith, Observable, shareReplay, switchMap, tap, timer, withLatestFrom } from 'rxjs';

import { TooltipComponent } from './tooltip.component';
import { TooltipConfig } from './tooltip.model';


export abstract class TooltipService<D, R = unknown> extends DialogService<R, D, TooltipComponent> {
    public static CURRENT_TRIGGER_ELEMENT: HTMLElement; // Because only one tooltip can be displayed at time

    public open$(tooltipData: D, tooltipConfig?: TooltipConfig<D>): Observable<R> {
        this.closeDialog();

        const triggerElement = TooltipService.CURRENT_TRIGGER_ELEMENT;
        delete TooltipService.CURRENT_TRIGGER_ELEMENT;

        const bounds = triggerElement.getBoundingClientRect() || { left: 0, bottom: 0 };
        const config = merge(tooltipConfig, {
            position: {
                left: `${Math.round(bounds.left) - 100}px`,
                top: `${Math.round(bounds.bottom) + 32}px`
            } as DialogPosition,
            hasBackdrop: false,
            panelClass: ['tooltip', 'no-padding-dialog']
        } as TooltipConfig<D>);


        const dialogRef$ = this.openTooltipRef$(tooltipData, triggerElement, config).pipe(
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
                    debounceTime(config.hideDelay || 150),
                    filter(Boolean),
                    map(() => undefined as R)
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

    protected openTooltipRef$(tooltipData: D, triggerElement: HTMLElement, tooltipConfig: Partial<TooltipConfig<D>>): Observable<MatDialogRef<TooltipComponent, R>> {
        return super.openDialogRef$(tooltipData, tooltipConfig).pipe(
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
}
