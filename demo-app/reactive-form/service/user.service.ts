import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IappState } from '../model/app-state.interface';
import { user } from '../model/user.data';

import {
    USER_ON_GET,
} from '../model/action-name';

@Injectable()
export class UserService {

    constructor(
        private _store: Store<IappState>,
    ) {}

    public mockApiGetUser() {
        this._store.dispatch({ type: USER_ON_GET, payload: user });
    }

}
