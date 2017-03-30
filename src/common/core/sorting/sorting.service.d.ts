import { Observable } from 'rxjs/Rx';
import { ISortInfos } from './index';
export declare class SortingService {
    compare(a: any, b: any, sortInfo: ISortInfos): number;
    sort$(list: any[], sortInfo: ISortInfos | ISortInfos[]): Observable<any[]>;
    sort(list: any[], sortInfo: ISortInfos | ISortInfos[]): Promise<any[]>;
    sortTree$(tree: any[], sortInfo: ISortInfos | ISortInfos[], childrenField?: string): any;
    sortTree(tree: any[], sortInfo: ISortInfos | ISortInfos[], childrenField?: string): any;
}
