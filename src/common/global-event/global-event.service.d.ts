import { Observable } from 'rxjs/Rx';
export declare class GlobalEventService {
    private globalEventEmmitter;
    constructor();
    register(event: string): Observable<any[]>;
}
