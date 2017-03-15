import { Observable } from 'rxjs/Observable';
export declare class CloningService {
    cloneSyncWithPrototype(object: any): any;
    cloneWithPrototype$(object: any): Observable<any>;
    cloneSync(object: any): any;
    clone(object: any): Promise<any[]>;
    clone$(object: any): Observable<any>;
    deepCopy(...objects: any[]): any;
    private deepCloneArray(arr);
    private isSpecificValue(val);
    private cloneSpecificValue(val);
}
