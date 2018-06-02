/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { IDejaComboListAction } from './combo-list-action.interface';
import { DejaComboListState } from './combo-list-state.class';

describe('DejaComboListStateClass', () => {

    let mycomp: DejaComboListState<{}>;

    beforeEach(
        () => {
            mycomp = new DejaComboListState();
        }
    );

    it('should create an instance', () => {
        expect(mycomp).toBeTruthy();
    });

    it('should add and remove an item from the selectable buffer', () => {
        mycomp.toggleSelectable(1);
        expect(mycomp.selectableBuffer[0]).toBe(1);
        mycomp.toggleSelectable(1);
        expect(mycomp.selectableBuffer.length).toBe(0);
    });

    it('should add and remove an item from the selected buffer', () => {
        let actionType: string;
        mycomp.action.subscribe((act: IDejaComboListAction<{}>) => actionType = act.type);
        mycomp.toggleSelected(1);
        expect(mycomp.selectedBuffer[0]).toBe(1);
        expect(actionType).toEqual('selected_selected');
        mycomp.toggleSelected(1);
        expect(mycomp.selectedBuffer.length).toBe(0);
        expect(actionType).toEqual('selected_deselected');
    });

    it('should raise items to the selected list', () => {
        mycomp.selectable = [1, 2, 3];
        mycomp.selectableBuffer = [1, 2];
        mycomp.raiseBuffer();
        expect(mycomp.selectableBuffer.length).toBe(0);
        expect(mycomp.selectable.length).toBe(1);
        expect(mycomp.selectable[0]).toBe(3);
        expect(mycomp.selected.length).toBe(2);
        expect(mycomp.selected).toContain(1);
        expect(mycomp.selected).toContain(2);
    });

    it('should drop items to the selectable list', () => {
        mycomp.selected = [1, 2, 3];
        mycomp.selectedBuffer = [1, 2];
        mycomp.dropBuffer();
        expect(mycomp.selectedBuffer.length).toBe(0);
        expect(mycomp.selected.length).toBe(1);
        expect(mycomp.selected[0]).toBe(3);
        expect(mycomp.selectable.length).toBe(2);
        expect(mycomp.selectable).toContain(1);
        expect(mycomp.selectable).toContain(2);
    });

    it('should raise one item to the selected list', () => {
        mycomp.selectable = [1, 2, 3];
        mycomp.selectableBuffer = [1, 2];
        mycomp.raiseOne(2);
        expect(mycomp.selectableBuffer.length).toBe(1);
        expect(mycomp.selectableBuffer).toContain(1);
        expect(mycomp.selectable.length).toBe(2);
        expect(mycomp.selected.length).toBe(1);
        expect(mycomp.selected).toContain(2);
    });

    it('should drop one item to the selectable list', () => {
        mycomp.selected = [1, 2, 3];
        mycomp.selectedBuffer = [1, 2];
        mycomp.dropOne(2);
        expect(mycomp.selectedBuffer.length).toBe(1);
        expect(mycomp.selected.length).toBe(2);
        expect(mycomp.selectedBuffer).toContain(1);
        expect(mycomp.selectable.length).toBe(1);
        expect(mycomp.selectable).toContain(2);
    });

    it('should raise all items to the selected list', () => {
        mycomp.selectable = [1, 2, 3];
        mycomp.selectableBuffer = [1, 2];
        mycomp.raiseAll();
        expect(mycomp.selectableBuffer.length).toBe(0);
        expect(mycomp.selectable.length).toBe(0);
        expect(mycomp.selected.length).toBe(3);
        expect(mycomp.selected).toEqual([1, 2, 3]);
    });

    it('should drop all items to the selectable list', () => {
        mycomp.selected = [1, 2, 3];
        mycomp.selectedBuffer = [1, 2];
        mycomp.dropAll();
        expect(mycomp.selectedBuffer.length).toBe(0);
        expect(mycomp.selected.length).toBe(0);
        expect(mycomp.selectable.length).toBe(3);
        expect(mycomp.selectable).toEqual([1, 2, 3]);
    });

    it('should sort all lists in ascending order', () => {
        mycomp.labelFieldName = 'label';
        mycomp.sortDirection = 'asc';
        const o1 = {
            id: 0,
            label: 'Abba',
        };
        const o2 = {
            id: 1,
            label: 'Beatles'
        };
        mycomp.selected = [o2, o1];
        mycomp.selectable = [o2, o1];
        mycomp.sortAll();
        expect(mycomp.selected[0]).toBe(o1);
        expect(mycomp.selectable[0]).toBe(o1);
    });

    it('should sort all lists in descending order', () => {
        let called = false;
        mycomp.onChangeCallback = () => called = true;
        mycomp.labelFieldName = 'label';
        mycomp.sortDirection = 'desc';
        const o1 = {
            id: 0,
            label: 'Abba',
        };
        const o2 = {
            id: 1,
            label: 'Beatles'
        };
        mycomp.selected = [o1, o2];
        mycomp.selectable = [o1, o2];
        mycomp.sortAll();
        expect(mycomp.selected[0]).toBe(o2);
        expect(mycomp.selectable[0]).toBe(o2);
        expect(called).toBeTruthy();
    });

});
