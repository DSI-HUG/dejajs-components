import { ISortInfos } from './index';
export declare class SortingService {
    compare(a: any, b: any, sortInfo: ISortInfos): number;
    sort(list: any[], sortInfo: ISortInfos | ISortInfos[]): Promise<any[]>;
    sortTree(tree: any[], sortInfo: ISortInfos | ISortInfos[], childrenField?: string): Promise<any[]>;
}
