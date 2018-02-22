/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy } from '@angular/core';
import { GlobalEventService } from '@deja-js/component';
import 'rxjs/add/operator/takeWhile';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'events-demo',
    styleUrls: ['./global-events-demo.scss'],
    templateUrl: './global-events-demo.html',
})
export class DejaGlobalEventsDemoComponent implements OnDestroy {
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
                    const parentWindow = window.parent as any;
                    if (parentWindow && parentWindow !== window && parentWindow[`sendAction`]) {
                        parentWindow[`sendAction`]('From IFrame');
                    }
                });
            });
    }

    public ngOnDestroy() {
        this.isAlive = false;
    }
}
