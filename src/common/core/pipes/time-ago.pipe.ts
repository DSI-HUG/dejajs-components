/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectorRef, NgZone, Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import 'rxjs/add/operator/debounce';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const momentConstructor: (value?: any) => moment.Moment = (<any> moment).default || moment;

@Pipe({ name: 'momentTimeAgo', pure: false })
export class TimeAgoPipe implements PipeTransform {
    private lastTime: Number;
    private lastValue: Date | moment.Moment;
    private lastOmitSuffix: boolean;
    private lastText: string;
    private createTimer$ = new Subject();

    constructor(private cdRef: ChangeDetectorRef, private ngZone: NgZone) {
        Observable.from(this.createTimer$)
            .debounce(() => {
                const momentInstance = momentConstructor(this.lastValue);
                const timeToUpdate = this.getSecondsUntilUpdate(momentInstance) * 1000;
                return Observable.of(timeToUpdate);
            })
            .subscribe(() => {
                this.ngZone.runOutsideAngular(() => {
                    this.lastText = momentConstructor(this.lastValue).from(momentConstructor(), this.lastOmitSuffix);
                    this.ngZone.run(() => this.cdRef.markForCheck());
                });
            });
    }

    public transform(value: Date | moment.Moment, omitSuffix?: boolean): string {
        if (this.hasChanged(value, omitSuffix)) {
            this.lastTime = this.getTime(value);
            this.lastValue = value;
            this.lastOmitSuffix = omitSuffix;
            this.createTimer$.next();
            this.lastText = momentConstructor(value).from(momentConstructor(), omitSuffix);

        } else {
            this.createTimer$.next();
        }

        return this.lastText;
    }

    private getSecondsUntilUpdate(momentInstance: moment.Moment) {
        const howOld = Math.abs(momentConstructor().diff(momentInstance, 'minute'));
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

    private hasChanged(value: Date | moment.Moment, omitSuffix?: boolean) {
        return this.getTime(value) !== this.lastTime || omitSuffix !== this.lastOmitSuffix;
    }

    private getTime(value: Date | moment.Moment) {
        if (moment.isDate(value)) {
            return value.getTime();
        } else if (moment.isMoment(value)) {
            return value.valueOf();
        } else {
            return momentConstructor(value).valueOf();
        }
    }
}
