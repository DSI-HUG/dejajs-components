/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MonacoEditorDemoService {

    protected httpClient = inject(HttpClient);

    public getFile$(filename: string): Observable<string> {
        return this.httpClient.get(`assets/datas/monaco/${filename}`, { observe: 'body', responseType: 'text' }).pipe(
            map(response => response)
        );
    }
}
