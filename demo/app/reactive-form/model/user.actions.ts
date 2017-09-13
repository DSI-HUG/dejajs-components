/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Action } from '@ngrx/store';

export const USER_ON_GET = '[User] mocking get user server api';

export class UserOnGetAction implements Action {
  public readonly type = USER_ON_GET;
  public payload: any;

  constructor() {}
}

export type Actions = UserOnGetAction;
