/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { IDejaComboListAction } from '@deja-js/component';
import { comboListData } from './combo-test.data';

@Component({
    selector: 'demo-combo-list',
    templateUrl: './combo-list.component.html',
    styleUrls: ['./combo-list.component.scss'],
})
export class DejaComboListDemoComponent implements OnInit {

    public itemToSelect: ComboListTestModel[];
    public itemToSelect2: ComboListTestModel[];
    public itemToSelect3: ComboListTestModel[];

    public itemSelected: ComboListTestModel[];
    public itemSelected2: ComboListTestModel[];
    public itemSelected3: ComboListTestModel[];

    public comboAction: IDejaComboListAction<ComboListTestModel>;
    public selectedItems: ComboListTestModel[];
    public fieldName = 'surname';
    public fields: string[];
    public comboCtrl: FormControl;
    public tabIndex = 1;
    public sort = null;
    public disabled: boolean;
    public disableFastActions: boolean;
    private items: ComboListTestModel[] = [];

    constructor() { }

    public ngOnInit() {
        this.stateReset();
    }

    public showAction(event: IDejaComboListAction<ComboListTestModel>) {
        this.comboAction = event;
        this.selectedItems = event.payload.selectedItems;
    }

    public stateReset() {
        this.items = comboListData;

        this.itemToSelect = this.items.filter(
            (i: ComboListTestModel) => i.id < 10
        );
        this.itemToSelect2 = [...this.itemToSelect];
        this.itemToSelect3 = [...this.itemToSelect];

        this.itemSelected = this.items.filter(
            (i: ComboListTestModel) => i.id >= 10
        );
        this.itemSelected2 = [...this.itemSelected];
        this.itemSelected3 = [...this.itemSelected];

        this.comboCtrl = new FormControl(this.itemSelected2);
        this.fields = Object.keys(comboListData[0]);
    }

    public log() {
        console.log('ctrl', this.comboCtrl);
    }

    public toggleDisable(e: MatCheckboxChange) {
        if (e.checked) {
            this.comboCtrl.disable();
        } else {
            this.comboCtrl.enable();
        }
    }
}

export class ComboListTestModel {
    public id: number;
    public secretName: string;
    public surname: string;
    public firstName: string;
    public gender: string;
}
