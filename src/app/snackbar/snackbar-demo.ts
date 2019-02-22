/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, EventEmitter, OnInit } from '@angular/core';
import { MaterialColors } from '@deja-js/core';
import { from as observableFrom, interval as observableInterval,  Observable } from 'rxjs';
import { defaultIfEmpty, filter, map, scan } from 'rxjs/operators';
import { Message } from './message.class';

@Component({
  selector: 'deja-snackbar-demo',
  styleUrls: ['./snackbar-demo.scss'],
  templateUrl: './snackbar-demo.html',
})
export class DejaSnackbarDemoComponent implements OnInit {
    public tabIndex = 1;

  /*
   The example below demonstrate how you can dynamically add snackbars using *ngFor structural directive.
   Here the Observable simulate items being push from the server
   */
  private messages: Observable<any[]>;

  private dangers: Observable<any[]>;
  private warnings: Observable<any[]>;
  private successes: Observable<any[]>;
  private infos: Observable<any[]>;

  private push = new EventEmitter();

  private colors: any;
  private danger: string;
  private warning: string;
  private success: string;
  private info: string;
  private default: string;

  public ngOnInit() {
    // tslint:disable-next-line:no-string-literal
    this.colors = new MaterialColors()['palet'];
    this.danger = this.colors['mat-red']['500'];
    this.warning = this.colors['mat-orange']['500'];
    this.success = this.colors['mat-green']['500'];
    this.info = this.colors['mat-blue']['500'];
    this.default = this.colors['mat-grey']['900'];

    this.dangers = observableFrom(this.push).pipe(
        filter((type: string) => type === 'danger'),
        map(() => new Message('Danger snackbar')),
        scan((acc: any[], curr: any) => [...acc, curr], []),
        defaultIfEmpty([]), );

    this.warnings = observableFrom(this.push).pipe(
        filter((type: string) => type === 'warning'),
        map(() => new Message('Warning snackbar')),
        scan((acc: any[], curr: any) => [...acc, curr], []),
        defaultIfEmpty([]), );

    this.successes = observableFrom(this.push).pipe(
        filter((type: string) => type === 'success'),
        map(() => new Message('Success snackbar')),
        scan((acc: any[], curr: any) => [...acc, curr], []),
        defaultIfEmpty([]), );

    this.infos = observableFrom(this.push).pipe(
        filter((type: string) => type === 'info'),
        map(() => new Message('Info snackbar')),
        scan((acc: any[], curr: any) => [...acc, curr], []),
        defaultIfEmpty([]), );

    this.messages = observableInterval(2000).pipe(
        map(() => new Message('Server push snackbar')),
        scan((acc: any[], curr: any) => [...acc, curr], []),
        defaultIfEmpty([]), );
  }
}
