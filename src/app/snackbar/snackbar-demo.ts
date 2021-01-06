/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, EventEmitter, OnInit } from '@angular/core';
import { MaterialColors } from '@deja-js/component/core';
import { from, interval, Observable } from 'rxjs';
import { defaultIfEmpty, filter, map, scan } from 'rxjs/operators';

import { Message } from './message.class';

@Component({
    selector: 'deja-snackbar-demo',
    styleUrls: ['./snackbar-demo.scss'],
    templateUrl: './snackbar-demo.html'
})
export class DejaSnackbarDemoComponent implements OnInit {
    public tabIndex = 1;

    /*
     The example below demonstrate how you can dynamically add snackbars using *ngFor structural directive.
     Here the Observable simulate items being push from the server
     */
    public messages$: Observable<Message[]>;

    public dangers$: Observable<Message[]>;
    public warnings$: Observable<Message[]>;
    public successes$: Observable<Message[]>;
    public infos$: Observable<Message[]>;

    public push = new EventEmitter<string>();

    public simpleGate = false;

    public danger: string;
    public warning: string;
    public success: string;
    public info: string;
    public default: string;

    public ngOnInit(): void {
        const colors = new MaterialColors();
        this.danger = colors.getColor('mat-red')[500];
        this.warning = colors.getColor('mat-orange')[500];
        this.success = colors.getColor('mat-green')[500];
        this.info = colors.getColor('mat-blue')[500];
        this.default = colors.getColor('mat-grey')[900];

        this.dangers$ = from(this.push).pipe(
            filter(type => type === 'danger'),
            map(() => new Message('Danger snackbar')),
            scan((acc, curr) => [...acc, curr], [] as Message[]),
            defaultIfEmpty([]));

        this.warnings$ = from(this.push).pipe(
            filter(type => type === 'warning'),
            map(() => new Message('Warning snackbar')),
            scan((acc, curr) => [...acc, curr], [] as Message[]),
            defaultIfEmpty([]));

        this.successes$ = from(this.push).pipe(
            filter(type => type === 'success'),
            map(() => new Message('Success snackbar')),
            scan((acc, curr) => [...acc, curr], [] as Message[]),
            defaultIfEmpty([]));

        this.infos$ = from(this.push).pipe(
            filter(type => type === 'info'),
            map(() => new Message('Info snackbar')),
            scan((acc, curr) => [...acc, curr], [] as Message[]),
            defaultIfEmpty([]));

        this.messages$ = interval(2000).pipe(
            map(() => new Message('Server push snackbar')),
            scan((acc, curr) => [...acc, curr], [] as Message[]),
            defaultIfEmpty([]));
    }
}
