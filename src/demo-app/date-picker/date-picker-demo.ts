/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { DejaDatePickerComponent } from "../../index";

@Component({
    selector: 'dejadate-picker-demo',
    styleUrls: ['./date-picker-demo.scss'],
    templateUrl: './date-picker-demo.html',
})
export class DejaDatePickerDemo implements OnInit {
    public theDate = new Date();
    public disabledDate = [0, 6, new Date(2016, 9, 12)];

    public dateRangeFrom: Date;
    public dateRangeTo: Date;
    @ViewChild('dtfrom') private dateFromCtrl: DejaDatePickerComponent;
    @ViewChild('dtto') private dateToCtrl: DejaDatePickerComponent;

    private dateFrom = new BehaviorSubject(undefined);
    private dateTo = new BehaviorSubject(undefined);

    constructor() {
        let debouceTime = 0;

        const dateFrom$ = Observable.from(this.dateFrom)
            .distinctUntilChanged((date1, date2) => {
                return (date1 && date1.getTime()) === (date2 && date2.getTime());
            });

        dateFrom$.debounceTime(debouceTime)
            .skip(1)
            .filter((date) => !!date)
            .subscribe(() => {
                this.dateFromCtrl.close();
                this.dateToCtrl.open();
            });

        const dateTo$ = Observable.from(this.dateTo)
            .distinctUntilChanged((date1, date2) => {
                return (date1 && date1.getTime()) === (date2 && date2.getTime());
            });

        Observable.combineLatest(dateFrom$, dateTo$)
            .debounceTime(debouceTime)
            .map(([date1, date2]) => date1 && date2 && date1.getTime() > date2.getTime() ? [date2, date1] : [date1, date2])
            .subscribe(([]) => {
                // Value 1 et value2 dispo ici dans l'ordre
                debouceTime = 500;
            });
    }

    public ngOnInit() {

    }
}
