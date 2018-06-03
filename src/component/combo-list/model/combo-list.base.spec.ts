/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { DejaComboListBase } from './combo-list.base';

class DejaComboListStub extends DejaComboListBase<any> {

}

describe('DejaComboListBaseClass', () => {

    let stub: DejaComboListStub;

    beforeEach(
        () => {
            stub = new DejaComboListStub();
        }
    );

    it('should create an instance', () => {
        expect(stub).toBeTruthy();
    });

    it('should set selected items', () => {
        const items = [1, 2, 3];
        stub.itemsSelected = items;
        expect(stub.state.selected).toBe(items);
        expect(stub.itemsSelected).toBe(items);
    });

    it('should set selectable items', () => {
        const items = [1, 2, 3];
        stub.itemsToSelect = items;
        expect(stub.state.selectable).toBe(items);
    });

    it('should sort items on labelFieldName change', () => {
        stub.sortDirection = 'asc';
        const o1 = {
            id: 0,
            label: 'Abba',
        };
        const o2 = {
            id: 1,
            label: 'Beatles'
        };
        stub.itemsSelected = [o2, o1];
        stub.labelFieldName = 'label';
        expect(stub.itemsSelected).toEqual([o1, o2]);
    });

    it('should sort items on sortDirection change', () => {
        stub.labelFieldName = 'label';
        stub.sortDirection = 'asc';
        const o1 = {
            id: 0,
            label: 'Abba',
        };
        const o2 = {
            id: 1,
            label: 'Beatles'
        };
        stub.itemsSelected = [o1, o2];
        stub.sortDirection = 'desc';
        expect(stub.itemsSelected).toEqual([o2, o1]);
    });

});
