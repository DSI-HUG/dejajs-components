import { EventEmitter } from '@angular/core';
import { INews } from '../services/news.service';
export declare class NewsCardComponent {
    protected item: INews;
    protected imageLoaded: EventEmitter<{}>;
    constructor();
}
