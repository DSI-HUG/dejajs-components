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

import {AutoCompleteItem} from "./auto-complete-item.model";
import {IEditorLanguage} from "./editor-language.model";

declare const monaco: any;

/**
 * Manage the autoCompletion for all instances of the editors
 */
export class AutoCompleteSingleton {
    /**
     * We use a singleton, because this class can be call from all the Monaco Editor Components
     * @returns {AutoCompleteSingleton}
     */
    public static getInstance() {
        if (!AutoCompleteSingleton.instance) {
            AutoCompleteSingleton.instance = new AutoCompleteSingleton();
        }
        return AutoCompleteSingleton.instance;
    }

    get autoCompleteValues(): {[p: string]: AutoCompleteItem[]} {
        return this._autoCompleteValues;
    }

    private static instance: AutoCompleteSingleton;
    private _autoCompleteValues: { [key: string]: AutoCompleteItem[]; } = {};

    private constructor() {

    }

    /**
     * Init autoComplete for language passed in param if is not already done.
     * @param language
     */
    public initAutoComplete(language: IEditorLanguage) {
        if (this._autoCompleteValues[language.toString()]) {
            return;
        }

        this._autoCompleteValues[language.toString()] = [];

        // This event is fired when the user press Ctrl + Space, to show Intelissense (Autocomplete)
        monaco.languages.registerCompletionItemProvider(language, {
            provideCompletionItems: function (model) {
                // Get new autoComplete list for the current content
                AutoCompleteSingleton.getInstance().parseAutoCompleteValues(language, model.getValue());
                return AutoCompleteSingleton.getInstance().autoCompleteValues[language.toString()];
            },
        });
    }

    /**
     * Parse the content passed in param for the language passed in param
     * @param language
     * @param content
     */
    public parseAutoCompleteValues(language: IEditorLanguage, content: string): AutoCompleteItem[] {
        switch (language) {
            case IEditorLanguage.XML:
                return this.parseXmlAutoComplete(content);
            case IEditorLanguage.JSON:
                return this.parseJsonAutoComplete(content);
            default:
                return [];
        }
    }

    /**
     * Parse the XML content and add all tags in AutoComplete for XML Language
     * @param content
     * @returns {any[]}
     */
    private parseXmlAutoComplete(content: string): AutoCompleteItem[] {
        let tempList: AutoCompleteItem [] = [];
        let parser = new DOMParser();
        let tags = parser.parseFromString(content, "text/xml").getElementsByTagName('*');

        for (let i = 0; i < tags.length; i++) {
            // Add TAG only if it not already existing in autoComplete list and in tempList
            if (!this._autoCompleteValues[IEditorLanguage.XML].find(obj => obj.label === tags[i].tagName)
                && !tempList.find(obj => obj.label === tags[i].tagName)) {

                // Create autoComplete object
                let obj = new AutoCompleteItem()
                    .setLabel(tags[i].tagName)
                    .setKind(monaco.languages.CompletionItemKind.Function)
                    .setDocumentation('')
                    .setInsertText(`<${tags[i].tagName}><${tags[i].tagName}>`);

                tempList.push(obj);
            }
        }

        // Add tempList list in the _autoCompleteValues, to maintain a list updated
        if (tempList.length > 0) {
            this._autoCompleteValues[IEditorLanguage.XML.toString()] = this._autoCompleteValues[IEditorLanguage.XML.toString()].concat(tempList);
        }

        return tempList;
    }

    private parseJsonAutoComplete(content: string): AutoCompleteItem[] {
        const regex = /(?:\"|\')([^"]*)(?:\"|\')(?=:)(?:\:\s*)(?:\"|\')?(true|false|[0-9a-zA-Z\+\-\,\.\$]*)/g;
        let tempList: AutoCompleteItem [] = [];
        let m;

        while ((m = regex.exec(content)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // Add Element only if it not already existing in autoComplete list and in tempList
            if (m[1] && !this._autoCompleteValues[IEditorLanguage.JSON].find(obj => obj.label === m[1])
                && !tempList.find(obj => obj.label === m[1])) {

                let obj = new AutoCompleteItem()
                    .setLabel(m[1])
                    .setKind(monaco.languages.CompletionItemKind.Value)
                    .setDocumentation('')
                    .setInsertText(`"${m[1]}":`);

                tempList.push(obj);
            }
        }

        // Add tempList list in the _autoCompleteValues, to maintain a list updated
        if (tempList.length > 0) {
            this._autoCompleteValues[IEditorLanguage.JSON.toString()] = this._autoCompleteValues[IEditorLanguage.JSON.toString()].concat(tempList);
        }

        return tempList;
    }
}