import { Observable } from 'rxjs/Observable';
import { INews, NewsService } from '../services/news.service';
export declare class DejaViewPortDemoComponent {
    protected exampleValue: string;
    protected html: string;
    protected news$: Observable<INews[]>;
    constructor(newsService: NewsService);
}
