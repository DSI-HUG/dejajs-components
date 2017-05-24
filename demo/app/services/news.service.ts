/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/publishLast';
import { Observable } from 'rxjs/Observable';
import { INews, INewsArticles, INewsSource, INewsSources } from '../common/news.model';

@Injectable()
export class NewsService {
    constructor(private http: Http) { }

    public getNews$(recordCount?: number): Observable<INews[]> {
        return this.http.get('https://newsapi.org/v1/sources?language=en')
            .map((response: any) => response.json() as INewsSources)
            .map((resp: INewsSources) => {
                if (resp.status !== 'ok') {
                    throw new Error('Fail to get news');
                }
                return resp.sources as INewsSource[];
            })
            .switchMap((sources: INewsSource[]) => {
                const source = sources[Math.round(Math.random() * (sources.length - 1))];
                return this.http.get(`https://newsapi.org/v1/articles?source=${source.id}&apiKey=228bc9410a2a4f608d2ad2e5626896f3`);
            })
            .map((response: any) => response.json() as INewsArticles)
            .map((resp: INewsArticles) => {
                if (resp.status !== 'ok') {
                    throw new Error('Fail to get news');
                }
                return resp.articles as INews[];
            })
            .publishLast()
            .refCount()
            .map((news: INews[]) => {
                let returnNews = news;
                if (recordCount) {
                    while (recordCount > 0) {
                        returnNews = returnNews.concat(news);
                        recordCount -= news.length;
                    }
                }
                return returnNews;
            });
    }
}
