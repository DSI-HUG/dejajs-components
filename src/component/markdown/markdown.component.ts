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

import {Component, Input, OnInit} from '@angular/core';
import { Http, ResponseContentType } from "@angular/http";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

const Showdown = require('showdown');

@Component({
    selector: 'deja-markdown',
    styleUrls: [
        './markdown.component.scss',
    ],
    templateUrl: './markdown.component.html',
})
export class DejaMarkdownComponent implements OnInit{

    @Input()
    set value(value: string) {
        if (value) {
            let tmp = this._converter.makeHtml(value);
            this._html = this.sanitized.bypassSecurityTrustHtml(tmp);
            // this._html = '<span>test</span>';
        }
    }

    @Input()
    set url(url: string) {
        this._http.get(url, {responseType: ResponseContentType.Text}).subscribe((response) => {
            this.value = response.text();
        });
    }

    private _html: SafeHtml;
    private _converter: any;

    constructor(protected _http: Http, private sanitized: DomSanitizer) {
        this._converter = new Showdown.Converter();
    }

    public ngOnInit() {

    }
}
