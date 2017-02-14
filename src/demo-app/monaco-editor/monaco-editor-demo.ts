/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IEditorLanguage} from "../../component/monaco-editor/options/editor-language.model";
import {IEditorOptions} from "../../component/monaco-editor/options/editor-options.model";
import {IEditorTheme} from "../../component/monaco-editor/options/editor-theme.component";
import {MonacoEditorDemoService} from "./monaco-editor-demo.service.";

const xmlFile = 'xmlFile';
const xmlToCompareFile = 'xmlToCompareFile';
const jsonFile = 'jsonFile';
const jsonToCompareFile = 'jsonToCompareFile';

@Component({
    providers: [MonacoEditorDemoService],
    selector: 'deja-monaco-editor-demo',
    styleUrls: [
        './monaco-editor-demo.scss',
    ],
    templateUrl: './monaco-editor-demo.html',
})
export class DejaMonacoEditorDemo implements OnInit {
    protected language: IEditorLanguage = IEditorLanguage.XML;
    protected languageJson: IEditorLanguage = IEditorLanguage.JSON;

    protected xmlContent: string;
    protected xmlContentToCompare: string;
    protected jsonContent: string;
    protected jsonContentToCompare: string;

    protected theme: IEditorTheme = IEditorTheme.VISUAL_STUDIO;

    constructor(private route: ActivatedRoute) {
    }

    public ngOnInit() {
        // Get content files from resolver
        this.xmlContent = this.route.snapshot.data[xmlFile];
        this.xmlContentToCompare = this.route.snapshot.data[xmlToCompareFile];
        this.jsonContent = this.route.snapshot.data[jsonFile];
        this.jsonContentToCompare = this.route.snapshot.data[jsonToCompareFile];
    }

    public onValueChange() {
        // console.log('Value changed');
    }

    public onValueToCompareChange() {
        // console.log('ValueToCompare changed');
    }
}
