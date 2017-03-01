/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { Component, NgZone, OnInit } from '@angular/core';
import { GlobalEventService } from '../../common/global-event/global-event.service';

@Component({
  selector: 'events-demo',
  styleUrls: ['./global-events-demo.scss'],
  templateUrl: './global-events-demo.html',
})
export class GlobalEventsDemoComponent implements OnInit {
  private model = {
    date: new Date(),
  };
  private _subscription: any;

  constructor(private globalEvent: GlobalEventService, private zone: NgZone) {
  }

  public ngOnInit() {
    this._subscription = this.globalEvent.register('sendaction').subscribe((params: any[]) => {
      this.zone.run(() => {
        this.model.date = new Date(params[0]);
      });
    });
  }

  protected ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
