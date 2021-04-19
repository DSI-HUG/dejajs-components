/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { Language } from '@deja-js/component/v2/monaco-editor';
import { takeUntil } from 'rxjs/operators';

import { MonacoEditorDemoService } from './monaco-editor-demo.service';

@Component({
    providers: [MonacoEditorDemoService],
    selector: 'monaco-editor-demo',
    templateUrl: './monaco-editor-demo.component.html',
    styleUrls: ['./monaco-editor-demo.component.scss']
})
export class MonacoEditorDemoComponent extends Destroy implements OnInit {
    public tabIndex = 1;

    public xmlContent: string;
    public xmlContentToCompare: string;
    public jsonContent: string;
    public jsonContentToCompare: Language;

    public dynamicContent: string;
    public dynamicLanguage: Language;

    public readOnly = false;

    public constructor(
        private fileService: MonacoEditorDemoService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.fileService.getFile$('xmlFile.xml').pipe(
            takeUntil(this.destroyed$)
        ).subscribe(val => this.xmlContent = val);

        this.fileService.getFile$('xmlFileToCompare.xml').pipe(
            takeUntil(this.destroyed$)
        ).subscribe(val => this.xmlContentToCompare = val);

        this.fileService.getFile$('jsonFile.json').pipe(
            takeUntil(this.destroyed$)
        ).subscribe(val => this.jsonContent = val);

        this.fileService.getFile$('jsonFileToCompare.json').pipe(
            takeUntil(this.destroyed$)
        ).subscribe((val: Language) => this.jsonContentToCompare = val);

        this.updateLanguage('xml');
    }

    public onValueChange(): void {
        // console.log('Value changed');
    }

    public onValueToCompareChange(): void {
        // console.log('ValueToCompare changed');
    }

    public updateLanguage(lang: string): void {
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
