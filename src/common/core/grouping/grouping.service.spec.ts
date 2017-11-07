/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CloningService } from '../cloning/cloning.service';
import { ISortInfos } from '../sorting/sort-infos.model';
import { SortOrder } from '../sorting/sort-order.model';
import { IGroupInfo } from './group-infos';
import { GroupingService } from './grouping.service';

describe('GroupingService', () => {
    let service: GroupingService;
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
                color: '#333',
            },
            title: 'Pizza Party',
            titlefn: function () {
                // tslint:disable-next-line:no-invalid-this
                return this.title;
            },
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
                color: '#245',
            },
            title: 'Burger Bonanza',
            titlefn: function () {
                // tslint:disable-next-line:no-invalid-this
                return this.title;
            },
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
                        { label: 'France', value: 'coeur de Savoie' },
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
                color: '#280',
            },
            title: 'Fondue gourmet',
            titlefn: function () {
                // tslint:disable-next-line:no-invalid-this
                return this.title;
            },
        }
    ];

    beforeEach(() => {
        service = new GroupingService();
        const cloningService = new CloningService();
        datas = cloningService.cloneArray(d, Object);
    });

    it('Should, group an empty array', () => {
        service.group$([], null)
            .first()
            .subscribe((grouped) => expect(grouped).toEqual([]));
    });

    it('Should, group an array by title', () => {
        const gi = {
            groupByField: 'title',
        } as IGroupInfo;

        service.group$(datas, gi)
            .first()
            .subscribe((grouped) => {
                expect(grouped.length).toBe(3);
                expect(grouped[0].toString()).toEqual('Pizza Party');
                expect(grouped[0].items.length).toBe(1);
                expect(grouped[1].toString()).toEqual('Burger Bonanza');
                expect(grouped[1].items.length).toBe(1);
                expect(grouped[2].toString()).toEqual('Fondue gourmet');
                expect(grouped[2].items.length).toBe(1);
            });
    });

    it('Should, group a tree', () => {
        const gi = {
            groupByField: 'controlType',
        } as IGroupInfo;

        service.group$(datas, gi, 'questions')
            .first()
            .subscribe((grouped) => {
                expect(grouped.length).toBe(3);
                expect(grouped[0].questions.length).toBe(2);
                expect(grouped[0].questions[0].toString()).toEqual('radio');
                expect(grouped[0].questions[1].toString()).toEqual('text');
                expect(grouped[1].questions.length).toBe(2);
                expect(grouped[1].questions[0].toString()).toEqual('select');
                expect(grouped[1].questions[1].toString()).toEqual('textarea');
                expect(grouped[2].questions.length).toBe(2);
                expect(grouped[2].questions[0].toString()).toEqual('input');
                expect(grouped[2].questions[1].toString()).toEqual('textarea');
            });
    });

    it('Should, group by a function', () => {
        const gi = {
            groupByField: () => 'titlefn',
        } as IGroupInfo;

        service.group$(datas, gi)
            .first()
            .subscribe((grouped) => {
                expect(grouped.length).toBe(3);
                expect(grouped[0].toString()).toEqual('Pizza Party');
                expect(grouped[0].items.length).toBe(1);
                expect(grouped[1].toString()).toEqual('Burger Bonanza');
                expect(grouped[1].items.length).toBe(1);
                expect(grouped[2].toString()).toEqual('Fondue gourmet');
                expect(grouped[2].items.length).toBe(1);
            });
    });

    it('Should, group by the displayName if the field is not specified', () => {
        datas.forEach((data) => data.displayName = data.title);

        service.group$(datas, {} as IGroupInfo)
            .first()
            .subscribe((grouped) => {
                expect(grouped.length).toBe(3);
                expect(grouped[0].toString()).toEqual('Pizza Party');
                expect(grouped[0].items.length).toBe(1);
                expect(grouped[1].toString()).toEqual('Burger Bonanza');
                expect(grouped[1].items.length).toBe(1);
                expect(grouped[2].toString()).toEqual('Fondue gourmet');
                expect(grouped[2].items.length).toBe(1);
            });
    });

    it('Should, group by the toString() if the field is not specified', () => {
        datas.forEach((data) => data.toString = data.titlefn);

        service.group$(datas, {} as IGroupInfo)
            .first()
            .subscribe((grouped) => {
                expect(grouped.length).toBe(3);
                expect(grouped[0].toString()).toEqual('Pizza Party');
                expect(grouped[0].items.length).toBe(1);
                expect(grouped[1].toString()).toEqual('Burger Bonanza');
                expect(grouped[1].items.length).toBe(1);
                expect(grouped[2].toString()).toEqual('Fondue gourmet');
                expect(grouped[2].items.length).toBe(1);
            });
    });

    it('Should, sort if sotinfos are specified', () => {
        const gi = {
            groupByField: 'title',
            sortInfos: {
                name: '$text',
                order: SortOrder.descending,
            } as ISortInfos,
        } as IGroupInfo;

        service.group$(datas, gi)
            .first()
            .subscribe((grouped) => {
                expect(grouped.length).toBe(3);
                expect(grouped[0].toString()).toEqual('Pizza Party');
                expect(grouped[0].items.length).toBe(1);
                expect(grouped[1].toString()).toEqual('Fondue gourmet');
                expect(grouped[1].items.length).toBe(1);
                expect(grouped[2].toString()).toEqual('Burger Bonanza');
                expect(grouped[2].items.length).toBe(1);
            });
    });
});
