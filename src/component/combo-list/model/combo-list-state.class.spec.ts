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

    let state: DejaComboListState<{}>;

    beforeEach(
        () => {
            state = new DejaComboListState();
        }
    );

    it('should create an instance', () => {
        expect(state).toBeTruthy();
    });

    it('should add and remove an item from the selectable buffer', () => {
        state.toggleSelectable(1);
        expect(state.selectableBuffer[0]).toBe(1);
        state.toggleSelectable(1);
        expect(state.selectableBuffer.length).toBe(0);
    });

    it('should add and remove an item from the selected buffer', () => {
        let actionType: string;
        state.action.subscribe((act: IDejaComboListAction<{}>) => actionType = act.type);
        state.toggleSelected(1);
        expect(state.selectedBuffer[0]).toBe(1);
        expect(actionType).toEqual('selected_selected');
        state.toggleSelected(1);
        expect(state.selectedBuffer.length).toBe(0);
        expect(actionType).toEqual('selected_deselected');
    });

    it('should raise items to the selected list', () => {
        state.selectable = [1, 2, 3];
        state.selectableBuffer = [1, 2];
        state.raiseBuffer();
        expect(state.selectableBuffer.length).toBe(0);
        expect(state.selectable.length).toBe(1);
        expect(state.selectable[0]).toBe(3);
        expect(state.selected.length).toBe(2);
        expect(state.selected).toContain(1);
        expect(state.selected).toContain(2);
    });

    it('should drop items to the selectable list', () => {
        state.selected = [1, 2, 3];
        state.selectedBuffer = [1, 2];
        state.dropBuffer();
        expect(state.selectedBuffer.length).toBe(0);
        expect(state.selected.length).toBe(1);
        expect(state.selected[0]).toBe(3);
        expect(state.selectable.length).toBe(2);
        expect(state.selectable).toContain(1);
        expect(state.selectable).toContain(2);
    });

    it('should raise one item to the selected list', () => {
        state.selectable = [1, 2, 3];
        state.selectableBuffer = [1, 2];
        state.raiseOne(2);
        expect(state.selectableBuffer.length).toBe(1);
        expect(state.selectableBuffer).toContain(1);
        expect(state.selectable.length).toBe(2);
        expect(state.selected.length).toBe(1);
        expect(state.selected).toContain(2);
    });

    it('should drop one item to the selectable list', () => {
        state.selected = [1, 2, 3];
        state.selectedBuffer = [1, 2];
        state.dropOne(2);
        expect(state.selectedBuffer.length).toBe(1);
        expect(state.selected.length).toBe(2);
        expect(state.selectedBuffer).toContain(1);
        expect(state.selectable.length).toBe(1);
        expect(state.selectable).toContain(2);
    });

    it('should raise all items to the selected list', () => {
        state.selectable = [1, 2, 3];
        state.selectableBuffer = [1, 2];
        state.raiseAll();
        expect(state.selectableBuffer.length).toBe(0);
        expect(state.selectable.length).toBe(0);
        expect(state.selected.length).toBe(3);
        expect(state.selected).toEqual([1, 2, 3]);
    });

    it('should drop all items to the selectable list', () => {
        state.selected = [1, 2, 3];
        state.selectedBuffer = [1, 2];
        state.dropAll();
        expect(state.selectedBuffer.length).toBe(0);
        expect(state.selected.length).toBe(0);
        expect(state.selectable.length).toBe(3);
        expect(state.selectable).toEqual([1, 2, 3]);
    });

    it('should sort all lists in ascending order', () => {
        state.labelFieldName = 'label';
        state.sortDirection = 'asc';
        const o1 = {
            id: 0,
            label: 'Abba',
        };
        const o2 = {
            id: 1,
            label: 'Beatles'
        };
        state.selected = [o2, o1];
        state.selectable = [o2, o1];
        state.sortAll();
        expect(state.selected[0]).toBe(o1);
        expect(state.selectable[0]).toBe(o1);
    });

    it('should sort all lists in descending order', () => {
        let called = false;
        state.onChangeCallback = () => called = true;
        state.labelFieldName = 'label';
        state.sortDirection = 'desc';
        const o1 = {
            id: 0,
            label: 'Abba',
        };
        const o2 = {
            id: 1,
            label: 'Beatles'
        };
        state.selected = [o1, o2];
        state.selectable = [o1, o2];
        state.sortAll();
        expect(state.selected[0]).toBe(o2);
        expect(state.selectable[0]).toBe(o2);
        expect(called).toBeTruthy();
    });

});
