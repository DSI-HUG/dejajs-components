/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/**
 * Remove diacritics (accent and other marks) on characters, and dissociate double characters.
 * Based on the character map of http://lehelk.com/2011/05/06/script-to-remove-diacritics/
 * but per-character walk (improved performance).
 *
 * Licensed under WTFPL v2 http://sam.zoy.org/wtfpl/COPYING
 */

import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class Destroy implements OnDestroy {

    protected destroyed$ = new Subject();

    public ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    }
}
