/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';

import { DejaPopupAction } from '../../model/popup-action.model';
import { DejaPopupConfig, DialogToolbarColor, DialogToolbarType } from '../../model/popup-config.model';

@Component({
    selector: 'deja-popup-toolbar',
    templateUrl: './popup-toolbar.component.html',
    styleUrls: ['./popup-toolbar.component.scss']
})
export class DejaPopupToolbarComponent {
    @Output() public readonly actionSelected = new EventEmitter<DejaPopupAction>();

    @Input()
    public set config(conf: DejaPopupConfig<unknown>) {
        this.color = conf.toolbarColor;
        this.title = conf.title;
        this.iconName = conf.toolbarIconName;
        this.type = conf.toolbarType;
        this.actions = conf.toolbarActions;
        this.dialogId = conf.id;
        this.isFullScreen = conf.fullscreen;

        if (!conf.fullscreen) {
            this.defaultActions.unshift(this.buttonFullscreen);
        } else if (conf.buttonFullscreenExit !== false) {
            this.defaultActions.unshift(this.buttonFullscreenExit);
        }

        if (!conf.hasBackdrop) {
            this.defaultActions.unshift(this.buttonMinimize);
        }
    }

    public defaultActions: DejaPopupAction[];

    public color: DialogToolbarColor;
    public title: string;
    public iconName: string;
    public type: DialogToolbarType;
    public actions: DejaPopupAction[];
    private dialogId: string;
    private isFullScreen: boolean;

    private buttonClose = {
        name: 'toolbar-close',
        icon: 'close',
        label: 'Close'
    } as DejaPopupAction;

    private buttonFullscreen = {
        name: 'toolbar-fullscreen',
        icon: 'fullscreen',
        label: 'Fullscreen'
    } as DejaPopupAction;

    private buttonFullscreenExit = {
        name: 'toolbar-fullscreen-exit',
        icon: 'fullscreen_exit',
        label: 'Exit fullscreen'
    } as DejaPopupAction;

    private buttonMinimize = {
        name: 'toolbar-minify',
        icon: 'remove',
        label: 'Dock'
    } as DejaPopupAction;

    public constructor() {
        this.defaultActions = [this.buttonClose];
    }

    public doEmit(action: DejaPopupAction, event?: Event): void {
        if (action.name === this.buttonFullscreen.name || action.name === this.buttonFullscreenExit.name) {
            this.toggleFullScreenButton();
        }
        action.target = this.dialogId;
        this.actionSelected.emit(action);
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    public toggleFullScreenButton(): boolean {
        this.isFullScreen = !this.isFullScreen;
        let formerButton: DejaPopupAction;
        let newButton;
        if (this.isFullScreen) {
            formerButton = this.buttonFullscreen;
            newButton = this.buttonFullscreenExit;
        } else {
            formerButton = this.buttonFullscreenExit;
            newButton = this.buttonFullscreen;
        }
        const idx = this.defaultActions.findIndex((a: DejaPopupAction) => a.name === formerButton.name);
        if (idx === -1) {
            return false;
        }
        this.defaultActions.splice(idx, 1, newButton);
        return undefined;
    }
}
