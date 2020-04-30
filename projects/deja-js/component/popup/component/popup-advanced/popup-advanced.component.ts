/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Point } from '@angular/cdk/drag-drop/drag-ref';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Inject } from '@angular/core';
import { Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DejaPopupAction } from '../../model/popup-action.model';
import { DejaPopupBase } from '../../model/popup-base.class';
import { DejaPopupConfig } from '../../model/popup-config.model';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-popup-advanced',
    styleUrls: ['popup-advanced.component.scss'],
    templateUrl: 'popup-advanced.component.html',
})
export class DejaPopupAdvancedComponent extends DejaPopupBase implements AfterViewInit, OnInit {

    private left: number;
    private top: number;
    public dragstart = false;
    public dragPosition: Point = { x: 0, y: 0 };
    public componentPortal: Portal<any>;

    constructor(
        public dialogRef: MatDialogRef<DejaPopupBase>,
        @Inject(MAT_DIALOG_DATA) public config: DejaPopupConfig,
        protected injector: Injector,
        protected renderer: Renderer2,
        protected elRef: ElementRef,
        private domSanitizer: DomSanitizer,
    ) {
        super();
        if (config.url && typeof config.url === 'string') {
            config.url = this.domSanitizer.bypassSecurityTrustResourceUrl(config.url as string);
        }
    }

    public ngOnInit() {
        super.ngOnInit();
        if (this.config.contentComponentRef) {
            this.componentPortal = new ComponentPortal(this.config.contentComponentRef, undefined, this.injector);
        }
    }

    public ngAfterViewInit() {
        this.left = this.elRef.nativeElement.offsetLeft;
        this.top = this.elRef.nativeElement.offsetTop;

        if (this.config.fullscreen) {
            timer(0).pipe(
                takeUntil(this.destroyed$)
            ).subscribe(() => this.goFullScreen());
        }
    }

    public doAction(action: DejaPopupAction) {
        this.actionSelected = action;

        switch (action.name || action) {
            case 'toolbar-close':
            case 'close':
                action.isFinalAction = true;
                break;

            case 'toolbar-fullscreen':
                this.goFullScreen();
                break;

            case 'toolbar-fullscreen-exit':
                this.exitFullScreen();
                break;

            case 'toolbar-minify':
                this.isMinified = true;
                if (this.config.dejaPopupCom$) {
                    const actionOut = new DejaPopupAction('do-minify', 'popup-tray');
                    actionOut.panelClass = this.config.dialogPanelId;
                    this.config.dejaPopupCom$.next(actionOut);
                }
                break;
        }
    }

    public goFullScreen() {
        this.isFullscreen = true;
        this.dialogRef.updatePosition({ top: '0', left: '0' });
        this.dialogRef.updateSize('100vw', '100vh');
    }

    public exitFullScreen() {
        this.isFullscreen = false;

        const updatedWidth = (!this.config.width || this.config.width.length < 1) ? 'auto' : this.config.width;
        const updatedHeight = (!this.config.height || this.config.height.length < 1) ? 'auto' : this.config.height;

        this.dialogRef.updatePosition({ top: `${this.top}px`, left: `${this.left}px` });
        this.dialogRef.updateSize(updatedWidth, updatedHeight);
    }
}
