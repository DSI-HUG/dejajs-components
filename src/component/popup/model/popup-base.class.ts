import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { ElementRef, Injector, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { DejaPopupAction } from './popup-action.model';
import { DejaPopupConfig } from './popup-config.model';
// import { DejaPopupReponse } from './popup-response.model';

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
    protected unlisten?;

    private aSub: Subscription[];

    public abstract doAction(action: DejaPopupAction);

    public ngOnInit() {
        this.aSub = [];
        this.dialogRef.beforeClose()
            .first()
            .do(() => {
                if (this.unlisten) {
                    this.unlisten();
                }

                this.destroy();

                if (this.config.dejaPopupCom$) {
                    const action = new DejaPopupAction('dialog-close', 'popup-tray');
                    this.config.dejaPopupCom$.next(action);
                }
            })
            .subscribe();

        if (this.config.actionComponentRef) {
            this.actionsPortal = new ComponentPortal(this.config.actionComponentRef, undefined, this.injector);
        }

        if (this.config.dejaPopupCom$) {
            this.aSub.push(
                this.config.dejaPopupCom$
                    .do((x) => {
                        console.log('dialog com ', x);
                    })
                    .filter((a: DejaPopupAction) => !!a && !!a.target && a.target === this.config.id)
                    .do((a: DejaPopupAction) => this.doAction(a))
                    .do((action: DejaPopupAction) => {
                        this.actionSelected = action;
                        if (action.isFinalAction) {
                            // const res = new DejaPopupReponse(action.name, this.dialogRef.componentInstance, action);
                            this.dialogRef.close(action);
                        }
                    })
                    .subscribe()
            );
        }
    }

    public dispatchAction(action: DejaPopupAction) {

        if (!action) {
            return false;
        }

        // if (e) {
        //     this.lastEvent = e;
        // }

        if (this.config.dejaPopupCom$) {
            this.config.dejaPopupCom$.next(action);
        }

    }

    protected destroy() {
        this.aSub.forEach((s: Subscription) => s.unsubscribe());
    }

}
