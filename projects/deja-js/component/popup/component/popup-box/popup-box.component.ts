/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { DejaPopupAction } from '../../model/popup-action.model';
import { DejaPopupBase } from '../../model/popup-base.class';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-popup-box',
    templateUrl: './popup-box.component.html',
    styleUrls: ['./popup-box.component.scss']
})
export class DejaPopupBoxComponent {
    @Input() public dialog: MatDialogRef<DejaPopupBase>;
    @Output() public readonly action = new EventEmitter();

    public showActions = false;
    public aActions: DejaPopupAction[];

    public buttonClose = {
        name: 'toolbar-close',
        icon: 'close',
        label: 'Close'
    } as DejaPopupAction;

    public buttonFullscreen = {
        name: 'toolbar-fullscreen',
        icon: 'fullscreen',
        label: 'Fullscreen'
    } as DejaPopupAction;

    public buttonMinimize = {
        name: 'toolbar-minify',
        icon: 'remove',
        label: 'Minify'
    } as DejaPopupAction;

    @HostListener('mouseenter') public onMouseEnter() {
        this.showActions = true;
    }

    @HostListener('mouseleave') public onMouseLeave() {
        this.showActions = false;
    }

    public doEmit(action: DejaPopupAction) {
        action.target = 'popup-tray';
        this.dialog.componentInstance.isMinified = !this.dialog.componentInstance.isMinified;
        action.panelClass = this.dialog.componentInstance.config.dialogPanelId;
        this.action.emit(action);
    }

    public doClose() {
        this.dialog.close();
        const a = new DejaPopupAction('tray-refresh', 'popup-tray');
        this.action.emit(a);
    }
}
