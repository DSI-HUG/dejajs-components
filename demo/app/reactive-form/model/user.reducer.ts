/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Action } from '@ngrx/store';

import { IUser } from './user.interface';

import {
    USER_ON_GET,
} from './action-name';

// tslint:disable-next-line:only-arrow-functions
export function userReducer(state: IUser, action: Action): IUser {
    switch (action.type) {

        case USER_ON_GET:
            return action.payload;

        default:
            return state;
    }
}
