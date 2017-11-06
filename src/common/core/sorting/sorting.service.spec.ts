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
            colors: [
                'orange',
                'yellow',
                'green',
            ],
        },
        {
            name: 'Banana',
            value: 5,
            colors: [
                'green',
                'yellow',
                'black',
            ],
        },
        {
            name: 'Cantaloupe',
            value: 4,
            colors: [
                'orange',
                'cantaloupe',
                'green',
            ],
        },
        {
            name: 'Cherries',
            value: 6,
            colors: [
                'mallow',
                'red',
            ],
        },
        {
            name: 'Coconut',
            value: 2,
            colors: [
                'white',
                'braun',
                'green',
            ],
        },
        {
            name: 'Cranberries',
            value: 8,
            colors: [
                'mallow',
                'black',
                'red',
            ],
        },
        {
            name: 'Durian',
            value: 1,
            colors: [
                'green',
                'yellow',
            ],
        },
        {
            name: 'Grapes',
            value: 3,
            colors: [
                'green',
                'red',
                'black',
            ],
        },
        {
            name: 'Lemon',
            value: 12,
            colors: [
                'yellow',
                'green',
            ],
        },
        {
            name: 'Mango',
            value: 9,
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
            colors: [
                'yellow',
            ],
        },
        {
            name: 'Watermelon',
            value: 10,
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
    it('Should, compare correctly', () => {
        const si = {
            name: 'name',
            order: SortOrder.ascending,
        };

        expect(SortingService.compare(null, undefined, si)).toBe(0);
        expect(SortingService.compare(null, 0, si)).toBe(-1);
        expect(SortingService.compare(0, undefined, si)).toBe(1);
    });
});
