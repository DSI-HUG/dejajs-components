/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Injectable } from '@angular/core';

@Injectable()
export class DejaSidenavService {

    public opened: boolean;
    public mode: 'over' | 'side' = 'side';
    public hidden = false;

    constructor() { }

    public open(): void {
        this.opened = true;
    }

    public close(): void {
        this.opened = false;
    }

    public toggle(): void {
        this.opened = !this.opened;
    }

}
