/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectorRef, NgZone, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeWhile';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as moment_ from 'moment';
const moment: (value?: any, format?: string) => moment_.Moment = (<any>moment_).default || moment_;

@Pipe({ name: 'momentTimeAgo', pure: false })
export class TimeAgoPipe implements PipeTransform, OnDestroy {
    private lastTime: Number;
    private lastValue: Date | moment_.Moment;
    private lastOmitSuffix: boolean;
    private lastText: string;
    private createTimer$ = new Subject();
    private isAlive = true;

    constructor(private cdRef: ChangeDetectorRef, private ngZone: NgZone) {
        Observable.from(this.createTimer$)
            .takeWhile(() => this.isAlive)
            .debounce(() => {
                const momentInstance = moment(this.lastValue);
                const timeToUpdate = this.getSecondsUntilUpdate(momentInstance) * 1000;
                return Observable.timer(timeToUpdate);
            })
            .subscribe(() => {
                if (this.ngZone && this.cdRef) {
                    this.ngZone.runOutsideAngular(() => {
                        this.lastText = moment(this.lastValue).from(moment(), this.lastOmitSuffix);
                        this.ngZone.run(() => this.cdRef.markForCheck());
                    });
                }
            });
    }

    public ngOnDestroy() {
        this.isAlive = false;
    }

    public transform(value: Date | moment_.Moment, omitSuffix?: boolean): string {
        if (this.hasChanged(value, omitSuffix)) {
            this.lastTime = this.getTime(value);
            this.lastValue = value;
            this.lastOmitSuffix = omitSuffix;
            this.createTimer$.next();
            this.lastText = moment(value).from(moment(), omitSuffix);

        } else {
            this.createTimer$.next();
        }

        return this.lastText;
    }

    private getSecondsUntilUpdate(momentInstance: moment_.Moment): number {
        const howOld = Math.abs(moment().diff(momentInstance, 'minute'));
        if (howOld < 1) {
            return 1;
        } else if (howOld < 60) {
            return 30;
        } else if (howOld < 180) {
            return 300;
        } else {
            return 3600;
        }
    }

    private hasChanged(value: Date | moment_.Moment, omitSuffix?: boolean) {
        return this.getTime(value) !== this.lastTime || omitSuffix !== this.lastOmitSuffix;
    }

    private getTime(value: Date | moment_.Moment) {
        if (moment_.isDate(value)) {
            return value.getTime();
        } else if (moment_.isMoment(value)) {
            return value.valueOf();
        } else {
            return moment(value).valueOf();
        }
    }
}
