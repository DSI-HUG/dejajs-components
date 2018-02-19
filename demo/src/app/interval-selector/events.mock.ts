/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

export class Event {
    constructor(public id: string, public label: string, public date: Date) {
    }
}

export const events: Event[] = [
    new Event('1', 'event 1', new Date('2018-01-10T00:00:00')),
    new Event('2', 'event 2', new Date('2018-01-09T00:00:00')),
    new Event('3', 'event 3', new Date('2018-01-08T00:00:00')),
    new Event('4', 'event 4', new Date('2018-01-07T00:00:00')),
    new Event('5', 'event 5', new Date('2018-01-06T00:00:00')),
    new Event('6', 'event 6', new Date('2018-01-05T00:00:00')),
    new Event('7', 'event 7', new Date('2018-01-04T00:00:00')),
    new Event('8', 'event 8', new Date('2018-01-03T00:00:00')),
    new Event('9', 'event 9', new Date('2018-01-02T00:00:00')),
    new Event('10', 'event 10', new Date('2018-01-01T00:00:00')),
];
