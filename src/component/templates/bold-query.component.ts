/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, Input } from '@angular/core';
import { Diacritics } from '../../common/core/diacritics/diacritics';

@Component({
    selector: 'deja-bold-query',
    styleUrls: [
        './bold-query.component.scss',
    ],
    template: `<span [innerHTML]="content"></span>`,
})
export class DejaBoldQueryComponent {
    private _query: string;
    private _value: any;
    private content: string;

    @Input()
    set query(value) {
        value = Diacritics.remove(value);
        if (this._query !== value) {
            this._query = value;
            this.refresh();
        }
    }

    @Input()
    public set value(value: any) {
        this._value = value;
        this.refresh();
    }

    private refresh() {
        if (this._value && this._query && this._query.length) {
            const sc = new RegExp(this._query, 'i');
            const value = this._value.toString() as string;
            const search = Diacritics.remove(value);
            const splitted = search.split(sc);
            let position = 0;
            const queryLength = this._query.length;
            const contents = [] as string[];
            splitted.forEach((text) => {
                if (text) {
                    contents.push(value.slice(position, position + text.length));
                    position += text.length;
                }
                if (position + queryLength <= value.length) {
                    contents.push('<b>');
                    contents.push(value.slice(position, position + queryLength));
                    contents.push('</b>');
                    position += queryLength;
                }
            });
            this.content = contents.join('');
        } else {
            this.content = this._value;
        }
    }
}
