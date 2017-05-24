/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, OnInit } from '@angular/core';
import { ICircularRange } from './../../../src/component/circular-picker/circular-picker.component';

@Component({
    selector: 'deja-circular-picker-demo',
    styleUrls: ['./circular-picker-demo.scss'],
    templateUrl: './circular-picker-demo.html',
})
export class DejaCircularPickerDemoComponent implements OnInit {
    protected tabIndex = 1;

    public sm = 3;
    public sms = 10;
    protected ranges1 = [
        { min: 1, max: 20, labelInterval: 2 },
    ] as ICircularRange[];

    protected ranges2 = [
        { min: 1, max: 20 },
    ] as ICircularRange[];

    protected ranges3 = [
        { min: 1, max: 12, beginOffset: Math.PI / 3 },
        { min: 13, max: 24, beginOffset: Math.PI / 3 },
    ] as ICircularRange[];

    protected ranges41 = [
        {
            labelInterval: 5,
            max: 59,
            min: 0,
        },
    ] as ICircularRange[];

    protected ranges42 = [
        {
            max: 11,
            min: 0,
        },
        {
            max: 111,
            min: 100,
        },
    ] as ICircularRange[];

    private myModel = [
        { value: 0, label: 'T0' },
        { value: 1, label: 'T1' },
        { value: 2, label: 'T2' },
        { value: 3, label: 'T3' },
        { value: 4, label: 'T4' },
        { value: 5, label: 'T5' },
        { value: 6, label: 'T6' },
        { value: 7, label: 'T7' },
        { value: 8, label: 'T8' },
        { value: 9, label: 'T9' },
        { value: 10, label: 'T10' },
        { value: 11, label: 'T11' },
        { value: 100, label: 'T-1', realValue: -1 },
        { value: 101, label: 'T-2', realValue: -2 },
        { value: 102, label: 'T-3', realValue: -3 },
        { value: 103, label: 'T-4', realValue: -4 },
        { value: 104, label: 'T-5', realValue: -5 },
        { value: 105, label: 'T-6', realValue: -6 },
        { value: 106, label: 'T-7', realValue: -7 },
        { value: 107, label: 'T-8', realValue: -8 },
        { value: 108, label: 'T-9', realValue: -9 },
        { value: 109, label: 'T-10', realValue: -10 },
        { value: 110, label: 'T-11', realValue: -11 },
        { value: 111, label: 'T-12', realValue: -12 },
    ] as ITemplateModel[];

    constructor() {

    }

    public ngOnInit() {

    }

    protected range42Changed(selection: number) {
        console.log(`Selected model ${this.getLabelForValue(selection)}`);
    }

    protected getLabelForValue(value: number) {
        const val = this.myModel.find((m) => m.value === value);
        return (val) ? val.label : value;
    }
}

interface ITemplateModel {
    value: number;
    label: string;
    realValue?: number;
}
