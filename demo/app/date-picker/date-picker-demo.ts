/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/distinctUntilChanged';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { StepUnit } from './../../../src/component/date-picker/date-picker.component';

@Component({
    selector: 'dejadate-picker-demo',
    templateUrl: './date-picker-demo.html',
})
export class DejaDatePickerDemoComponent implements OnInit, OnDestroy {
    protected tabIndex = 1;

    public theDate: Date = new Date();
    public theDateSelected: Date = new Date();
    public kboDate: Date = new Date();

    public disabledDate = [0, 6, new Date(2016, 9, 12)];

    public dateRangeFrom: Date;
    public dateRangeTo: Date;
    public dateMin: Date;
    public dateMax: Date;
    public datetimeKeyboard: Date;

    protected stepUnit = StepUnit.Minute;

    private dateFrom = new BehaviorSubject(undefined);
    private dateTo = new BehaviorSubject(undefined);

    private date$sub: Subscription;

    constructor() {
        let debouceTime = 0;

        const dateFrom$ = Observable.from(this.dateFrom)
            .distinctUntilChanged((date1, date2) => {
                return (date1 && date1.getTime()) === (date2 && date2.getTime());
            });

        const dateTo$ = Observable.from(this.dateTo)
            .distinctUntilChanged((date1, date2) => {
                return (date1 && date1.getTime()) === (date2 && date2.getTime());
            });

        this.date$sub = Observable.combineLatest(dateFrom$, dateTo$)
            .debounceTime(debouceTime)
            .map(([date1, date2]) => date1 && date2 && date1.getTime() > date2.getTime() ? [date2, date1] : [date1, date2])
            .subscribe(([]) => {
                // Value 1 et value2 dispo ici dans l'ordre
                debouceTime = 500;
            });
    }

    public ngOnDestroy() {
        this.date$sub.unsubscribe();
    }

    public ngOnInit() {
        const now: Date = new Date();
        this.dateMin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        this.dateMax = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        this.theDateSelected = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        console.log(this.dateMin);
        console.log(this.dateMax);
    }
}
