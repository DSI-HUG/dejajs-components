import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GroupingService } from '../../common/core';
export declare class DrugsService {
    private http;
    private groupingService;
    constructor(http: Http, groupingService: GroupingService);
    getGroupedDrugs$(query?: string): Observable<IDrug[]>;
    getDrugs$(query?: string, number?: number): Observable<IDrug[]>;
}
export interface IDrug {
    indexedText: string;
    receivedate: string;
    companynumb: string;
    safetyreportid: string;
}
