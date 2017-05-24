import { Http } from '@angular/http';
import 'rxjs/add/operator/publishLast';
import { Observable } from 'rxjs/Observable';
export declare class NewsService {
    private http;
    constructor(http: Http);
    getNews$(recordCount?: number): Observable<INews[]>;
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
export interface INews {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
}
