/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/**
 * data structure used to pass the model and the intervalId information to the DejaIntervalSelectorComponent component.
 *
 */
export class IntervalSelectorData {

    constructor(public intervalId: string, public model: any) {
    }
}

/**
 * data structure used internally by the IntervalSelectorService to notify interval boundary selection changes.
 *
 */
export class IntervalBoundary {

    constructor(public intervalId: string, public model: any, public openingBoundary: boolean, public selected: boolean) {
    }
}

/**
 * the model compare function signature. This function must return 1 if model1 is displayed before model2
 * within the list interval.
 *
 */
export type ModelCompareFunction = (model1: any, model2: any) => number;

/**
 * data structure used internally by the IntervalSelectorService to track interval boundary selection for a given interval.
 * An interval is identified by a unique identifier 'intervalId'. An interval requires a compare function compareFunction to
 * determinate the lower and upper boundary.
 *
 */
export class Interval {
    public openingBoundary: IntervalBoundary;
    public closingBoundary: IntervalBoundary;

    constructor(public intervalId: string, public compareFunction: ModelCompareFunction, public enabled = true) {
    }

    public getBoundary(openingBoundary: boolean, model: any) {
        if (openingBoundary) {
            if (this.openingBoundary && this.openingBoundary.model === model) {
                return this.openingBoundary;
            } else if (!model) {
                return this.openingBoundary;
            }
        } else {
            if (this.closingBoundary && model && this.closingBoundary.model === model) {
                return this.closingBoundary;
            } else if (!model) {
                return this.closingBoundary;
            }
        }
        return null;
    }

    public compare(model1: any, model2: any): number {
        return this.compareFunction(model1, model2);
    }

    public deselectBoundary(openingBoundary?: boolean, model?: any) {
        if (openingBoundary === undefined) {
            this.deselectBoundary(true);
            this.deselectBoundary(false);
        } else {
            const boundary: IntervalBoundary = this.getBoundary(openingBoundary, model);
            if (boundary) {
                boundary.selected = false;
            }
        }
    }
}

/**
 * data structure used by the IntervalSelectorService to dispatch events throught the displayModelBoundaries$ and hideModelBoundaries$ Subjects.
 */
export class IntervalSelectorEventData {

    constructor(public intervalId: string, public model: any, public openingBoundary: boolean, public selected: boolean, public bothOpeningAndClosingBoundary = false) {
    }
}
