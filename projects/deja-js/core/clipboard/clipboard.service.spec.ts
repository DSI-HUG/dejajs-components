/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { DejaClipboardService } from './clipboard.service';

describe('DejaClipboardService', () => {
    let service: DejaClipboardService;

    const datas = {
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
    };

    beforeEach(() => {
        service = new DejaClipboardService();
    });

    it('Should, store and restore an object.', () => {
        expect(service.isAvailable('datas')).toBe(false);
        service.set('datas', datas);
        expect(service.isAvailable('datas')).toBe(true);
        expect(service.get('datas')).toBe(datas);
        service.clear();
        expect(service.isAvailable('datas')).toBe(false);
    });
});
