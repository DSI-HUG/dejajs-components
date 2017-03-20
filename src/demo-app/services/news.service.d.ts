import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
export declare class NewsService {
    private http;
    constructor(http: Http);
    getNews$(repeatCount?: number): Observable<INews[]>;
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
