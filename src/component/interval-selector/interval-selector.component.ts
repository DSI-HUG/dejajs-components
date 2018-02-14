/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import {Component, HostListener, Input, ViewChild} from '@angular/core';
import {DejaIntervalSelectorBoundaryComponent} from './interval-selector-boundary.component';
import {IntervalSelectorData} from './interval-selector-data.model';
import {IntervalSelectorService} from './interval-selector.service';

@Component({
    selector: 'deja-interval-selector',
    styleUrls: ['./interval-selector.component.scss'],
    templateUrl: './interval-selector.component.html',
})

export class DejaIntervalSelectorComponent {

    private _intervalSelectorData: IntervalSelectorData;

    @Input() public set intervalSelectorData(value: IntervalSelectorData) {
        this._intervalSelectorData = value;
    }
    public get intervalSelectorData(): IntervalSelectorData {
        return this._intervalSelectorData;
    }

    @ViewChild('openingBoundary')
    private _openingBoundary: DejaIntervalSelectorBoundaryComponent;

    @ViewChild('closingBoundary')
    private _closingBoundary: DejaIntervalSelectorBoundaryComponent;

    constructor(public intervalSelectorService: IntervalSelectorService) {
    }

    @HostListener('click', ['$event'])
    public clickHandler(_event: Event) {
        if (!this._openingBoundary.selected && !this._closingBoundary.selected) {
            this.intervalSelectorService.modelClicked(this._intervalSelectorData.intervalId, this._intervalSelectorData.model);
        }
    }

    public onItemMouseOver() {
        this.intervalSelectorService.displayBoundary(this._intervalSelectorData.intervalId, this._intervalSelectorData.model);
    }

    public onItemMouseLeave() {
        this.intervalSelectorService.hideBoundary(this._intervalSelectorData.intervalId, this._intervalSelectorData.model);
    }
}
