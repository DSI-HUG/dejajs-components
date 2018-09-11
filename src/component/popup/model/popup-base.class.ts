/*
*  @license
*  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
*
*  Use of this source code is governed by an Apache-2.0 license that can be
*  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
*/
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { ElementRef, Injector, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { tap, first, filter } from 'rxjs/operators';


import { Subscription } from 'rxjs';
import { DejaPopupAction } from './popup-action.model';
import { DejaPopupConfig } from './popup-config.model';

export abstract class DejaPopupBase implements OnInit {

    public actions: DejaPopupAction[];
    public actionSelected: DejaPopupAction;
    public isMinified = false;
    public isFullscreen = false;
    public dialogRef: MatDialogRef<DejaPopupBase>;
    public config: DejaPopupConfig;
    public actionsPortal: Portal<any>;
    protected injector: Injector;
    protected renderer?: Renderer2;
    protected elRef?: ElementRef;
    protected unlisten?: () => void;

    private aSub: Subscription[];

    public abstract doAction(action: DejaPopupAction): any;

    public ngOnInit() {
        this.aSub = [];
        this.dialogRef.beforeClose().pipe(
            first(),
            tap(() => {
                if (this.unlisten) {
                    this.unlisten();
                }

                this.destroy();

                if (this.config.dejaPopupCom$) {
                    const action = new DejaPopupAction('dialog-close', 'popup-tray');
                    this.config.dejaPopupCom$.next(action);
                }
            }))
            .subscribe();

        if (this.config.actionComponentRef) {
            this.actionsPortal = new ComponentPortal(this.config.actionComponentRef, undefined, this.injector);
        }

        if (this.config.dejaPopupCom$) {
            this.aSub.push(
                this.config.dejaPopupCom$.pipe(
                    filter((a: DejaPopupAction) => !!a && !!a.target && a.target === this.config.id),
                    tap((a: DejaPopupAction) => this.doAction(a)),
                    tap((action: DejaPopupAction) => {
                        this.actionSelected = action;
                        if (action.isFinalAction) {
                            this.dialogRef.close(action);
                        }
                    }))
                    .subscribe()
            );
        }
    }

    public dispatchAction(action: DejaPopupAction) {

        if (!action) {
            return false;
        }

        if (this.config.dejaPopupCom$) {
            this.config.dejaPopupCom$.next(action);
        }

    }

    protected destroy() {
        this.aSub.forEach((s: Subscription) => s.unsubscribe());
    }

}
