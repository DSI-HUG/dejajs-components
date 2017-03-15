import { AfterViewChecked, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
export declare class DejaMarkdownComponent implements OnInit, AfterViewChecked {
    protected _http: Http;
    private sanitized;
    value: string;
    url: string;
    private _initialised;
    private _html;
    private _converter;
    constructor(_http: Http, sanitized: DomSanitizer);
    ngOnInit(): void;
    ngAfterViewChecked(): void;
}
