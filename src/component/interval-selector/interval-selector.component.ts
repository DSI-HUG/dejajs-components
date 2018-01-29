import {Component, HostListener, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {DejaIntervalSelectorBoundaryComponent} from './interval-selector-boundary.component';
import {IntervalSelectorData} from './interval-selector.model';
import {IntervalSelectorService} from './interval-selector.service';

@Component({
    encapsulation: ViewEncapsulation.None,
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
    public clickHandler(_event) {
        if (!this._openingBoundary.selected && !this._closingBoundary.selected) {
            this.intervalSelectorService.modelClicked(this._intervalSelectorData.intervalId, this._intervalSelectorData.model);
        }
    }

    protected onItemMouseOver() {
        this.intervalSelectorService.displayBoundary(this._intervalSelectorData.intervalId, this._intervalSelectorData.model);
    }

    protected onItemMouseLeave() {
        this.intervalSelectorService.hideBoundary(this._intervalSelectorData.intervalId, this._intervalSelectorData.model);
    }
}
