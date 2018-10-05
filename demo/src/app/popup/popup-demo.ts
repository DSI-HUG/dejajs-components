/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectorRef, Component } from '@angular/core';
import { DialogPosition } from '@angular/material';
import { Color } from '@deja-js/component';
import { DejaPopupAction, DejaPopupButton } from '@deja-js/component';
import { DejaPopupConfig } from '@deja-js/component';
import { DejaPopupReponse } from '@deja-js/component';
import { DejaPopupService } from '@deja-js/component';
import {filter, map} from 'rxjs/operators';
import { DummyComponent } from './dummy/dummy.component';
import { DejaPopupCustomDemoComponent } from './popup-custom.component';

@Component({
    selector: 'popup-demo',
    styleUrls: ['popup-demo.scss'],
    templateUrl: 'popup-demo.html',
})
export class DejaPopupDemoComponent {

    private dummyPdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    private dummyImgUrl = 'http://lorempixel.com/800/600/abstract/';

    public hoveredColor: Color;

    public message = {
        type: 'info',
        text: '',
    };
    public openGate = false;

    constructor(
        public dejaPopupService: DejaPopupService,
        protected changeDetectorRef: ChangeDetectorRef,
    ) {
        this.dejaPopupService.dejaPopupCom$.pipe(
            filter((action: DejaPopupAction) => !!action && action.target !== 'popup-tray' && !action.isFinalAction),
            map((action: DejaPopupAction) => {
                this.message.type = 'primary';
                this.message.text = action.label || action.name;
                this.openGate = true;
                if (action.name === 'color-change') {
                    this.hoveredColor = action.data;
                }
                this.changeDetectorRef.markForCheck();
            }), )
            .subscribe();
    }

    public askConfirmation1() {
        const butSave = new DejaPopupButton('save', 'Save', 'save');
        const butCancel = new DejaPopupButton('cancel', 'Cancel', 'cancel');
        this.dejaPopupService
            .openInline(
            'Inscription à la formation',
            'Etes-vous sure de vouloir faire cela ?',
            [butSave, butCancel])
            .subscribe((response: DejaPopupReponse) => {
                this.showResponse(response);
            });
    }

    public askConfirmation2() {

        const config = new DejaPopupConfig();

        config.width = '530px';
        const pos: DialogPosition = { bottom: '50px', right: '50px' };
        config.position = pos;
        config.disableClose = true;

        const title = 'System failure!';

        const body = '<p>You don\'t want to <b>Cancel</b> the operation.<br> Or you don\'t? </p>';

        const butYes = new DejaPopupButton('yes', 'Yes', 'check');
        const butNo = new DejaPopupButton('no', 'No', 'not_interested');
        const butCancel = new DejaPopupButton('cancel', 'Cancel', 'cancel');

        const actions = [butYes, butNo, butCancel];

        this.dejaPopupService
            .openInline(title, body, actions, config)
            .subscribe((response: DejaPopupReponse) => {
                this.showResponse(response);
            });
    }

    public askConfirmationCustom() {

        const config = new DejaPopupConfig();
        config.data = { test: 'abcde' };
        config.toolbarIconName = 'accessibility';
        config.toolbarColor = 'accent';
        config.title = 'Dialog custom';

        config.actions = [
            new DejaPopupButton('confirm', 'Confirm', 'done'),
            new DejaPopupButton('undo', 'Undo', 'undo'),
            new DejaPopupButton('cancel', 'Cancel', 'cancel'),
        ];

        this.dejaPopupService.openCustom(
            DejaPopupCustomDemoComponent,
            config,
        )
            .subscribe((response: DejaPopupReponse) => {
                this.showResponse(response);
            });
    }

    public showUrlImg() {
        const config = new DejaPopupConfig();
        config.height = '600px';
        config.width = '800px';
        this.dejaPopupService.openUrl(this.dummyImgUrl, config)
            .subscribe((response: DejaPopupReponse) => {
                this.showResponse(response);
            });
    }

    public showUrlPdf(conf?: DejaPopupConfig) {
        if (!conf) {
            conf = new DejaPopupConfig();
        }
        conf.actions = [
            new DejaPopupButton('close', 'Close', 'close'),
        ];
        conf.toolbarType = 'window';

        this.dejaPopupService.openUrl(this.dummyPdfUrl, conf)
            .subscribe((response: DejaPopupReponse) => {
                this.showResponse(response);
            });
    }

    public showUrlPdfFullscreen() {
        const conf = new DejaPopupConfig();
        conf.fullscreen = true;
        // conf.buttonFullscreenExit = false;
        this.showUrlPdf(conf);
    }

    public useAdvancedComponent() {
        const conf = new DejaPopupConfig();
        conf.actions = [
            new DejaPopupButton('close', 'Close', 'close'),
        ];
        conf.toolbarType = 'window';
        conf.padding = true;
        conf.content = [
            'One Line of Content',
            'Two Lines of Content',
            'Many Lines of Content',
        ];

        this.dejaPopupService.openAdvanced$(conf)
            .subscribe((response: DejaPopupReponse) => {
                this.showResponse(response);
            });
    }

    public showPopUp() {
        const config = new DejaPopupConfig();
        config.title = `Movable ${DejaPopupConfig.dialogCount + 1}`;
        config.content = '<h2>Movable Popup No Modal</h2>';
        config.content = [
            '<p><h3>First</h3> html line</p>',
            '<p><h3>Second</h3> html line</p><br><div> One More Line</div>',
        ];
        config.padding = true;
        config.actions = [
            new DejaPopupButton('close', 'Close', 'close'),
        ];
        config.width = '500px';
        config.height = '400px';

        this.dejaPopupService.openPopUp(config)
            // .filter((resp: DejaPopupReponse) => !!resp)
            .subscribe((response: DejaPopupReponse) => {
                this.showResponse(response);
            });
    }

    public showPopUpPdf() {
        const config = new DejaPopupConfig();
        config.title = `Pdf ${DejaPopupConfig.dialogCount}`;
        config.url = this.dummyPdfUrl;
        config.padding = false;

        config.toolbarActions = [
            new DejaPopupButton('account', 'User', 'account_circle', false),
            new DejaPopupButton('view', 'Show', 'visibility', false),
        ];

        config.ensureDimension();

        this.dejaPopupService.openPopUp(config).pipe(
            filter((resp: DejaPopupReponse) => !!resp))
            .subscribe((response: DejaPopupReponse) => {
                this.showResponse(response);
            });
    }

    public showComponentInjection() {

        const config = new DejaPopupConfig();
        config.title = 'Pick a color';
        config.height = 'auto';
        config.width = 'auto';
        config.contentComponentRef = DummyComponent;
        this.dejaPopupService.openPopUp(config)
            .subscribe((response: DejaPopupReponse) => {
                this.showResponse(response);
            });

    }

    private showResponse(resp: DejaPopupReponse) {
        if (resp.accepted) {
            this.message.type = 'success';
        } else {
            this.message.type = 'warn';
        }
        this.message.text = resp.lastAction.label.length ? resp.lastAction.label : resp.lastAction.name;
        this.openGate = true;
        this.changeDetectorRef.markForCheck();
    }

}
