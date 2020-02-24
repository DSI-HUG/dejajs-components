/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, EventEmitter, OnInit } from '@angular/core';
import { MaterialColors } from '@deja-js/core';
import { from, interval, Observable } from 'rxjs';
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
    public messages: Observable<any[]>;

    public dangers: Observable<any[]>;
    public warnings: Observable<any[]>;
    public successes: Observable<any[]>;
    public infos: Observable<any[]>;

    public push = new EventEmitter();

    public simpleGate = false;

    private colors: any;
    public danger: string;
    public warning: string;
    public success: string;
    public info: string;
    public default: string;

    public ngOnInit() {
        // tslint:disable-next-line:no-string-literal
        this.colors = new MaterialColors()['palet'];
        this.danger = this.colors['mat-red']['500'];
        this.warning = this.colors['mat-orange']['500'];
        this.success = this.colors['mat-green']['500'];
        this.info = this.colors['mat-blue']['500'];
        this.default = this.colors['mat-grey']['900'];

        this.dangers = from(this.push).pipe(
            filter((type: string) => type === 'danger'),
            map(() => new Message('Danger snackbar')),
            scan((acc: any[], curr: any) => [...acc, curr], []),
            defaultIfEmpty([]));

        this.warnings = from(this.push).pipe(
            filter((type: string) => type === 'warning'),
            map(() => new Message('Warning snackbar')),
            scan((acc: any[], curr: any) => [...acc, curr], []),
            defaultIfEmpty([]));

        this.successes = from(this.push).pipe(
            filter((type: string) => type === 'success'),
            map(() => new Message('Success snackbar')),
            scan((acc: any[], curr: any) => [...acc, curr], []),
            defaultIfEmpty([]));

        this.infos = from(this.push).pipe(
            filter((type: string) => type === 'info'),
            map(() => new Message('Info snackbar')),
            scan((acc: any[], curr: any) => [...acc, curr], []),
            defaultIfEmpty([]));

        this.messages = interval(2000).pipe(
            map(() => new Message('Server push snackbar')),
            scan((acc: any[], curr: any) => [...acc, curr], []),
            defaultIfEmpty([]));
    }
}
