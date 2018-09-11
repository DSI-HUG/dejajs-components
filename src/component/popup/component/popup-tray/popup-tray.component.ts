/*
*  @license
*  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
*
*  Use of this source code is governed by an Apache-2.0 license that can be
*  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
*/
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { from as observableFrom, Observable } from 'rxjs';
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

    constructor(
        public dialogSrv: DejaPopupService,
    ) { }

    public ngOnInit() {

        this.dialogs$ = observableFrom(this.dialogSrv.afterOpen).pipe(
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

    public minify(action: DejaPopupAction) {
        const el = document.querySelector(action.panelClass) as HTMLElement;
        if (!el) {
            return false;
        }
        el.style.display = 'none';
        this.refresh();
    }

    public maxify(action: DejaPopupAction) {
        const el = document.querySelector(action.panelClass) as HTMLElement;
        if (!el) {
            return false;
        }
        el.style.display = 'initial';
        this.refresh();
    }

    public doAction(action: DejaPopupAction) {
        if (action.name === 'toolbar-minify') {
            this.minify(action);
        } else if (action.name === 'toolbar-fullscreen') {
            this.maxify(action);
        } else {
            this.dialogSrv.dejaPopupCom$.next(action);
        }
    }

    public closeAll() {
        this.dialogSrv.closeAll();
        this.refresh();
    }

    public minimizeAll() {
        this.dialogSrv.openDialogs.forEach((d: MatDialogRef<DejaPopupBase>) => {
            const a = new DejaPopupAction('minify-all', 'popup-tray');
            d.componentInstance.isMinified = true;
            a.panelClass = d.componentInstance.config.dialogPanelId;
            this.minify(a);
        });
    }

    public showAll() {
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
