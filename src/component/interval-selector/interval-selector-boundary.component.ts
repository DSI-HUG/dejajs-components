/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IntervalBoundary } from './interval-selector-boundary.model';
import { IntervalSelectorEventData } from './interval-selector-event-data.model';
import { IntervalSelectorService } from './interval-selector.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-interval-selector-boundary',
    styleUrls: ['./interval-selector-boundary.component.scss'],
    templateUrl: './interval-selector-boundary.component.html',
})

export class DejaIntervalSelectorBoundaryComponent implements OnDestroy {

    private _intervalId: string;
    private _model: any;
    private _openingBoundary: boolean;
    private _selected = false;

    private _isAlive = true;

    // internal usage
    public isVisible = false;
    public charToDisplay = '&nbsp;';
    private boundaryChar = '[';

    constructor(private changeDetectorRef: ChangeDetectorRef, public intervalSelectorService: IntervalSelectorService) {
        Observable.from(intervalSelectorService.intervalSelectionChanged$).takeWhile(() => this._isAlive)
            .subscribe((boundary: IntervalBoundary) => {
                if ((boundary.intervalId === this._intervalId && boundary.model === this._model && boundary.openingBoundary === this._openingBoundary)) {
                    this._selected = boundary.selected;
                    // console.log(`DejaIntervalSelectorBoundaryComponent: intervalSelectionChanged$(): date=${DateUtils.formatSystem(boundary.model.date)}, opening=${boundary.openingBoundary}`);
                    this.updateState();
                }
            });

        Observable.from(intervalSelectorService.displayModelBoundaries$).takeWhile(() => this._isAlive)
            .subscribe((eventData: IntervalSelectorEventData) => {
                if (eventData.model === this._model && eventData.intervalId === this._intervalId) {
                    this.mouseOver();
                }
            });

        Observable.from(intervalSelectorService.hideModelBoundaries$).takeWhile(() => this._isAlive)
            .subscribe((eventData: IntervalSelectorEventData) => {
                if (eventData.model === this._model && eventData.intervalId === this._intervalId) {
                    this.mouseLeave();
                }
            });
    }

    public ngOnDestroy(): void {
        this._isAlive = false;
    }

    @Input() public set configureBoundary(config: any) {
        if (config) {
            if (config.hasOwnProperty('intervalId')) {
                this.intervalId = config.intervalId;
            }
            if (config.hasOwnProperty('model')) {
                this.model = config.model;
            }
            if (config.hasOwnProperty('openingBoundary')) {
                this.openingBoundary = config.openingBoundary;
            }
            this.intervalSelectorService.restoreSelectedBoundaryState(this._intervalId, this._model, this._openingBoundary);
            this.updateState();
        }
    }

    @Input() public set openingBoundary(value: boolean) {
        this._openingBoundary = value;
        if (this._model && this._intervalId && this._openingBoundary !== undefined) {
            this.updateState();
        }
    }

    public get openingBoundary(): boolean {
        return this._openingBoundary;
    }

    @Input() public set selected(_value: boolean) {
        if (_value) {
            this.intervalSelectorService.selectBoundary(this._intervalId, this._model, this._openingBoundary);
        } else {
            this.intervalSelectorService.deselectBoundary(this._intervalId, this._model, this._openingBoundary);
        }
        this.updateState();
    }
    public get selected(): boolean {
        return this._selected;
    }

    @Input() public set model(value: any) {
        this._model = value;
        if (this._model && this._intervalId && this._openingBoundary !== undefined) {
            this.intervalSelectorService.restoreSelectedBoundaryState(this._intervalId, this._model, this._openingBoundary);
            this.updateState();
        }
    }
    public get model(): any {
        return this._model;
    }

    @Input() public set intervalId(value: string) {
        this._intervalId = value;
        if (this._model && this._intervalId && this._openingBoundary !== undefined) {
            this.intervalSelectorService.restoreSelectedBoundaryState(this._intervalId, this._model, this._openingBoundary);
            this.updateState();
        }
    }
    public get intervalId(): string {
        return this._intervalId;
    }

    @HostListener('click', ['$event'])
    public clickHandler(_event: Event) {
        _event.stopPropagation();
        this.selected = !this.selected;
    }

    public mouseOver() {
        this.isVisible = true;
        this.updateState(true);
    }

    public mouseLeave() {
        this.isVisible = false;
        this.updateState(true);
    }

    private updateState(markForDetection = false) {
        const currentIsVisible = this.isVisible;
        const currentSelected = this.selected;
        const currentCharToDisplay = this.charToDisplay;

        if (this._intervalId && this._model) {
            if (this._openingBoundary) {
                this.boundaryChar = '[';
            } else {
                this.boundaryChar = ']';
            }
            if (this.intervalSelectorService.isIntervalEnabled(this._intervalId) &&
                (this.isVisible || this._selected)) {
                this.charToDisplay = this.boundaryChar;
            } else {
                this.charToDisplay = '&nbsp;';
            }
        }
        if (this._model && (markForDetection || currentIsVisible !== this.isVisible || currentSelected !== this._selected || currentCharToDisplay !== this.charToDisplay)) {
            // console.log(`DejaIntervalSelectorBoundaryComponent: markForCheck(): date=${DateUtils.formatSystem(this.rangeSelectorBoundary.model.date)}, opening=${this.rangeSelectorBoundary.openingBoundary}`);
            this.changeDetectorRef.markForCheck();
        }
    }
}
