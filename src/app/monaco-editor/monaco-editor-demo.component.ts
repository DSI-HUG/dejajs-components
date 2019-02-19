/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, OnInit } from '@angular/core';
import { MonacoEditorDemoService } from './monaco-editor-demo.service';

@Component({
    providers: [MonacoEditorDemoService],
    selector: 'deja-monaco-editor-demo',
    templateUrl: './monaco-editor-demo.component.html',
    styleUrls: ['./monaco-editor-demo.component.scss'],
})
export class DejaMonacoEditorDemoComponent implements OnInit {
    public tabIndex = 1;

    public xmlContent: string;
    public xmlContentToCompare: string;
    public jsonContent: string;
    public jsonContentToCompare: string;

    public dynamicContent: string;
    public dynamicLanguage: string;

    constructor(
        private fileService: MonacoEditorDemoService
    ) { }

    public ngOnInit() {
        this.fileService.getFile$('xmlFile.xml').subscribe((val) => this.xmlContent = val);
        this.fileService.getFile$('xmlFileToCompare.xml').subscribe((val) => this.xmlContentToCompare = val);
        this.fileService.getFile$('jsonFile.json').subscribe((val) => this.jsonContent = val);
        this.fileService.getFile$('jsonFileToCompare.json').subscribe((val) => this.jsonContentToCompare = val);

        this.updateLanguage('xml');
    }

    public onValueChange() {
        // console.log('Value changed');
    }

    public onValueToCompareChange() {
        // console.log('ValueToCompare changed');
    }

    public updateLanguage(lang: string) {
        switch (lang) {
            case 'json':
                this.dynamicLanguage = lang;
                this.dynamicContent = this.jsonContent;
                break;
            default:
                this.dynamicLanguage = 'xml';
                this.dynamicContent = this.xmlContent;
                break;
        }
    }
}
