import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { INews, NewsService } from '../services/news.service';
export declare class DejaViewPortDemoComponent {
    private changeDetectorRef;
    protected tabIndex: number;
    private viewport;
    protected exampleValue: string;
    protected html: string;
    protected news$: Observable<INews[]>;
    constructor(newsService: NewsService, changeDetectorRef: ChangeDetectorRef);
    protected imageLoaded(): void;
}
