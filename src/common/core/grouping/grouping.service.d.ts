import { IGroupInfo } from './index';
export declare class GroupingService {
    group(tree: any[], groupInfos: IGroupInfo[] | IGroupInfo, childrenField?: string, depth?: number): Promise<any[]>;
    protected groupChildren(list: any[], groupInfo: IGroupInfo, _depth: number, childrenField: string): Promise<any[]>;
    private getTextValue(value);
}
