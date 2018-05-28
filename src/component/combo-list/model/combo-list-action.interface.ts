/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { IDejaAction } from '../../../common/core/action.interface';
export interface IDejaComboListAction<T> extends IDejaAction {
    payload: {
        currentItem?: T;
        selectedItems?: T[];
    };
}

export const noop = () => { };
