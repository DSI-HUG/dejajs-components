/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { AfterViewInit, Component, ElementRef, Inject, Injector, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
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
    public lastEvent = null;
    public componentPortal: Portal<any>;
    private subKeyEvent: Subscription;

    constructor(
        public dialogRef: MatDialogRef<DejaPopupBase>,
        @Inject(MAT_DIALOG_DATA) public config: DejaPopupConfig,
        protected injector: Injector,
        protected renderer: Renderer2,
        protected elRef: ElementRef,
    ) {
        super();
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
            setTimeout(() => {
                this.goFullScreen();
            }, 0);
        }
    }

    public doAction(action: DejaPopupAction) {

        this.actionSelected = action;

        switch (action.name ? action.name : action) {

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

            case 'toolbar-move':
                this.dragstart = !this.dragstart;
                this.lastEvent = null;
                this.listen();
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

    public listen() {

        if (this.dragstart) {
            this.unlisten = this.renderer.listen('window', 'mousemove', (event) => {
                if (this.dragstart) {
                    this.dialogRef.updatePosition(this.move(event));
                }
            });

            this.subKeyEvent = this.dialogRef.keydownEvents()
                .do(() => this.freeze())
                .subscribe();

        } else {
            this.freeze();
        }

    }

    public freeze(me?: MouseEvent) {

        if (me) {
            me.preventDefault();
        }

        if (this.unlisten) {
            this.dragstart = false;
            this.unlisten();
            this.lastEvent = null;
            this.unlisten = null;
        }
        if (this.subKeyEvent) {
            this.subKeyEvent.unsubscribe();
        }
    }

    private move(me: MouseEvent) {

        if (this.lastEvent) {
            this.top += me.y - this.lastEvent.y;
            this.left += me.x - this.lastEvent.x;
        }
        this.lastEvent = me;

        return {
            top: `${this.top}px`,
            left: `${this.left}px`,
        };
    }

}
