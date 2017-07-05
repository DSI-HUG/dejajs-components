/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { JsonProperty } from 'json-object-mapper';

export class News {
    author: string = void 0;
    title: string = void 0;
    description: string = void 0;
    url: string = void 0;
    urlToImage: string = void 0;
    publishedAt: string = void 0;
}

export class NewsSource {
    id: string = void 0;
    name: string = void 0;
    category: string = void 0;
    language: string = void 0;
    country: string = void 0;
    @JsonProperty({ type: String })
    sortBysAvailable: string[] = void 0;
}

export class NewsSources {
    status: string = void 0;
    @JsonProperty({ type: NewsSource })
    sources: NewsSource[] = void 0;
}

export class NewsArticles {
    status: string = void 0;
    sources: string = void 0;
    @JsonProperty({ type: News })
    articles: News[] = void 0;
}
