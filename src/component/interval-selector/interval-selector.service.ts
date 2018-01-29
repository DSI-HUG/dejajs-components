import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Interval, IntervalBoundary, IntervalSelectorEventData} from './interval-selector.model';

@Injectable()
/**
 * Service for interval selection within lower and upper boundary.
 *
 * @see DejaIntervalSelectorBoundaryComponent
 */
export class IntervalSelectorService {

    public rangeSelectionChanged$:Subject<IntervalBoundary> = new Subject<IntervalBoundary>();
    public displayModelBoundaries$:Subject<IntervalSelectorEventData> = new Subject<IntervalSelectorEventData>();
    public hideModelBoundaries$:Subject<IntervalSelectorEventData> = new Subject<IntervalSelectorEventData>();

    private _intervalMap: Map<string, Interval> = new Map<string, Interval>();
    private _lastSelectBoundariesCall: Date;

    constructor() {
    }

    /**
     * adds the interval identified by an unique idenfifier and a compare function.
     *
     * @param {string} intervalId the interval unique identifier
     * @param {Function} compareFunction ther interval compare Function used to determinate the order of model.
     */
    public addInterval(intervalId: string, compareFunction: Function) {
        const interval: Interval =
            new Interval(intervalId, compareFunction);
        this._intervalMap.set(intervalId, interval);
    }

    /**
     * removes the interval for the given interval id.
     *
     * @param {string} intervalId the interval id
     */
    public removeInterval(intervalId: string) {
        if (intervalId) {
            this._intervalMap.delete(intervalId);
        }
    }

    /**
     * enable or disable selection for the given interval.
     *
     * @param {string} intervalId
     * @param {boolean} enabled
     */
    public changeIntervalEnabledStatus(intervalId: string, enabled: boolean) {
        const interval: Interval = this._intervalMap.get(intervalId);
        if (interval) {
            interval.enabled = enabled;
            if (!interval.enabled) {
                this.resetIntervalSelection(interval);
            }
        }
    }

    /**
     * use this method to change the selected status of the given boundary to true.
     *
     * @param {string} intervalId
     * @param model
     * @param {boolean} openingBoundary
     */
    public selectBoundary(intervalId: string, model: any, openingBoundary: boolean): void {
        const boundary: IntervalBoundary = new IntervalBoundary(intervalId, model, openingBoundary, true, false);
        this.updateIntervalSelection(boundary, true);
    }

    /**
     * use this method to change the selected status of the given boundary to false.
     *
     * @param {string} intervalId
     * @param model
     * @param {boolean} openingBoundary
     */
    public deselectBoundary(intervalId: string, model: any, openingBoundary: boolean): void {
        const boundary: IntervalBoundary = new IntervalBoundary(intervalId, model, openingBoundary, false, false);
        this.updateIntervalSelection(boundary, false);
    }

    /**
     * use this method to indicate that a data model has been clicked.
     *
     * @param {string} intervalId
     * @param model
     */
    public modelClicked(intervalId: string, model: any): void {
        // console.log('modelClicked()');
        const timer$:Observable<any> = Observable.timer(150);
        const now:Date = new Date();
        timer$.subscribe(()=> {
            // console.log('modelClicked() after timer');
            const _lastSelectBoundariesCall = this._lastSelectBoundariesCall;
            if (_lastSelectBoundariesCall && _lastSelectBoundariesCall.getTime() > (now.getTime()-300) ) {
                // il y a eu un appel à selectBoundaries() moins de 150 ms. On ignore ce click.
                return;
            }
            this._lastSelectBoundariesCall = null;
            const interval: Interval = this._intervalMap.get(intervalId);
            if (!interval || !interval.enabled) {
                return;
            }
            // console.log('modelClicked() applicable');
            let openingBoundary: IntervalBoundary = interval.openingBoundary;
            let closingBoundary: IntervalBoundary = interval.closingBoundary;
            let modelCompareResult = -1;

            if (openingBoundary && closingBoundary) {
                // un interval est déjà sélectionné
                modelCompareResult = interval.compare(openingBoundary.model, model);
                if (modelCompareResult<0) {
                    this._deselectBoundary(openingBoundary);
                    openingBoundary = new IntervalBoundary(intervalId, model, true, true, true);
                    this._selectBoundary(openingBoundary);
                } else if (closingBoundary.model !== model) {
                    this._deselectBoundary(closingBoundary);
                    closingBoundary = new IntervalBoundary(intervalId, model, false, true, true);
                    this._selectBoundary(closingBoundary);
                } else if (closingBoundary.model === model) {
                    this._deselectBoundary(closingBoundary);
                }
            } else if (openingBoundary && openingBoundary.model !== model) {
                // seul la borne d'ouverture est présente
                modelCompareResult = interval.compare(openingBoundary.model, model);
                if (modelCompareResult<0) {
                    this._deselectBoundary(openingBoundary);
                    closingBoundary = new IntervalBoundary(intervalId, openingBoundary.model, false, true, true);
                    this._selectBoundary(closingBoundary);
                    openingBoundary = new IntervalBoundary(intervalId, model, true, true, true);
                    this._selectBoundary(openingBoundary);
                } else if (modelCompareResult>0) {
                    closingBoundary = new IntervalBoundary(intervalId, model, false, true, true);
                    this._selectBoundary(closingBoundary);
                }
            } else if (closingBoundary && closingBoundary.model !== model) {
                // seul la borne de fermeture est présente
                modelCompareResult = interval.compare(closingBoundary.model, model);
                if (modelCompareResult<0) {
                    openingBoundary = new IntervalBoundary(intervalId, model, true, true, true);
                    this._selectBoundary(openingBoundary);
                } else if (modelCompareResult>0) {
                    this._deselectBoundary(closingBoundary);
                    openingBoundary = new IntervalBoundary(intervalId, closingBoundary.model, true, true, true);
                    this._selectBoundary(openingBoundary);
                    closingBoundary = new IntervalBoundary(intervalId, model, false, true, true);
                    this._selectBoundary(closingBoundary);
                }
            } else if (!closingBoundary && !openingBoundary) {
                openingBoundary = new IntervalBoundary(intervalId, model, true, true, true);
                this._selectBoundary(openingBoundary);
            }
        });
    }

    /**
     * use this method to display both boundaries for the given modem, but without selecting it.
     * It will act like the mouse is over the boundary.
     *
     * @param {string} intervalId
     * @param {data} model
     * @param openingBoundary
     */
    public displayBoundary(intervalId: string, model: any) {
        const boundary: IntervalSelectorEventData = new IntervalSelectorEventData(intervalId, model, false, false, true);
        this.displayModelBoundaries$.next(boundary);
    }

    /**
     * use this method to hide a boundary that has been displayed using the method {@link displayBoundary(any, string)}.
     *
     * @param {string} intervalId
     * @param {data} model
     */
    public hideBoundary(intervalId: string, model: any) {
        const boundary: IntervalSelectorEventData = new IntervalSelectorEventData(intervalId, model, false, false, true);
        this.hideModelBoundaries$.next(boundary);
    }

    /**
     * use this method to restore the selected status of a given boundary.
     *
     * @param {string} intervalId
     * @param model
     * @param {boolean} openingBoundary
     */
    public restoreSelectedBoundaryState(intervalId: string, model: any, openingBoundary: boolean): void {
        const interval: Interval = this._intervalMap.get(intervalId);
        if (!interval || !interval.enabled) {
            return;
        }
        const activeBoundary: IntervalBoundary = interval.getBoundary(openingBoundary, model);

        if (activeBoundary) {
            // already selected
            this.updateIntervalSelection(activeBoundary, true);
        }
    }

    /**
     * reset interval selection for a given interval id.
     *
     * @param {string} intervalId the interval unique identifier
     */
    public resetIntervalSelectionById(intervalId: string) {
        const interval: Interval = this._intervalMap.get(intervalId);
        this.resetIntervalSelection(interval);
    }

    /**
     * returns the enabled status for the given items list id.
     *
     * @param {string} intervalId
     * @returns {boolean}
     */
    public isIntervalEnabled(intervalId: string): boolean {
        const interval: Interval = this._intervalMap.get(intervalId);
        if (interval) {
            return interval.enabled;
        }
        return false;
    }

    /**
     * use this method to define both the lower and upper boundaries.
     *
     * @param {string} intervalId
     * @param model1
     * @param model2
     */
    public selectBoundaries(intervalId: string, model1: any, model2: any) {
        this._lastSelectBoundariesCall = new Date();
        // console.log(`selectBoundaries(): model1[${DateUtils.formatSystem(model1.date)}}, model2[${DateUtils.formatSystem(model1.date)}]`);
        const interval: Interval = this._intervalMap.get(intervalId);
        if (!interval || !model1 || !model2) {
            return;
        }
        this.resetIntervalSelection(interval);

        const comparingResult = interval.compare(model1, model2);
        const model1Boundary: IntervalBoundary = new IntervalBoundary(intervalId, model1, false, true, true);
        const model2Boundary: IntervalBoundary = new IntervalBoundary(intervalId, model2, false, true, true);
        if (comparingResult >= 0) {
            model1Boundary.openingBoundary = true;
            model2Boundary.openingBoundary = false;
            interval.openingBoundary = model1Boundary;
            interval.closingBoundary = model2Boundary;
            this._selectBoundary(model1Boundary);
            this._selectBoundary(model2Boundary);
        } else if (comparingResult === -1) {
            model1Boundary.openingBoundary = false;
            model2Boundary.openingBoundary = true;
            interval.openingBoundary = model2Boundary;
            interval.closingBoundary = model1Boundary;
            this._selectBoundary(model1Boundary);
            this._selectBoundary(model2Boundary);
        }
        this.rangeSelectionChanged$.next(interval.openingBoundary);
        this.rangeSelectionChanged$.next(interval.closingBoundary);
    }

    /**
     * use this method to change the selected status of the given boundary to true.
     *
     * @param {IntervalBoundary} boundary
     */
    protected _selectBoundary(boundary: IntervalBoundary): void {
        this.updateIntervalSelection(boundary, true);
    }

    /**
     *
     * @param {IntervalBoundary} boundary
     */
    private _deselectBoundary(boundary: IntervalBoundary): void {
        this.updateIntervalSelection(boundary, false);
    }

    /**
     * reset interval selection for a given interval.
     *
     * @param {Interval} interval
     */
    private resetIntervalSelection(interval: Interval) {
        if (!interval) {
            return;
        }
        interval.deselectBoundary();
        this.clearIntervalBoundaryIfNotSelected(interval);
    }

    private clearIntervalBoundaryIfNotSelected(interval: Interval, openingBoundary?: boolean) {
        if (openingBoundary === undefined) {
            this.clearIntervalBoundaryIfNotSelected(interval, true);
            this.clearIntervalBoundaryIfNotSelected(interval, false);
        } else {
            const boundary: IntervalBoundary = interval.getBoundary(openingBoundary, null);
            if (boundary && !boundary.selected) {
                this.rangeSelectionChanged$.next(boundary);
                if (openingBoundary) {
                    interval.openingBoundary = null;
                } else {
                    interval.closingBoundary = null;
                }
            }
        }
    }

    private updateIntervalSelection(boundary: IntervalBoundary, selected: boolean): void {

        const interval: Interval = this._intervalMap.get(boundary.intervalId);
        if (!interval || (selected && !interval.enabled)) {
            return;
        }
        const openingBoundary = boundary.openingBoundary;
        let modelCompareResult = -1;
        const alreadyRegisteredBoundary: IntervalBoundary = interval.getBoundary(openingBoundary, boundary.model);
        if (alreadyRegisteredBoundary) {
            alreadyRegisteredBoundary.selected = selected;
        } else if (selected) {
            if (openingBoundary && interval.openingBoundary) {
                interval.openingBoundary.selected = false;
            }
            if (!openingBoundary && interval.closingBoundary) {
                interval.closingBoundary.selected = false;
            }
            if (openingBoundary && interval.closingBoundary) {
                modelCompareResult = interval.compare(boundary.model, interval.closingBoundary.model);
                if (modelCompareResult<0) {
                    interval.closingBoundary.selected = false;
                }
            }
            if (!openingBoundary && interval.openingBoundary) {
                modelCompareResult = interval.compare(boundary.model, interval.openingBoundary.model);
                if (modelCompareResult>0) {
                    interval.openingBoundary.selected = false;
                }
            }
            this.clearIntervalBoundaryIfNotSelected(interval);
        }

        boundary.selected = selected;
        if (openingBoundary) {
            interval.openingBoundary = boundary;
        } else {
            interval.closingBoundary = boundary;
        }
        this.rangeSelectionChanged$.next(boundary);
    }
}
