export interface ISortInfos {
    name?: ((model: any) => string) | string;
    order?: SortOrder;
    type?: string;
}
export declare enum SortOrder {
    ascending = 0,
    descending = 1,
}
