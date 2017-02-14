export interface IItemBase {
    id?: any;
    selectable?: boolean;
    selected?: boolean;
    dragged?: boolean;
    displayName?: (() => string) | string;
    visible?: boolean;
    odd?: boolean; // For style only
    toString?: () => string;
    equals?: (item: IItemBase) => boolean;
    height?: number;
    model?: any;
}
