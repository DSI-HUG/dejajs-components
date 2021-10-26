/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, Component, Injector, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogPosition } from '@angular/material/dialog';
import { Color, Destroy } from '@deja-js/component/core';
import { DejaMessageBoxAction, DejaMessageBoxType } from '@deja-js/component/message-box';
import { DejaPopupAction, DejaPopupButton, DejaPopupConfig, DejaPopupCustomAction, DejaPopupReponse, DejaPopupService } from '@deja-js/component/popup';
import { filter, map, takeUntil } from 'rxjs';

import { DummyComponent } from './dummy/dummy.component';
import { DejaPopupCustomDemoComponent } from './popup-custom.component';
import { CONTAINER_DATA } from './popup-demo.service';
import { PopupDemoButtonComponent, PopupDemoButtonComponentData } from './popup-demo-button/popup-demo-button.component';

@Component({
    selector: 'popup-demo',
    styleUrls: ['./popup-demo.scss'],
    templateUrl: './popup-demo.html'
})
export class DejaPopupDemoComponent extends Destroy {
    @ViewChild('templateButton')
    private _templateButton: TemplateRef<unknown>;

    public hoveredColor: Color;
    public openGate = false;

    public message = {
        type: 'info',
        text: ''
    } as DejaMessageBoxAction;

    private dummyPdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    private dummyImgUrl = 'http://lorempixel.com/800/600/abstract/';

    public constructor(
        public dejaPopupService: DejaPopupService,
        protected changeDetectorRef: ChangeDetectorRef,
        private viewContainerRef: ViewContainerRef,
        private injector: Injector
    ) {
        super();
        this.dejaPopupService.dejaPopupCom$.pipe(
            filter((action: DejaPopupAction) => !!action && action.target !== 'popup-tray' && !action.isFinalAction),
            map((action: DejaPopupAction) => {
                this.message.type = 'primary';
                this.message.text = action.label || action.name;
                this.openGate = true;
                if (action.name === 'color-change') {
                    this.hoveredColor = action.data as Color;
                }
                this.changeDetectorRef.markForCheck();
            }),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    public askConfirmation1(): void {
        const butSave = new DejaPopupButton('save', 'Save', 'save');
        const butCancel = new DejaPopupButton('cancel', 'Cancel', 'cancel');
        this.dejaPopupService.openInline('Inscription à la formation', 'Etes-vous sure de vouloir faire cela ?', [butSave, butCancel]).pipe(
            takeUntil(this.destroyed$)
        ).subscribe((response: DejaPopupReponse) => {
            this.showResponse(response);
        });
    }

    public askConfirmation2(): void {

        const config = new DejaPopupConfig();

        config.width = '530px';
        const pos: DialogPosition = { bottom: '50px', right: '50px' };
        config.position = pos;
        config.disableClose = true;
        config.toolbarColor = 'danger';

        const title = 'System failure!';

        const body = '<p>You don\'t want to <b>Cancel</b> the operation.<br> Or you don\'t? </p>';

        const butYes = new DejaPopupButton('yes', 'Yes', 'check');
        const butNo = new DejaPopupButton('no', 'No', 'not_interested');
        const butCancel = new DejaPopupButton('cancel', 'Cancel', 'cancel');

        const actions = [butYes, butNo, butCancel];

        this.dejaPopupService.openInline(title, body, actions, config).pipe(
            takeUntil(this.destroyed$)
        ).subscribe((response: DejaPopupReponse) => {
            this.showResponse(response);
        });
    }

    public askConfirmationCustom(): void {

        const config = new DejaPopupConfig();
        config.data = { test: 'abcde' };
        config.toolbarIconName = 'accessibility';
        config.toolbarColor = 'accent';
        config.title = 'Dialog custom';

        config.actions = [
            new DejaPopupButton('confirm', 'Confirm', 'done'),
            new DejaPopupButton('undo', 'Undo', 'undo'),
            new DejaPopupButton('cancel', 'Cancel', 'cancel')
        ];

        this.dejaPopupService.openCustom(DejaPopupCustomDemoComponent, config).pipe(
            takeUntil(this.destroyed$)
        ).subscribe((response: DejaPopupReponse) => {
            this.showResponse(response);
        });
    }

    public showUrlImg(): void {
        const config = new DejaPopupConfig();
        config.height = '600px';
        config.width = '800px';
        this.dejaPopupService.openUrl(this.dummyImgUrl, config).pipe(
            takeUntil(this.destroyed$)
        ).subscribe((response: DejaPopupReponse) => {
            this.showResponse(response);
        });
    }

    public showUrlPdf(conf?: DejaPopupConfig<unknown>): void {
        if (!conf) {
            conf = new DejaPopupConfig();
        }
        conf.actions = [
            new DejaPopupButton('close', 'Close', 'close')
        ];
        conf.toolbarType = 'window';
        conf.toolbarColor = 'warn';

        this.dejaPopupService.openUrl(this.dummyPdfUrl, conf).pipe(
            takeUntil(this.destroyed$)
        ).subscribe((response: DejaPopupReponse) => {
            this.showResponse(response);
        });
    }

    public showUrlPdfFullscreen(): void {
        const conf = new DejaPopupConfig();
        conf.fullscreen = true;
        // conf.buttonFullscreenExit = false;
        this.showUrlPdf(conf);
    }

    public useAdvancedComponent(): void {
        const conf = new DejaPopupConfig();
        conf.actions = [
            new DejaPopupButton('close', 'Close', 'close')
        ];
        conf.toolbarType = 'window';
        conf.padding = true;
        conf.content = [
            'One Line of Content',
            'Two Lines of Content',
            'Many Lines of Content'
        ];

        this.dejaPopupService.openAdvanced$(conf).pipe(
            takeUntil(this.destroyed$)
        ).subscribe((response: DejaPopupReponse) => {
            this.showResponse(response);
        });
    }

    public showPopUp(): void {
        const config = new DejaPopupConfig();
        config.title = `Movable ${DejaPopupConfig.dialogCount + 1}`;
        config.content = '<h2>Movable Popup No Modal</h2>';
        config.content = [
            '<p><h3>First</h3> html line</p>',
            '<p><h3>Second</h3> html line</p><br><div> One More Line</div>'
        ];
        config.padding = true;
        config.actions = [
            new DejaPopupButton('close', 'Close', 'close')
        ];
        config.width = '500px';
        config.height = '400px';
        config.toolbarColor = 'warn';

        this.dejaPopupService.openPopUp(config).pipe(
            takeUntil(this.destroyed$)
        ).subscribe((response: DejaPopupReponse) => {
            this.showResponse(response);
        });
    }

    public showPopUpPdf(): void {
        const config = new DejaPopupConfig();
        config.title = `Pdf ${DejaPopupConfig.dialogCount}`;
        config.url = this.dummyPdfUrl;
        config.padding = false;
        config.toolbarIconName = 'photo_camera';
        config.toolbarColor = 'accent';

        const dummyButtonPortalData: PopupDemoButtonComponentData = {
            iconName: 'star_outline',
            iconTooltip: 'Component portal',
            onClickEvent: (_event, instance) => {
                this.showMessage('Click on Component portal button!', 'success');
                const starred = instance.data.iconName === 'star';
                instance.data.iconName = starred ? 'star_outline' : 'star';
                instance.data.buttonColor = starred ? null : 'warn';
            }
        };
        const demoButtonPortal = new ComponentPortal(PopupDemoButtonComponent, null, this.createInjector(dummyButtonPortalData));
        config.toolbarActions = [
            new DejaPopupCustomAction(demoButtonPortal),
            new DejaPopupCustomAction(new TemplatePortal(this._templateButton, this.viewContainerRef)),
            new DejaPopupButton('account', 'User', 'account_circle', false),
            new DejaPopupButton('view', 'Show', 'visibility', false)
        ];

        config.ensureDimension();

        this.dejaPopupService.openPopUp(config).pipe(
            filter((resp: DejaPopupReponse) => !!resp),
            takeUntil(this.destroyed$)
        ).subscribe((response: DejaPopupReponse) => {
            this.showResponse(response);
        });
    }

    public showComponentInjection(): void {
        const config = new DejaPopupConfig();
        config.title = 'Pick a color';
        config.height = 'auto';
        config.width = 'auto';
        config.contentComponentRef = DummyComponent;
        this.dejaPopupService.openPopUp(config).pipe(
            takeUntil(this.destroyed$)
        ).subscribe((response: DejaPopupReponse) => {
            this.showResponse(response);
        });
    }

    public onClickTemplateButton(): void {
        this.showMessage('Click on Template portal button!', 'success');
    }

    private showResponse(resp: DejaPopupReponse): void {
        if (resp.lastAction instanceof DejaPopupAction) {
            this.showMessage(resp.lastAction.label.length ? resp.lastAction.label : resp.lastAction.name, resp.accepted ? 'success' : 'warn');
        }
    }

    private showMessage(text: string, type: DejaMessageBoxType): void {
        this.message.text = text;
        this.message.type = type;
        this.openGate = true;
        this.changeDetectorRef.markForCheck();
    }

    private createInjector<T>(data: T): PortalInjector {
        const injectorTokens = new WeakMap();
        injectorTokens.set(CONTAINER_DATA, data);
        return new PortalInjector(this.injector, injectorTokens);
    }
}
