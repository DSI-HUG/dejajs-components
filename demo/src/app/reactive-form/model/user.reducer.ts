/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import * as user from './user.actions';
import { IUser } from './user.interface';

// tslint:disable-next-line:only-arrow-functions
export function userReducer(state: IUser, action: user.Actions): IUser {
    switch (action.type) {
        case user.USER_ON_GET:
            return action.payload;

        default:
            return state;
    }
}
