/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/takeWhile';
import { GlobalEventService } from '../../../src/common/global-event/global-event.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'events-demo',
    styleUrls: ['./global-events-demo.scss'],
    templateUrl: './global-events-demo.html',
})
export class GlobalEventsDemoComponent implements OnDestroy {
    public tabIndex = 1;

    private model = {
        date: new Date(),
    };
    private isAlive = true;

    constructor(changeDetectorRef: ChangeDetectorRef, globalEvent: GlobalEventService, zone: NgZone) {
        globalEvent.register('sendaction')
            .takeWhile(() => this.isAlive)
            .subscribe((params: any[]) => {
                zone.run(() => {
                    this.model.date = new Date(params[0]);
                    changeDetectorRef.markForCheck();

                    if (window.parent && window.parent !== window && window.parent[`sendAction`]) {
                        window.parent[`sendAction`]('From IFrame');
                    }
                });
            });
    }

    public ngOnDestroy() {
        this.isAlive = false;
    }
}
