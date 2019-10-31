/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { ComponentType } from '@angular/cdk/portal';
import { TemplateRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { DejaPopupAction } from './popup-action.model';

export class DejaPopupConfig extends MatDialogConfig {

    public static dialogCount = 0;
    public readonly positionStart = { top: 100, left: 100 };
    public readonly dimensionDefault = { width: '60vw', height: '65vh' };

    public dejaPopupCom$?: BehaviorSubject<DejaPopupAction>;

    public actionComponentRef: ComponentType<any>;
    public contentComponentRef: ComponentType<any>;
    public contentTemplate: DejaPopupContentTemplate<any>;
    public actions: DejaPopupAction[];
    public autoFocus = false;
    public autoposition?: boolean;
    public content?: string | string[];
    public data?: any;
    public dialogPanelId: string;
    public fullscreen = false;
    public maxWidth = '100vw';
    public maxHeight = '100vh';
    public padding?: boolean;
    public shareActions = true;
    public title?: string;
    public toolbarActions?: DejaPopupAction[];
    public toolbarColor?: DialogToolbarColor = 'primary';
    public toolbarIconName?: string;
    public toolbarType?: DialogToolbarType;
    public url?: string | SafeResourceUrl;
    public buttonFullscreenExit?: boolean;

    constructor() {
        super();
    }

    public ensureDimension() {
        if (!this.width) {
            this.setDefaultWidth();
        }
        if (!this.height) {
            this.setDefaultHeight();
        }
    }

    public setDefaultWidth() {
        this.width = this.dimensionDefault.width;
    }

    public setDefaultHeight() {
        this.height = this.dimensionDefault.height;
    }

    public getDefaultPosition() {
        const shift = (10 * DejaPopupConfig.dialogCount) - (100 * Math.ceil(DejaPopupConfig.dialogCount / 10));
        return {
            top: `${(this.positionStart.top + shift)}px`,
            left: `${(this.positionStart.left + shift)}px`,
        };
    }

    public getMatDialogConfig(): MatDialogConfig {

        this.createIds();

        if (this.autoposition) {
            this.ensurePosition();
        }
        if (!this.title) {
            this.title = `Popup ${DejaPopupConfig.dialogCount}`;
        }

        const config: MatDialogConfig<DejaPopupConfig> = new MatDialogConfig();

        config.ariaDescribedBy = this.ariaDescribedBy;
        config.backdropClass = this.backdropClass;
        config.direction = this.direction;
        config.disableClose = this.disableClose;
        config.hasBackdrop = this.hasBackdrop;
        config.height = this.height;
        config.id = this.id;
        config.maxHeight = this.maxHeight;
        config.maxWidth = this.maxWidth;
        config.minHeight = this.minHeight;
        config.minWidth = this.minWidth;
        config.panelClass = this.panelClass;
        config.position = this.position;
        config.role = this.role;
        config.viewContainerRef = this.viewContainerRef;
        config.width = this.width;

        config.data = this;
        return config;

    }

    public addPanelClass(panelClass: string) {
        if (!this.panelClass) {
            this.panelClass = [panelClass];
        } else {
            if (Array.isArray(this.panelClass)) {
                this.panelClass.push(panelClass);
            } else {
                this.panelClass = [panelClass, this.panelClass];
            }
        }
    }

    public hasContent(): boolean {
        return !!this.content && this.content.length > 0;
    }

    public hasActions(): boolean {
        return !!this.actions && !!this.actionComponentRef;
    }

    public ensurePosition() {

        if (!this.position) {
            this.position = this.getDefaultPosition();
            return true;
        }

        if (!this.position.top && !this.position.bottom) {
            this.position.top = `${(this.positionStart.top)}px`;
        }

        if (!this.position.left && !this.position.right) {
            this.position.left = `${(this.positionStart.left)}px`;
        }

    }

    private createIds() {
        // Generate an ID if null or empty
        if (!this.id) {
            this.id = `deja-popup-${++DejaPopupConfig.dialogCount}`;
        }
        const className = `deja-popup-pane-${DejaPopupConfig.dialogCount}`;
        this.addPanelClass(className);
        this.dialogPanelId = `.${className}`;
    }

}

export type DialogToolbarType = 'base' | 'window';
export type DialogToolbarColor = null | 'primary' | 'accent' | 'warn' | 'danger';
export interface DejaPopupContentTemplate<T> {
    templateRef: TemplateRef<T>;
    templateContext?: any;
}
