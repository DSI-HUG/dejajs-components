/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as Prism from 'prismjs';
import * as Showdown from 'showdown';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-markdown',
    styleUrls: [
        './markdown.component.scss',
    ],
    templateUrl: './markdown.component.html',
})
export class DejaMarkdownComponent implements OnInit, AfterViewChecked {

    @Input()
    public set value(value: string) {
        if (value) {
            const tmp = this._converter.makeHtml(value);
            this._html = this.sanitized.bypassSecurityTrustHtml(tmp);
        } else {
            this._html = '';
        }
        this.changeDetectorRef.markForCheck();
    }

    @Input()
    public set url(url: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'text/plain;charset=utf-8'
        });
        this.httpClient.get(url, { observe: 'body', headers: headers, responseType: 'text' }).subscribe((object) => {
            this.value = object.toString();
        }, (error) => {
            this.value = `${error.message}`;
        });
    }

    private _initialised = false;
    private _html: SafeHtml;
    private _converter: any;

    public get html() {
        return this._html;
    }

    constructor(private changeDetectorRef: ChangeDetectorRef, protected httpClient: HttpClient, private sanitized: DomSanitizer) {
        this._converter = new Showdown.Converter();
        this._converter.setOption('tables', true);
    }

    public ngOnInit() {

    }

    public ngAfterViewChecked() {
        if (!this._initialised) {
            Prism.highlightAll(false, () => {
                this._initialised = true;
            });
        }
    }
}
