import { IDejaAction } from '../../../common/core/action.interface';
export interface IDejaComboListAction<T> extends IDejaAction {
    payload: {
        currentItem?: T;
        selectedItems?: T[];
    };
}
