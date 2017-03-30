import { Observable } from 'rxjs/Rx';
import { IGroupInfo } from './index';
export declare class GroupingService {
    group$(tree: any[], groupInfos: IGroupInfo[] | IGroupInfo, childrenField?: string): Observable<any[]>;
    group(tree: any[], groupInfos: IGroupInfo[] | IGroupInfo, childrenField?: string): Promise<any[]>;
    protected groupChildren$(list: any[], groupInfo: IGroupInfo, _depth: number, childrenField: string): Observable<any[]>;
    private getTextValue(value);
}
