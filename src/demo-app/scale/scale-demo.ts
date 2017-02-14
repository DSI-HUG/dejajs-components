/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {IScale, IZoomStep} from "../../component/scale/scale.component";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-scale-demo',
    styleUrls: ['./scale-demo.scss'],
    templateUrl: './scale-demo.html',
})
export class ScaleDemo extends OnInit {

    public horizontal: boolean = false;
    public customLabels: boolean = false;
    public selectedValue: string;
    public zoomEnabled = true;
    public labels = [] as IScale[];
    public _zoomSteps= 4 as number;
    private _steps = 100 as number;
    private _min = 0 as number;
    private _max = 100 as number;
    private _labelDecimals = 0 as number;
    private _zoomStepsModel = [] as IZoomStep[];

    constructor() {
        super();
    }

    public ngOnInit() {
    }

    public get steps () {
        return this._steps;
    }

    public set steps (steps: number) {
        this._steps = steps;
        if (this.customLabels) {
            this._setLabels();
        }

    }

    public get zoomSteps () {
        return this._zoomSteps;
    }

    public set zoomSteps (zoomSteps: number) {
        this._zoomSteps = zoomSteps;
        if (this.customLabels) {
            this._setLabels();
        }

    }

    public get min () {
        return this._min;
    }

    public set min (min: number) {
        this._min = min;
        if (this.customLabels) {
            this._setLabels();
        }
    }

    public get max () {
        return this._max;
    }

    public set max (max: number) {
        this._max = max;
        if (this.customLabels) {
            this._setLabels();
        }
    }

    public get labelDecimals () {
        return this._labelDecimals;
    }

    public set labelDecimals (labelDecimals: number) {
        this._labelDecimals = labelDecimals;
        if (this.customLabels) {
            this._setLabels();
        }
    }

    public selectedValueListener($event: string) {
        this.selectedValue = $event;
    }

    protected setCustomLabels (labelsChecked: boolean) {
        this.customLabels = labelsChecked;
        if (this.customLabels) {
            // setTimeout(( () => {this._setLabels(); } ), 0 );
            this._setLabels();
        }
    }

    private _setLabels() {

        this.labels.splice(0);
        this.labels = [];

        let labelStep = (this._max - this._min) / this._steps as number;

        this._setZoomLabels();

        for (let i = 0; i <= this._steps; i++) {
            let label = this._min + i * labelStep;
            this.labels.push( {label: label > Math.floor(label) ? label.toFixed(this._labelDecimals) : label, value: label, zoomSteps: this.getZoomStepsByValue(label)} );
        }

    }

    private getZoomStepsByValue(value: number) {
        let zoomStepsByValue = [] as IZoomStep[];
        this._zoomStepsModel.forEach((zoomStep: IZoomStep) => {
            let label = Number(zoomStep.value) + value;
            zoomStepsByValue.push( {label: label > Math.floor(label) ? label.toFixed(this._labelDecimals) : label, value: label} );
        });
        return zoomStepsByValue;
    }

    private _setZoomLabels() {
        this._zoomStepsModel.splice(0);
        let step = (this._max - this._min) / this._steps;
        let zoomStep = step / this._zoomSteps;

        for (let i = 0; i < this._zoomSteps; i++) {
            let label = i * zoomStep;
            this._zoomStepsModel.push( {label: label, value: label} );
        }
    }
}
