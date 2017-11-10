/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CloningService } from './cloning.service';

describe('CloningService', () => {
    let service: CloningService;

    class MyTypedObject {
        public datas: any;
        constructor(d: any) {
            this.datas = d;
        }
    }

    const datas = [
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
            title: 'Pizza Party'
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
            title: 'Burger Bonanza'
        }
    ];

    beforeEach(() => {
        service = new CloningService();
    });

    it('Should, clone a complex structure without target', () => {
        const cloned = service.cloneSync(datas);
        expect(JSON.stringify(cloned)).toEqual(JSON.stringify(datas));
    });

    it('Should, clone a complex structure with a target array', () => {
        const cloned = [];
        service.cloneArray(datas, cloned);
        expect(JSON.stringify(cloned)).toEqual(JSON.stringify(datas));
    });

    it('Should, clone a complex structure with a target object', () => {
        const cloned = {};
        const d = { datas: datas };
        service.cloneSync(d, cloned);
        expect(JSON.stringify(cloned)).toEqual(JSON.stringify(d));
    });

    it('Should, clone a null value', () => {
        const cloned = {};
        expect(service.cloneSync(null, cloned)).toBeNull();
    });

    it('Should, clone a typed object', () => {
        const d = new MyTypedObject(datas);
        const cloned = service.cloneSync(d, MyTypedObject);
        expect(JSON.stringify(cloned)).toEqual(JSON.stringify(d));
        expect(cloned instanceof MyTypedObject).toBeTruthy();
    });

    it('Should, clone asynchronously', () => {
        const d = new MyTypedObject(datas);
        service.clone$(d, MyTypedObject)
            .first()
            .subscribe((cloned) => {
                expect(JSON.stringify(cloned)).toEqual(JSON.stringify(d));
                expect(cloned instanceof MyTypedObject).toBeTruthy();
            });
    });

    it('Should, clone an array asynchronously', () => {
        service.cloneArray$(datas)
            .first()
            .subscribe((cloned) => {
                expect(JSON.stringify(cloned)).toEqual(JSON.stringify(datas));
                expect(cloned instanceof Array).toBeTruthy();
            });
    });

    it('Should, clone an array asynchronously to an existing array', () => {
        const cloned = [];
        service.cloneArray$(datas, cloned)
            .first()
            .subscribe(() => expect(JSON.stringify(cloned)).toEqual(JSON.stringify(datas)));
    });
});
