/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-time-picker-demo',
    styleUrls: ['./time-picker-demo.scss'],
    templateUrl: './time-picker-demo.html'
})
export class DejaTimePickerDemoComponent {
    public tabIndex = 1;

    public date1 = new Date(2021, 4, 6, 9, 5, 0);
    public hours1 = this.date1.getHours();
    public minutes1 = this.date1.getMinutes();

    public date2 = new Date();
    public hours2 = this.date2.getHours();
    public minutes2 = this.date2.getMinutes();

    public hours1Changed(hours1: number): void {
        this.date1.setHours(hours1);
        this.hours1 = this.date1.getHours();
    }

    public minutes1Changed(minutes1: number): void {
        this.date1.setMinutes(minutes1);
        this.minutes1 = this.date1.getMinutes();
        this.hours1 = this.date1.getHours();
    }

    public hours2Changed(hours2: number): void {
        this.date2.setHours(hours2);
        this.hours2 = this.date2.getHours();
    }

    public minutes2Changed(minutes2: number): void {
        this.date2.setMinutes(minutes2);
        this.hours2 = this.date2.getHours();
        this.minutes2 = this.date2.getMinutes();
    }
}
