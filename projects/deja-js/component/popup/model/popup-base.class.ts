/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { Directive, ElementRef, Injector, OnInit, Renderer2 } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Destroy } from '@deja-js/component/core';
import { filter, Subscription, take, takeUntil, tap } from 'rxjs';

import { DejaPopupAction } from './popup-action.model';
import { DejaPopupConfig } from './popup-config.model';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class DejaPopupBase extends Destroy implements OnInit {

    public actions: DejaPopupAction[];
    public actionSelected: DejaPopupAction | string;
    public isMinified = false;
    public isFullscreen = false;
    public dialogRef: MatDialogRef<DejaPopupBase>;
    public config: DejaPopupConfig<unknown>;
    public actionsPortal: Portal<unknown>;
    protected injector: Injector;
    protected renderer?: Renderer2;
    protected elRef?: ElementRef;
    protected unlisten?: () => void;

    private aSub: Subscription[];

    public ngOnInit(): void {
        this.aSub = [];
        this.dialogRef.beforeClosed().pipe(
            take(1),
            tap(() => {
                if (this.unlisten) {
                    this.unlisten();
                }

                this.destroy();

                if (this.config.dejaPopupCom$) {
                    const action = new DejaPopupAction('dialog-close', 'popup-tray');
                    this.config.dejaPopupCom$.next(action);
                }
            }),
            takeUntil(this.destroyed$)
        ).subscribe();

        if (this.config.actionComponentRef) {
            this.actionsPortal = new ComponentPortal(this.config.actionComponentRef, undefined, this.injector);
        }

        if (this.config.dejaPopupCom$) {
            this.aSub.push(
                this.config.dejaPopupCom$.pipe(
                    filter(a => !!a?.target && a.target === this.config.id),
                    tap(a => this.doAction(a)),
                    tap(action => {
                        this.actionSelected = action;
                        if (action.isFinalAction) {
                            this.dialogRef.close(action);
                        }
                    }),
                    takeUntil(this.destroyed$)
                ).subscribe()
            );
        }
    }

    public dispatchAction(action: DejaPopupAction): boolean {
        if (!action) {
            return false;
        }
        this.config?.dejaPopupCom$?.next(action);
        return undefined;
    }

    protected destroy(): void {
        this.aSub.forEach(s => s.unsubscribe());
    }

    public abstract doAction(action: DejaPopupAction): void;
}
