import { Http } from '@angular/http';
import 'rxjs/add/operator/repeat';
import { Observable } from 'rxjs/Observable';
import { GroupingService } from '../../index';
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
