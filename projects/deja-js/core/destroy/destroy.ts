/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class Destroy implements OnDestroy {

    protected destroyed$ = new Subject();

    public ngOnDestroy() {
        if (this.destroyed$.closed) {
            // Observable already unsubscribed
            // tslint:disable-next-line: no-debugger
            debugger;
            return;
        }

        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    }
}
