import { IViewPortItem } from './index';

export interface IItemBase extends IViewPortItem {
    id?: any;
    selectable?: boolean;
    selected?: boolean;
    dragged?: boolean;
    displayName?: (() => string) | string;
    visible?: boolean;
    odd?: boolean; // For style only
    toString?: () => string;
    equals?: (item: IItemBase) => boolean;
    model?: any;
}
