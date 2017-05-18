/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MonacoEditorDemoService } from './monaco-editor-demo.service.';

@Injectable()
export class MonacoEditorXmlFileResolver implements Resolve<any> {
    constructor(private _fileService: MonacoEditorDemoService) {

    }

    public resolve(): Observable<any> {
        return this._fileService.getFile('xmlFile.xml');
    }
}

@Injectable()
export class MonacoEditorXmlToCompareFileResolver implements Resolve<any> {
    constructor(private _fileService: MonacoEditorDemoService) {

    }

    public resolve(): Observable<any> {
        return this._fileService.getFile('xmlFileToCompare.xml');
    }
}

@Injectable()
export class MonacoEditorJsonFileResolver implements Resolve<any> {
    constructor(private _fileService: MonacoEditorDemoService) {

    }

    public resolve(): Observable<any> {
        return this._fileService.getFile('jsonFile.json');
    }
}

@Injectable()
export class MonacoEditorJsonToCompareFileResolver implements Resolve<any> {
    constructor(private _fileService: MonacoEditorDemoService) {

    }

    public resolve(): Observable<any> {
        return this._fileService.getFile('jsonFileToCompare.json');
    }
}
