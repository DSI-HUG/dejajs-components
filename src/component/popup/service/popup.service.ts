
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { TemplateRef } from '@angular/core/src/linker/template_ref';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DejaPopupActionsComponent } from '../component/popup-actions/popup-actions.component';
import { DejaPopupAdvancedComponent } from '../component/popup-advanced/popup-advanced.component';
import { DejaPopupComponent } from '../component/popup/popup.component';
import { DejaPopupAction } from '../model/popup-action.model';
import { DejaPopupBase } from '../model/popup-base.class';
import { DejaPopupConfig } from '../model/popup-config.model';
import { DejaPopupReponse } from '../model/popup-response.model';

@Injectable()
export class DejaPopupService extends MatDialog {

    private _dialogCom$: BehaviorSubject<DejaPopupAction>;
    public readonly openDialogs: MatDialogRef<DejaPopupBase>[];
    public get dejaPopupCom$(): BehaviorSubject<DejaPopupAction> {
        if (!this._dialogCom$) {
            this._dialogCom$ = new BehaviorSubject(null);
        }
        return this._dialogCom$;
    }

    public defaultActionComponent: ComponentType<any> = DejaPopupActionsComponent;

    /**
     * Displays a modal dialog, with the given buttons.
     * @param title
     * @param message
     * @param buttons types de DpiButton
     * @param customComponent Custom Component that must extend DpiDialogComponent.
     * @param data Données que l'on peux passer au Dialog
     * @return La réponse du dialog sous forme d'un Observable
     */
    public openInline(
        title: string,
        content: string,
        buttons: DejaPopupAction[],
        config: DejaPopupConfig = new DejaPopupConfig(),
    ): Observable<DejaPopupReponse> {

        config.title = title;
        config.content = content;
        config.actions = buttons;

        const dialogRef: MatDialogRef<DejaPopupBase> = this.open(DejaPopupComponent, config);

        return dialogRef.afterClosed().pipe(
            map((resp: any) => {
                return new DejaPopupReponse(resp, dialogRef.componentInstance);
            }));
    }

    public openCustom(
        customComponent: ComponentType<DejaPopupBase> | TemplateRef<any>,
        config: DejaPopupConfig = new DejaPopupConfig(),
    ): Observable<DejaPopupReponse> {

        const dialogRef: MatDialogRef<DejaPopupBase> = this.open(customComponent, config);

        return dialogRef.afterClosed().pipe(
            map((resp: any) => {
                return new DejaPopupReponse(resp, dialogRef.componentInstance);
            }));
    }

    public openUrl(
        url: string,
        config: DejaPopupConfig = new DejaPopupConfig(),
    ): Observable<DejaPopupReponse> {

        config.url = url;
        config.ensureDimension();

        const dialogRef: MatDialogRef<DejaPopupAdvancedComponent> = this.open(DejaPopupAdvancedComponent, config);

        return dialogRef.afterClosed().pipe(
            map((resp: any) => {
                return new DejaPopupReponse(resp, dialogRef.componentInstance);
            }));
    }

    public openAdvanced(
        config: DejaPopupConfig = new DejaPopupConfig(),
    ): MatDialogRef<DejaPopupAdvancedComponent> {

        const dialogRef: MatDialogRef<DejaPopupAdvancedComponent> = this.open(DejaPopupAdvancedComponent, config);

        return dialogRef;

    }
    public openAdvanced$(
        config: DejaPopupConfig = new DejaPopupConfig(),
    ): Observable<DejaPopupReponse> {

        const dialogRef = this.openAdvanced(config);
        return dialogRef.afterClosed().pipe(
            map((resp: any) => {
                return new DejaPopupReponse(resp, dialogRef.componentInstance);
            }));

    }

    public openPopUp(
        config: DejaPopupConfig = new DejaPopupConfig(),
    ): Observable<DejaPopupReponse> {

        config.hasBackdrop = false;
        // config.isModal = false;

        // config.ensureDimension();
        if (config.autoposition === undefined) {
            config.autoposition = true;
        }

        if (config.toolbarType === undefined) {
            config.toolbarType = 'window';
        }

        return this.openAdvanced$(config);
    }

    /**
      * Opens a modal dialog containing the given component.
      * @param componentOrTemplateRef Type of the component to load into the dialog,
      *     or a TemplateRef to instantiate as the dialog content.
      * @param config Extra configuration options.
      * @returns Reference to the newly-opened dialog.
      */
    public open<T>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: DejaPopupConfig
    ): MatDialogRef<T> {

        if (config.shareActions && !config.dejaPopupCom$) {
            config.dejaPopupCom$ = this.dejaPopupCom$;
        }

        if (!config.actionComponentRef && this.defaultActionComponent) {
            config.actionComponentRef = this.defaultActionComponent;
        }

        return super.open(componentOrTemplateRef, config.getMatDialogConfig());

    }

}
