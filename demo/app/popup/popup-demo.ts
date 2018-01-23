import { Portal } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DialogPosition } from '@angular/material';
import { DejaPopupButton } from '../../../src/component/popup/model/popup-action.model';
import { DejaPopupConfig } from '../../../src/component/popup/model/popup-config.model';
import { DejaPopupReponse } from '../../../src/component/popup/model/popup-response.model';
import { DejaPopupService } from '../../../src/component/popup/service/popup.service';
import { DpiDialogCustomComponentDemoComponent } from './popup-custom-component.component';
import { DpiDialogCustomFormDemoComponent } from './popup-custom-form.component';
import { DpiDialogPortalDemoComponent } from './popup-custom-portal.component';
import { DpiDialogCustomDemoComponent } from './popup-custom.component';

@Component({
    selector: 'popup-demo',
    styleUrls: ['popup-demo.scss'],
    templateUrl: 'popup-demo.html',
})
export class PopupDemoComponent implements OnInit {

    public portalInstance: Portal<any>;

    constructor(
        private dpiDialogService: DejaPopupService,
    ) { }

    public ngOnInit(): void { }

    public askConfirmation1() {
        const butSave = new DejaPopupButton('save', 'Save', 'save');
        const butCancel = new DejaPopupButton('cancel', 'Cancel', 'cancel');
        this.dpiDialogService
            .openInline(
            'Inscription à la formation',
            'Etes-vous sure de vouloir faire cela ?',
            [butSave, butCancel])
            .subscribe((response: DejaPopupReponse) => {
                console.log('response', response);

            });
    }

    public askConfirmation2() {

        const config = new DejaPopupConfig();

        config.width = '530px';
        const pos: DialogPosition = { bottom: '50px', right: '50px' };
        config.position = pos;
        config.disableClose = true;

        const title = 'Titre Confirmation';

        const body = '<p></p><b>Atttention attention!</b> Etes-vous sure de vouloire faire cela ? </p>' +
            '<p><i>Parce que si vous voulez le faire, et bien il faut mieux le faire sinon vous ne le ferez pas et ca c\'est mal.' +
            ' Car comme dit <b>le dicton populaire</b> bien connu, nul n\'y fait qui mal y pense. Donc faites-le, c\'est mieux</i>.</p>';

        const butYes = new DejaPopupButton('yes', 'Yes', 'check');
        const butNo = new DejaPopupButton('no', 'No', 'not_interested');
        const butCancel = new DejaPopupButton('cancel', 'Cancel', 'cancel');

        const actions = [butYes, butNo, butCancel];

        this.dpiDialogService
            .openInline(title, body, actions, config)
            .subscribe((response: DejaPopupReponse) => {
                console.log('response', response);
            });
    }

    public askConfirmationCustom() {

        const config = new DejaPopupConfig();
        config.data = { test: 'abcde' };
        config.toolbarIconName = 'accessibility';
        config.toolbarColor = 'accent';
        config.title = 'Dialog custom';
        config.actions = [
            new DejaPopupButton('confirm', 'Confirm', 'check'),
            new DejaPopupButton('undo', 'Undo', 'undo'),
            new DejaPopupButton('cancel', 'Cancel', 'cancel'),
        ];

        this.dpiDialogService.openCustom(
            DpiDialogCustomDemoComponent,
            config,
        )
            .subscribe((response: DejaPopupReponse) => {
                console.log('response', response);
            });
    }

    public customWithDpiComponent() {

        const config = new DejaPopupConfig();
        config.actions = [
            new DejaPopupButton('confirm', 'Confirm', 'check'),
            new DejaPopupButton('cancel', 'Cancel', 'cancel'),
        ];
        config.title = 'Dialog DejaDataGrid';

        this.dpiDialogService.openCustom(
            DpiDialogCustomComponentDemoComponent,
            config,
        )
            .subscribe((response: DejaPopupReponse) => {
                console.log('response', response);
            });
    }

    public showCustomPortal() {

        const config = new DejaPopupConfig();
        config.actions = [
            new DejaPopupButton('confirm', 'Confirm', 'check'),
            new DejaPopupButton('cancel', 'Cancel', 'cancel'),
        ];
        config.height = '25vh';
        config.width = '25vw';
        this.dpiDialogService.openCustom(
            DpiDialogPortalDemoComponent,
            config,
        )
            .subscribe((response: DejaPopupReponse) => {
                console.log('response', response);
            });
    }

    public customWithDpiForm() {

        const config = new DejaPopupConfig();
        config.actions = [
            new DejaPopupButton('confirm', 'Confirm', 'check'),
            new DejaPopupButton('cancel', 'Cancel', 'cancel'),
        ];
        config.title = 'Dialog Form';

        this.dpiDialogService.openCustom(
            DpiDialogCustomFormDemoComponent,
            config,
        )
            .subscribe((response: DejaPopupReponse) => {
                console.log('response', response);
            });
    }

    public showUrlImg() {
        const url = 'http://vmyao.hcuge.ch:8032/dpireferentiel/file/IMG/logo_hug.png';
        this.dpiDialogService.openUrl(url)
            .subscribe((response: DejaPopupReponse) => {
                console.log('response', response);
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

        const url = 'http://vmyao.hcuge.ch:8032/dpireferentiel/file/DPIRULEMANAGER/vaccino.pdf';
        this.dpiDialogService.openUrl(url, conf)
            .subscribe((response: DejaPopupReponse) => {
                console.log('response', response);
            });
    }

    public showUrlPdfFullscreen() {
        const conf = new DejaPopupConfig();
        conf.fullscreen = true;
        this.showUrlPdf(conf);
    }

    public useAdvancedComponent() {
        const conf = new DejaPopupConfig();
        conf.actions = [
            new DejaPopupButton('close', 'Close', 'close'),
        ];
        conf.toolbarType = 'window';
        conf.padding = true;
        conf.aContent = [
            'One Line of Content',
            'Two Lines of Content',
            'Many Lines of Content',
        ];

        this.dpiDialogService.openAdvanced(conf)
            .subscribe((response: DejaPopupReponse) => {
                console.log('response', response);
            });
    }

    public showPopUp() {
        const config = new DejaPopupConfig();
        config.title = `Movable ${DejaPopupConfig.dialogCount + 1}`;
        config.content = '<h2>Movable Popup No Modal</h2>';
        config.aContent = [
            '<p><h3>First</h3> html line</p>',
            '<p><h3>Second</h3> html line</p><br><div> One More Line</div>',
        ];
        config.padding = true;
        config.actions = [
            new DejaPopupButton('close', 'Close', 'close'),
        ];
        config.width = '500px';
        config.height = '400px';

        this.dpiDialogService.openPopUp(config)
            .filter((resp: DejaPopupReponse) => !!resp)
            .subscribe((response: DejaPopupReponse) => {
                console.log('response', response);
            });
    }

    public showPopUpPdf() {
        const config = new DejaPopupConfig();
        config.title = `Pdf ${DejaPopupConfig.dialogCount}`;
        config.url = 'http://vmyao.hcuge.ch:8032/dpireferentiel/file/DPIRULEMANAGER/vaccino.pdf';
        config.padding = false;

        config.toolbarActions = [
            new DejaPopupButton('account', 'User', 'account_circle'),
            new DejaPopupButton('view', 'Show', 'visibility'),
        ];

        this.dpiDialogService.openPopUp(config)
            .filter((resp: DejaPopupReponse) => !!resp)
            .subscribe((response: DejaPopupReponse) => {
                console.log('response', response);
            });
    }

}
