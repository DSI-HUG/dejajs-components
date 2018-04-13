/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectMapper } from 'json-object-mapper';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { News, NewsArticles, NewsSource, NewsSources } from '../common/news.model';

@Injectable()
export class NewsService {
    constructor(private http: HttpClient) { }

    public getNews$(recordCount?: number): Observable<News[]> {
        return this.http.get('https://newsapi.org/v1/sources?language=en')
            .map((response: any) => ObjectMapper.deserialize(NewsSources, response))
            .map((resp: NewsSources) => {
                if (resp.status !== 'ok') {
                    throw new Error('Fail to get news');
                }
                return resp.sources;
            })
            .map((sources: NewsSource[]) => sources.filter((source) => source.category === 'technology' || source.category === 'gaming'))
            .switchMap((sources: NewsSource[]) => {
                const source = sources[Math.round(Math.random() * (sources.length - 1))];
                return this.http.get(`https://newsapi.org/v1/articles?source=${source.id}&apiKey=228bc9410a2a4f608d2ad2e5626896f3`);
            })
            .map((response: any) => ObjectMapper.deserialize(NewsArticles, response))
            .map((resp: NewsArticles) => {
                if (resp.status !== 'ok') {
                    throw new Error('Fail to get news');
                }
                return resp.articles;
            })
            .publishLast()
            .refCount()
            .map((news: News[]) => {
                let returnNews = news;
                if (recordCount) {
                    while (recordCount > 0) {
                        returnNews = returnNews.concat(_.cloneDeep(news));
                        recordCount -= news.length;
                    }
                }
                return returnNews;
            });
    }
}
