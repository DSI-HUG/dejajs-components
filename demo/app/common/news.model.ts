/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

export interface INews {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
}

export interface INewsSources {
    status: string;
    sources: INewsSource[];
}

export interface INewsSource {
    id: string;
    name: string;
    category: string;
    language: string;
    country: string;
    sortBysAvailable: string[];
}

export interface INewsArticles {
    status: string;
    sources: string;
    articles: INews[];
}
