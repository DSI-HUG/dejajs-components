/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { JsonProperty } from 'json-object-mapper';

export class News {
    public author: string = void 0;
    public title: string = void 0;
    public description: string = void 0;
    public url: string = void 0;
    public urlToImage: string = void 0;
    public publishedAt: string = void 0;
}

export class NewsSource {
    public id: string = void 0;
    public name: string = void 0;
    public category: string = void 0;
    public language: string = void 0;
    public country: string = void 0;
    @JsonProperty({ type: String })
    public sortBysAvailable: string[] = void 0;
}

export class NewsSources {
    public status: string = void 0;
    @JsonProperty({ type: NewsSource })
    public sources: NewsSource[] = void 0;
}

export class NewsArticles {
    public status: string = void 0;
    public sources: string = void 0;
    @JsonProperty({ type: News })
    public articles: News[] = void 0;
}
