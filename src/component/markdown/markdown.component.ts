/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
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
    set value(value: string) {
        if (value) {
            const tmp = this._converter.makeHtml(value);
            this._html = this.sanitized.bypassSecurityTrustHtml(tmp);
            this.changeDetectorRef.markForCheck();
        }
    }

    @Input()
    set url(url: string) {
        this._http.get(url, { responseType: ResponseContentType.Text }).subscribe((response) => {
            this.value = response.text();
            this.changeDetectorRef.markForCheck();
        });
    }

    private _initialised = false;
    private _html: SafeHtml;
    private _converter: any;

    constructor(private changeDetectorRef: ChangeDetectorRef, protected _http: Http, private sanitized: DomSanitizer) {
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
