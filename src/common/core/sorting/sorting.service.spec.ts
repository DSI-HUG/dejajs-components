/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ISortInfos } from './sort-infos.model';
import { SortOrder } from './sort-order.model';
import { SortingService } from './sorting.service';

describe('SortingService', () => {
    let service: SortingService;

    const fructs = [
        {
            name: 'Apricots',
            value: 7,
            date: new Date(2017, 12, 7),
            colors: [
                'orange',
                'yellow',
                'green',
            ],
        },
        {
            name: 'Banana',
            value: 5,
            date: new Date(2017, 12, 5),
            colors: [
                'green',
                'yellow',
                'black',
            ],
        },
        {
            name: 'Cantaloupe',
            value: 4,
            date: new Date(2017, 12, 4),
            colors: [
                'orange',
                'cantaloupe',
                'green',
            ],
        },
        {
            name: 'Cherries',
            value: 6,
            date: new Date(2017, 12, 6),
            colors: [
                'mallow',
                'red',
            ],
        },
        {
            name: 'Coconut',
            value: 2,
            date: new Date(2017, 12, 2),
            colors: [
                'white',
                'braun',
                'green',
            ],
        },
        {
            name: 'Cranberries',
            value: 8,
            date: new Date(2017, 12, 8),
            colors: [
                'mallow',
                'black',
                'red',
            ],
        },
        {
            name: 'Durian',
            value: 1,
            date: new Date(2017, 12, 1),
            colors: [
                'green',
                'yellow',
            ],
        },
        {
            name: 'Grapes',
            value: 3,
            date: new Date(2017, 12, 3),
            colors: [
                'green',
                'red',
                'black',
            ],
        },
        {
            name: 'Lemon',
            value: 0,
            date: new Date(2017, 12, 0),
            colors: [
                'yellow',
                'green',
            ],
        },
        {
            name: 'Mango',
            value: 9,
            date: new Date(2017, 12, 9),
            colors: [
                'yellow',
                'green',
                'red',
                'orange',
            ],
        },
        {
            name: 'Pineapple',
            value: 11,
            date: new Date(2017, 12, 11),
            colors: [
                'yellow',
            ],
        },
        {
            name: 'Watermelon',
            value: 10,
            date: new Date(2017, 12, 10),
            colors: [
                'green',
                'red',
            ],
        },
    ];

    const sortedValues = ['Apricots', 'Banana', 'Cantaloupe', 'Cherries', 'Coconut', 'Cranberries', 'Durian', 'Grapes', 'Lemon', 'Mango', 'Pineapple', 'Watermelon'];

    beforeEach(() => {
        service = new SortingService();
    });

    it('Should, sort an empty array', () => {
        service.sort$([], null)
            .first()
            .subscribe((sorted) => expect(sorted).toEqual([]));
    });

    it('Should, sort an array by first level ascending', () => {
        const si = {
            name: 'name',
            order: SortOrder.ascending,
        } as ISortInfos;

        service.sort$(fructs, si)
            .first()
            .subscribe((sorted) => {
                expect(sorted.length).toBe(sortedValues.length);
                sorted.forEach((value, i) => expect(value.name).toEqual(sortedValues[i]));
            });
    });

    it('Should, sort an array by first level descending', () => {
        const si = {
            name: 'name',
            order: SortOrder.descending,
        } as ISortInfos;

        const reverseValues = [...sortedValues].reverse();
        service.sort$(fructs, si)
            .first()
            .subscribe((sorted) => {
                expect(sorted.length).toBe(reverseValues.length);
                sorted.forEach((value, i) => expect(value.name).toEqual(reverseValues[i]));
            });
    });

    it('Should, sort by number', () => {
        const si = {
            name: 'value',
            order: SortOrder.ascending,
        } as ISortInfos;

        service.sort$(fructs, si)
            .first()
            .subscribe((sorted) => {
                expect(sorted.length).toBe(fructs.length);
                sorted.forEach((value, i) => expect(value.value).toEqual(i));
            });
    });

    it('Should, sort by date', () => {
        const si = {
            name: 'date',
            order: SortOrder.ascending,
        } as ISortInfos;

        service.sort$(fructs, si)
            .first()
            .subscribe((sorted) => {
                expect(sorted.length).toBe(fructs.length);
                sorted.forEach((value, i) => expect(value.value).toEqual(i));
            });
    });

    it('Should, sort a tree', () => {
        const si = [{
            name: 'name',
            order: SortOrder.ascending,
        }, {
            order: SortOrder.descending,
        }] as ISortInfos[];

        service.sortTree$(fructs, si, 'colors')
            .first()
            .subscribe((sorted) => {
                expect(sorted.length).toBe(sortedValues.length);
                sorted.forEach((value, i) => expect(value.name).toEqual(sortedValues[i]));
                expect(sorted[4].colors[0]).toEqual('white');
                expect(sorted[4].colors[1]).toEqual('green');
                expect(sorted[4].colors[2]).toEqual('braun');
                expect(sorted[7].colors[0]).toEqual('red');
                expect(sorted[7].colors[1]).toEqual('green');
                expect(sorted[7].colors[2]).toEqual('black');
            });
    });

    // Compare static method test
    it('Should, compare values correctly', () => {
        const si = {
            order: SortOrder.ascending,
        } as ISortInfos;

        expect(SortingService.compare(null, undefined, si)).toBe(0);
        expect(SortingService.compare(null, 0, si)).toBe(-1);
        expect(SortingService.compare(0, undefined, si)).toBe(1);

        si.name = 'name';
        expect(SortingService.compare({}, {}, si)).toBe(0);
        expect(SortingService.compare({}, { name: '' }, si)).toBe(-1);
        expect(SortingService.compare({ name: '' }, {}, si)).toBe(1);

        expect(SortingService.compare({ name: 'b' }, { name: 'b' }, si)).toBe(0);
        expect(SortingService.compare({ name: 'b' }, { name: 'a' }, si)).toBe(1);
        expect(SortingService.compare({ name: 'a' }, { name: 'b' }, si)).toBe(-1);

        expect(SortingService.compare({ name: () => 'a' }, { name: () => 'a' }, si)).toBe(0);
        expect(SortingService.compare({ name: () => 'b' }, { name: () => 'a' }, si)).toBe(1);
        expect(SortingService.compare({ name: () => 'a' }, { name: () => 'b' }, si)).toBe(-1);
        expect(SortingService.compare({ name: () => 'a' }, { name: () => '' }, si)).toBe(1);
        expect(SortingService.compare({ name: () => '' }, { name: () => 'a' }, si)).toBe(-1);

        // tslint:disable-next-line:no-construct
        expect(SortingService.compare({ name: () => new String('b') }, { name: () => new String('a') }, si)).toBe(1);
        // tslint:disable-next-line:no-construct
        expect(SortingService.compare({ name: () => new String('a') }, { name: () => new String('b') }, si)).toBe(-1);
    });

    it('Should, compare dates correctly', () => {
        const si = {
            name: 'name',
            order: SortOrder.ascending,
        } as ISortInfos;

        const date1 = new Date(2017, 12, 25, 23, 59, 58);
        const date2 = date1;
        const date3 = date2.setSeconds(57);

        expect(SortingService.compare({ name: date1 }, { name: date2 }, si)).toBe(0);
        expect(SortingService.compare({ name: date1 }, { name: date3 }, si)).toBe(1);
        expect(SortingService.compare({ name: date3 }, { name: date1 }, si)).toBe(-1);

        expect(SortingService.compare({ name: () => date1 }, { name: () => date2 }, si)).toBe(0);
        expect(SortingService.compare({ name: () => date1 }, { name: () => date3 }, si)).toBe(1);
        expect(SortingService.compare({ name: () => date3 }, { name: () => date1 }, si)).toBe(-1);
    });
});
