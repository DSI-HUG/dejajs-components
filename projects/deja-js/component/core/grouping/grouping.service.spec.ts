/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { cloneDeep } from 'lodash-es';
import { take } from 'rxjs/operators';

import { ISortInfos } from '../sorting/sort-infos.model';
import { IGroupInfo } from './group-infos';
import { GroupingService } from './grouping.service';

describe('GroupingService', () => {
    let service: GroupingService;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let datas: any[];

    const d = [
        {
            id: 2,
            questions: [
                {
                    controlType: 'radio',
                    id: 'like',
                    label: 'Do you like pizza?',
                    options: [
                        { label: 'Yes', value: 1 },
                        { label: 'Of Course', value: 2 }
                    ],
                    required: true
                },
                {
                    controlType: 'text',
                    id: 'toppings',
                    label: 'What toppings do you like?',
                    required: false
                }
            ],
            date: Date.now(),
            item: {
                name: 'Party',
                color: '#333'
            },
            title: 'Pizza Party',
            titlefn: function() {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return this.title;
            }
        },
        {
            id: 5,
            questions: [
                {
                    controlType: 'select',
                    id: 'delicious',
                    label: 'What is the best cheese for a burger?',
                    options: [
                        { label: '', value: 'no-cheese' },
                        { label: 'American', value: 'american' },
                        { label: 'Cheddar', value: 'cheddar' },
                        { label: 'Provolone', value: 'provolone' },
                        { label: 'Swiss', value: 'swiss' }
                    ],
                    required: true
                },
                {
                    controlType: 'textarea',
                    id: 'perfection',
                    label: 'Describe your perfect burger:',
                    required: true
                }
            ],
            date: new Date(1968, 5, 1, 10, 1, 56, 34),
            regexp: new RegExp(/\test/, 'i'),
            item: {
                name: 'Bonanza',
                color: '#245'
            },
            title: 'Burger Bonanza',
            titlefn: function() {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return this.title;
            }
        },
        {
            id: 6,
            questions: [
                {
                    controlType: 'input',
                    id: 'mervelous',
                    label: 'What is the best cheese for a fondue?',
                    options: [
                        { label: '', value: 'no-cheese' },
                        { label: 'Swiss', value: 'gruyere' },
                        { label: 'France', value: 'coeur de Savoie' }
                    ],
                    required: true
                },
                {
                    controlType: 'textarea',
                    id: 'perfection',
                    label: 'Describe your perfect fondue:',
                    required: true
                }
            ],
            date: new Date(1968, 5, 1, 10, 1, 56, 34),
            regexp: new RegExp(/\test/, 'i'),
            item: {
                name: 'Tourista',
                color: '#280'
            },
            title: 'Fondue gourmet',
            titlefn: function() {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return this.title;
            }
        }
    ];

    beforeEach(() => {
        service = new GroupingService();
        datas = cloneDeep(d);
    });

    it('Should, group an empty array', () => {
        service.group$([], null).pipe(
            take(1))
            .subscribe(grouped => void expect(grouped).toEqual([]));
    });

    it('Should, group an array by title', () => {
        const gi = {
            groupByField: 'title'
        } as IGroupInfo;

        service.group$(datas, gi).pipe(
            take(1))
            .subscribe(grouped => {
                void expect(grouped.length).toBe(3);
                void expect(grouped[0].toString()).toEqual('Pizza Party');
                void expect(grouped[0].items.length).toBe(1);
                void expect(grouped[1].toString()).toEqual('Burger Bonanza');
                void expect(grouped[1].items.length).toBe(1);
                void expect(grouped[2].toString()).toEqual('Fondue gourmet');
                void expect(grouped[2].items.length).toBe(1);
            });
    });

    it('Should, group a tree', () => {
        const gi = {
            groupByField: 'controlType'
        } as IGroupInfo;

        service.group$(datas, gi, 'questions').pipe(
            take(1))
            .subscribe(grouped => {
                void expect(grouped.length).toBe(3);
                void expect(grouped[0].questions.length).toBe(2);
                void expect(grouped[0].questions[0].toString()).toEqual('radio');
                void expect(grouped[0].questions[1].toString()).toEqual('text');
                void expect(grouped[1].questions.length).toBe(2);
                void expect(grouped[1].questions[0].toString()).toEqual('select');
                void expect(grouped[1].questions[1].toString()).toEqual('textarea');
                void expect(grouped[2].questions.length).toBe(2);
                void expect(grouped[2].questions[0].toString()).toEqual('input');
                void expect(grouped[2].questions[1].toString()).toEqual('textarea');
            });
    });

    it('Should, group by a function', () => {
        const gi = {
            groupByField: () => 'titlefn'
        } as IGroupInfo;

        service.group$(datas, gi).pipe(
            take(1))
            .subscribe(grouped => {
                void expect(grouped.length).toBe(3);
                void expect(grouped[0].toString()).toEqual('Pizza Party');
                void expect(grouped[0].items.length).toBe(1);
                void expect(grouped[1].toString()).toEqual('Burger Bonanza');
                void expect(grouped[1].items.length).toBe(1);
                void expect(grouped[2].toString()).toEqual('Fondue gourmet');
                void expect(grouped[2].items.length).toBe(1);
            });
    });

    it('Should, group by the displayName if the field is not specified', () => {
        datas.forEach(data => {
            data.displayName = data.title;
        });

        service.group$(datas, {} as IGroupInfo).pipe(
            take(1))
            .subscribe(grouped => {
                void expect(grouped.length).toBe(3);
                void expect(grouped[0].toString()).toEqual('Pizza Party');
                void expect(grouped[0].items.length).toBe(1);
                void expect(grouped[1].toString()).toEqual('Burger Bonanza');
                void expect(grouped[1].items.length).toBe(1);
                void expect(grouped[2].toString()).toEqual('Fondue gourmet');
                void expect(grouped[2].items.length).toBe(1);
            });
    });

    it('Should, group by the toString() if the field is not specified', () => {
        datas.forEach(data => {
            data.toString = data.titlefn;
        });

        service.group$(datas, {} as IGroupInfo).pipe(
            take(1))
            .subscribe(grouped => {
                void expect(grouped.length).toBe(3);
                void expect(grouped[0].toString()).toEqual('Pizza Party');
                void expect(grouped[0].items.length).toBe(1);
                void expect(grouped[1].toString()).toEqual('Burger Bonanza');
                void expect(grouped[1].items.length).toBe(1);
                void expect(grouped[2].toString()).toEqual('Fondue gourmet');
                void expect(grouped[2].items.length).toBe(1);
            });
    });

    it('Should, sort if sotinfos are specified', () => {
        const gi = {
            groupByField: 'title',
            sortInfos: {
                name: '$text',
                order: 'descending'
            } as ISortInfos
        } as IGroupInfo;

        service.group$(datas, gi).pipe(
            take(1))
            .subscribe(grouped => {
                void expect(grouped.length).toBe(3);
                void expect(grouped[0].toString()).toEqual('Pizza Party');
                void expect(grouped[0].items.length).toBe(1);
                void expect(grouped[1].toString()).toEqual('Fondue gourmet');
                void expect(grouped[1].items.length).toBe(1);
                void expect(grouped[2].toString()).toEqual('Burger Bonanza');
                void expect(grouped[2].items.length).toBe(1);
            });
    });
});
