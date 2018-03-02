/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MonacoEditorDemoService {

    constructor(protected _http: Http) {

    }

    public getFile$(filename: string): Observable<string> {
        return this._http.get(`assets/datas/monaco/${filename}`, { responseType: ResponseContentType.Text })
            .map((response) => response.text());
    }
}
