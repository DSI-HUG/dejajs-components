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
import { cloneDeep } from 'lodash-es';
import { map, Observable, shareReplay, switchMap, tap } from 'rxjs';

import { News, NewsArticles, NewsSource, NewsSources } from '../common/news.model';


@Injectable({
    providedIn: 'root'
})
export class NewsService {
    private news$: Observable<News[]>;

    public constructor(private httpClient: HttpClient) {
        this.news$ = this.httpClient.get<Record<string, unknown>>('https://newsapi.org/v1/sources?language=en').pipe(
            map(response => ObjectMapper.deserialize(NewsSources, response)),
            map(resp => {
                if (resp.status !== 'ok') {
                    throw new Error('Fail to get news');
                }
                return resp.sources;
            }),
            map(sources => sources.filter(source => source.category === 'technology' || source.category === 'gaming')),
            switchMap((sources: NewsSource[]) => {
                const source = sources[Math.round(Math.random() * (sources.length - 1))];
                return this.httpClient.get<Record<string, unknown>>(`https://newsapi.org/v1/articles?source=${source.id}&apiKey=228bc9410a2a4f608d2ad2e5626896f3`);
            }),
            map(response => ObjectMapper.deserialize(NewsArticles, response)),
            map(resp => {
                if (resp.status !== 'ok') {
                    throw new Error('Fail to get news');
                }
                return resp.articles;
            }),
            tap(x => {
                console.log('x', x);
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );
    }

    public getNews$(recordCount?: number): Observable<News[]> {
        return this.news$.pipe(
            map(news => {
                let returnNews = news;
                if (recordCount) {
                    // eslint-disable-next-line no-loops/no-loops
                    while (recordCount > 0) {
                        returnNews = returnNews.concat(cloneDeep(news));
                        recordCount -= news.length;
                    }
                }
                return returnNews;
            })
        );
    }
}
