/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NewsService {
    constructor(private http: Http) { }

    public getNews$(repeatCount?: number): Observable<INews[]> {
        return this.http.get('https://newsapi.org/v1/sources?language=en')
            .map((response: any) => response.json() as INewsResponse)
            .map((resp: INewsResponse) => {
                if (resp.status !== 'ok') {
                    throw new Error('Fail to get news');
                }
                return resp.sources as INews[];
            })
            .map((news: INews[]) => {
                let returnNews = news;
                if (repeatCount) {
                    while (--repeatCount > 0) {
                        returnNews = returnNews.concat(news);
                    }
                }
                return returnNews;
            })
            .publishLast()
            .refCount();
    }
}

export interface INewsResponse {
    status: string;
    sources: INews[];
}

export interface INews {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
    urlsToLogos: {
        small: string;
        medium: string;
        large: string;
    };
    sortBysAvailable: string[];
}
