/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { from, Observable } from 'rxjs';
import { debounceTime, filter, map, merge } from 'rxjs/operators';

import { DejaPopupAction } from '../../model/popup-action.model';
import { DejaPopupBase } from '../../model/popup-base.class';
import { DejaPopupService } from '../../service/popup.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-popup-tray',
    templateUrl: './popup-tray.component.html',
    styleUrls: ['./popup-tray.component.scss']
})
export class DejaPopupTrayComponent implements OnInit {

    public dialogs$: Observable<MatDialogRef<DejaPopupBase>[]>;

    public constructor(
        public dialogSrv: DejaPopupService
    ) { }

    public ngOnInit(): void {

        this.dialogs$ = from(this.dialogSrv.afterOpened).pipe(
            merge(this.dialogSrv.dejaPopupCom$.pipe(
                filter((action: DejaPopupAction) => !!action && action.target === 'popup-tray'),
                map((action: DejaPopupAction) => {
                    if (action.name === 'do-minify') {
                        this.minify(action);
                        action.refreshDrawer = false;
                    }
                    return action;
                }),
                filter((action: DejaPopupAction) => action.refreshDrawer))
            ),
            debounceTime(500),
            map(() => {
                const dialogs = this.dialogSrv.openDialogs;
                return dialogs;
            }));

    }

    public minify(action: DejaPopupAction): boolean {
        const el = document.querySelector<HTMLElement>(action.panelClass);
        if (!el) {
            return false;
        }
        el.style.display = 'none';
        this.refresh();
        return undefined;
    }

    public maxify(action: DejaPopupAction): boolean {
        const el = document.querySelector<HTMLElement>(action.panelClass);
        if (!el) {
            return false;
        }
        el.style.display = 'initial';
        this.refresh();
        return undefined;
    }

    public doAction(action: DejaPopupAction): boolean {
        if (action.name === 'toolbar-minify') {
            this.minify(action);
        } else if (action.name === 'toolbar-fullscreen') {
            this.maxify(action);
        } else {
            this.dialogSrv.dejaPopupCom$.next(action);
        }
        return undefined;
    }

    public closeAll(): void {
        this.dialogSrv.closeAll();
        this.refresh();
    }

    public minimizeAll(): void {
        this.dialogSrv.openDialogs.forEach((d: MatDialogRef<DejaPopupBase>) => {
            const a = new DejaPopupAction('minify-all', 'popup-tray');
            d.componentInstance.isMinified = true;
            a.panelClass = d.componentInstance.config.dialogPanelId;
            this.minify(a);
        });
    }

    public showAll(): void {
        this.dialogSrv.openDialogs.forEach((d: MatDialogRef<DejaPopupBase>) => {
            const a = new DejaPopupAction('show-all', 'popup-tray');
            d.componentInstance.isMinified = false;
            a.panelClass = d.componentInstance.config.dialogPanelId;
            this.maxify(a);
        });
    }

    private refresh() {
        const a = new DejaPopupAction('tray-refresh', 'popup-tray');
        this.dialogSrv.dejaPopupCom$.next(a);
    }

}
