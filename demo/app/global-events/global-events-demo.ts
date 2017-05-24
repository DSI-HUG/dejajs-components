/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy } from '@angular/core';
import { GlobalEventService } from '../../../src/common/global-event/global-event.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'events-demo',
    styleUrls: ['./global-events-demo.scss'],
    templateUrl: './global-events-demo.html',
})
export class GlobalEventsDemoComponent implements OnDestroy {
    protected tabIndex = 1;

    private model = {
        date: new Date(),
    };
    private _subscription: any;

    constructor(changeDetectorRef: ChangeDetectorRef, globalEvent: GlobalEventService, zone: NgZone) {
        this._subscription = globalEvent.register('sendaction').subscribe((params: any[]) => {
            zone.run(() => {
                this.model.date = new Date(params[0]);
                changeDetectorRef.markForCheck();

                if (window.parent && window.parent !== window && window.parent['sendAction']) {
                    window.parent['sendAction']('From IFrame');
                }
            });
        });
    }

    public ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
