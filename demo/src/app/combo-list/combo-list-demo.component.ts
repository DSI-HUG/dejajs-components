/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IDejaComboListAction } from '@deja-js/component';
import { comboListDemoDatas } from './combo-list-demo.data';

@Component({
    selector: 'demo-combo-list',
    templateUrl: './combo-list-demo.component.html',
    styleUrls: ['./combo-list-demo.component.scss'],
})
export class ComboListDemoComponent implements OnInit {
    public items: ComboListTestModel[] = [];
    public itemToSelect: ComboListTestModel[];
    public itemSelected: ComboListTestModel[];
    public comboAction: IDejaComboListAction<ComboListTestModel>;
    public currentItem: ComboListTestModel;
    public selectedItems: ComboListTestModel[];
    public selectedList: ComboListTestModel[] = [];
    public fieldName = 'label';
    public fields: string[];
    public comboCtrl: FormControl;
    public tabIndex = 1;
    public sort: boolean;
    public disabled: boolean;
    public disableFastActions: boolean;

    constructor() {}

    public ngOnInit() {
        this.items = comboListDemoDatas;
        this.itemToSelect = this.items.filter(
            (i: ComboListTestModel) => i.id < 10
        );
        this.itemSelected = this.items.filter(
            (i: ComboListTestModel) => i.id >= 10
        );

        this.comboCtrl = new FormControl(this.itemSelected);
        this.fields = Object.keys(comboListDemoDatas[0]);
    }

    public showAction(event: IDejaComboListAction<ComboListTestModel>) {
        console.log('showAction', event);
        this.comboAction = event;
        this.currentItem = event.payload.currentItem;
        this.selectedItems = event.payload.selectedItems;
    }

    public log() {
        console.log('ctrl', this.comboCtrl);
    }
}

export class ComboListTestModel {
    public id: number;
    public label: string;
    public libelle: string;
    public name: string;
    public gender: string;
}
