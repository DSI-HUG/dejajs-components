import { Action } from '@ngrx/store';

import { IUser } from './user.interface';

import {
    USER_ON_GET,
} from './action-name';

export function userReducer(state: IUser, action: Action): IUser {
    switch (action.type) {

        case USER_ON_GET:
            return action.payload;

        default:
            return state;
    }
}
