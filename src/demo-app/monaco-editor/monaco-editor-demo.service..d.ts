import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
export declare class MonacoEditorDemoService {
    protected _http: Http;
    constructor(_http: Http);
    getFile(filename: string): Observable<any>;
}
