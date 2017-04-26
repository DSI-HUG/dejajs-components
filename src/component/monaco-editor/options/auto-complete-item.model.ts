/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/**
 * Representation of AutoCompleteItem
 */
export class AutoCompleteItem {
    public label: string;
    public kind: number;
    public documentation: string;
    public insertText: string;

    constructor() {

    }

    public setLabel(label: string): AutoCompleteItem {
        this.label = label;
        return this;
    }

    public setKind(kind: number): AutoCompleteItem {
        this.kind = kind;
        return this;
    }

    public setDocumentation(documentation: string): AutoCompleteItem {
        this.documentation = documentation;
        return this;
    }

    public setInsertText(insertText: string): AutoCompleteItem {
        this.insertText = insertText;
        return this;
    }
}
