/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { DejaEditorComponent } from '@deja-js/component/editor';

@Component({
    selector: 'deja-editor-demo',
    templateUrl: './editor-demo.component.html',
    styleUrls: ['./editor-demo.component.scss']
})
export class DejaEditorDemoComponent implements OnInit {
    public tabIndex = 1;
    public replaceWith: string;

    @ViewChild('replaceEditor')
    private replaceEditor: DejaEditorComponent;

    constructor() { }

    public matText: string;
    public editorConfig: any = {};
    public ngOnInit(): void {
        this.matText = `<b>Inline Editor</b> <ul><li>First item</li><li>Second item</li><ul>`;
        // https://docs.ckeditor.com/ckeditor4/latest/api/CKEDITOR_config.html
        this.editorConfig.extraPlugins = 'colorbutton,autogrow';
        this.editorConfig.on = {
            instanceReady: function () {
                this.dataProcessor.writer.indentationChars = '';
                this.dataProcessor.writer.lineBreakChars = '';
            }
        };
        this.editorConfig.title = '';
        this.editorConfig.disableNativeSpellChecker = true;
        this.editorConfig.scayt_autoStartup = true;
        this.editorConfig.scayt_sLang = 'fr_FR';
        this.editorConfig.wsc_lang = 'fr_FR';
        this.editorConfig.scayt_disableOptionsStorage = 'all';
        this.editorConfig.language = 'fr';
        this.editorConfig.enterMode = 3; // CKEDITOR.ENTER_DIV;
        this.editorConfig.contentsCss = [
            // Default css for editor iFrame
            'assets/ckeditor/contents.css'
        ];
        this.editorConfig.autoGrow_onStartup = true;
        this.editorConfig.coreStyles_bold = { element: 'b', overrides: 'strong' };
        this.editorConfig.coreStyles_italic = { element: 'i', overrides: 'em' };
    }

    public replace() {
        this.replaceEditor.replace(this.replaceWith);
    }
}
