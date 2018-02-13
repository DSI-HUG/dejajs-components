/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Diacritics } from '../../common/core/diacritics/diacritics';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-bold-query',
    styleUrls: [
        './bold-query.component.scss',
    ],
    template: `<div [innerHTML]="content"></div>`,
})
export class DejaBoldQueryComponent {
    private _query: string;
    private _value: any;
    private _content: string;
    private _regexpOptions = 'i';
    private _firstOccurenceOnly = false;
    private _firstOccurencePerWordOnly = false;
    private _atTheBeginningOfWordOnly = false;
    private _highlightClassName = 'highlight';

    public get content() {
        return this._content;
    }

    @Input()
    /*
     * The search term query.
     *
     */
    public set query(value: string) {
        value = Diacritics.remove(value);
        if (this._query !== value) {
            this._query = value;
            this.refresh();
        }
    }

    @Input()
    /*
     * The model value. Usually the model display label.
     */
    public set value(value: any) {
        this._value = value;
        this.refresh();
    }

    @Input()
    /*
     * The RegExp optional Flags. Optional. Default value is 'i' (case insensitive).
     *
     */
    public set regexpOption(value: string) {
        this._regexpOptions = value;
        this.refresh();
    }

    @Input()
    /*
     * If true, highlight only the first occurence. False by default.
     */
    public set firstOccurenceOnly(value: boolean) {
        this._firstOccurenceOnly = value;
        this.refresh();
    }

    @Input()
    public set firstOccurencePerWordOnly(value: boolean) {
        this._firstOccurencePerWordOnly = value;
        this.refresh();
    }

    @Input()
    public set atTheBeginningOfWordOnly(value: boolean) {
        this._atTheBeginningOfWordOnly = value;
        this.refresh();
    }

    public get highlightClassName() {
        return this._highlightClassName;
    }

    @Input()
    public set highlightClassName(value: string) {
        this._highlightClassName = value;
        if (!this._highlightClassName) {
            this._highlightClassName = 'highlight';
        }
        this.refresh();
    }

    private refresh() {
        if (this._value && this._query && this._query.length > 0) {
            const regexpPattern = this._atTheBeginningOfWordOnly ? (`\\b${this._query}`) : this._query;
            const sc = new RegExp(regexpPattern, this._regexpOptions);
            const value = this._value.toString() as string;
            const search = Diacritics.remove(value);
            const splitted = search.split(sc);
            let position = 0;
            const queryLength = this._query.length;
            const contents = [] as string[];
            let firstOccurence = true;
            let nbOccurence = 0;
            splitted.forEach((text) => {
                if (text) {
                    contents.push(value.slice(position, position + text.length));
                    position += text.length;
                }
                if (position + queryLength <= value.length) {
                    nbOccurence += 1;
                    let skipHighlight = false;
                    if (this._firstOccurencePerWordOnly && nbOccurence > 1) {
                        const words = text.split(/[^a-zA-Z\d]/g);
                        if (words.length === 1) {
                            skipHighlight = true;
                        }
                    }
                    if (!skipHighlight && (!this._firstOccurenceOnly || firstOccurence)) {
                        contents.push(`<span class="${this._highlightClassName}">`);
                    }
                    contents.push(value.slice(position, position + queryLength));
                    if (!skipHighlight && (!this._firstOccurenceOnly || firstOccurence)) {
                        contents.push('</span>');
                    }
                    position += queryLength;
                }
                firstOccurence = false;
            });
            this._content = contents.join('');
        } else {
            this._content = this._value;
        }
    }
}
