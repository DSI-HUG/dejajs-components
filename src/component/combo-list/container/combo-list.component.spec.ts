/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { IDejaAction } from '../../../common/core/action.interface';
import { DejaComboListComponent } from './combo-list.component';

describe('DejaComboListStateClass', () => {

    let comp: DejaComboListComponent<{}>;

    beforeEach(
        () => {
            comp = new DejaComboListComponent();
        }
    );

    it('should create an instance', () => {
        expect(comp).toBeTruthy();
    });

    it('should add and remove an item from the selectable buffer', () => {
        const action: IDejaAction = {
            type: 'single',
            payload: 1,
        };
        comp.toSelectListAction(action);
        expect(comp.state.selectableBuffer[0]).toBe(1);
        comp.toSelectListAction(action);
        expect(comp.state.selectableBuffer.length).toBe(0);
    });

    it('should add and remove an item from the selected buffer', () => {
        const action: IDejaAction = {
            type: 'single',
            payload: 1,
        };
        comp.selectedListAction(action);
        expect(comp.state.selectedBuffer[0]).toBe(1);
        comp.selectedListAction(action);
        expect(comp.state.selectedBuffer.length).toBe(0);
    });

    it('should raise an item to the selected list', () => {
        const action: IDejaAction = {
            type: 'double',
            payload: 1,
        };
        comp.toSelectListAction(action);
        expect(comp.state.selected[0]).toBe(1);
    });

    it('should drop an item to the selectable list', () => {
        const action: IDejaAction = {
            type: 'double',
            payload: 1,
        };
        comp.selectedListAction(action);
        expect(comp.state.selectable[0]).toBe(1);
    });

    it('should execute actionbar actions', () => {
        const action: IDejaAction = {
            type: 'raiseAll',
        };
        const items = [1, 2, 3];
        comp.state.selectable = items;
        comp.actionBarAction(action);
        expect(comp.state.selectable.length).toBe(0);
        expect(comp.state.selected).toEqual(items);
    });

});
